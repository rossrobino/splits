<script>
    import TimerBox from "./TimerBox.svelte";
	import { clickOutside } from "$lib/modules/utilities/clickOutside";
    import {
        time,
        totalMs,
        startTime,
        pausedTime,
        pausedMs,
        timerInterval,
        athletes,
    } from "$lib/sessionStore";

    let resetWarning = false;
    let now;

    // running totals calculated from $totalMs store
    let totalHun;
    let totalSec;
    let totalMin;
    let totalHr;
    $: totalHun = Math.floor($totalMs / 10);
    $: totalSec = Math.floor(totalHun / 100);
    $: totalMin = Math.floor(totalSec / 60);
    $: totalHr = Math.floor(totalMin / 60);

    // set time object store
    $: $time.hun = totalHun % 100;
    $: $time.sec = totalSec % 60;
    $: $time.min = totalMin % 60;
    $: $time.hr = totalHr % 24;

    function button1Click() {
        if (!$timerInterval) {
            if (!$totalMs) {
                $startTime = new Date();
				$athletes.forEach(athlete => {
					athlete.resting = false;
				});
            }
            if ($pausedTime) {
                now = new Date();
                $pausedMs += now - $pausedTime;
            }
            $timerInterval = setInterval(() => {
                now = new Date();
                $totalMs = now - $startTime - $pausedMs;
            }, 10);
            resetWarning = false;
        }
    }

    function button2Click() {
        if ($timerInterval) {
            clearInterval($timerInterval);
            $pausedTime = new Date();
            $timerInterval = false;
        } else if (!resetWarning && $totalMs > 0) {
            resetWarning = true;
        } else {
            $totalMs = 0;
            $pausedTime = 0;
            $pausedMs = 0;
            $athletes.forEach((athlete) => {
                athlete.laps = [];
				athlete.resting = true;
            });
            $athletes = $athletes; // to update lap counter reactivity
            resetWarning = false;
        }
    }

    let buttonClasses = "btn w-[127px] xs:w-[155px] sm:w-[184px] h-12";

	function removeWarning() {
		resetWarning = false;
	}
</script>

<div class="flex justify-center mb-2">
    <div class="grid grid-cols-2 gap-2 place-content-center">
        <button on:click={button1Click} class={buttonClasses}>Start</button>
        <button
            on:click={button2Click}
			use:clickOutside={removeWarning}
            class="{buttonClasses} {resetWarning ? 'btn-warning' : ''}"
        >
            {#if $timerInterval}
                Stop
            {:else}
                Reset
            {/if}
        </button>
    </div>
</div>
<div
    class="grid grid-flow-col gap-2 text-center auto-cols-max place-content-center"
>
    <TimerBox bind:value={$time.hr} units="hours" />
    <TimerBox bind:value={$time.min} units="min" />
    <TimerBox bind:value={$time.sec} units="sec" />
    <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="font-mono text-4xl xs:text-5xl sm:text-6xl">
            {$time.hun.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
            })}
        </span>
        <span class="sm:text-xl">ms</span>
    </div>
</div>
