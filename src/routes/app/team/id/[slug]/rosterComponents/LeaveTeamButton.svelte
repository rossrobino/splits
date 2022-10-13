<script>
	import { supabase } from "$lib/modules/supabaseClient";
	import { onTeam, requestSent, myContractId } from "$lib/sessionStore";
	import { clickOutside } from "$lib/modules/utilities/clickOutside";

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
		class="btn block w-full max-w-sm mt-4"
		class:loading
		class:btn-warning={warning}
		use:clickOutside={blur}
		on:click={leaveTeam}
	>
	{#if !$onTeam && $requestSent}
		Delete Request
	{:else}
		Leave Team
	{/if}
	</button>
{/if}
