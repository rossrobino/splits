<script>
	import { eventStarted, athletes } from "$lib/sessionStore";

	function startEvent() {
		$eventStarted = true;
	}
</script>

<button
	class="block btn btn-primary w-full max-w-md mb-4"
	disabled={$athletes.length < 1}
	on:click={startEvent}
>
	Start
</button>
