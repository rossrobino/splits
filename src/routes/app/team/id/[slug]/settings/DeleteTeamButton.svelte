<script>
	import { supabase } from "$lib/modules/supabaseClient";
	import { goto } from "$app/navigation";
	import { clickOutside } from "$lib/modules/utilities/clickOutside";

	export let teamName = "";
	export let teamId = "";
	let loading = false;
	let warning = false;

	async function deleteContracts() {
		try {
			const { data, error } = await supabase
				.from("contracts")
				.delete()
				.match({ team_id: teamId });
			if (error) throw new Error(error.message);
		} catch (error) {
			console.log(error.message);
		}
	}

	async function deleteTeam() {
		try {
			const { data, error } = await supabase
				.from("teams")
				.delete()
				.eq("team_name", teamName);
			if (error) throw new Error(error.message);
		} catch (error) {
			console.log(error.message);
		} finally {
			loading = false;
		}
	}

	async function handleClick() {
		if (warning) {
			await deleteContracts();
			await deleteTeam();
			goto("/app/team");
		} else {
			warning = true;
		}
	}

	function blur() {
		warning = false;
	}
</script>

<button
	class="btn {warning ? 'btn-warning' : 'btn-error'}"
	class:loading
	on:click={handleClick}
	use:clickOutside={blur}
>
	Delete Team
</button>
