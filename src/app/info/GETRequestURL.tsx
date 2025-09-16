export default function createGETRequestURL(lat : number, lng : number) {
    return `http://api.weatherapi.com/v1/forecast.json?key=90e68d8e8cfc4128a5e205203240209&q=${lat} ${lng}&days=14&aqi=no&alerts=no`;
}