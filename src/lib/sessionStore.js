import { writable } from 'svelte/store';

// base layout - user auth and profile
export const user = writable(false);
export const userProfile = writable(false);

// app/user/[username]
export const routeProfile = writable(false);

// app/event/track - lib/timer
export const timerInterval = writable(false);
export const startTime = writable(0);
export const totalMs = writable(0);
export const time = writable({
    "hun": 0,
    "sec": 0,
    "min": 0,
    "hr": 0,
});

// app/event/track - ./tiles
export const trackAthletes = writable(false);
export const lapAllWarning = writable(false);