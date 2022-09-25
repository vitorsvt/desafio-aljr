<script lang="ts">
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';

	import { commaToPeriod } from '../utils';

	let score: number | null = null;

	const schema = z.object({
		distance: z.preprocess(commaToPeriod, z.number().min(0)),
		altimetry: z.number().int().min(0),
		speed: z.preprocess(commaToPeriod, z.number().min(0))
	});

	function bikeFormula(distance: number, speed: number, altimetry: number) {
		let speedGroup = null;

		if (speed > 28) {
			speedGroup = 2;
		} else if (speed >= 20) {
			speedGroup = 1;
		} else {
			speedGroup = 0;
		}

		const multipliers = [
			[10, 12.5, 13.5, 14, 14.5, 15, 15.5, 16],
			[11, 13.5, 14.5, 15, 15.5, 16, 16.5, 17],
			[12, 14.5, 15.5, 16, 16.5, 17, 17.5, 18]
		];

		let altimetryGroup = null;

		if (altimetry >= 2000) {
			altimetryGroup = 7;
		} else if (altimetry >= 1000) {
			altimetryGroup = 6;
		} else if (altimetry >= 751) {
			altimetryGroup = 5;
		} else if (altimetry >= 601) {
			altimetryGroup = 4;
		} else if (altimetry >= 451) {
			altimetryGroup = 3;
		} else if (altimetry >= 301) {
			altimetryGroup = 2;
		} else if (altimetry >= 151) {
			altimetryGroup = 1;
		} else {
			altimetryGroup = 0;
		}

		const multiplier = multipliers[speedGroup][altimetryGroup];

		return distance * multiplier;
	}

	const { form } = createForm<z.infer<typeof schema>>({
		onSubmit: async (values) => {
			const { distance, speed, altimetry } = schema.parse(values);
			score = bikeFormula(distance, speed, altimetry);
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
		Velocidade (em quilômetros por hora):
		<ValidationMessage for="speed" let:messages={message}>
			<span>{message || ''}</span>
		</ValidationMessage>
		<input type="number" name="speed" placeholder="Velocidade" />
	</label>
	<button type="submit">Calcular</button>
	<p>{score !== null ? `${score} pontos` : ''}</p>
</form>

<style lang="scss" src="./Calculator.scss"></style>
