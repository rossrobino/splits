<script>
	import { eventStarted, athletes, rest } from "$lib/sessionStore";

	function startEvent() {
		if ($rest) {
			$athletes.forEach((athlete) => {
				athlete.rest = true;
			});
		}
		$eventStarted = true;
	}
</script>

<button class="block btn btn-primary w-full mb-4" on:click={startEvent}>
	Start
</button>
