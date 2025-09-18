import City from "../../classes/City";
import Link from "next/link";

export default async function PopularCitiesContainer({ popular_cities }) {
    return (
        <div className="bg-secondary" id="cities">
            <div className="relative grid w-full h-full p-[var(--grid-item-padding-x)] pt-[var(--grid-item-padding-top)] grid-rows-[12%88%]">
                <h1>Popular Cities</h1>
                <div className="relative grid w-full h-full grid-rows-4 ">
                    {popular_cities.map((city: City) => (
                        <PopularCity key={city.Location} city={city} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function PopularCity({ city }) {
    return (
        <Link
            href={`?location=${city.Location}&unit=${City.UnitType}`}
            className="grid grid-cols-[20%70%10%] w-full h-full transition-all hover:bg-[var(--core-color)] hover:shadow-normal px-2 rounded-[max(0.7vw,15px)] py-1"
        >
            <img
                src={city.ConditionIcon}
                className="relative h-4/5 w-auto overflow-auto my-auto"
            />

            <h1 className="relative text-left ml-4 h-fit leading-[1.5] my-auto">
                {city.City}<div><h3 className="text-left h-full mb-auto mt-0">{city.Country}</h3></div>
            </h1>

            <h2 className="m-auto tabular-nums">{city.TemperatureString}</h2>
        </Link>
    );
}
