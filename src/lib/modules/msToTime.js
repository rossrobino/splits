// https://sabe.io/blog/javascript-convert-milliseconds-seconds-minutes-hours

export const msToTime = (ms, hund=true) => {
    const hun = Math.floor((ms/10)%100);
    const sec = Math.floor((ms/1000) % 60);
    const min = Math.floor((ms/1000/60)%60);
    // const hr  = Math.floor((ms/1000/60/60)%24);
    let time = [];
    if (hund) {
        time = [
            // hr.toString().padStart(2,"0"),
            min.toString().padStart(2,"0"),
            sec.toString().padStart(2,"0"),
            hun.toString().padStart(2,"0"),
        ].join(":");
    } else {
        time = [
            // hr.toString().padStart(2,"0"),
            min.toString().padStart(2,"0"),
            sec.toString().padStart(2,"0"),
        ].join(":");
    }
    
    return time;
}