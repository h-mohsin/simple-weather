export const dynamic = "force-dynamic";

import MapObject from "../components/other/MapObject";
import __init from "../shared";

export default async function Page({
    searchParams,
}: {
    searchParams: { unit: string; location: string; lat: string; lng: string };
}) {
    const [CurrentWeather, PopularCities, unitType] = await __init(
        searchParams
    );

    return (
        <MapObject
            className="absolute z-0"
            cities={JSON.stringify(PopularCities)}
            weather={JSON.stringify(CurrentWeather)}
            unitType={unitType}
            fullScreen={true}
        />
    );
}
