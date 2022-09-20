import { writable } from "svelte/store";

// base layout - user auth and profile
export const user = writable(false);
export const userProfile = writable(false);

// theme
export const theme = writable("");

// app/user/[username]
export const routeProfile = writable(false);

// app/event/track 
export const athletes = writable([]);
export const eventStarted = writable(false);
export const eventName = writable("");

// app/event/track - lib/Timer
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
export const lapAllWarning = writable(false);

// app/event/track - ./SetAthletes
export const eventType = writable("");

// app/team
export const currentTeams = writable([]);
export const team = writable({});
export const onTeam = writable(false);
export const requestSent = writable(false);
export const myContractId = writable("");

