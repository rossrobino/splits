import { writable } from "svelte/store";

// base layout - user auth and profile
export const user = writable(false);
export const userProfile = writable(false);

// theme
export const theme = writable("");

// app/user/[username]
export const routeProfile = writable(false);

// app/event/track - lib/timer
export const timerInterval = writable(false);
export const startTime = writable(0);
export const pausedTime = writable(0);
export const pausedMs = writable(0);
export const totalMs = writable(0);
export const time = writable({
	hun: 0,
	sec: 0,
	min: 0,
	hr: 0,
});

// app/event/track - ./tiles
export const trackAthletes = writable(false);
export const lapAllWarning = writable(false);

// app/team
export const currentTeams = writable([]);
export const team = writable({});
export const onTeam = writable(false);
export const requestSent = writable(false);
export const myContractId = writable("");
