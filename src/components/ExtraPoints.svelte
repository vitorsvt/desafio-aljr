<script>
	import Section from './Section.svelte';
</script>

<Section title="Metodologia">
	<p>
		<b>Atividades:</b> cada atividade é opcional e vale uma determinada pontuação para o participante. As atividades realizadas deverão ser comprovadas.
	</p>

	<p>
		<b>Meta de pontuação do desafio:</b> 15.000 pontos. Ao alcançar esta pontuação, o participante ganha um número para concorrer aos prêmios da rifa. A cada 1.000 pontos a mais, ganha mais um número para a rifa.
	</p>
</Section>

<Section title="Pontuação bônus">
	<p>
		As outras atividades que valem pontuação estão descritas nos próximos tópicos. O participante deverá manter seu controle de pontuação com as devidas comprovações (fotos, vídeos, prints de atividades) e enviar no grupo conforme for executada cada atividade. A pontuação de cada atividade está disposta na sequência deste regulamento.
	</p>
	<ul>
                <li>
                        <h2>TREINO DE ARTES MARCIAIS:</h2>
			<p>
				<i>Comprove com foto/vídeo seu treino de artes marciais. Não é necessário reenviar foto do treino coletivo, no caso de outro participante já ter enviado. Apenas responda a imagem atualizando seu controle.</i>
			</p>
			<p><b>Cada treino = 300 pontos</b></p>
                </li>
		<li>
			<h2>TREINO BÔNUS:</h2>
			<p>
				Qualquer treino (além de artes marciais) que possa ser comprovado, que tenha duração mínima em torno de 40 minutos, por exemplo: musculação, funcional, crossfit, dança, futebol, vôlei, futevôlei, basquete, beach tennis, pilates, motocross, etc.
			</p>
			<p>
				<i>Comprove que você treinou com timelapse, vídeo ou poste foto/selfie logo após seu treino</i>
			</p>
			<p><b>Cada treino = 200 pontos</b></p>
		</li>
		<li>
			<h2>LEITURA DE LIVRO:</h2>
			<p>
				<i>Comprove que durante todo o período deste desafio, você fez a leitura de um livro completo. Mande uma foto do livro e comente sobre sua leitura com o grupo para que seja validada sua pontuação.</i>
			</p>
			<p><b>Leitura de apenas 1 livro durante o desafio todo = 500 pontos</b></p>
		</li>
		<li>
			<h2>DOAÇÃO DE SANGUE:</h2>
			<p>
				<i>Comprove que você doou sangue alguma vez dentro
				do período do desafio. Caso você esteja no intervalo de doação por todo o
				desafio, anexe o comprovante da última doação que sua pontuação será
				validada.</i>
			</p>
			<p><b>Pontuação única = 1000 pontos</b></p>
		</li>
		<li>
			<h2>TRILHA:</h2>
			<p>
				<i>Comprove com fotos que neste desafio você fez uma trilha com duração mínima em torno de 1 hora. A trilha pode ser a pé ou de bicicleta. O trajeto da sua caminhada/corrida/pedal na trilha também será considerado, sendo acrescido os 250 pontos bônus por ter sido realizado em trilha.</i>
			</p>
			<p><b>Pontuação válida para apenas 1 trilha = 500 pontos</b></p>
		</li>
		<li>
			<h2>DURAÇÃO MÉDIA DO SONO:</h2>
			<p>
				<i>Comprove com aplicativo que ao longo deste
				desafio, você teve uma duração média de sono superior a 7 horas.</i>
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
