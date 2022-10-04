<script>
	import { eventStarted, guests, athletes } from "$lib/sessionStore";

	function startEvent() {
		
		$eventStarted = true;
	}
</script>

<button class="block btn btn-primary w-full mb-4" on:click={startEvent}>
	Start
</button>