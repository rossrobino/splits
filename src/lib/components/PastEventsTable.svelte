<script>
	import { supabase } from "$lib/modules/supabaseClient";
	import { goto } from "$app/navigation";
	import Table from "$lib/components/Table.svelte";

	export let profileId = "";
	export let organized = false;
	let events = [];
	let orString= "";
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
				});
				events = events;
			} catch (error) {
				console.log(error.message);
			}
		}
	}

	function rowClick(url) {
		goto(url);
	}
</script>

{#if events.length > 0}
	<Table columnNames={[(organized ? "Organized Event" : "Event"), "Organizer", "Date"]} class="mb-4">
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
				<td
					class="group-hover:bg-base-300 transform transition duration-250"
				>
					<span>
						{event.organizer.first_name}
						{event.organizer.last_name}
					</span>
					<br />
					<a
						href="/app/profile/{event.organizer.username}"
						class="badge badge-secondary badge-sm"
					>
						@{event.organizer.username}
					</a>
				</td>
				<td
					class="group-hover:bg-base-300 transform transition duration-250"
				>
					{event.date}
				</td>
			</tr>
		{/each}
	</Table>
{/if}
