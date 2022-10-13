<script>
	import { supabase } from "$lib/modules/supabaseClient";
	import { onTeam, requestSent, myContractId, userProfile, team } from "$lib/sessionStore";
	import AlertError from "$lib/components/AlertError.svelte";

	export let roster = [];
	let loading = false;
	let alert = "";
	let myContract;
	$: $requestSent = myContract ? true : false;
	$: $myContractId = myContract ? myContract.id : "";

	$: {
		if ($userProfile.id && roster[0]) checkRequest();
	}

	async function checkOnTeam() {
		roster.forEach((person) => {
			if (person.id === $userProfile.id) {
				$onTeam = true;
			}
		});
	}

	async function checkRequest() {
		await checkOnTeam();
		if ($userProfile.id) {
			try {
				const { data, error } = await supabase
					.from("contracts")
					.select(`team_id, profile_id, id, confirmed`)
					.match({
						team_id: $team.id,
						profile_id: $userProfile.id,
					});
				if (error) throw new Error(error.message);
				myContract = data[0];
			} catch (error) {
				console.log(error.message);
			}
		}
	}

	async function submitRequest() {
		try {
			loading = true;
			const { data, error } = await supabase.from("contracts").insert([
				{
					team_id: $team.id,
					profile_id: $userProfile.id,
				},
			]);
			if (error) throw new Error(error.message);
			$requestSent = true;
		} catch (error) {
			alert = error.message;
		} finally {
			loading = false;
			checkRequest();
		}
	}
</script>

{#if !$onTeam && !$requestSent}
	<button class="btn w-full max-w-md" class:loading on:click={submitRequest}> Join Team </button>
{:else if !$onTeam || ($requestSent && !myContract.confirmed)}
	<div class="btn btn-disabled w-full max-w-md">Request Sent</div>
{/if}

{#if alert}
	<AlertError error={alert} />
{/if}
