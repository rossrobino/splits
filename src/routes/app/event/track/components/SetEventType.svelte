<script>
	import { eventType, athletes, userProfile } from "$lib/sessionStore";
	import Card from "$lib/components/Card.svelte";
	import ResponsiveGrid from "$lib/components/ResponsiveGrid.svelte";

	function startGroup() {
		$eventType = "group";
	}

	function startSolo() {
		$eventType = "solo";
		$athletes.push({
			uid: 0,
			id: $userProfile.id,
			first_name: $userProfile.first_name,
			last_name: $userProfile.last_name,
			username: $userProfile.username,
			selected: true,
			laps: [],
		});
	}
</script>

<ResponsiveGrid>
	<Card
		class="bg-primary text-primary-content hover:cursor-pointer h-48"
		title="Group"
		cardClick={startGroup}
	>
		Start a group event.
	</Card>
	<Card class="hover:cursor-pointer h-48" title="Solo" cardClick={startSolo}>
		Start an individual event.
	</Card>
</ResponsiveGrid>