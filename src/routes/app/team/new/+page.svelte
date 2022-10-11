<script>
	import { goto } from "$app/navigation";
	import { title, newTeamTag } from "$lib/modules/info";
	import PageHeader from "$lib/components/PageHeader.svelte";
	import AlertError from "$lib/components/AlertError.svelte";
	import { supabase } from "$lib/modules/supabaseClient";
	import { userProfile } from "$lib/sessionStore";

	let teamName = "";
	let submitTeamName = "";
	$: submitTeamName = teamName.toLowerCase().replace(/\s+/g, "");
	let loading = false;
	let alert = "";
	let team = {};

	let teamNameFocus = false;
	const onFocus = (toggle) => {
		toggle = true;
	};
	const onBlur = (toggle) => {
		toggle = false;
	};

	async function handleSubmit() {
		await createTeam();
		await createContract();
		goto(`/app/team/id/${team.team_name}`);
	}

	async function createTeam() {
		try {
			loading = true;
			alert = "";
			const { data, error } = await supabase
				.from("teams")
				.insert([
					{
						team_name: submitTeamName,
						coach: $userProfile.id,
					},
				])
				.select()
				.single();
			if (error) throw new Error(error.message);
			team = data;
		} catch (error) {
			alert = error.message;
		} finally {
			loading = false;
		}
	}

	async function createContract() {
		try {
			loading = true;
			const { data, error } = await supabase.from("contracts").insert([
				{
					team_id: team.id,
					profile_id: $userProfile.id,
					confirmed: true,
				},
			]);
			if (error) throw new Error(error.message);
		} catch (error) {
			alert = error.message;
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>{title} - New Team</title>
	<meta name="description" content={newTeamTag} />
</svelte:head>

<PageHeader>
	<span slot="h1">New Team</span>
	<span slot="h2">{newTeamTag}</span>
</PageHeader>
<form
	class="form-control w-full max-w-sm"
	on:submit|preventDefault={handleSubmit}
>
	<label for="teamName" class="label">
		<span class="label-text">Team Name</span>
		<span class="label-text-alt">
			{#if teamName}
				#{submitTeamName}
			{/if}
		</span>
	</label>
	<div
		class="input input-bordered input-secondary {teamNameFocus
			? 'inputOutline'
			: ''} w-full max-w-sm"
	>
		#<input
			class="h-full w-[90%] focus:outline-0 bg-base-100"
			style="outline: 0 !important;"
			id="teamName"
			type="text"
			minlength="2"
			maxlength="40"
			pattern={String.raw`^[a-zA-Z0-9-]+`}
			title="Letters, numbers, and dashes only."
			placeholder="team"
			on:focus={() => onFocus(teamNameFocus)}
			on:blur={() => onBlur(teamNameFocus)}
			bind:value={teamName}
			required
		/>
	</div>
	<label for="teamName" class="label mb-3">
		<span class="label-text-alt">
			You will be the coach of your new team.
		</span>
	</label>

	{#if loading}
		<button class="btn loading">Loading</button>
	{:else}
		<input type="submit" value="Submit" class="btn btn-secondary mb-4" />
	{/if}

	{#if alert === 'duplicate key value violates unique constraint "teams_team_name_key"'}
		<AlertError error="team name is unavailable" />
	{:else if alert}
		<AlertError error={alert} />
	{/if}
</form>
