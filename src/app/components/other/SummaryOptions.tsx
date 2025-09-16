import Image from "next/image";
import { useState, useRef } from "react";
import useOutsideClick from "../../utils/useOutsideClick";

const forecastVariables = require("../../variables/ForecastVariables.json");

function OptionLabel({ isSelector, click, children, className }) {
    return (
        <div
            className={className}
            style={{
                gridTemplateColumns: `${(isSelector && "90% 10%") || "none"}`,
                display: `${(isSelector && "grid") || ''}`,
            }}
            onClick={click}
        >
            {children}
        </div>
    );
}

export default function SummaryOptions({selector, setSelector}) {
    const keys = Object.keys(forecastVariables);

    const [visibility, setVisibility] = useState("hidden");

    const elementRef = useRef(null);

    useOutsideClick(elementRef, null, () => {
        setVisibility("hidden");
    });

    const onSelectorClick = (e: Event) => {
        setVisibility(visibility == "hidden" ? "grid" : "hidden");
    };

    const onSelectionClick = (e: Event, label: string) => {
        setSelector(label);
        setVisibility("hidden");
    };

    return (
        <div
            className="relative w-[16%] h-3/5 my-auto ml-auto mr-0 min-w-[100px]"
            ref={elementRef}
        >
            <OptionLabel
                className={`relative w-full h-full px-2 hover:scale-[1.05] cursor-pointer transition-all rounded-small shadow-normal bg-[var(--core-color)]`}
                isSelector={true}
                click={onSelectorClick}
            >
                <h3 className="m-auto h-fit w-fit">{selector}</h3>
                <Image
                    src={"/dropdown.png"}
                    height={30}
                    width={30}
                    alt={"dropdown"}
                    className="m-auto w-full h-auto overflow-auto"
                />
            </OptionLabel>

            <div
                className={`relative w-full h-auto ${visibility} grid-flow-rows`}
            >
                {keys.map((label) => (
                    <OptionLabel
                        className={`${
                            label == selector ? "hidden" : "block"
                        } relative w-full h-full px-2 hover:scale-[1.05] cursor-pointer transition-all rounded-small shadow-normal bg-[var(--core-lighter)]`}
                        key={label}
                        isSelector={false}
                        click={(e: Event) => {
                            onSelectionClick(e, label);
                        }}
                    >
                        <h4 className="m-auto w-fit h-fit">{label}</h4>
                    </OptionLabel>
                ))}
            </div>
        </div>
    );
}
