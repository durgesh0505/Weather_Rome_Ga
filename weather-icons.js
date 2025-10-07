// Weather Icons Mapping for NWS shortForecast descriptions
function getWeatherIcon(forecast) {
    if (!forecast) return '🌡️';

    const desc = forecast.toLowerCase();

    // Clear/Sunny
    if (desc.includes('sunny') || desc.includes('clear')) {
        return '☀️';
    }

    // Partly Cloudy/Mostly Sunny
    if (desc.includes('partly cloudy') || desc.includes('mostly sunny') || desc.includes('partly sunny')) {
        return '🌤️';
    }

    // Mostly Cloudy/Partly Sunny
    if (desc.includes('mostly cloudy')) {
        return '⛅';
    }

    // Cloudy/Overcast
    if (desc.includes('cloudy') || desc.includes('overcast')) {
        return '☁️';
    }

    // Fog
    if (desc.includes('fog')) {
        return '🌫️';
    }

    // Thunderstorms
    if (desc.includes('thunderstorm') || desc.includes('t-storm')) {
        return '⛈️';
    }

    // Snow
    if (desc.includes('snow') || desc.includes('flurries') || desc.includes('sleet')) {
        return '❄️';
    }

    // Rain Showers
    if (desc.includes('showers') || desc.includes('rain')) {
        if (desc.includes('light')) {
            return '🌦️';
        }
        return '🌧️';
    }

    // Drizzle
    if (desc.includes('drizzle')) {
        return '🌦️';
    }

    // Windy
    if (desc.includes('windy') || desc.includes('breezy')) {
        return '💨';
    }

    // Default
    return '🌡️';
}

// Get precipitation type from description
function getPrecipitationType(forecast) {
    if (!forecast) return 'rain';

    const desc = forecast.toLowerCase();

    if (desc.includes('snow') || desc.includes('flurries') || desc.includes('sleet')) {
        return 'snow';
    }

    return 'rain';
}
