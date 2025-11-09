<script>
	import SprawlCalculator from '../components/calculator/SprawlCalculator.svelte';
	import BurpeeCalculator from '../components/calculator/BurpeeCalculator.svelte';
	import SwimCalculator from '../components/calculator/SwimCalculator.svelte';
	import RunCalculator from '../components/calculator/RunCalculator.svelte';
	import BikeCalculator from '../components/calculator/BikeCalculator.svelte';
	import Parser from '../components/calculator/Parser.svelte';
	import Section from '../components/Section.svelte';
</script>

<Section title="Corrida / Caminhada">
	<RunCalculator />
</Section>

<Section title="Pedalada">
	<BikeCalculator />
</Section>

<Section title="Burpee">
	<BurpeeCalculator />
</Section>

<Section title="Meio sugado">
	<SprawlCalculator />
</Section>

<Section title="Natação">
	<SwimCalculator />
</Section>

<Section title="Processar atividades">
	<p>Processa a lista de atividades de um ou mais participantes e exporta para uma planilha do Excel. <b>(Em fase de testes ainda)</b></p>
	<Parser />
</Section>
