<script lang="ts">
	import { onMount } from 'svelte';
	import { isThemeDark } from './theme';

	onMount(() => {
		const html = document.documentElement;

		const queryColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

		const savedTheme = localStorage.getItem('data-theme');

		switch (savedTheme) {
			case 'light':
				isThemeDark.set(false);
				break;
			case 'dark':
				isThemeDark.set(true);
				break;
			default:
				isThemeDark.set(queryColorScheme.matches);
				break;
		}

		let isSystemDark = queryColorScheme.matches;

		queryColorScheme.addEventListener('change', (query) => {
			isSystemDark = query.matches;
			isThemeDark.update((isDark) => (isDark != isSystemDark ? isSystemDark : isDark));
		});

		isThemeDark.subscribe((isDark) => {
			if (isDark === isSystemDark) {
				html.removeAttribute('data-theme');
				localStorage.removeItem('data-theme');
			} else {
				html.setAttribute('data-theme', isDark ? 'dark' : 'light');
				localStorage.setItem('data-theme', isDark ? 'dark' : 'light');
			}
		});
	});
</script>

<svelte:head>
	<script lang="ts">
		let savedTheme = localStorage.getItem('data-theme');
		if (savedTheme === 'light' || savedTheme === 'dark') {
			document.documentElement.setAttribute('data-theme', savedTheme);
		}
	</script>
</svelte:head>

<slot />

<style global lang="scss">
	$themes: (
		'light': (
			'bg': #f5f5f5,
			'fg': #24242e,
			'white': #f5f5f5,
			'black': #24242e,
			'light-gray': #e1e3e5,
			'dark-gray': #6a6a85,
			'green': #20ac6f,
			'blue': #4785ff,
			'red': #fa5252
		),
		'dark': (
			'bg': #121217,
			'fg': #f5f5f5,
			'white': #f5f5f5,
			'black': #121217,
			'light-gray': #242435,
			'dark-gray': #6d6d8b,
			'green': #3ddc97,
			'blue': #4785ff,
			'red': #fa5252
		)
	);

	@mixin theme($theme) {
		@each $variable in map-keys($theme) {
			--#{$variable}: #{map-get($theme, $variable)};
		}
	}

	html {
		@include theme(map-get($themes, light));

		@media (prefers-color-scheme: dark) {
			@include theme(map-get($themes, dark));
		}
	}

	@each $name, $theme in $themes {
		html[data-theme='#{$name}'] {
			@include theme($theme);
		}
	}

	* {
		transition: background-color 0.2s;
	}

	body {
		color: var(--fg);
		background-color: var(--bg);
	}
</style>
