// https://sabe.io/blog/javascript-convert-milliseconds-seconds-minutes-hours

export const msToTime = (ms, hund = true, hrs = false) => {
    const hun = Math.floor((ms / 10) % 100);
    const sec = Math.floor((ms / 1000) % 60);
	const min = Math.floor((ms / 1000 / 60) % 60);
	let hr;
	if (hrs) {
		hr  = Math.floor((ms/1000/60/60)%24);
	}
    
	let time = "";
	let minutes = min.toString().padStart(2, "0");
	let seconds = sec.toString().padStart(2, "0");
	let hundredths = 0;
	if (hund) {
		hundredths = hun.toString().padStart(2, "0");
		time = `${minutes}:${seconds}.${hundredths}`;
	} else if (hrs) {
		time = `${hr}:${minutes}:${seconds}`;
	} else {
		time = `${minutes}:${seconds}`;
	}
    return time;
};
