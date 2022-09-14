<script>
	import { userProfile, team } from "$lib/sessionStore";

	let display = false;
	$: display = $userProfile.id ? true : false;
</script>

{#if display && ($userProfile.id === $team.coach)}
	<a
		href="/app/team/id/{$team.team_name}/settings"
		class="btn"
	>
		Settings
	</a>
{/if}
