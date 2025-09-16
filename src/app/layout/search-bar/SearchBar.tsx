"use client";

const MAX_NUM_ELEMENTS_SEARCH = 6;

import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Toggle from "./Toggle";
import { useRouter } from "next/navigation";

const cities: Object = require("../../info/cities.json");
const popularCities = Object.keys(cities).slice(0, MAX_NUM_ELEMENTS_SEARCH);

export default function SearchBar() {
    const [searchValues, setSearchValues] = useState(popularCities);
    const searchParams = useSearchParams();
    const router = useRouter();

    const unit = searchParams.get("unit");

    function onSearch(value: string) {
        if (value === null || value === undefined) {
            return;
        }

        const filtered = Object.keys(cities).filter(
            function (this, item) {
                if (
                    this.count < MAX_NUM_ELEMENTS_SEARCH &&
                    item &&
                    item.toLowerCase().includes(value)
                ) {
                    this.count++;
                    return true;
                }

                return false;
            },
            { count: 0 }
        );

        setSearchValues(filtered);
    }

    const onCurrentLocation = async(event) => {
        event.preventDefault();
        if ("geolocation" in navigator) {
            await navigator.geolocation.getCurrentPosition(async (pos) => {
                await router.push(`/?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}&unit=${unit}`);
            })
        } 
    }

    return (
        <div className="px-[var(--components-padding-x)] py-[var(--components-padding-y-search-bar)] h-full w-full flex-search-bar z-50">
            <div
                id="search-bar-main"
                className="flex w-full h-full rounded-normal transition-all flex-row px-[var(--search-bar-padding)] min-h-[50px]"
            >
                <Image
                    src="/search_icon.png"
                    width={35}
                    height={35}
                    alt="search"
                    style={{ flex: "2 2 2%" }}
                    className="m-auto h-3/5 w-full"
                    id="search-icon"
                />

                <div
                    className="w-full h-full"
                    style={{ flex: "90 90 90%" }}
                    id="search-bar-container"
                >
                    <input
                        type="text"
                        placeholder="Search city or country"
                        id="search-bar"
                        className="w-[90%] h-full"
                        onChange={(e) => onSearch(e.target.value)}
                    />

                    <div id="search-bar-list" className="absolute z-30 pt-2 grid grid-flow-row gap-2">
                        <SearchBarResult
                            location={"Use current location"}
                            unit={unit}
                            bg={"--core-color"}
                            onClick = {onCurrentLocation}
                        >
                            <div className="grid grid-cols-[2%auto]">
                                <Image src={"/current-location.png"} height={10} width={35} alt={"current-location"} className="inline-block my-auto h-3/5 w-auto overflow-auto"/>
                                <h1 className="my-auto inline-block">Use current location</h1>
                            </div>
                        </SearchBarResult>

                        {searchValues.map((location) => (
                            <SearchBarResult
                                key={location}
                                location={location}
                                bg={"--core-lighter"}
                                unit={unit}
                                onClick={null}
                            >
                                <h1>{location}</h1>
                            </SearchBarResult>
                        ))}
                    </div>
                </div>

                <Toggle style={{ flex: "6 6 6%", minWidth: "80px" }} />
            </div>
        </div>
    );
}

function SearchBarResult({ unit, location, bg, onClick, children }) {
    return (
        <Link href={`/?location=${location}&unit=${unit}`} onClick={onClick}>
            <div
                id="search-bar-item"
                className={`bg-[var(${bg})] px-[var(--search-bar-padding)] hover:scale-[1.005] hover:bg-[var(--secondary-color)] rounded-extra-small shadow-normal none`}
            >
                {children}
            </div>
        </Link>
    );
}