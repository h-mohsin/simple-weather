import City from "./City";
import WeatherData from "./interfaces/WeatherData";
import Forecast from "./interfaces/Forecast";

const time = require("@/app/info/time.json")

const Months = time.Months;
const WeekDays = time.WeekDays;

const NUM_DAYS_FORECAST = 3;
const NUM_HOURS_FORECAST = 12;

export default class Weather extends City {
    UV: number;
    WindSpeed: string;
    Humidity: string;
    Visibility: string;

    Forecast: Forecast[];
    HourlyForecast: (string[] | number[])[];

    private weather_data : WeatherData;

    constructor(
        location: string,
        lat_long: [number, number],
        weather_data: WeatherData    
    ) {
        super(location, lat_long, weather_data);
        this.weather_data = weather_data;

        this.UV = weather_data.current.uv;

        this.WindSpeed = `${Math.round(
            weather_data.current["wind" + City.Units.Speed_GET]
        )} ${City.Units.Speed}`;

        this.Humidity = `${weather_data.current.humidity}%`;

        this.Visibility = `${Math.round(
            weather_data.current["vis" + City.Units.Distance_GET]
        )} ${City.Units.Distance}`;

        this.Forecast = this.GetForecast(weather_data.forecast);
        this.HourlyForecast = Weather.GetHourlyData(this, weather_data.forecast, "temp" + City.Units.Temperature_GET);
    }

    public static getHourlyForecast(weather : Weather, forecastType : string = "temp") {
        return Weather.GetHourlyData(weather, weather.weather_data.forecast, forecastType + City.Units.Temperature_GET);
    }

    private GetForecast(forecast_data): Forecast[] {
        const forecastDays = forecast_data.forecastday;
        const forecasts: Array<Forecast> = [];

        let date : Date = this.Time;
        let day_index = this.Time.getDay();

        for (let i = 0; i < NUM_DAYS_FORECAST; i++) {
            const day = forecastDays[i].day;

            day_index = (day_index <= 6 && day_index) || 0;

            forecasts.push({
                icon: day.condition.icon,
                min: Math.round(day["mintemp" + City.Units.Temperature_GET]),
                max: Math.round(day["maxtemp" + City.Units.Temperature_GET]),
                day: WeekDays[day_index],
                month: Months[date.getMonth()],
                date: date.getDate()
            });

            day_index++;
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
        }

        return forecasts;
    }

    private static GetHourlyData(weather : Weather, forecast_data, data_key) {
        const forecastDays = forecast_data.forecastday;
        const next_hours_forecast = forecastDays[0].hour.concat(
            forecastDays[1].hour
        );

        const timeLabels: string[] = [];
        const values: number[] = [];
        const imgLabels: string[] = [];
        
        const currentHour = 1;
        let startHour = currentHour - 1; // we start getting the hour before the current hour's forecast
        
        let setFirstAsAverage = false;
        let total = 0;

        if (startHour < 0) { // we cant get the yesterday's forecast, so we just average
            startHour = 0;
            setFirstAsAverage = true;
        }

        const endHour = startHour + NUM_HOURS_FORECAST;

        for (let i = startHour; i <= endHour; i++) {
            const hourForecast = next_hours_forecast[i];

            timeLabels.push(new Date(hourForecast.time).toLocaleTimeString([], {
                hour: "numeric",
            }));

            imgLabels.push(hourForecast.condition.icon);

            const value = hourForecast[data_key];
            total += value;

            values.push(value);
        }

        if (setFirstAsAverage) {
            timeLabels.unshift("23");
            values.unshift(total / (endHour - startHour));
        }

        return [
            timeLabels,
            values,
            imgLabels
        ];
    }
}