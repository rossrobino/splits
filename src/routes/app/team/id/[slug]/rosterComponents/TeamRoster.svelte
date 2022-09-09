<script>
	import Card from "$lib/components/Card.svelte";
	import Table from "$lib/components/Table.svelte";
	import LoadingBar from "$lib/components/LoadingBar.svelte";
	import { supabase } from "$lib/modules/supabaseClient";
	import { team, userProfile } from "$lib/sessionStore";
	import StatusBadge from "./StatusBadge.svelte";
	import ActionButtons from "./ActionButtons.svelte";

	export let teamName = "";
	let roster = [];
	let loading = false;

	let userCoach = false;
	// $: userCoach = $userProfile.id === $team.coach;

	function parseContracts(contracts) {
		contracts.forEach((contract) => {
			let id = contract.profiles.id;
			let isCoach = id == $team.coach ? true : false;
			roster.push({
				name: `${contract.profiles.first_name} ${contract.profiles.last_name}`,
				id,
				username: contract.profiles.username,
				confirmed: contract.confirmed,
				isCoach,
			});
		});
		roster = roster;
	}

	async function getRoster(confirmed) {
		try {
			loading = true;
			const { data, error } = await supabase
				.from("teams")
				.select(
					`
						coach,
						team_name,
						id,
						contracts (
							confirmed,
							profiles (
								id,
								first_name,
								last_name,
								username
							)
						)
					`
				)
				.eq("team_name", teamName)
				.eq("contracts.confirmed", confirmed)
				.single();
			if (error) throw new Error(error.message);
			$team = data;
			if (confirmed) roster = [];
			parseContracts($team.contracts);
			userCoach = $userProfile.id === $team.coach;
			if (confirmed && userCoach) getRoster(false);
		} catch (error) {
			console.log(error.message);
		} finally {
			loading = false;
		}
	}

	$: if (teamName && $userProfile) getRoster(true);

	async function confirmContract() {
		console.log("confirmed!");
	}

	async function deleteContract() {
		console.log("deleted!");
	}
</script>

<Card title="Roster" class="my-4">
	{#if loading}
		<LoadingBar />
	{:else}
		<Table
			columnNames={userCoach
				? ["Name", "Username", "Status", "Action"]
				: ["Name", "Username"]}
		>
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
					{#if userCoach}
						<td>
							<StatusBadge confirmed={person.confirmed} />
						</td>
						<td>
							<ActionButtons
								confirmed={person.confirmed}
								confirmContract={() => confirmContract()}
								deleteContract={() => deleteContract()}
							/>
						</td>
					{/if}
				</tr>
			{/each}
		</Table>
	{/if}
</Card>
