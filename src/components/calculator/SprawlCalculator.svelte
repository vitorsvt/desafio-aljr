<script lang="ts">
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';

	let score: number | null = null;

	const schema = z.object({
		count: z.number().int().min(0)
	});

	function sprawlFormula(count: number): number {
		let multiplier = 0;

		if (count >= 100) {
			multiplier = 2;
		} else if (count >= 70) {
			multiplier = 1.5;
		} else if (count >= 40) {
			multiplier = 1;
		}

		return count * multiplier;
	}

	const { form } = createForm<z.infer<typeof schema>>({
		onSubmit: async (values) => {
			const { count } = schema.parse(values);
			score = sprawlFormula(count);
		},
		extend: [validator({ schema }), reporter]
	});
</script>

<form use:form>
	<label>
		Quantidade em sequência:
		<ValidationMessage for="count" let:messages={message}>
			<span>{message || ''}</span>
		</ValidationMessage>
		<input type="number" name="count" placeholder="Meio sugado" />
	</label>
	<button type="submit">Calcular</button>
	<p>{score !== null ? `${score} pontos` : ''}</p>
</form>

<style lang="scss" src="./Calculator.scss"></style>
