const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const seasons = {
    "Winter": [0, 1, 11], // December, January, February
    "Spring": [2, 3, 4],  // March, April, May
    "Summer": [5, 6, 7],  // June, July, August
    "Fall": [8, 9, 10]    // September, October, November
};

let is12HourFormat = false; // Default to 24-hour format

function getRealTime() {
    return new Date();
}

function getSimulatedTime(realTime) {
    const startTime = Date.UTC(830, 0, 1, 0, 0, 0); // Reference point in UTC (1 Jan 830 00:00:00 GMT+0)
    const referenceTime = Date.UTC(2024, 7, 15, 0, 0, 0); // Real-world reference point in UTC (1 Jan 2024 00:00:00 GMT+0)
    const timeElapsed = realTime.getTime() - referenceTime; // Milliseconds since the reference point in the real world
    const scaledTimeElapsed = timeElapsed * 4; // Apply 4x time scale
    return new Date(startTime + scaledTimeElapsed); // Return simulated time in UTC
}

function getSeason(month) {
    for (const [season, months] of Object.entries(seasons)) {
        if (months.includes(month)) {
            return season;
        }
    }
    return "Unknown Season";
}

function formatTime(hours, minutes, seconds) {
    if (is12HourFormat) {
        const period = hours >= 12 ? 'PM' : 'AM';
        const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
        return `${adjustedHours.toString().padStart(2, '0')}:${minutes} ${period}`;
    } else {
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    }
}

function updateClock() {
    const realTime = getRealTime();
    const simulatedTime = getSimulatedTime(realTime);

    const year = simulatedTime.getUTCFullYear();
    const month = simulatedTime.getUTCMonth(); // Get month index
    const monthName = monthNames[month]; // Get the name of the month
    const day = simulatedTime.getUTCDate().toString().padStart(2, '0');

    const hours = simulatedTime.getUTCHours();
    const minutes = simulatedTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = simulatedTime.getUTCSeconds().toString().padStart(2, '0');

    const season = getSeason(month);

    document.getElementById('season').textContent = `Season: ${season}`;
    document.getElementById('date-time').textContent = `${monthName} ${day}, ${year}`;
    document.getElementById('clock').textContent = formatTime(hours, minutes, seconds);
}

function toggleFormat() {
    is12HourFormat = !is12HourFormat;
    const button = document.getElementById('toggle-format');
    button.textContent = is12HourFormat ? 'Switch to 24-Hour Format' : 'Switch to 12-Hour Format';
    updateClock(); // Update time display immediately
}

document.getElementById('toggle-format').addEventListener('click', toggleFormat);

setInterval(updateClock, 250);
updateClock(); // Initial call to display time immediately
