export const dynamic = "force-dynamic";

import CurrentWeatherContainer from "./components/home/CurrentWeatherContainer";
import ForecastContainer from "./components/home/ForecastContainer";
import Map from "./components/home/Map";
import SummaryContainer from "./components/home/SummaryContainer";
import PopularCitiesContainer from "./components/home/PopularCitiesContainer";

import __init from "./shared";

export default async function Home({
    searchParams,
}: {
    searchParams: { unit: string; location: string; lat: string; lng: string };
}) {
    const [CurrentWeather, PopularCities, unitType] = await __init(searchParams);

    return (
        <main>
            <CurrentWeatherContainer CurrentWeather={CurrentWeather} />
            <Map
                cities={JSON.stringify(PopularCities)}
                weather={JSON.stringify(CurrentWeather)}
                unitType={unitType}
            />
            <PopularCitiesContainer popular_cities={PopularCities} />
            <ForecastContainer WeeklyForecast={CurrentWeather.Forecast} />
            <SummaryContainer
                WeatherObject={JSON.stringify(CurrentWeather)}
                label="Summary"
                unitType={unitType || "imperial"}
            />
        </main>
    );
}
