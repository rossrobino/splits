<script>
	import { supabase } from "$lib/modules/supabaseClient";
	import { goto } from "$app/navigation";
	import { userProfile } from "$lib/sessionStore";
	import Table from "$lib/components/Table.svelte";
	import LoadingBar from "$lib/components/LoadingBar.svelte";
	import H2 from "$lib/components/headings/H2.svelte";

	let loading = false;
	let showAll = false;
	let showAllId = "showAll" + Math.random().toString();

	export let profileId = "";
	export let organized = false;
	let columnNames = [];
	if (organized) {
		columnNames = ["Event", "Date"];
	} else {
		columnNames = ["Event", "Organizer", "Date"];
	}
	let events = [];

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
								username,
								id
							)
						)
				`
					)
					.eq("profile_id", id)
					.order("created_at", { ascending: false });
				if (error) throw new Error(error.message);
				let uid = 0;
				data.forEach((element) => {
					let inList = false;
					events.forEach((currentItem) => {
						if (element.event_id === currentItem.id) {
							inList = true;
						}
					});
					if (!inList) {
						let organizerId = element.events.profiles.id;
						if (!organized || organizerId === $userProfile.id) {
							events.push({
								id: element.event_id,
								name: element.events.name,
								date: element.events.date,
								organizer: {
									username: element.events.profiles.username,
									first_name:
										element.events.profiles.first_name,
									last_name:
										element.events.profiles.last_name,
								},
								uid: uid++,
							});
						}
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
					{#if event.uid < 3 || showAll}
						<tr
							class="cursor-pointer group"
							on:click={() =>
								rowClick(`/app/event/id/${event.id}`)}
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
					{/if}
				{/each}
				{#if events.length > 3}
					<tr>
						<td class="bg-base-200 py-1 pl-2 sm:pl-4">
							<div class="flex align-items-center">
								<input
									type="checkbox"
									id={showAllId}
									class="toggle my-2"
									bind:checked={showAll}
								/>
								<label
									for={showAllId}
									class="label cursor-pointer pl-3"
								>
									<span class="label-text">
										{#if showAll}
											All
										{:else}
											Recent
										{/if}
									</span>
								</label>
							</div>
						</td>
						<td class="bg-base-200 p-2" />
						{#if !organized}
							<td class="bg-base-200 p-2" />
						{/if}
					</tr>
				{/if}
			{:else}
				<tr>
					<td>
						No events yet - <a
							href="/app/event/track"
							class="underline"
						>
							start an event.
						</a>
					</td>
				</tr>
			{/if}
		</Table>
	</div>
{/if}
