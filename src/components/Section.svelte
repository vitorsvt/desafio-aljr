<script lang="ts">
	export let title: string;
	export let description: string | null = null;
</script>

<section>
	<h1>{title}</h1>
	{#if description}
		<p>{description}</p>
	{/if}
	<slot />
</section>

<style lang="scss">
	h1 {
		font-size: 2rem;
	}

	section {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		padding: 2rem;
		gap: 1rem;
	}
</style>
