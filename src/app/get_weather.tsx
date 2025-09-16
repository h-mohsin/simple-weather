import GETRequestURL from "./info/GETRequestURL";
import axios from "axios";

export default async function GetWeather(lat: number, lng : number) {
    return (await axios.get(GETRequestURL(lat, lng))).data;
}