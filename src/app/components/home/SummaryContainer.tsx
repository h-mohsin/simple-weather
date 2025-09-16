"use client";

import { useState } from "react";
import City from "../../classes/City";
import ContainerUpdate from "./ContainerUpdate";
const forecastVariables = require("../../variables/ForecastVariables.json");

export default function SummaryContainer({ WeatherObject, label, unitType }) {
    City.setUnits(unitType);

    const [elementPositions, setelementPositions] = useState({
        x_axis: {},
        x2_axis: {},
        y_axis: {},
        T : Date.now()
    });

    const [properties, setProperties] = useState({
        TopOffset: "0%",
        BottomOffset: "0%",
        RightOffset: "0%",
        T : Date.now()
    });

    const [selector, setSelector] = useState(Object.keys(forecastVariables)[0]);

    return (
        <div className="bg-secondary" id="summary">
            <ContainerUpdate 
                label = {label} 
                states = {{
                elementPositions : elementPositions, 
                setelementPositions : setelementPositions,
                properties : properties, 
                setProperties : setProperties,
                selector : selector, 
                setSelector : setSelector}}
                WeatherObject = {WeatherObject}/>
        </div>
    );
}
