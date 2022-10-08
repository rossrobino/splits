<script>
	import {
		totalMs,
		timerInterval,
		athletes,
		colorList,
	} from "$lib/sessionStore";
	import ResponsiveGrid from "$lib/components/ResponsiveGrid.svelte";
	import { msToTime } from "$lib/modules/utilities/msToTime";
	import { clickOutside } from "$lib/modules/utilities/clickOutside";

	let lapAllWarning = false;

	function lap(athlete) {
		if ($timerInterval) {
			let lapSum = athlete.laps.reduce((a, b) => a + b, 0);
			athlete.laps.push($totalMs - lapSum);
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
						Lap #{athlete.laps.length + 1}
					</div>
					<div class="stat-value text-3xl xs:text-4xl sm:text-5xl">
						{msToTime(
							$totalMs - athlete.laps.reduce((a, b) => a + b, 0),
							false
						)}
					</div>
					<div class="stat-title text-sm xs:text-base sm:text-lg">
						Previous
					</div>
					<div class="stat-value text-lg xs:text-xl sm:text-2xl">
						{msToTime(athlete.laps.slice(-1))}
					</div>
				</div>
			</div>
		</div>
	{/each}
</ResponsiveGrid>
