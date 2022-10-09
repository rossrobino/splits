<script>
	import { rest } from "$lib/sessionStore";

	$rest = false;
</script>

<div class="form-control max-w-sm mb-4 bg-base-200 rounded-lg py-1 px-3">
	<label class="label cursor-pointer">
		<span class="label-text">Rest Between Laps</span>
		<input type="checkbox" class="toggle" bind:checked={$rest} />
	</label>
</div>
