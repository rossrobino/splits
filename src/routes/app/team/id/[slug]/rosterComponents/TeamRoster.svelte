<script>
	import Card from "$lib/components/Card.svelte";
	import Table from "$lib/components/Table.svelte";
	import LoadingBar from "$lib/components/LoadingBar.svelte";
	import { supabase } from "$lib/modules/supabaseClient";
	import { team, userProfile } from "$lib/sessionStore";
	import StatusBadge from "./StatusBadge.svelte";
	import ActionButtons from "./ActionButtons.svelte";
	import { onMount } from "svelte";

	export let teamName = "";
	let roster = [];
	let loading = false;
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
				.eq("id", person.contractId)
				.select();
			if (error) throw new Error(error.message);
			console.log(data);
			roster = roster;
		} catch (error) {
			console.log(error.message);
		}
	}

	onMount(async () => {
		checkUserCoach();
		getRoster();
	});
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
								isCoach={person.isCoach}
								confirmContract={() => confirmContract(person)}
								deleteContract={() => deleteContract(person)}
							/>
						</td>
					{/if}
				</tr>
			{/each}
		</Table>
	{/if}
</Card>
