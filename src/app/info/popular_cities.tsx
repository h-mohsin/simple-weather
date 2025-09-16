import GetWeather from "../get_weather";
import City from '../classes/City'

const MAX_NUM_ELEMENTS_SEARCH = 4;

const cities = require("./cities.json");
const popularCities : Object = Object.fromEntries(Object.entries(cities).splice(0, MAX_NUM_ELEMENTS_SEARCH))

export default async function GetPopularCities() {    
    const popular_cities: Array<City> = [];

    for (const location in popularCities) {
        const lat_long : [number, number] = popularCities[location].split(" ");
        const data = await GetWeather(lat_long[0], lat_long[1]);
        popular_cities.push(new City(location, lat_long, data))
    }

    return popular_cities;
};