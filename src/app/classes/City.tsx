import WeatherData from "./interfaces/WeatherData";
import Units from "./interfaces/Units";

const allUnitTypes = require("../info/units.json")

export default class City {
    Location: string; // unique identifier for each object

    City : string;
    Country : string;
    
    Time: Date;
    Coordinates: [number, number];

    Temperature: number;
    TemperatureString : string;

    Condition: string;
    ConditionIcon: string;

    static UnitType: string;
    static Units : Units;

    constructor(
        location: string,
        coords: [number, number],
        data: WeatherData,
    ) {
        [this.City, this.Country] = location.split(", ");

        this.Location = location;
        this.Time = new Date(data.location.localtime);
        this.Coordinates = coords;

        this.Temperature = Math.round(
            data.current["temp" + City.Units.Temperature_GET]
        );
        this.TemperatureString = this.Temperature + "°"

        this.Condition = data.current.condition.text;
        this.ConditionIcon = data.current.condition.icon;
    }

    static setUnits(unitType : string) {
        console.log(unitType);
        City.UnitType = unitType;
        City.Units = allUnitTypes[unitType];
    }
}
