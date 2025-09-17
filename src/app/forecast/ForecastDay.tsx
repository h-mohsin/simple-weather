import City from "../classes/City";
import Temperature from "../info/temp";
import Link from "next/link";
const times = require("../info/time.json");

export default function ForecastDay({ data, bgColor, altDay }) {
    return (
        <Link
            href="/home"
            className="relative w-full p-[var(--grid-item-padding-x)] py-[var(--grid-item-padding-top)]"
            style={{ backgroundColor: bgColor }}
        >
            <h1 style={{ gridArea: "day" }}>{altDay || data.day}</h1>
            <h2 style={{ gridArea: "date" }}>{`${data.month.substring(0, 3)} ${data.date}`}</h2>
            <img
                height={50}
                width={50}
                src={data.icon}
                alt="weather"
                style={{ gridArea: "icon" }}
                className="w-auto h-full m-auto"
            />
            <Temperature data = {data.max} unit={City.Units.Temperature}>{data.min && <sub className="text-xl">/ {Math.round(data.min)}°</sub>}</Temperature>
            <h2 className='relative w-full h-full text-center text-xl' style = {{gridArea: 'briefing'}}>{data.condition}</h2>
        </Link>
    );
}