<script>
	import { supabase } from "$lib/modules/supabaseClient";
	import { userProfile, athletes, guests, rest } from "$lib/sessionStore";
	import { onMount } from "svelte";
	import Table from "$lib/components/Table.svelte";
	import LoadingBar from "$lib/components/LoadingBar.svelte";

	let loading = false;
	let teams = [];
	let orString = "";
	let userSelected = true;

	async function getTeamIds() {
		try {
			const { data, error } = await supabase
				.from("contracts")
				.select(`team_id, teams(team_name)`)
				.eq("profile_id", $userProfile.id);
			if (error) throw new Error(error.message);
			data.forEach((team) => {
				teams.push({
					id: team.team_id,
					name: team.teams.team_name,
					selected: false,
					expanded: false,
				});
			});
		} catch (error) {
			console.log(error.message);
		}
	}

	async function getAthletes() {
		try {
			// creates argument for .or() modifier
			teams.forEach((team) => {
				orString += `team_id.eq.${team.id},`;
			});
			orString = orString.slice(0, -1); // removes last comma
			// select athletes on teams that user is apart of
			const { data, error } = await supabase
				.from("contracts")
				.select(
					`
					team_id,
					profiles(
						id,	
						first_name,
						last_name,
						username
					)
					`
				)
				.or(orString);
			if (error) throw new Error(error.message);
			teams.forEach((team) => {
				team.athletes = [];
				data.forEach((contract) => {
					if (team.id === contract.team_id) {
						team.athletes.push({
							id: contract.profiles.id,
							guestId: null,
							first_name: contract.profiles.first_name,
							last_name: contract.profiles.last_name,
							username: contract.profiles.username,
							selected: false,
							resting: true,
							laps: [],
						});
					}
				});
			});
			teams = teams;
		} catch (error) {
			console.log(error.message);
		}
	}

	onMount(async () => {
		loading = true;
		await getTeamIds();
		await getAthletes();
		loading = false;
	});

	function selectTeam(team) {
		if (!team.selected) {
			team.athletes.forEach((athlete) => {
				athlete.selected = true;
			});
		} else {
			team.athletes.forEach((athlete) => {
				athlete.selected = false;
			});
		}
	}

	$: {
		$athletes = [];
		let uid = 0;
		if (teams[0]) {
			teams.forEach((team) => {
				team.athletes.forEach((athlete) => {
					if (athlete.selected) {
						let alreadyAdded = false;
						$athletes.forEach((addedAthlete) => {
							if (addedAthlete.id === athlete.id) {
								alreadyAdded = true;
							}
						});
						if (!alreadyAdded) {
							athlete.uid = uid++;
							$athletes.push(athlete);
						}
					}
				});
			});
		} else {
			if (userSelected) {
				$athletes.push({
					id: $userProfile.id,
					guestId: null,
					first_name: $userProfile.first_name,
					last_name: $userProfile.last_name,
					username: $userProfile.username,
					selected: true,
					resting: true,
					laps: [],
					uid: uid++,
				});
			}
		}

		$guests.forEach((guest) => {
			if (guest.selected) {
				guest.uid = uid++;
				$athletes.push(guest);
			}
		});
	}
</script>

<Table columnNames={["", "Select Participants", ""]} class="mb-4">
	{#if loading}
		<tr>
			<td />
			<td><LoadingBar /></td>
			<td />
		</tr>
	{:else if teams[0]}
		{#each teams as team}
			<tr>
				<th class="w-4" class:bg-base-300={team.expanded}>
					<input
						type="checkbox"
						bind:checked={team.selected}
						on:click={() => selectTeam(team)}
						class="checkbox sm:checkbox-lg checkbox-primary"
					/>
				</th>
				<td
					class="font-bold hover:cursor-pointer"
					class:bg-base-300={team.expanded}
					on:click={() => {
						team.expanded = !team.expanded;
					}}
				>
					#{team.name}
				</td>
				<td
					class="hover:cursor-pointer w-16"
					class:bg-base-300={team.expanded}
					on:click={() => {
						team.expanded = !team.expanded;
					}}
				>
					{#if team.expanded}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M4.5 15.75l7.5-7.5 7.5 7.5"
							/>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 8.25l-7.5 7.5-7.5-7.5"
							/>
						</svg>
					{/if}
				</td>
			</tr>
			{#if team.expanded}
				{#each team.athletes as athlete}
					<tr>
						<th>
							<input
								type="checkbox"
								bind:checked={athlete.selected}
								class="checkbox checkbox-secondary sm:checkbox-lg"
							/>
						</th>
						<td>
							<span>
								{athlete.first_name}
								{athlete.last_name}
							</span>
						</td>
						<td>@{athlete.username}</td>
					</tr>
				{/each}
			{/if}
		{/each}
	{:else}
		<tr>
			<th>
				<input
					type="checkbox"
					class="checkbox checkbox-secondary sm:checkbox-lg"
					bind:checked={userSelected}
				/>
			</th>
			<td>
				<span>
					{$userProfile.first_name}
					{$userProfile.last_name}
				</span>
			</td>
			<td>@{$userProfile.username}</td>
		</tr>
	{/if}
</Table>
