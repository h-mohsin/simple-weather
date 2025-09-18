"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { parseHTML } from "jquery";

const units = require("../../info/units.json");

export default function Toggle({ style }) {
    return (
        <div className="h-[70%] my-auto" style={style}>
            <div
                className="relative m-auto grid bg-[var(--core-color)] w-full h-full rounded-small shadow-normal"
                style={{ gridTemplateColumns: "50% 50%" }}
            >
                <ToggleItem
                    label={units.imperial.Temperature}
                    unit="imperial"
                />
                <ToggleItem label={units.metric.Temperature} unit="metric" />
            </div>
        </div>
    );
}

function ToggleItem({ label, unit }) {

    function getNewHREF() {
        let searchParams = useSearchParams();
        let pathName = usePathname();

        let init_path;

        let location = searchParams.get("location");

        let lng = searchParams.get("lng");
        let lat = searchParams.get("lat");

        if (location == 'null' || location == null || location == "undefined" || location == undefined) {
            init_path = `?lat=${lat}&lng=${lng}&unit=${unit}`
        } else {
            init_path = `?location=${location}&unit=${unit}`
        }

        console.log(pathName, init_path)

        return pathName + init_path
    }

    function getCurrentUnit() {
        return useSearchParams().get("unit");
    }


    return (
        <Link
            href={getNewHREF()}
            className={`m-auto text-center h-4/5 w-4/5 rounded-small transition-all hover:bg-[var(--core-lighter)] hover:shadow-normal ${getCurrentUnit() == unit ? 'shadow-normal bg-[var(--core-lighter)]' : ''}`}
        >
            <h2 className="relative top-[50%] translate-y-[-50%] h-fit w-full">{label}</h2>
        </Link>
    );
}
