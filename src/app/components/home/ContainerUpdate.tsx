import SummaryOptions from "../other/SummaryOptions";
import ForecastGraph from "../../classes/ForecastGraph";
import Weather from "../../classes/Weather";
import { useEffect, useRef } from "react";

export default function ContainerUpdate({label, states, WeatherObject}) {

    const currentWeather : Weather = JSON.parse(WeatherObject);
    let [TimeLabels, Temperatures, ImageLabels] = currentWeather.HourlyForecast;
    const canvasRef = useRef(null);

    const renderCurve = (TimeLabels, Temperatures) => {
        const graph = new ForecastGraph(
            canvasRef,
            TimeLabels,
            Temperatures,
            ImageLabels
        );

        graph.DrawCurve();
        
        states.setelementPositions(graph.DrawGridlines());
        states.setProperties(graph.properties);
    }

    function deepCompareEquals(a, b){

        if (b == undefined) return false;

        a.forEach(element_1 => {
            b.forEach(element_2 => {
                if (element_1 != element_2) return false;
            })
        })

        return true;
    }

    function useDeepCompareMemoize(value) {
        const ref = useRef() 
        // it can be done by using useMemo as well
        // but useRef is rather cleaner and easier

        if (!deepCompareEquals(value, ref.current)) {
            ref.current = value
        }

        return ref.current
    }

    function useDeepCompareEffect(callback, dependencies) {
        useEffect(
            callback,
            dependencies.map(useDeepCompareMemoize)
        )
    }

    useDeepCompareEffect(() => {
        [TimeLabels, Temperatures, ImageLabels] = Weather.getHourlyForecast(currentWeather); 
        renderCurve(TimeLabels, Temperatures);

        let rtime;
        let timeout = false;
        let delta = 200;

        const window = global.window;

        if (typeof window != 'undefined') {
            window.addEventListener('resize',function() {
                rtime = Date.now();
                if (timeout === false) {
                    timeout = true;
                    setTimeout(resizeend, delta);
                }
            });
        }

        function resizeend() {
            if (Date.now() - rtime < delta) {
                setTimeout(resizeend, delta);
            } else {
                timeout = false;
                renderCurve(TimeLabels, Temperatures);
            }               
        }
    }, [TimeLabels, Temperatures])


    return (
        <div >
            <div className="absolute grid grid-rows-[10%90%] w-full h-full grid-cols-[50%50%] p-[var(--grid-item-padding-x)] pt-[var(--grid-item-padding-top)] z-10">
                <h1>{label}</h1>
                <SummaryOptions selector={states.selector} setSelector={states.setSelector}/>
            </div>
            <div>
                <canvas
                    ref={canvasRef}
                    className="h-full w-full absolute"
                    style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
                <div>
                    {Object.keys(states.elementPositions.y_axis).map((pos: any) => (
                        <h2
                            key={pos}
                            className="absolute text-right w-full tabular-nums"
                            style={{
                                top: pos,
                                right: states.properties.RightOffset,
                                transform: "translate(0, -50%)",
                            }}
                        >
                            {states.elementPositions.y_axis[pos]}°
                        </h2>
                    ))}
                </div>

                <div>
                    {Object.keys(states.elementPositions.x_axis).map((pos: any) => (
                        <h2
                            key={pos}
                            className="absolute w-fit"
                            style={{
                                left: pos,
                                bottom: states.properties.BottomOffset,
                                transform: "translate(-50%, 0)",
                            }}
                        >
                            {states.elementPositions.x_axis[pos]}
                        </h2>
                    ))}
                </div>

                <div>
                    {Object.keys(states.elementPositions.x2_axis).map((pos: any) => (
                        <img
                            key={pos}
                            src={states.elementPositions.x2_axis[pos]}
                            className="absolute w-auto h-[10%]"
                            style={{
                                left: pos,
                                top: states.properties.TopOffset,
                                transform: "translate(-50%, 25%)",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}