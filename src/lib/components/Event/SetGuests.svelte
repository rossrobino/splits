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

<div class="max-w-md bg-base-200 rounded-lg p-3 mb-4">
	<div class="label text-sm pt-0">
		{$userProfile ? "Guests" : "Participants"}
	</div>
	{#if $guests.length}
		<hr class="mb-2" />
		{#each $guests as guest}
			<div class="input-group mb-2">
				<input
					type="checkbox"
					class="checkbox checkbox-secondary checkbox-lg mt-2 mr-2 bg-base-100"
					style="border-radius: .5rem"
					bind:checked={guest.selected}
				/>
				<input
					type="text"
					maxlength="40"
					bind:value={guest.first_name}
					class="input input-bordered w-full"
					style="border-radius: .5rem"
				/>
				<span
					class="bg-neutral text-neutral-content ml-1"
					style="border-radius: .5rem"
				>
					#{guest.last_name}
				</span>
			</div>
		{/each}
		<hr class="mb-2" />
	{/if}
	<button class="btn w-full" on:click={addGuest}>
		+ {$userProfile ? "Guest" : "Participant"}
	</button>
</div>
