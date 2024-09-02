<script>
	import Section from './Section.svelte';
</script>

<Section title="Metodologia">
	<p>
		<b>Atividades:</b> cada atividade é opcional e vale uma determinada pontuação para o participante. As atividades realizadas deverão ser comprovadas.
	</p>

	<p>
		<b>Meta de pontuação do desafio:</b> a meta de pontuação a ser alcançada ao final do desafio é de 10.000 pontos
	</p>
</Section>

<Section title="Pontuação em Treinos de Artes Marciais">
	<p>
		A pontuação de cada treino de artes marciais é conforme determinação abaixo:
	</p>

	<table>
		<thead>
			<tr>
				<th>Modalidade</th>
				<th>Pontuação</th>
			</tr>
		</thead>
		<tbody>
			<tr><td>KRAV MAGA</td><td>550 pontos</td></tr>
			<tr><td>AULA 6AM</td><td>450 pontos</td></tr>
			<tr><td>JUDÔ</td><td>450 pontos</td></tr>
			<tr><td>MUAY THAI/BOXE/KICKBOXING/PARTICULAR</td><td>400 pontos</td></tr>
			<tr><td>TREINO VIP PASS</td><td>250 pontos</td></tr>
			<tr><td>SPARRING</td><td>200 pontos</td></tr>
		</tbody>
	</table>

	<ul>

	</ul>
</Section>

<Section title="Pontuação bônus">
	<p>
		As outras atividades que valem pontuação estão descritas nos próximos tópicos. O participante deverá manter seu controle de pontuação com as devidas comprovações (fotos, vídeos, prints de atividades) e enviar no grupo conforme for executada cada atividade. A pontuação de cada atividade está disposta na sequência deste regulamento.
	</p>
	<ul>
		<li>
			<h2>TREINO BÔNUS:</h2>
			<p>
				Qualquer treino (além de artes marciais) que possa ser comprovado, que tenha duração mínima de em torno de 40 minutos, por exemplo: musculação, funcional, crossfit, dança, futebol, vôlei, futevôlei, basquete, beach tennis, pilates, etc.
			</p>
			<p>
				<i>Comprove que você treinou com timelapse, vídeo ou poste foto/selfie logo após seu treino</i>
			</p>
			<p><b>Cada treino = 250 pontos</b></p>
		</li>
		<li>
			<h2>LEITURA DE LIVRO:</h2>
			<p>
				Comprove que neste desafio, durante o mês de setembro,
				você fez a leitura de um livro completo. Mande uma foto do livro e comente sobre
				sua leitura com o grupo para que seja validada sua pontuação.
			</p>
			<p><b>Leitura de apenas 1 livro durante o desafio todo = 250 pontos</b></p>
		</li>
		<li>
			<h2>DOAÇÃO DE SANGUE:</h2>
			<p>
				Comprove que você doou sangue alguma vez dentro
				do período do desafio. Caso você esteja no intervalo de doação por todo o
				desafio, anexe o comprovante da última doação que sua pontuação será
				validada.
			</p>
			<p><b>Pontuação única = 250 pontos</b></p>
		</li>
		<li>
			<h2>TRILHA:</h2>
			<p>
				comprove com fotos que neste desafio, ao longo deste desafio você fez
				uma trilha com duração mínima em torno de 1 hora. A trilha pode ser a pé ou de
				bicicleta.
			</p>
			<p><b>Pontuação válida para apenas 1 trilha = 250 pontos</b></p>
		</li>
		<li>
			<h2>DURAÇÃO MÉDIA DO SONO:</h2>
			<p>
				Comprove com aplicativo que ao longo deste
				desafio, você teve uma duração média de sono superior a 7 horas.
			</p>
			<p><b>Pontuação única = 250 pontos</b></p>
		</li>
	</ul>
</Section>

<style lang="scss">
	b {
		font-weight: bold;
	}

	ul {
		list-style-type: disc;
		margin-left: 1rem;
	}

	li {
		padding: 0.5rem 0;
	}

	h2 {
		font-weight: bold;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
	}

	th {
		background-color: var(--light-gray);
	}

	td,
	th {
		border: 1px solid;
		text-align: center;
		padding: 0.5rem;
	}
</style>
