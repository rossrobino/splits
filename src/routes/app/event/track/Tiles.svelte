<script>
    import { totalMs, timerInterval, trackAthletes, lapAllWarning } from "$lib/sessionStore";
    import { msToTime } from "$lib/modules/msToTime";

    let colorIndex = 0;
    function getNextColor() {
        let colors = ['primary', 'secondary', 'accent', 'neutral', ];
        let color = colors[colorIndex];
        colorIndex++;
        if (colorIndex >= colors.length) {
            colorIndex = 0;
        }
        return color;
    }

    let names = ["Ross Robino", "Keely Robino", "Paige Robino", "Dee Robino", "Barry Robino"];

    if (!$trackAthletes) {
        $trackAthletes = [];
        names.forEach(name => {
            $trackAthletes.push(
                { name: name, laps: [], color: getNextColor(), }
            )
        });
    }

    function lap(athlete) {
        if ( $timerInterval ) {
            let lapSum = athlete.laps.reduce( (a,b) => a+b, 0);
            athlete.laps.push($totalMs-lapSum);
            $trackAthletes = $trackAthletes;
            console.log(athlete.name, athlete.laps);
        }
        $lapAllWarning = false;
    }

    function lapAll() {
        if ( $timerInterval ) {
            if (!$lapAllWarning) {
                $lapAllWarning = true;
            } else {
                $trackAthletes.forEach(athlete => {
                    lap(athlete);
                });
            }
        }
    }

</script>

<div 
    class="rounded-2xl shadow-xl cursor-pointer p-4 sm:p-6 flex justify-center
        {$lapAllWarning ? "bg-primary text-primary-content" : "bg-base-200 text-base-content"}
    "
    on:click={lapAll}
>
    <div class="font-bold text-xl" >Lap All</div>
</div>

<div class="grid grid-cols-2 sm:grid-cols-3 gap-4 my-4">
    {#each $trackAthletes as athlete}
        <div 
            class="card bg-{athlete.color} text-{athlete.color}-content shadow-xl cursor-pointer" 
            on:click={()=>lap(athlete)}
        >
            <div class="card-body p-4 sm:p-6">
                <h2 class="card-title text-base xs:text-lg sm:text-xl">{athlete.name}</h2>
                <div class="font-mono">
                    <div class="stat-title text-sm xs:text-base sm:text-lg">
                        Lap #{athlete.laps.length + 1}
                    </div>
                    <div class="stat-value text-3xl xs:text-4xl sm:text-5xl">
                        {msToTime($totalMs - athlete.laps.reduce( (a,b) => a+b, 0), false)}
                    </div>
                    <div class="stat-title text-sm xs:text-base sm:text-lg">Previous</div>
                    <div class="stat-value text-lg xs:text-xl sm:text-2xl">
                        {msToTime(athlete.laps.slice(-1))}
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>
