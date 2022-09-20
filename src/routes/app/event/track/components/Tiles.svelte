<script>
    import {
        totalMs,
        timerInterval,
		athletes,
		eventType
    } from "$lib/sessionStore";
	import ResponsiveGrid from "$lib/components/ResponsiveGrid.svelte";
    import { msToTime } from "$lib/modules/utilities/msToTime";

    let colors = ["primary", "base-100", "neutral"];
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

<div class="flex justify-center mb-4">
    <button
        class="btn w-[260px] xs:w-[319px] sm:w-[377px] h-12"
		class:btn-warning={lapAllWarning}
		on:blur={onBlur}
        on:click={lapAll}
    >
        Lap All
    </button>
</div>

<ResponsiveGrid class={($athletes.length > 1) ? "grid-cols-2" : "sm:grid-cols-1 lg:grid-cols-1"}>
    {#each $athletes as athlete}
        <div
            class="card bg-{colors[athlete.uid % 3]} text-{colors[
                athlete.uid % 3
            ]}-content shadow-xl cursor-pointer"
            on:click={() => lap(athlete)}
        >
            <div class="card-body p-4 sm:p-6">
                <h2 class="card-title text-base xs:text-lg sm:text-xl">
                    {athlete.first_name} {athlete.last_name}
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
