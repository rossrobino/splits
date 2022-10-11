<script>
	import { page } from "$app/stores";
	import { title, teamSettingsTag } from "$lib/modules/info";
	import PageHeader from "$lib/components/PageHeader.svelte";
	import AlertError from "$lib/components/AlertError.svelte";
	import DeleteTeamButton from "./DeleteTeamButton.svelte";
	import { supabase } from "$lib/modules/supabaseClient";
	import { onMount } from "svelte";

	const teamName = $page.params.slug;
	let loading = false;
	let alert = "";
	let newTeamName;
	let teamId = "";
	let err = "";

	async function getTeamId() {
		try {
			const { data, error } = await supabase
				.from("teams")
				.select("id")
				.eq("team_name", teamName)
				.single();
			if (error) throw new Error(error.message);
			teamId = data.id;
		} catch (error) {
			err = error.message;
		}
	}

	async function updateTeam() {
		if (newTeamName) {
			newTeamName = newTeamName.toLowerCase().replace(/\s+/g, "");
			try {
				loading = true;
				const updates = { team_name: newTeamName };
				const { data, error } = await supabase
					.from("teams")
					.update(updates)
					.eq("team_name", teamName);
				if (error) throw new Error(error.message);
				window.location.href = `/app/team/id/${newTeamName}`;
			} catch (error) {
				alert = error.description || error.message;
			} finally {
				loading = false;
			}
		}
	}

	// controls the focus outline of the wrapper div for @ prefix
	let teamNameFocus = false;
	const onFocus = (toggle) => {
		toggle = true;
	};
	const onBlur = (toggle) => {
		toggle = false;
	};

	onMount(async () => {
		getTeamId();
	});
</script>

<svelte:head>
	<title>{title} - #{teamName}</title>
	<meta name="description" content={teamSettingsTag} />
</svelte:head>

{#if teamId}
	<PageHeader>
		<span slot="h1">#{teamName}</span>
		<span slot="h2">{teamSettingsTag}</span>
	</PageHeader>
	<form
		on:submit|preventDefault={updateTeam}
		class="form-control w-full max-w-sm mb-6"
	>
		<label for="teamName" class="label">
			<span class="label-text">Team Name</span>
			<span class="label-text-alt">
				#{teamName}
			</span>
		</label>
		<div
			class="input input-bordered input-accent {teamNameFocus
				? 'inputOutline'
				: ''} w-full max-w-sm mb-3"
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
				placeholder="new team name"
				on:focus={() => onFocus(teamNameFocus)}
				on:blur={() => onBlur(teamNameFocus)}
				bind:value={newTeamName}
			/>
		</div>

		{#if loading}
			<button class="btn loading mt-3">Loading</button>
		{:else}
			<input type="submit" value="Submit" class="btn btn-accent mt-3" />
		{/if}

		{#if alert}
			{#if alert == 'duplicate key value violates unique constraint "teams_team_name_key"'}
				<AlertError error="team name is unavailable" class="mt-6" />
			{:else}
				<AlertError error={alert} class="mt-6" />
			{/if}
		{/if}
	</form>

	<DeleteTeamButton {teamName} {teamId} />
{/if}

{#if err}
	<AlertError error="team not found" class="mt-6" />
{/if}
