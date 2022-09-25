<script lang="ts">
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';

	import { commaToPeriod } from '../utils';

	let score: number | null = null;

	interface Pace {
		minutes: number;
		seconds: number;
	}

	function parsePace(pace: string) {
		const [minutes, seconds] = pace.split(':');
		return { minutes: Number(minutes), seconds: Number(seconds) };
	}

	const schema = z.object({
		distance: z.preprocess(commaToPeriod, z.number().min(0)),
		altimetry: z.number().int().min(0),
		pace: z
			.string()
			.regex(/^\d{1,2}:\d{1,2}$/, 'Escreva no formato minutos:segundos')
			.transform(parsePace)
			.refine((obj) => {
				return z
					.object({
						minutes: z.number().int().min(0),
						seconds: z.number().int().min(0)
					})
					.safeParse(obj).success;
			})
	});

	function paceGreaterThan(a: Pace | string, b: Pace | string): boolean {
		if (typeof a === 'string') {
			a = parsePace(a);
		}

		if (typeof b === 'string') {
			b = parsePace(b);
		}

		return a.minutes > b.minutes || (a.minutes == b.minutes && a.seconds > b.seconds);
	}

	function paceGreaterThanOrEqual(a: Pace | string, b: Pace | string): boolean {
		if (typeof a === 'string') {
			a = parsePace(a);
		}

		if (typeof b === 'string') {
			b = parsePace(b);
		}

		return a.minutes >= b.minutes || (a.minutes == b.minutes && a.seconds >= b.seconds);
	}

	function runFormula(distance: number, pace: Pace, altimetry: number) {
		let paceGroup = 0;

		if (paceGreaterThan(pace, '12:00')) {
			paceGroup = 0;
		} else if (paceGreaterThan(pace, '10:00')) {
			paceGroup = 1;
		} else if (paceGreaterThan(pace, '8:00')) {
			paceGroup = 2;
		} else if (paceGreaterThanOrEqual(pace, '7:31')) {
			paceGroup = 3;
		} else if (paceGreaterThanOrEqual(pace, '7:01')) {
			paceGroup = 4;
		} else if (paceGreaterThanOrEqual(pace, '6:31')) {
			paceGroup = 5;
		} else if (paceGreaterThanOrEqual(pace, '6:01')) {
			paceGroup = 6;
		} else if (paceGreaterThanOrEqual(pace, '5:31')) {
			paceGroup = 7;
		} else if (paceGreaterThanOrEqual(pace, '5:01')) {
			paceGroup = 8;
		} else if (paceGreaterThanOrEqual(pace, '4:31')) {
			paceGroup = 9;
		} else if (paceGreaterThanOrEqual(pace, '4:00')) {
			paceGroup = 10;
		} else {
			paceGroup = 11;
		}

		const multiplierList = [
			[15, 17.5, 20, 25, 30, 35, 50, 70],
			[20, 22.5, 25, 30, 35, 40, 55, 75],
			[25, 27.5, 30, 35, 40, 45, 60, 80],
			[30, 35, 40, 45, 50, 55, 65, 75],
			[35, 40, 45, 50, 55, 60, 70, 80],
			[40, 45, 50, 55, 60, 65, 75, 85],
			[45, 50, 55, 60, 65, 70, 80, 90],
			[50, 55, 60, 65, 70, 75, 85, 95],
			[55, 60, 65, 70, 75, 80, 90, 100],
			[60, 65, 70, 75, 80, 85, 95, 105],
			[65, 70, 75, 80, 85, 90, 100, 110],
			[70, 75, 80, 85, 90, 95, 105, 115]
		];

		let altimetryGroup = 0;

		if (altimetry > 1000) {
			altimetryGroup = 7;
		} else if (altimetry > 500) {
			altimetryGroup = 6;
		} else if (altimetry > 400) {
			altimetryGroup = 5;
		} else if (altimetry > 300) {
			altimetryGroup = 4;
		} else if (altimetry > 200) {
			altimetryGroup = 3;
		} else if (altimetry > 100) {
			altimetryGroup = 2;
		} else if (altimetry > 50) {
			altimetryGroup = 1;
		} else {
			altimetryGroup = 0;
		}

		const multiplier = multiplierList[paceGroup][altimetryGroup];

		return distance * multiplier;
	}

	const { form } = createForm<z.infer<typeof schema>>({
		onSubmit: async (values) => {
			const { distance, pace, altimetry } = schema.parse(values);
			score = runFormula(distance, pace, altimetry);
		},
		extend: [validator({ schema }), reporter]
	});
</script>

<form use:form>
	<label>
		Distância (em quilômetros):
		<ValidationMessage for="distance" let:messages={message}>
			<span>{message || ''}</span>
		</ValidationMessage>
		<input type="text" name="distance" placeholder="Distância" />
	</label>
	<label>
		Altimetria (em metros):
		<ValidationMessage for="altimetry" let:messages={message}>
			<span>{message || ''}</span>
		</ValidationMessage>
		<input type="number" name="altimetry" placeholder="Altimetria" />
	</label>
	<label>
		Ritmo (por quilômetro):
		<ValidationMessage for="pace" let:messages={message}>
			<span>{message || ''}</span>
		</ValidationMessage>
		<input type="text" name="pace" placeholder="minutos:segundos por km" />
	</label>
	<button type="submit">Calcular</button>
	<p>{score !== null ? `${score} pontos` : ''}</p>
</form>

<style lang="scss" src="./Calculator.scss"></style>
