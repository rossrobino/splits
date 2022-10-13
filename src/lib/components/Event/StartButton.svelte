<script>
	import { eventStarted, athletes } from "$lib/sessionStore";

	export let demo = false;

	function startEvent() {
		$eventStarted = true;
	}
</script>

<button
	class="block btn btn-primary w-full mb-4"
	disabled={$athletes.length < 1}
	on:click={startEvent}
>
	Start
</button>
