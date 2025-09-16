"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";

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
    const searchParams = useSearchParams();
    const pathName = usePathname();

    const location = searchParams.get("location");
    const unit_current = searchParams.get("unit");

    return (
        <Link
            href={pathName + `?location=${location}&unit=${unit}`}
            className={`m-auto text-center h-4/5 w-4/5 rounded-small transition-all hover:bg-[var(--core-lighter)] hover:shadow-normal ${unit_current == unit ? 'shadow-normal bg-[var(--core-lighter)]' : ''}`}
        >
            <h2 className="relative top-[50%] translate-y-[-50%] h-fit w-full">{label}</h2>
        </Link>
    );
}
