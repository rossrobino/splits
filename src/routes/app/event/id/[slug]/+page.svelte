<script>
	import { title } from "$lib/modules/info";
	import { userProfile } from "$lib/sessionStore";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { supabase } from "$lib/modules/supabaseClient";
	import PageHeader from "$lib/components/PageHeader.svelte";
	import LoadingBar from "$lib/components/LoadingBar.svelte";
	import LapTable from "$lib/components/LapTable/LapTable.svelte";
	import LineChart from "$lib/components/LineChart.svelte";

	let loading = false;
	let event = {};
	let athletes = [];
	let userAthlete = false;
	let deleteWarning = false;
	let deleteLoading = false;

	onMount(async () => {
		loading = true;
		await getEvent();
		await getLaps();
		loading = false;
	});

	async function getEvent() {
		try {
			const { data, error } = await supabase
				.from("events")
				.select(
					`
					id,
					name,
					date,
					profiles(
						username
					)
				`
				)
				.eq("id", $page.params.slug)
				.single();
			if (error) throw new Error(error.message);
			event = data;
		} catch (error) {
			console.log(error.message);
		}
	}

	async function getLaps() {
		try {
			loading = true;
			const { data, error } = await supabase
				.from("laps")
				.select(
					`
					laps,
					guestId,
					profiles(
						id,
						username,
						first_name,
						last_name
					)
				`
				)
				.eq("event_id", $page.params.slug);
			if (error) throw new Error(error.message);
			data.forEach((element) => {
				let id;
				let username;
				let first_name;
				let last_name;
				if (element.profiles) {
					id = element.profiles.id;
					username = element.profiles.username;
					first_name = element.profiles.first_name;
					last_name = element.profiles.last_name;
				} else {
					id = null;
					username = null;
					first_name = "Athlete";
					last_name = element.guestId;
				}
				athletes.push({
					id,
					username,
					first_name,
					last_name,
					guestId: element.guestId,
					laps: element.laps,
				});
				if (id === $userProfile.id) {
					userAthlete = true;
				}
			});
		} catch (error) {
			console.log(error.message);
		} finally {
			loading = false;
		}
	}

	async function deleteMyResults() {
		if (deleteWarning) {
			try {
				deleteLoading = true;
				const { data, error } = await supabase
					.from("laps")
					.delete()
					.match({
						event_id: $page.params.slug,
						profile_id: $userProfile.id,
					});
				if (error) throw new Error(error.message);
				goto("/app/event");
			} catch (error) {
				console.log(error.message);
			} finally {
				deleteLoading = false;
			}
		} else {
			deleteWarning = true;
		}
	}

	function blurDelete() {
		deleteWarning = false;
	}
</script>

<svelte:head>
	<title>{title} - {event.name ? event.name : "Event"}</title>
	<meta name="description" content="View event details." />
</svelte:head>

{#if loading}
	<LoadingBar />
{:else if event.name}
	<PageHeader>
		<span slot="h1">{event.name}</span>
		<span slot="h2">
			<span>{event.date}</span>
			<a
				href="/app/profile/{event.profiles.username}"
				class="badge badge-primary"
			>
				organizer @{event.profiles.username}
			</a>
		</span>
	</PageHeader>

	<LapTable {athletes} />

	<!-- <LineChart {athletes} /> -->

	{#if userAthlete}
		<button
			class="btn"
			class:btn-warning={deleteWarning}
			class:loading={deleteLoading}
			on:click={deleteMyResults}
			on:blur={blurDelete}
		>
			Delete My Results
		</button>
	{/if}
{/if}
