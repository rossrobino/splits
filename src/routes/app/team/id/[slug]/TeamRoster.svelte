<script>
	import Card from "$lib/components/Card.svelte";
	import Table from "$lib/components/Table.svelte";
	import LoadingBar from "$lib/components/LoadingBar.svelte";
	import { supabase } from "$lib/modules/supabaseClient";
	import { team } from "$lib/sessionStore";

	export let teamName = "";
	let roster = [];

	async function getRoster(team_name) {
		const { data, error } = await supabase
			.from("teams")
			.select(
				`
				coach,
				team_name,
				id,
				contracts (
					profiles (
						id,
						first_name,
						last_name,
						username
                	)
				)
            `
			)
			.eq("team_name", team_name);
		if (error) throw new Error(error.message);
		$team = data[0];
		roster = [];
		$team.contracts.forEach((contract) => {
			let id = contract.profiles.id;
			let isCoach = id == $team.coach ? true : false;
			roster.push({
				name: `${contract.profiles.first_name} ${contract.profiles.last_name}`,
				id,
				username: contract.profiles.username,
				isCoach,
			});
		});
		roster = roster;
	}

	$: if (teamName) getRoster(teamName);
</script>

<Card title="Roster" class="my-4">
	{#if roster[0]}
		<Table columnNames={["Name", "Username"]}>
			{#each roster as person}
				<tr>
					<td>
						<span class="font-bold">{person.name}</span>
						{#if person.isCoach}
							<br />
							<span class="badge badge-secondary badge-sm"
								>coach</span
							>
						{/if}
					</td>
					<td>
						<a
							href="/app/profile/{person.username}"
							class="btn btn-primary btn-sm text-base lowercase"
						>
							@{person.username}
						</a>
					</td>
				</tr>
			{/each}
		</Table>
	{:else}
		<LoadingBar />
	{/if}
</Card>
