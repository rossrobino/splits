<script>
    import {
        totalMs,
        timerInterval,
        trackAthletes,
        lapAllWarning,
    } from "$lib/sessionStore";
    import { msToTime } from "$lib/modules/msToTime";

    let colors = ["primary", "base-300", "neutral", "base-100"];
    let uid = 0;
    let names = [
        "Ross Robino",
        "Keely Robino",
        "Paige Robino",
        "Dee Robino",
        "Barry Robino",
    ];

    if (!$trackAthletes) {
        $trackAthletes = [];
        names.forEach((name) => {
            $trackAthletes.push({ id: uid++, name: name, laps: [] });
        });
    }

    function lap(athlete) {
        if ($timerInterval) {
            let lapSum = athlete.laps.reduce((a, b) => a + b, 0);
            athlete.laps.push($totalMs - lapSum);
            $trackAthletes = $trackAthletes;
            console.log(athlete.name, athlete.laps);
        }
        $lapAllWarning = false;
    }

    function lapAll() {
        if ($timerInterval) {
            if (!$lapAllWarning) {
                $lapAllWarning = true;
            } else {
                $trackAthletes.forEach((athlete) => {
                    lap(athlete);
                });
            }
        }
    }
</script>

<div class="flex justify-center">
    <button
        class="btn w-[260px] xs:w-[319px] sm:w-[377px] h-12
            {$lapAllWarning ? 'btn-warning' : ''}
        "
        on:click={lapAll}
    >
        Lap All
    </button>
</div>

<div class="grid grid-cols-2 sm:grid-cols-3 gap-4 my-4">
    {#each $trackAthletes as athlete}
        <div
            class="card bg-{colors[athlete.id % 4]} text-{colors[
                athlete.id % 4
            ]}-content shadow-xl cursor-pointer"
            on:click={() => lap(athlete)}
        >
            <div class="card-body p-4 sm:p-6">
                <h2 class="card-title text-base xs:text-lg sm:text-xl">
                    {athlete.name}
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
</div>
