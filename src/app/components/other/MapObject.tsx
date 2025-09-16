"use client";

import { useRouter } from "next/navigation";
import { MainMarker, SecondaryMarker } from "../../variables/MapMarkers";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import Weather from "../../classes/Weather";
import City from "../../classes/City";

const main_icon_len = 80;
const secondary_icon_len = 40;

const icon = L.DivIcon.extend({
    options: {
        className: "bg-[rgba(0, 0, 0, 0)]",
    },
});

export default function MapObject({ className, cities, weather, unitType, fullScreen }) {
    const router = useRouter();

    const CurrentWeather: Weather = JSON.parse(weather);
    const PopularCities: Array<City> = JSON.parse(cities);

    for (let i = 0; i < PopularCities.length; i++) {
        const city = PopularCities[i];

        if (city.Location === CurrentWeather.Location) {
            delete PopularCities[i];
        }
    }

    const LocationOnClick = () => {
        useMapEvents({
            click(e) {
                const latlng = e.latlng
                router.push(`/?lat=${latlng.lat}&lng=${latlng.lng}&unit=${unitType}`)
            }
        })

        return null;
    }

    return (
        <MapContainer
            className={className}
            key={CurrentWeather.Location}
            center={CurrentWeather.Coordinates}
            zoom={7}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            attributionControl={false}
            minZoom={3}
            maxZoom={10}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.thunderforest.com/">Thunderforest</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=358d4de79c7641f1acbf8f7e5e66acaf"
            />

            {fullScreen == true && <LocationOnClick/>}

            <Marker
                position={CurrentWeather.Coordinates}
                icon={
                    new icon({
                        html: MainMarker(
                            CurrentWeather.TemperatureString,
                            CurrentWeather.ConditionIcon
                        ),
                        iconSize: [main_icon_len, main_icon_len],
                        iconAnchor: [main_icon_len / 2, main_icon_len],
                    })
                }
            />

            {PopularCities.map((PopularCity: City) => (
                <Marker
                    key={PopularCity.Location}
                    position={PopularCity.Coordinates}
                    icon={
                        new icon({
                            html: SecondaryMarker(
                                PopularCity.TemperatureString
                            ),
                            iconSize: [secondary_icon_len, secondary_icon_len],
                            iconAnchor: [
                                secondary_icon_len / 2,
                                secondary_icon_len,
                            ],
                        })
                    }
                    eventHandlers={{
                        click: () => {
                            router.push(
                                `/?location=${PopularCity.Location}&unit=${unitType}`
                            );
                            // we can't use unit type from the class since that has been initialized on the server and not the client
                        },
                    }}
                />
            ))}
        </MapContainer>
    );
}
