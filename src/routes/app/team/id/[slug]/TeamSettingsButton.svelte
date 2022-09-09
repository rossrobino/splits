<script>
	import { userProfile, team } from "$lib/sessionStore";
</script>

{#if $userProfile.id === $team.coach}
	<a
		href="/app/team/id/{$team.team_name}/settings"
		class="btn"
	>
		Settings
	</a>
{/if}
