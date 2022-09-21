<script>
	import { supabase } from "$lib/modules/supabaseClient";
	import { userProfile } from "$lib/sessionStore";
	import { goto } from "$app/navigation";
	import Table from "$lib/components/Table.svelte";
	import LoadingBar from "$lib/components/LoadingBar.svelte";

	let loading = false;
	let events = [];

	$: getPastEvents($userProfile.id);

	async function getPastEvents(id) {
		if (id) {
			try {
				events = [];
				loading = true;
				const { data, error } = await supabase
					.from("laps")
					.select(
						`
						event_id,
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
					.eq("profile_id", id);
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
{:else if events.length > 0}
	<Table columnNames={["Name", "Organizer", "Date"]}>
		{#each events as event}
			<tr class="hover:cursor-pointer" on:click={() => rowClick(`/app/event/id/${event.id}`)}>
				<th>
					<div>{event.name}</div>
					<!-- <div class="text-sm opacity-50">Location</div> -->
				</th>
				<td>
					<span
						>{event.organizer.first_name}
						{event.organizer.last_name}</span
					>
					<br />
					<a
						href="/app/profile/{event.organizer.username}"
						class="badge badge-secondary badge-sm"
					>
						@{event.organizer.username}
					</a>
				</td>
				<td>
					{event.date}
				</td>
			</tr>
		{/each}
	</Table>
{/if}
