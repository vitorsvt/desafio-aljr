<script lang="ts">
	import { isThemeDark } from './theme';

	function toggleTheme() {
		isThemeDark.update((current) => !current);
	}
</script>

<button on:click={toggleTheme}><img class="theme-icon" src="sun.svg" alt="Alterar tema" /></button>

<style lang="scss">
	@include dark-mode {
		.theme-icon {
			content: url(/moon.svg);
		}
	}
</style>
