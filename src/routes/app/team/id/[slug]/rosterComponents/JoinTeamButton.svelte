<script>
	import AlertError from "$lib/components/AlertError.svelte";

	export let id = "";
	export let roster = [];
	let display = true;
	let loading = false;
	let alert = "";

	$: {
		roster.forEach((person) => {
			if (person.id === id) {
				display = false;
			}
		});
	}

	async function joinTeam() {
		try {
			loading = true;
			const {data,error} = await supabase
				.from("contracts")
				.insert()
			if (error) throw new Error(error.message);
		} catch (error) {
			alert = error.message;
		}
	}
</script>

{#if display}
	<button class="btn"
		on:click={joinTeam}
	>
		Join Team
	</button>
{/if}

{#if alert}
	<AlertError error={alert} />
{/if}

<br /><br /><br />
{JSON.stringify(roster)}
<br /><br />
{id}
<br /><br />
{display}
<br /><br />
