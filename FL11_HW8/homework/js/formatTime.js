function formatTime(time) {
    const MINUTES_IN_HOUR = 60;
    const HOURS_IN_DAY = 24;
    const days = Math.floor(time / (HOURS_IN_DAY * MINUTES_IN_HOUR));
    const hours = Math.floor(time % (HOURS_IN_DAY * MINUTES_IN_HOUR) / MINUTES_IN_HOUR);
    const minutes = time % MINUTES_IN_HOUR;
    return `${days} day(s) ${hours} hour(s) ${minutes} minute(s).`
}

console.log(formatTime(120));
console.log(formatTime(59));
console.log(formatTime(3601));
