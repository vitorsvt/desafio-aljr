<script>
	import SprawlCalculator from '../components/calculator/SprawlCalculator.svelte';
	import BurpeeCalculator from '../components/calculator/BurpeeCalculator.svelte';
	import SwimCalculator from '../components/calculator/SwimCalculator.svelte';
	import RunCalculator from '../components/calculator/RunCalculator.svelte';
	import BikeCalculator from '../components/calculator/BikeCalculator.svelte';
	import ExtraPoints from '../components/ExtraPoints.svelte';
	import Section from '../components/Section.svelte';
</script>

<Section title="O Desafio">
	<p>
		O desafio é uma competição, sobretudo consigo mesmo, sendo você o seu principal adversário na
		luta contra maus-hábitos e buscando os substituir por melhores.
	</p>

	<p>
		Este desafio será realizado em duas modalidades: INDIVIDUAL e DUPLA, simultaneamente, com METAS
		de exercícios diários e semanais, além de outras atividades, cada qual valendo pontuação para a
		competição, premiando os campeões com troféus, medalhas de participação para todos que encararem
		o desafio e certificado de conclusão do treinamento aos que obtiverem determinado desempenho
		mínimo. Além de tudo, este é um desafio beneficente, onde contaremos com arrecadação e doação de
		alimentos a cada meta não alcançada pelos participantes. Portanto, é um método com muitos
		gatilhos que reforçam sua disciplina, compromisso e consistência, transformando seus hábitos.
	</p>

	<p>
		E antes que você se pergunte se será capaz de cumprir as metas, é garantido que sim: as metas
		são subdivididas em três níveis, tornando-se assim, atingíveis para diferentes capacidades de
		desempenho. Cada nível terá uma pontuação específica de acordo com a semana em questão.
	</p>
</Section>

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

<ExtraPoints />
