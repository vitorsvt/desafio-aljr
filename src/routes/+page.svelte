<script>
	import SprawlCalculator from '../components/calculator/SprawlCalculator.svelte';
	import BurpeeCalculator from '../components/calculator/BurpeeCalculator.svelte';
	import SwimCalculator from '../components/calculator/SwimCalculator.svelte';
	import RunCalculator from '../components/calculator/RunCalculator.svelte';
	import BikeCalculator from '../components/calculator/BikeCalculator.svelte';
	import Section from '../components/Section.svelte';
	import ExtraPoints from '../components/ExtraPoints.svelte';
</script>

<Section title="O Desafio">
	<p>
		Esta é a 11ª edição do DESAFIO ALJR. O desafio é uma competição, sobretudo 
		consigo mesmo, sendo você o seu principal adversário na luta contra maus hábitos e 
		buscando os substituir por melhores.
	</p>

	<p>
		Este é um desafio individual e exclusivo aos alunos ALJR, sendo um dos objetivos 
		o de melhorar a disciplina, compromisso e consistência de todos os alunos em relação 
		aos treinos de artes marciais, motivando-os a aumentar a frequência nas aulas, bem 
		como incentivar a realizar outras atividades, como corrida, pedalada, natação, etc.
	</p>

	<p>
		Cada treino feito ou atividade proposta realizada vale uma determinada
		pontuação. Ao final do desafio, haverá premiação especial aos três primeiros 
		colocados e a todos que alcançarem a meta de pontuação do desafio.
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