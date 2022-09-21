<script>
	import { userProfile, eventStarted } from "$lib/sessionStore.js";
</script>

{#if $userProfile}
	<li>
		<a href="/app/event/track">
			{#if $eventStarted}
				Timer
			{:else}
				Start
			{/if}
		</a>
	</li>
	<li><a href="/app/event">Events</a></li>
	<li><a href="/app/team">Teams</a></li>
{/if}
