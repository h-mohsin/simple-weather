export const dynamic = "force-dynamic";

import ForecastDay from "./ForecastDay";
import __init from "../shared";

import "./globals.css";

import SummaryContainer from "../components/home/SummaryContainer";

export default async function Page({
    searchParams,
}: {
    searchParams: { location: string; unit: string; lat: string; lng: string };
}) {
    const [CurrentWeather] = await __init(
        searchParams
    );

    return (
        <main>
            {CurrentWeather.Forecast.map((data, i) => (
                        <ForecastDay
                            key={i}
                            data={data}
                            bgColor={
                                (i == 0 && "var(--core-color)") ||
                                "var(--secondary-color)"
                            }
                            altDay={(i == 0 && "Today") || (i == 1 && "Tomorrow")}
                        />
                    ))}

            <SummaryContainer
                WeatherObject={JSON.stringify(CurrentWeather)}
                label="Hourly forecast"
                unitType={searchParams.unit}
            />
        </main>
    );
}

