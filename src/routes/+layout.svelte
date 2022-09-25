<script>
	import Theme from '../components/Theme.svelte';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

	import '../styles/app.scss';

	import { z } from 'zod';

	z.setErrorMap((issue) => {
		let message = 'Argumento inválido';

		switch (issue.code) {
			case 'invalid_type':
				if (issue.expected === 'string') {
					message = 'Caracteres inválidos';
				} else if (issue.expected === 'number') {
					message = 'Apenas números';
				} else if (issue.expected === 'integer') {
					message = 'Apenas números inteiros';
				} else if (issue.expected === 'float') {
					message = 'Apenas números decimais';
				}
				break;
			case 'too_small':
				if (issue.type === 'number') {
					message = `Apenas valores maiores ${issue.inclusive ? 'ou iguais' : ''} a ${
						issue.minimum
					}`;
				} else if (issue.type === 'string') {
					if (issue.inclusive) {
						message = `É necessário ${issue.minimum} ou mais caracteres`;
					} else {
						message = `É necessário ${issue.minimum + 1} ou mais caracteres`;
					}
				}
				break;
			case 'too_big':
				if (issue.type === 'number') {
					message = `Apenas valores menores ${issue.inclusive ? 'ou iguais' : ''} a ${
						issue.maximum
					}`;
				} else if (issue.type === 'string') {
					if (issue.inclusive) {
						message = `É necessário ${issue.maximum} ou menos caracteres`;
					} else {
						message = `Até ${issue.maximum - 1} caracteres`;
					}
				}
				break;
		}

		return {
			message
		};
	});
</script>

<Theme />

<Header />
<main>
	<slot />
</main>
<Footer />

<style lang="scss">
	:global(body) {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
	}

	:global(body > div) {
		width: 100%;
		max-width: 50rem;

		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
</style>
