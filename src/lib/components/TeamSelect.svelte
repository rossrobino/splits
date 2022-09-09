<!-- 
    gets the teams that the profileId passed in has a contract with
    sets $currentTeams store with data
    controls which team is selected
-->
<script>
	import { supabase } from "$lib/modules/supabaseClient";
	import { currentTeams } from "$lib/sessionStore";
	import Table from "$lib/components/Table.svelte";
	import LoadingBar from "$lib/components/LoadingBar.svelte";

	export let profileId;
	let loading = false;
	let err = "";

	async function getContracts(pId) {
		try {
			loading = true;
			const { data, error } = await supabase
				.from("contracts")
				.select(
					`
				team_id,
				teams (
					team_name,
					coach,
					profiles (
						first_name,
						last_name
					)
				)
            	`
				)
				.eq("profile_id", pId);
			if (error) throw new Error(error.message);
			$currentTeams = [];
			data.forEach((team) => {
				$currentTeams.push({
					id: team.team_id,
					team_name: team.teams.team_name,
					coach: `${team.teams.profiles.first_name} ${team.teams.profiles.last_name}`,
					coach_id: team.teams.coach,
				});
			});
		} catch (error) {
			err = error.error_description || error.message;
		} finally {
			loading = false;
		}
	}

	$: if (profileId) getContracts(profileId);
</script>

{#if !loading && $currentTeams[0]}
	<Table columnNames={["Team", "Coach"]}>
		{#each $currentTeams as team}
			<tr>
				<td>
					<a
						href="/app/team/id/{team.team_name}"
						class="btn btn-primary lowercase font-bold"
					>
						#{team.team_name}
					</a>
				</td>
				<td>{team.coach}</td>
			</tr>
		{/each}
	</Table>
{:else if loading}
	<LoadingBar />
{/if}
