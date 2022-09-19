<script>
	import {
		eventType,
		eventStarted,
		athletes,
		timerInterval,
		totalMs,
		pausedTime,
		pausedMs,
	} from "$lib/sessionStore";

	let warning = false;

	function resetEvent() {
		if (warning) {
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
		} else {
			warning = true;
		}
	}

	function onBlur() {
		warning = false;
	}
</script>

<button
	class="btn mb-2"
	class:btn-warning={warning}
	on:click={resetEvent}
	on:blur={onBlur}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="1.5"
		stroke="currentColor"
		class="w-4 h-4"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
		/>
	</svg>

	<span>&nbsp;Reset Event</span>
</button>
