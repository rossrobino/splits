<script>
	import { distance, distanceList } from "$lib/sessionStore";
	import InfoTooltip from "$lib/components/InfoTooltip.svelte";

	$distance = false;

	let uid = 0;
	$distanceList = [
		{ uid: uid++, len: 400, units: "meters" },
		{ uid: uid++, len: 0, units: "rest" },
	];
	const unitList = ["meters", "kilometers", "yards", "miles", "rest"];

	$: $distanceList.forEach((dist) => {
		if (dist.units == "rest") {
			dist.len = 0;
		} else if (dist.len < 1) {
			dist.len = 1;
		}
		if (dist.len < 0) {
			dist.len = 0;
		}
	});

	let previousUnits = "";
	$: previousUnits = $distanceList[$distanceList.length - 1].units;

	let lastDistance = {};
	$: {
		if (previousUnits === "rest") {
			lastDistance = $distanceList[$distanceList.length - 2];
		} else {
			lastDistance = previousUnits;
		}
	}

	function addDistance() {
		$distanceList.push({ uid: uid++, len: 400, units: lastDistance.units });
		$distanceList = $distanceList;
	}

	function removeDistance(dist) {
		if ($distanceList.length > 1) {
			let index = 0;
			$distanceList.splice(dist.uid, 1);
			$distanceList.forEach((dist) => {
				dist.uid = index++;
			});
			uid = index;
		} else {
			$distance = false;
		}
		$distanceList = $distanceList;
	}

	function addRest() {
		$distanceList.push({ uid: uid++, len: 0, units: "rest" });
		$distanceList = $distanceList;
	}
</script>

<div class="form-control max-w-sm mb-4 bg-base-200 rounded-lg py-1 px-3">
	<label class="label cursor-pointer">
		<span class="label-text flex">
			<span>Set Distance / Rest</span>
			<InfoTooltip tip="Series automatically repeats." />
		</span>
		<input type="checkbox" class="toggle" bind:checked={$distance} />
	</label>
	{#if $distance}
		<hr class="border-base-300" />
		<div class="form-control my-2">
			{#each $distanceList as dist}
				<label class="input-group mb-2">
					<input
						type="number"
						placeholder="Distance"
						min="0"
						class="input input-bordered w-full"
						style="border: 1px solid hsl(var(--b3));"
						bind:value={dist.len}
						disabled={dist.units === "rest"}
					/>
					<select
						class="select select-bordered w-5/12 bg-neutral text-neutral-content rounded-l-none rounded-r-lg border-neutral"
						bind:value={dist.units}
					>
						{#each unitList as unit}
							<option value={unit}>
								{unit}
							</option>
						{/each}
					</select>
					<button
						class="btn btn-square ml-1"
						style="border-radius: .5rem;"
						on:click={() => removeDistance(dist)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</label>
			{/each}
			<hr class="border-base-300" />
			<div class="mt-2">
				<div
					class="grid {previousUnits == 'rest'
						? 'grid-cols-1'
						: 'grid-cols-2'} gap-1"
				>
					{#if previousUnits != "rest"}
						<button class="btn" on:click={addRest}>
							+&nbsp;Rest
						</button>
					{/if}
					<button class="btn btn-primary" on:click={addDistance}>
						+&nbsp;Distance
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
