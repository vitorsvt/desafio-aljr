<script>
	import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<header>
	<img class="logo" src="logo.png" alt="ALJR" />
	<ul>
		<li><a href="/">Calculadora</a></li>
		<li><ThemeSwitch /></li>
	</ul>
</header>

<style lang="scss">
	@include dark-mode {
		.logo {
			content: url(/logo-dark.png);
		}
	}

	header {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;

		padding: 2rem;

		@media screen and (min-width: 600px) {
			flex-direction: row;
			justify-content: space-between;
		}
	}

	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		@media screen and (min-width: 600px) {
			flex-direction: row;
		}
	}

	a {
		font-weight: bold;
	}

	img {
		height: 5rem;
	}
</style>
