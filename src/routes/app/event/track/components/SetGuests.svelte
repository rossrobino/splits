<script>
	import Table from "$lib/components/Table.svelte";
	import { guests } from "$lib/sessionStore";

	$guests = [];
	let guestId = 1;
	function addGuest() {
		$guests.push({
			id: null,
			first_name: "Athlete",
			last_name: `${guestId}`,
			username: null,
			guestId: guestId++,
			selected: true,
			laps: [],
		});
		$guests = $guests;
	}
</script>

<button class="btn w-full mb-4" on:click={addGuest}>
	+ Add Guest
</button>
{#if $guests.length}
	<Table class="mb-4" columnNames={["", "Guests"]}>
		{#each $guests as guest}
			<tr>
				<td class="w-8 sm:w-12">
					<input
						type="checkbox"
						class="checkbox checkbox-secondary sm:checkbox-lg"
						bind:checked={guest.selected}
					/>
				</td>
				<td>{guest.first_name} {guest.last_name}</td>
			</tr>
		{/each}
	</Table>
{/if}
