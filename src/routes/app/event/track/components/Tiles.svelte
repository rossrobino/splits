<script>
	import {
		totalMs,
		timerInterval,
		athletes,
		colorList,
		distance,
		distanceList,
	} from "$lib/sessionStore";
	import ResponsiveGrid from "$lib/components/ResponsiveGrid.svelte";
	import { msToTime } from "$lib/modules/utilities/msToTime";
	import { abbrDist } from "$lib/modules/utilities/abbrDist";
	import { clickOutside } from "$lib/modules/utilities/clickOutside";

	let lapAllWarning = false;

	function lap(athlete) {
		if ($timerInterval) {
			// len/units = 0 means no length/units provided
			let len = 0;
			let units = "lap";
			// if there's a distance, then set to the distanceList index based on lap #
			if ($distance) {
				let lapListLength = getLapList(athlete).length;
				len = $distanceList[lapListLength % $distanceList.length].len;
				units =
					$distanceList[lapListLength % $distanceList.length].units;
			}
			let lapSum = getLapList(athlete).reduce((a, b) => a + b, 0);
			athlete.laps.push({
				time: $totalMs - lapSum,
				len,
				units,
			});
			$athletes = $athletes;
		}
		lapAllWarning = false;
	}

	function lapAll() {
		if ($timerInterval) {
			if (!lapAllWarning) {
				lapAllWarning = true;
			} else {
				$athletes.forEach((athlete) => {
					lap(athlete);
				});
			}
		}
	}

	function onBlur() {
		lapAllWarning = false;
	}

	function getLapList(athlete) {
		const lapList = athlete.laps.map(({ time }) => time);
		return lapList;
	}

	function getDistance(athlete) {
		let len = 0;
		let units = "";
		let lapListLength = getLapList(athlete).length;
		len = $distanceList[lapListLength % $distanceList.length].len;
		units = $distanceList[lapListLength % $distanceList.length].units;
		return { len, units };
	}

	function getLastDistTime(athlete) {
		if (athlete.laps.length > 0) {
			if (athlete.laps.slice(-1)[0].units === "rest") {
				return msToTime(getLapList(athlete).slice(-2)[0]);
			} else {
				return msToTime(getLapList(athlete).slice(-1)[0]);
			}
		} else {
			return msToTime(0);
		}
	}

	function getLastDistLen(athlete) {
		if (athlete.laps.length > 0) {
			let distances = athlete.laps.map(({len}) => len);
			let unitList = athlete.laps.map(({units}) => units) 
			if (athlete.laps.slice(-1)[0].units === "rest") {
				return `: ${distances.slice(-2)[0]}${abbrDist(unitList.slice(-2)[0])}`;
			} else {
				return `: ${distances.slice(-1)[0]}${abbrDist(unitList.slice(-1)[0])}`;
			}
		} else {
			return "";
		}
	}
</script>

{#if $athletes.length > 1}
	<!-- Lap All Button -->
	<div class="flex justify-center">
		<button
			class="btn w-[260px] xs:w-[319px] sm:w-[377px] h-12 mt-2"
			class:btn-warning={lapAllWarning}
			use:clickOutside={onBlur}
			on:click={lapAll}
		>
			Lap All
		</button>
	</div>
{/if}

<ResponsiveGrid
	class="mt-4 {$athletes.length > 1
		? 'grid-cols-2'
		: 'sm:grid-cols-1 lg:grid-cols-1'}"
>
	{#each $athletes as athlete}
		<div
			class="
			card
			shadow-xl 
			cursor-pointer
			{$timerInterval
				? 'active:scale-[0.98] transform transition duration-200 active:brightness-95 active:shadow-md'
				: ''}
			"
			style="
				background-color: {athlete.uid % 5 == 3
				? 'hsl(var(--b2))'
				: $colorList[athlete.uid % 5]};

				color: {athlete.uid % 5 == 0
				? 'hsl(var(--pc))'
				: athlete.uid % 5 == 1
				? 'hsl(var(--ac))'
				: athlete.uid % 5 == 2
				? 'hsl(var(--sc))'
				: athlete.uid % 5 == 3
				? 'hsl(var(--bc))'
				: athlete.uid % 5 == 4
				? 'hsl(var(--nc))'
				: 'rgb(253,253,253)'};
			"
			on:click={() => lap(athlete)}
		>
			<div class="card-body p-4 sm:p-6">
				<h2 class="card-title text-base xs:text-lg sm:text-xl">
					{athlete.first_name}
					{`${athlete.guestId ? "#" : ""}${athlete.last_name}`}
				</h2>
				<div class="font-mono">
					<div class="stat-title text-sm xs:text-base sm:text-lg">
						{#if $distance}
							{#if athlete.laps.length}
								{#if getDistance(athlete).units === "rest"}
									Resting
								{:else}
									{`${getDistance(athlete).len}${abbrDist(
										getDistance(athlete).units
									)}`}
								{/if}
							{:else}
								{`${$distanceList[0].len}${abbrDist(
									$distanceList[0].units
								)}`}
							{/if}
						{:else}
							Lap #{athlete.laps.length + 1}
						{/if}
					</div>
					<div class="stat-value text-3xl xs:text-4xl sm:text-5xl">
						{msToTime(
							$totalMs -
								getLapList(athlete).reduce((a, b) => a + b, 0),
							false
						)}
					</div>
					<div class="stat-title text-sm xs:text-base sm:text-lg">
						Previous{getLastDistLen(athlete)}
					</div>
					<div class="stat-value text-lg xs:text-xl sm:text-2xl">
						{getLastDistTime(athlete)}
					</div>
				</div>
			</div>
		</div>
	{/each}
</ResponsiveGrid>
