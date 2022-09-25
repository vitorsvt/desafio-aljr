<script>
	import Section from './Section.svelte';
</script>

<Section title="Pontuação bônus">
	<p>
		Algumas atividades que ainda serão divulgadas ao longo do desafio valerão pontuação bônus.
		Outras já estão divulgadas abaixo:
	</p>
	<ul>
		<li>
			<h2>LEITURA DE LIVRO:</h2>
			<p>
				Comprove que neste desafio, com 10 semanas de oportunidades, você fez a leitura de um livro
				completo. Mande uma foto do livro e comente sobre sua leitura com o grupo para que seja
				validada sua pontuação bônus.
			</p>
		</li>
		<li>
			<h2>DOAÇÃO DE SANGUE:</h2>
			<p>Comprove que você doou sangue ao longo deste desafio.</p>
		</li>
		<li>
			<h2>TRILHA:</h2>
			<p>
				Comprove com fotos que neste desafio, ao longo das 10 semanas você fez uma trilha com
				duração mínima em torno de 3 horas.
			</p>
		</li>
		<li>
			<h2>A RECOMPENSA DO HÁBITO:</h2>
			<p>
				A recompensa aos disciplinados será em forma de pontuação bônus, caso não haja nenhuma
				falha, com variação nos pontos bônus de acordo com os títulos conquistados na semana.
			</p>
			<table>
				<thead>
					<tr>
						<th>Descrição</th>
						<th>Bônus</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Melhor ou igual a 8 medalhas</td>
						<td>300 pontos</td>
					</tr>
					<tr>
						<td>Melhor ou igual a 8 troféus</td>
						<td>500 pontos</td>
					</tr>
					<tr>
						<td>8 coroas</td>
						<td>700 pontos</td>
					</tr>
				</tbody>
			</table>
		</li>
	</ul>
</Section>

<style lang="scss">
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
