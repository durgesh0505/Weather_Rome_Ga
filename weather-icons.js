// Weather Icons Mapping for NWS shortForecast / observation textDescription
// isDaytime comes from the NWS period (defaults to day when unknown)
function getWeatherIcon(forecast, isDaytime = true) {
    if (!forecast) return '🌡️';

    const desc = forecast.toLowerCase();

    // Mostly Sunny/Partly Sunny/Mostly Clear/Partly Cloudy (checked before plain Sunny/Clear so they are reachable)
    if (desc.includes('partly cloudy') || desc.includes('mostly sunny') || desc.includes('partly sunny') || desc.includes('mostly clear')) {
        return isDaytime ? '🌤️' : '🌙';
    }

    // Clear/Sunny
    if (desc.includes('sunny') || desc.includes('clear')) {
        return isDaytime ? '☀️' : '🌙';
    }

    // Mostly Cloudy
    if (desc.includes('mostly cloudy')) {
        return isDaytime ? '⛅' : '☁️';
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
        if (desc.includes('light') && isDaytime) {
            return '🌦️';
        }
        return '🌧️';
    }

    // Drizzle
    if (desc.includes('drizzle')) {
        return isDaytime ? '🌦️' : '🌧️';
    }

    // Windy
    if (desc.includes('windy') || desc.includes('breezy')) {
        return '💨';
    }

    // Default
    return '🌡️';
}
