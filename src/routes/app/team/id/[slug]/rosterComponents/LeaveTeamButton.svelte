<script>
	import { supabase } from "$lib/modules/supabaseClient";
	import { onTeam, requestSent, myContractId } from "$lib/sessionStore";

	export let userCoach = false;
	let loading = false;
	let warning = false;

	async function leaveTeam() {
		if (warning) {
			try {
				loading = true;
				const { data, error } = await supabase
					.from("contracts")
					.delete()
					.match({ id: $myContractId });
				if (error) throw new Error(error.message);
				window.location.href = "/app/team";
			} catch (error) {
				console.log(error.message);
			} finally {
				loading = false;
			}
		} else {
			warning = true;
		}
	}

	function blur() {
		warning = false;
	}
</script>

{#if !userCoach && ($onTeam || (!$onTeam && $requestSent))}
	<button
		class="btn"
		class:loading
		class:btn-warning={warning}
		on:blur={blur}
		on:click={leaveTeam}
	>
	{#if !$onTeam && $requestSent}
		Delete Request
	{:else}
		Leave Team
	{/if}
	</button>
{/if}
