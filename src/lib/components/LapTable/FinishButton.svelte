<script>
	import { goto } from "$app/navigation";
	import {
		athletes,
		eventName,
		userProfile,
		eventType,
		eventStarted,
		timerInterval,
		totalMs,
		pausedTime,
		pausedMs,
	} from "$lib/sessionStore";
	import { supabase } from "$lib/modules/supabaseClient";
	import { getCurrentDate } from "$lib/modules/utilities/getCurrentDate";
	import { clickOutside } from "$lib/modules/utilities/clickOutside";

	let warning = false;
	let loading = false;
	let eventId = "";

	async function handleClick() {
		if (warning) {
			await createEvent();
			for (const athlete of $athletes) {
				await uploadLaps(athlete);
			}
			resetEvent();
			goto(`/app/event/id/${eventId}`);
		} else {
			warning = true;
		}
	}

	async function createEvent() {
		try {
			loading = true;
			const { data, error } = await supabase
				.from("events")
				.insert({
					name: $eventName,
					date: getCurrentDate(),
					organizer: $userProfile.id,
				})
				.single();
			if (error) throw new Error(error.message);
			eventId = data.id;
		} catch (error) {
			console.log(error.message);
		} finally {
			loading = false;
		}
	}

	async function uploadLaps(athlete) {
		try {
			loading = true;
			const { data, error } = await supabase
				.from("laps")
				.insert({
					event_id: eventId,
					profile_id: athlete.id,
					laps: athlete.laps,
					guestId: athlete.guestId,
				})
				.single();
			if (error) throw new Error(error.message);
		} catch (error) {
			console.log(error.message);
		} finally {
			loading = false;
		}
	}

	function resetEvent() {
		$eventType = "";
		$eventStarted = false;
		$athletes = [];
		$totalMs = 0;
		$pausedTime = 0;
		$pausedMs = 0;
		if ($timerInterval) {
			clearInterval($timerInterval);
			$timerInterval = false;
		}
	}

	function onBlur() {
		warning = false;
	}

	function delay(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
</script>

<button
	class="btn w-full mb-4"
	class:btn-success={warning}
	class:loading
	on:click={handleClick}
	use:clickOutside={onBlur}
>
	{warning ? "Confirm" : "Finish"}
</button>
