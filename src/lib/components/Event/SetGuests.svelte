<script>
	import Table from "$lib/components/Table.svelte";
	import { guests, userProfile } from "$lib/sessionStore";

	$guests = [];
	let guestId = 1;
	let columnLabel = $userProfile ? "Guests" : "Participants";
	if (!$userProfile) addGuest();
	$: if ($guests.length < 1) guestId = 1;

	function addGuest() {
		$guests.push({
			id: null,
			first_name: "Athlete",
			last_name: `${guestId}`,
			username: null,
			guestId: guestId++,
			selected: true,
			resting: true,
			laps: [],
		});
		$guests = $guests;
	}
</script>

<button class="btn w-full mb-4" on:click={addGuest}>
	+ Add {$userProfile ? "Guest" : "Participant"}
</button>
{#if $guests.length}
	<Table class="mb-4" columnNames={["", columnLabel]}>
		{#each $guests as guest}
			<tr>
				<td class="w-8 sm:w-12">
					<input
						type="checkbox"
						class="checkbox checkbox-secondary sm:checkbox-lg"
						bind:checked={guest.selected}
					/>
				</td>
				<td>
					<input
						type="text"
						maxlength="40"
						bind:value={guest.first_name}
						class="input input-bordered w-40"
					/>
					<span class="ml-2">
						#{guest.last_name}
					</span>
				</td>
			</tr>
		{/each}
	</Table>
{/if}
