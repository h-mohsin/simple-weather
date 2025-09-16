import Weather from "./classes/Weather";
import City from "./classes/City";
import GetWeather from "./get_weather";
import GetPopularCities from "./info/popular_cities";

const cities = require("./info/cities.json");

export default async function __init(searchParams) {
    let location = decodeURIComponent(searchParams.location);

    const coordinates = (searchParams.lat == undefined &&
        searchParams.lng == undefined &&
        cities[location].split(" ")) || [searchParams.lat, searchParams.lng];

    const unitType = searchParams.unit;
    City.setUnits(unitType);

    const location_data = await GetWeather(coordinates[0], coordinates[1]);
    const PopularCities = await GetPopularCities();

    if (location === "undefined") {
        location = `${location_data.location.name}, ${location_data.location.country}`;
    }

    const CurrentWeather = new Weather(location, coordinates, location_data);

    return [
        CurrentWeather,
        PopularCities,
        unitType
    ]
}