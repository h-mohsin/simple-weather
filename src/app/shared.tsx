import Weather from "./classes/Weather";
import City from "./classes/City";
import GetWeather from "./get_weather";
import GetPopularCities from "./info/popular_cities";

const cities = require("./info/cities.json");

function invalid(x : any) {
    return x == null || x == 'null' || x == undefined || x == 'undefined';
}

export default async function __init(searchParams) {
    let unitType = searchParams.unit;

    if (invalid(unitType)) {
        unitType = "imperial";
    }

    City.setUnits(unitType);


    let location = decodeURIComponent(searchParams.location);

    let coordinates;

    if (invalid(searchParams.lat) || invalid(searchParams.lng)) {
        if (invalid(location)) {
            location = "Tokyo, Japan";
        }
    
        coordinates = cities[location].split(" ");
    } else {
        coordinates = [searchParams.lat, searchParams.lng];
    }

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