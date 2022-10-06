<script>
	import Table from "$lib/components/Table.svelte";
	import LoadingBar from "$lib/components/LoadingBar.svelte";
	import { supabase } from "$lib/modules/supabaseClient";
	import { team, userProfile } from "$lib/sessionStore";
	import StatusBadge from "./StatusBadge.svelte";
	import ActionButtons from "./ActionButtons.svelte";
	import JoinTeamButton from "./JoinTeamButton.svelte";
	import LeaveTeamButton from "./LeaveTeamButton.svelte";
	import { goto } from "$app/navigation";

	export let teamName = "";
	let roster = [];
	let loading = true;
	let userCoach = false;

	async function checkUserCoach() {
		try {
			const { data, error } = await supabase
				.from("teams")
				.select("coach")
				.eq("team_name", teamName)
				.single();
			if (error) throw new Error(error.message);
			userCoach = $userProfile.id === data.coach;
		} catch (error) {
			console.log(error);
		}
	}

	async function getRoster() {
		let matchArg = userCoach ? {} : { "contracts.confirmed": true };
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
						id,
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
				.match(matchArg)
				.single();
			if (error) throw new Error(error.message);
			$team = data;
			roster = [];
			parseContracts($team.contracts);
		} catch (error) {
			console.log(error.message);
		} finally {
			loading = false;
		}
	}

	function parseContracts(contracts) {
		contracts.forEach((contract) => {
			let id = contract.profiles.id;
			let isCoach = id == $team.coach ? true : false;
			roster.push({
				contractId: contract.id,
				name: `${contract.profiles.first_name} ${contract.profiles.last_name}`,
				id,
				username: contract.profiles.username,
				confirmed: contract.confirmed,
				isCoach,
			});
		});
		roster = roster;
	}

	async function confirmContract(person) {
		try {
			const { data, error } = await supabase
				.from("contracts")
				.update({ confirmed: true })
				.eq("id", person.contractId);
			if (error) throw new Error(error.message);
			person.confirmed = true;
			roster = roster;
		} catch (error) {
			console.log(error.message);
		}
	}

	async function deleteContract(person) {
		try {
			const { data, error } = await supabase
				.from("contracts")
				.delete()
				.eq("id", person.contractId);
			if (error) throw new Error(error.message);
			const i = roster.findIndex((item) => {
				return item.id === person.id;
			});
			roster.splice(i, 1);
			roster = roster;
		} catch (error) {
			console.log(error.message);
		}
	}

	async function getData(user) {
		if (user) {
			await checkUserCoach();
			await getRoster();
		}
	}

	$: getData($userProfile.id);

	function rowClick(url) {
		goto(url);
	}
</script>

{#if !loading}
	<Table
		columnNames={userCoach ? ["Name", "Status", "Action"] : ["Name"]}
		class="mb-4"
	>
		{#if !loading}
			{#each roster as person}
				<tr class=" group">
					<th
						class="group-hover:bg-base-300 transform transition duration-250 cursor-pointer"
						on:click={() =>
							rowClick(`/app/profile/${person.username}`)}
					>
						<span class="font-bold">{person.name}</span>
						<br />
						<a
							href="/app/profile/{person.username}"
							class="badge badge-secondary badge-sm"
						>
							@{person.username}
						</a>
						{#if person.isCoach}
							<span class="badge badge-primary badge-sm">
								coach
							</span>
						{/if}
					</th>
					{#if userCoach}
						<td
							class="group-hover:bg-base-300 transform transition duration-250"
						>
							<StatusBadge confirmed={person.confirmed} />
						</td>
						<td
							class="group-hover:bg-base-300 transform transition duration-250"
						>
							<ActionButtons
								confirmed={person.confirmed}
								isCoach={person.isCoach}
								confirmContract={() => confirmContract(person)}
								deleteContract={() => deleteContract(person)}
							/>
						</td>
					{/if}
				</tr>
			{/each}
		{/if}
	</Table>
	<JoinTeamButton {roster} />
	<LeaveTeamButton {userCoach} />
{:else}
	<LoadingBar />
{/if}
