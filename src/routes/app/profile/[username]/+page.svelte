<script>
	import { routeProfile } from "$lib/sessionStore";
	import { title, profileTag } from "$lib/modules/info";
	import TeamSelect from "$lib/components/TeamSelect.svelte";
	import PastEventsTable from "$lib/components/PastEventsTable.svelte";
</script>

<svelte:head>
	<title>{title} - @{$routeProfile.username}</title>
	<meta name="description" content={profileTag} />
</svelte:head>

<TeamSelect profileId={$routeProfile.id} />
<PastEventsTable profileId={$routeProfile.id} />
<PastEventsTable profileId={$routeProfile.id} organized={true} />
