export default function Temperature({ data, unit, children }) {
    return (
        <h2
            className="relative text-[clamp(6rem,9.6vh,390px)] h-fit leading-[0.7] mx-auto mt-auto mb-3"
            style={{ gridArea: "temp" }}
        >
            {data}
            <div className="absolute inline-block top[clamp(10vh,10vh,100px) text-[clamp(1rem,1.6vh,65px)]">&nbsp;{unit}</div>
            {children}
        </h2>
    );
}
