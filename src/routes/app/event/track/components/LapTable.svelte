<script>
	import { athletes } from "$lib/sessionStore";
	import { msToTime } from "$lib/modules/utilities/msToTime";
	import Table from "$lib/components/Table.svelte";
	import FinishButton from "./FinishButton.svelte";

	let columnNames = ["Athlete"];
	let totalLaps = 0;
	$: {
		columnNames = ["Athlete"];
		totalLaps = 0;
		$athletes.forEach((athlete) => {
			if (athlete.laps.length > totalLaps) {
				totalLaps = athlete.laps.length;
			}
		});
		for (let index = 0; index < totalLaps; index++) {
			columnNames.push(`Lap ${index + 1}`);
		}
		columnNames = columnNames;
	}
</script>

{#if totalLaps > 0}
	<Table {columnNames} class="mb-4">
		{#each $athletes as athlete}
			<tr>
				<th>{athlete.first_name} {athlete.last_name}</th>
				{#each [...Array(totalLaps).keys()] as i}
					<td>
						{#if athlete.laps[i]}
							{msToTime(athlete.laps[i])}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</Table>
	<FinishButton />
{/if}
