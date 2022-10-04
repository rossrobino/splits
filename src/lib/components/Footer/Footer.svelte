<script>
	import { getCurrentDate } from "$lib/modules/utilities/getCurrentDate";
	import GitHub from "./GitHub.png";
</script>

<footer class="footer grid-flow-col gap-3 items-center px-4 py-3 bg-neutral text-neutral-content">
	<div class="justify-self-start">
		<p>
			Copyright © {getCurrentDate().split("-")[0]} -
			<a class="inline-block" href="https://robino.dev/" target="_blank">Ross Robino</a>
		</p>
	</div>
	<div class="justify-self-end">
		<a href="https://github.com/rossrobino/splits" target="_blank">
			<img src={GitHub} width="32px" height="32px" alt="GitHub Logo" />
		</a>
	</div>
</footer>
