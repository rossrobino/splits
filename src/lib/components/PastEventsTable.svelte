<script>
	import { supabase } from "$lib/modules/supabaseClient";
	import { goto } from "$app/navigation";
	import Table from "$lib/components/Table.svelte";
	import LoadingBar from "$lib/components/LoadingBar.svelte";
	import H2 from "$lib/components/headings/H2.svelte";

	let loading = false;
	export let profileId = "";
	export let organized = false;
	let columnNames = [];
	if (organized) {
		columnNames = ["Event", "Date"];
	} else {
		columnNames = ["Event", "Organizer", "Date"];
	}
	let events = [];
	let orString = "";
	$: {
		if (organized) {
			orString = `organizer.eq.${profileId}`;
		} else {
			orString = `profile_id.eq.${profileId}`;
		}
	}
	let orParams = {};
	$: if (organized) orParams = { foreignTable: "events" };

	$: getPastEvents(profileId);

	async function getPastEvents(id) {
		if (id) {
			try {
				loading = true;
				events = [];
				const { data, error } = await supabase
					.from("laps")
					.select(
						`
						event_id,
						created_at,
						events(
							name,
							date,
							profiles(
								first_name,
								last_name,
								username
							)
						)
				`
					)
					.or(orString, orParams)
					.order("created_at", { ascending: false });
				if (error) throw new Error(error.message);
				data.forEach((element) => {
					let inList = false;
					events.forEach((currentItem) => {
						if (element.event_id === currentItem.id) {
							inList = true;
						}
					});
					if (!inList) {
						events.push({
							id: element.event_id,
							name: element.events.name,
							date: element.events.date,
							organizer: {
								username: element.events.profiles.username,
								first_name: element.events.profiles.first_name,
								last_name: element.events.profiles.last_name,
							},
						});
					}
				});
				events = events;
			} catch (error) {
				console.log(error.message);
			} finally {
				loading = false;
			}
		}
	}

	function rowClick(url) {
		goto(url);
	}
</script>

{#if loading}
	<LoadingBar />
{:else}
	<div>
		<H2>
			{organized ? `Organized Events` : "Entries"}
		</H2>
		<Table {columnNames} class="mb-8">
			{#if events.length > 0}
				{#each events as event}
					<tr
						class="cursor-pointer group"
						on:click={() => rowClick(`/app/event/id/${event.id}`)}
					>
						<th
							class="group-hover:bg-base-300 transform transition duration-250"
						>
							<div>{event.name}</div>
							<!-- <div class="text-sm opacity-50">Location</div> -->
						</th>

						{#if !organized}
							<td
								class="group-hover:bg-base-300 transform transition duration-250"
							>
								<span>
									{event.organizer.first_name}
									{event.organizer.last_name}
								</span>
								<br />
								<a
									href="/app/profile/{event.organizer
										.username}"
									class="badge badge-secondary badge-sm"
								>
									@{event.organizer.username}
								</a>
							</td>
						{/if}

						<td
							class="group-hover:bg-base-300 transform transition duration-250"
						>
							{event.date}
						</td>
					</tr>
				{/each}
			{:else}
				<tr>
					<td>No events yet - <a href="/app/event/track" class="underline">start an event</a>.</td>
				</tr>
			{/if}
		</Table>
	</div>
{/if}
