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
	import { goto } from "$app/navigation";

	export let profileId;
	let loading = false;

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
						last_name,
						username
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
					coach_username: team.teams.profiles.username,
				});
			});
		} catch (error) {
			console.log(error.message);
		} finally {
			loading = false;
		}
	}

	// called this way to await prop assignment, onMount did not work
	$: if (profileId) getContracts(profileId);

	function rowClick(url) {
		goto(url);
	}
</script>

<div class="mb-4">
	{#if !loading && $currentTeams[0]}
		<Table columnNames={["Team", "Coach"]}>
			{#each $currentTeams as team}
				<tr
					on:click={() => rowClick(`/app/team/id/${team.team_name}`)}
					class="cursor-pointer group"
				>
					<th class="group-hover:bg-base-300 transform transition duration-250">
						#{team.team_name}
					</th>
					<td class="group-hover:bg-base-300 transform transition duration-250">
						<span>{team.coach}</span>
						<br />
						<a
							href="/app/profile/{team.coach_username}"
							class="badge badge-secondary badge-sm"
						>
							@{team.coach_username}
						</a>
					</td>
				</tr>
			{/each}
		</Table>
	{:else if loading}
		<LoadingBar />
	{/if}
</div>
