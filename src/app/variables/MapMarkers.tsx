import "./MapMarkers.css";
import { Bricolage_Grotesque } from "next/font/google";
const gabarito = Bricolage_Grotesque({
    weight: "400",
    subsets: ["latin"],
});

export function MainMarker(temp, icon) {
    return (
        `<div id="main-marker">
            <div style="position:absolute; margin:auto;z-index:2; display:grid; height: 80%; width: 100%; grid-template-rows: 60% 40%;">
                <h1 style="font-family:${gabarito.style.fontFamily}; margin: auto auto 0; font-size: 20px; vertical-align:baseline; height: fit-content; width: fit-content; text-wrap: no-wrap;">${temp}</h1>
                <img src=${icon} alt="" style="height: 110%; width: auto; margin: 0 auto 0;"/>
            </div>
            <img src="/location-icon.png" alt="location" style="height:100%; width:100%; position:absolute;"/>
        </div>`
    )
}

export function SecondaryMarker(temp) {
    return (
        `<div id="secondary-marker" style="margin:auto; height: 100%; width: 100%; background-color: var(--core-color); border-radius: 50%; border: 2px solid white;">
            <h1 style="font-family:${gabarito.style.fontFamily}; top: 50%; transform: translate(0, -50%); font-size: 20px; height: fit-content; width: 100%; text-align: center; vertical-align: middle;">${temp}</h1>
        </div>`
    )
}