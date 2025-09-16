import MapObject from "../other/MapObject";

export default function Map({ cities, weather, unitType }) {
    return (
        <div className="bg-secondary overflow-hidden z-10" id="map">
            <MapObject cities={cities} weather={weather} unitType={unitType} className={null} fullScreen={false}/>
        </div>
    );
}