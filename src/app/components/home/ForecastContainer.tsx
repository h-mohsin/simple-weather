import Link from "next/link";
import Forecast from "@/app/classes/interfaces/Forecast";

export default function ForecastContainer({ WeeklyForecast } : { WeeklyForecast : Forecast[] }) {
    return (
        <Link href={"/forecast"} className="bg-secondary" id="forecast">
            <div className="relative grid w-full h-full p-[var(--grid-item-padding-x)] pt-[var(--grid-item-padding-top)] grid-rows-[12%88%]">
                <h1>Forecast</h1>
                <div className="relative grid w-full h-full grid-rows-6">
                    {WeeklyForecast.map((data: any) => (
                        <ForecastItem
                            key={data.day}
                            icon={data.icon}
                            min_temp={data.min}
                            max_temp={data.max}
                            day={data.day}
                        />
                    ))}
                </div>
            </div>
        </Link>
    );
}

function ForecastItem({
    icon,
    min_temp,
    max_temp,
    day
}: {
    icon: string;
    min_temp: number;
    max_temp: number;
    day: string;
}) {
    return (
        <div className="grid grid-cols-[20%27.5%5%27.5%20%] h-full">
            <img
                src={icon}
                alt="weather-icon"
                className="relative my-auto h-4/5 w-auto overflow-auto"
            />
            <h2 className="m-auto w-full text-right tabular-nums">
                {min_temp}°
            </h2>
            <h2 className="m-auto">|</h2>
            <h2 className="m-auto text-left w-full tabular-nums">
                {max_temp}°
            </h2>
            <h2 className="m-auto float-right">{day}</h2>
        </div>
    );
}