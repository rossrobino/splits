import { writable } from "svelte/store";

export const colorList = writable([
	"rgb(68,0,245)",
	"rgb(50,196,177)",
	"rgb(233,0,169)",
	"rgb(224,224,224)",
	"rgb(46,52,64)",
]);

// base layout - user auth and profile
export const user = writable(false);
export const userProfile = writable(false);

// $lib/components/NavBar/SwapTheme
export const theme = writable("");

// $lib/components/LapTable
export const totalLaps = writable(0);

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
// SetGuests
export const guests = writable([]);

// app/team
export const currentTeams = writable([]);
export const team = writable({});
export const onTeam = writable(false);
export const requestSent = writable(false);
export const myContractId = writable("");
