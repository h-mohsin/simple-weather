export default interface WeatherData {
    location : {localtime : string};
    current: {
        temp_c: number;
        condition: { text: string; icon: string };
        uv: number;
        wind_mph: number;
        wind_kph: number;
        humidity: number;
        vis_miles: number;
        vis_km: number;
    };
    forecast : {}
}
