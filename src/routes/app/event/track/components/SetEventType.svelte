<script>
	import { eventType, eventName, athletes, userProfile } from "$lib/sessionStore";
	import Card from "$lib/components/Card.svelte";
	import ResponsiveGrid from "$lib/components/ResponsiveGrid.svelte";
	import { capitalizeFirstLetter } from "$lib/modules/utilities/capitalizeFirstLetter";
	import { getCurrentDate } from "$lib/modules/utilities/getCurrentDate";

	function startGroup() {
		$eventType = "group";
		setEventName();
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
		setEventName();
	}

	function setEventName() {
		$eventName = `${getCurrentDate()}-${capitalizeFirstLetter($eventType)}`;
	}
</script>

<ResponsiveGrid>
	<Card
		primary={true}
		title="Group"
		cardClick={startGroup}
	>
		Start a group event.
	</Card>
	<Card class="" title="Solo" cardClick={startSolo}>
		Start an individual event.
	</Card>
</ResponsiveGrid>