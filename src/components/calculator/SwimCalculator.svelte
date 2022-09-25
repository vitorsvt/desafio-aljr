<script lang="ts">
	import { Schema, z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';

	let score: number | null = null;

	const schema = z.object({
		distance: z.number().int().min(0)
	});

	function swimFormula(distance: number) {
		return (distance / 100) * 30;
	}

	const { form } = createForm<z.infer<typeof schema>>({
		onSubmit: async (values) => {
			const { distance } = schema.parse(values);
			score = swimFormula(distance);
		},
		extend: [validator({ schema }), reporter]
	});
</script>

<form use:form>
	<label>
		Distância (em metros):
		<ValidationMessage for="distance" let:messages={message}>
			<span>{message || ''}</span>
		</ValidationMessage>
		<input type="number" name="distance" placeholder="Metros" />
	</label>
	<button type="submit">Calcular</button>
	<p>{score !== null ? `${score} pontos` : ''}</p>
</form>

<style lang="scss" src="./Calculator.scss"></style>
