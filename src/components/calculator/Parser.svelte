<script lang="ts">
	import { z } from 'zod';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import { reporter, ValidationMessage } from '@felte/reporter-svelte';

	import * as FileSaver from 'file-saver';
	import * as XLSX from 'xlsx';

	const schema = z.object({
		activities: z.string()
	});

	interface Activity {
		date: string;
		activity: string;
		points: string | number;
	}

	interface Result {
		name: string;
		activities: Activity[];
		inputTotal: number;
		calculatedTotal: number;
	}

	function parseText(text: string) {
		const results: Result[] = [];
		let result: Result | undefined;
		let date = '';

		const lines = text.split('\n');

		const regexLine = /^(?:(\d{2}\/\d{2}))?\s*(.*?)\s*([\d.]+)$/;
		const regexDate = /^(\d{2}\/\d{2})$/;

		for (const rawLine of lines) {
			let line = rawLine.replace(/[`~!@#$%^&*()_|+\-=?;:'"<>•\{\}\[\]\\]/gi, '');
			line = line.replace(/\s*(pts|pt|p|pontos|ponto)\b/gi, '');
			line = line.replace(/\u00A0/, ' ');
			line = line.replace(/\s\s+/g, ' ');
			line = line.trim();
			line = line.toLowerCase();
			line = line.replace(/[.,](?=\d{3})/g, '');
			line = line.replace(/(?<=\d),(?=\d)/g, '.');

			if (line === '') continue;

			if (line.startsWith('nome')) {
				result = {
					name: '',
					activities: [],
					inputTotal: 0,
					calculatedTotal: 0
				};
				result.name = line.substring(5).trim();
				continue;
			}

			if (line.startsWith('total') && result) {
				result.inputTotal = parseFloat(line.substring(6).trim());
				results.push(result);
				result = undefined;
				continue;
			}

			if ((line.includes('controle de pontuação') || line.includes('desafio aljr')) && result) {
				results.push(result);
				result = undefined;
			}

			const matchDate = line.match(regexDate);
			if (matchDate) {
				date = matchDate[1];
				continue;
			}

			const match = line.match(regexLine);
			if (match && result) {
				const [, newDate, activity, scoreString] = match;

				if (newDate) {
					date = newDate;
				}

				const points = parseFloat(scoreString);
				if (date && activity.trim() !== '' && !isNaN(points)) {
					result.calculatedTotal += points;
					result.activities.push({
						activity: activity.trim(),
						points: points,
						date: date
					});
				}
				continue;
			}
		}

		console.log(results);

		const participants = results.map(({ name, inputTotal, calculatedTotal }, i) => {
			return {
				ID: i + 1,
				Participante: name,
				'Total Inserido': inputTotal,
				'Total Calculado': calculatedTotal
			};
		});
		const participantsWorksheet = XLSX.utils.json_to_sheet(participants);

		const activities = results.flatMap(({ name, activities }, i) => {
			const rows = activities.map(({ activity, date, points }) => {
				return { ID: i + 1, Participante: name, Data: date, Atividade: activity, Pontos: points };
			});
			return rows;
		});
		const activitiesWorksheet = XLSX.utils.json_to_sheet(activities);

		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, participantsWorksheet, 'Participantes');
		XLSX.utils.book_append_sheet(workbook, activitiesWorksheet, 'Atividades');

		const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		const fileData = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
		});
		FileSaver.saveAs(fileData, 'Desafio ALJR.xlsx');
	}

	const { form } = createForm<z.infer<typeof schema>>({
		onSubmit: async (values) => {
			const { activities } = schema.parse(values);
			parseText(activities);
		},
		extend: [validator({ schema }), reporter]
	});
</script>

<form use:form>
	<label>
		Lista de atividades:
		<ValidationMessage for="activities" let:messages={message}>
			<span>{message || ''}</span>
		</ValidationMessage>
		<textarea rows="10" name="activities" placeholder="Texto com atividades e pontuação" />
	</label>
	<button type="submit">Processar e baixar</button>
</form>

<style lang="scss" src="./Calculator.scss"></style>
