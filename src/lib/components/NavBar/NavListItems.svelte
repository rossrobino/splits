<script>
	import { userProfile, eventStarted } from "$lib/sessionStore.js";
</script>

{#if $userProfile}
	<li>
		<a href="/app/event/track">
			{#if $eventStarted}
				Timer
			{:else}
				Quick Start
			{/if}
		</a>
	</li>
	<li><a href="/app/event">Events</a></li>
	<li><a href="/app/team">Teams</a></li>
	<li><a href="/">About</a></li>
{/if}
