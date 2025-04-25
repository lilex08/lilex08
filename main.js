// Weather
const latitude = 45.5017;
const longitude = -73.5673;

fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
    .then(response => response.json())
    .then(data => {
        const temperature = Math.round(data.current_weather.temperature);
        document.getElementById('temperature').innerText = `${temperature}°C`;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        document.getElementById('temperature').innerText = 'Error fetching temperature.';
    });

// Time
function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ampm;
}

function updateTime() {
    const now = new Date();
    const formattedTime = formatTime(now);
    document.getElementById('time').innerText = formattedTime;
}

setInterval(updateTime, 1000);
updateTime();

// Email
document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.getElementById('copyButton');
    const copyIcon = document.getElementById('copyIcon');
    const originalContent = copyButton.innerHTML;

    if (copyButton && copyIcon) {
        const parts = ['YWxleGE=', 'YmFsYW5jZWJvb2tz', 'Y28='];
        
        copyButton.addEventListener('click', async () => {
            try {
                const email = `${atob(parts[0])}@${atob(parts[1])}.${atob(parts[2])}`;
                await navigator.clipboard.writeText(email);
                copyButton.innerHTML = 'email copied to clipboard <img src="assets/check.svg" alt="copy" class="icon" id="copyIcon">';
                setTimeout(() => {
                    copyButton.innerHTML = originalContent;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });
    }
});
