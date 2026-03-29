// Refresh interval: 5 minutes in milliseconds
const REFRESH_INTERVAL = 5 * 60 * 1000;

// NWS API endpoints
const NWS_API = {
    hourly: 'https://api.weather.gov/gridpoints/FFC/20,107/forecast/hourly',
    daily: 'https://api.weather.gov/gridpoints/FFC/20,107/forecast'
};

const FETCH_OPTIONS = {
    cache: 'no-store',
    headers: {
        'Accept': 'application/geo+json'
    }
};

// Theme management (no persistence - always starts with dark theme for TV display)
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');

    // Always default to dark theme on load (warm dark palette for blue-tinted TV)
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';

    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const html = document.documentElement;
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = body.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        // Switch to light
        html.setAttribute('data-theme', 'light');
        body.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        // Switch to dark
        html.setAttribute('data-theme', 'dark');
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }
}

// Format time to 12-hour format
function formatTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:00 ${ampm}`;
}

// Format day of week
function formatDay(dateString) {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
}

// Format date as m/dd
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // Months are 0-indexed
    const day = date.getDate();
    return `${month}/${day}`;
}

function formatPercent(value) {
    return Number.isFinite(value) ? `${Math.round(value)}%` : '--';
}

function getDateKey(dateInput) {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function buildDailySummaries(periods) {
    const todayKey = getDateKey(new Date());
    const summaries = new Map();

    for (const period of periods) {
        const dateKey = getDateKey(period.startTime);

        if (dateKey === todayKey) {
            continue;
        }

        if (!summaries.has(dateKey)) {
            summaries.set(dateKey, {
                date: period.startTime,
                daytime: null,
                nighttime: null,
                fallback: period
            });
        }

        const summary = summaries.get(dateKey);

        if (period.isDaytime && !summary.daytime) {
            summary.daytime = period;
        }

        if (!period.isDaytime && !summary.nighttime) {
            summary.nighttime = period;
        }
    }

    return Array.from(summaries.values()).slice(0, 5);
}

// Display error message
function showError(message) {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = `
        <div class="alert error">
            ❌ ${message}
        </div>
    `;
}

// Clear error message
function clearError() {
    const errorContainer = document.getElementById('errorContainer');
    errorContainer.innerHTML = '';
}

// Fetch weather data from NWS API
async function fetchWeatherData() {
    try {
        clearError();

        // Fetch both hourly and daily forecasts
        const [hourlyResponse, dailyResponse] = await Promise.all([
            fetch(NWS_API.hourly, FETCH_OPTIONS),
            fetch(NWS_API.daily, FETCH_OPTIONS)
        ]);

        if (!hourlyResponse.ok || !dailyResponse.ok) {
            throw new Error('Failed to fetch weather data from NWS API');
        }

        const hourlyData = await hourlyResponse.json();
        const dailyData = await dailyResponse.json();

        return {
            hourly: hourlyData.properties.periods,
            daily: dailyData.properties.periods
        };

    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError(`Failed to fetch weather data: ${error.message}`);
        return null;
    }
}

// Update current weather display
function updateCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('currentWeather');

    // Get current hour data (first period)
    const current = data.hourly[0];

    const temperature = current.temperature;
    const humidity = current.relativeHumidity?.value;
    const precipProb = current.probabilityOfPrecipitation.value || 0;
    const shortForecast = current.shortForecast;

    const icon = getWeatherIcon(shortForecast);

    // Update favicon with current weather icon
    updateFavicon(icon);

    currentWeatherDiv.innerHTML = `
        <div class="weather-icon">${icon}</div>
        <div class="current-temp">${temperature}°F</div>
        <div class="feels-like">${shortForecast}</div>
        <div class="weather-details">
            <div class="detail-item">
                <span class="detail-label">Humidity</span>
                <span class="detail-value">${formatPercent(humidity)}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Precip</span>
                <span class="detail-value">${formatPercent(precipProb)}</span>
            </div>
        </div>
    `;
}

// Update hourly forecast (next 5 hours, every hour)
function updateHourlyForecast(data) {
    const hourlyForecastDiv = document.getElementById('hourlyForecast');
    const hourly = data.hourly;
    const now = new Date();

    let hoursHTML = '';
    let count = 0;

    // Find forecasts that are in the future (start from next hour)
    for (let i = 0; i < hourly.length && count < 5; i++) {
        const period = hourly[i];
        const forecastTime = new Date(period.startTime);

        // Only include forecasts for upcoming hours (skip current and past hours)
        if (forecastTime > now) {
            const time = period.startTime;
            const temp = period.temperature;
            const shortForecast = period.shortForecast;
            const precipProb = period.probabilityOfPrecipitation.value || 0;
            const icon = getWeatherIcon(shortForecast);

            hoursHTML += `
                <div class="hourly-item">
                    <span class="hourly-time">${formatTime(time)}</span>
                    <span class="hourly-icon">${icon}</span>
                    <div style="text-align: right;">
                        <div class="hourly-temp">${temp}°F</div>
                        <div class="precip-info">${formatPercent(precipProb)}</div>
                    </div>
                </div>
            `;
            count++;
        }
    }

    hourlyForecastDiv.innerHTML = hoursHTML;
}

// Update daily forecast (next 5 days)
function updateDailyForecast(data) {
    const dailyForecastDiv = document.getElementById('dailyForecast');
    const dailySummaries = buildDailySummaries(data.daily);

    let daysHTML = '';

    for (const summary of dailySummaries) {
        const displayPeriod = summary.daytime || summary.fallback;
        const nightPeriod = summary.nighttime || summary.fallback;
        const date = displayPeriod.startTime;
        const tempHigh = summary.daytime ? summary.daytime.temperature : displayPeriod.temperature;
        const tempLow = nightPeriod.temperature;
        const shortForecast = displayPeriod.shortForecast;
        const precipProb = displayPeriod.probabilityOfPrecipitation.value || 0;
        const icon = getWeatherIcon(shortForecast);

        daysHTML += `
            <div class="daily-item">
                <div>
                    <span class="daily-day">${formatDay(date)}</span>
                    <span class="daily-date">${formatDate(date)}</span>
                </div>
                <span class="daily-icon">${icon}</span>
                <div style="text-align: right;">
                    <div class="daily-temps">
                        <span class="temp-high">${tempHigh}°</span>
                        <span class="temp-low">${tempLow}°</span>
                    </div>
                    <div class="precip-info">${formatPercent(precipProb)}</div>
                </div>
            </div>
        `;
    }

    dailyForecastDiv.innerHTML = daysHTML;
}

// Update last updated timestamp
function updateLastUpdated() {
    const lastUpdatedText = document.getElementById('lastUpdatedText');
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        month: 'short',
        day: 'numeric'
    });
    lastUpdatedText.textContent = `Last updated: ${timeString}`;
}

// Update favicon with weather icon
function updateFavicon(iconEmoji) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw emoji
    ctx.font = '48px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(iconEmoji, 32, 32);

    // Convert to data URL and set as favicon
    const faviconLink = document.getElementById('favicon');
    faviconLink.href = canvas.toDataURL('image/png');
}

// Main update function
async function updateWeather() {
    const data = await fetchWeatherData();

    if (data) {
        updateCurrentWeather(data);
        updateHourlyForecast(data);
        updateDailyForecast(data);
        updateLastUpdated();
    }
}

// Fullscreen toggle functionality
function toggleFullscreen() {
    const fullscreenToggle = document.getElementById('fullscreenToggle');

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Fullscreen request failed:', err);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Initialize fullscreen button
function initFullscreen() {
    const fullscreenToggle = document.getElementById('fullscreenToggle');

    // Add click event to fullscreen button
    fullscreenToggle.addEventListener('click', toggleFullscreen);

    // Listen for fullscreen changes to update icon
    document.addEventListener('fullscreenchange', function() {
        const fullscreenToggle = document.getElementById('fullscreenToggle');
        if (document.fullscreenElement) {
            fullscreenToggle.textContent = '🗗'; // Exit fullscreen icon
        } else {
            fullscreenToggle.textContent = '⛶'; // Enter fullscreen icon
        }
    });
}

// Initialize the app
async function init() {
    initTheme();
    initFullscreen();
    await updateWeather();

    // Set up auto-refresh every 5 minutes
    setInterval(updateWeather, REFRESH_INTERVAL);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
