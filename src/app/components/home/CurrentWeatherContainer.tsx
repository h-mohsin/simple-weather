import Image from "next/image";
import Temperature from "@/app/info/temp";
import Weather from "@/app/classes/Weather";

export default function CurrentWeatherContainer({
    CurrentWeather,
}: {
    CurrentWeather: Weather;
}) {
    return (
        <div className="bg-[var(--core-color)]" id="current-weather">
            <div
                id="current-weather-container"
                className="h-full w-full p-[var(--grid-item-padding-x)] pt-[var(--grid-item-padding-top)]"
            >
                <h1 style={{ gridArea: "city" }}>{CurrentWeather.City}</h1>

                <h2 style={{ gridArea: "country" }}>
                    {CurrentWeather.Country}
                </h2>

                <h2 className="text-right" style={{ gridArea: "time" }}>
                    {CurrentWeather.Time.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                    })}
                </h2>

                <Temperature
                    data={CurrentWeather.Temperature}
                    unit={Weather.Units.Temperature}
                    children={null}
                />

                <h2
                    className="relative w-full h-full text-center"
                    style={{ gridArea: "briefing" }}
                >
                    {CurrentWeather.Condition}
                </h2>

                <img
                    className="w-3/5 h-auto m-auto overflow-auto"
                    style={{ gridArea: "weather_icon" }}
                    height={30}
                    width={30}
                    src={CurrentWeather.ConditionIcon}
                    alt="condition-icon"
                />

                <div
                    className="grid grid-cols-[25%25%25%25%] h-full w-full"
                    style={{ gridArea: "weather-conditions" }}
                >
                    <WeatherCondition
                        src="/sun.png"
                        alt="UV"
                        data={CurrentWeather.UV}
                    />

                    <WeatherCondition
                        src="/wind.png"
                        alt="Wind"
                        data={CurrentWeather.WindSpeed}
                    />

                    <WeatherCondition
                        src="/humidity.png"
                        alt="Humidity"
                        data={CurrentWeather.Humidity}
                    />

                    <WeatherCondition
                        src="/visibility.png"
                        alt="Visibility"
                        data={CurrentWeather.Visibility}
                    />
                </div>
            </div>
        </div>
    );
}

function WeatherCondition({ data, src, alt }) {
    return (
        <div className="group grid grid-rows-[50%50%] hover:shadow-normal rounded-normal hover:bg-[var(--secondary-color)] w-[90%] h-full m-auto transition-all">
            <div className="grid h-full w-full">
                <Image
                    src={src}
                    height={30}
                    width={30}
                    alt={alt}
                    className="m-auto h-4/5 w-auto row-start-1 col-start-1 group-hover:opacity-0 transition-all"
                />

                <h3 className="m-auto h-fit w-auto row-start-1 col-start-1 text-wrap opacity-0 group-hover:opacity-100 transition-all">
                    {alt}
                </h3>
            </div>

            <div className="m-auto text-nowrap">
                <h2>{data}</h2>
            </div>
        </div>
    );
}