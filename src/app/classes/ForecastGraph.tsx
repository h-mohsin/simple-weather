import { monotoneX } from "../utils/Monotone";

export default class ForecastGraph {
    ctx: CanvasRenderingContext2D;

    values: number[];
    timeLabels: string[];
    imageLabels: string[];

    canvasHeight: number;
    canvasWidth: number;

    numLabels: number;

    minValue: number;
    maxValue: number;
    changeInValues: number;

    interval_x: number;
    xOffset: number;
    yOffset: number;

    TEMPERATURE_GRIDLINE_END_POS: number;
    TIME_GRIDLINE_END_POS: number;
    TIME_LABELS_OFFSET_BOTTOM: number;

    properties : {TopOffset : string; BottomOffset : string; RightOffset : string, T : number}

    constructor(canvasRef, timeLabels, values, imageLabels) {
        const canvas: any = canvasRef.current;

        const canvasWidth = canvas.offsetWidth;
        const canvasHeight = canvas.offsetHeight;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = canvas.getContext("2d");

        const yOffset = canvasHeight * 0.15; // offset of graph from bottom
        const xOffset = canvasHeight * (1 - 0.75); // height of the graph (1 = full height, 0 = no height)

        let minValue = Math.round(Math.min(...values)),
            maxValue = Math.round(Math.max(...values));

        let changeInValues = maxValue - minValue;

        if (changeInValues % 2 != 0) {
            maxValue++;
            changeInValues++;
        }

        const numLabels = timeLabels.length;
        const interval_x = canvasWidth / (numLabels - 1);

        this.ctx = ctx;

        this.values = values;
        this.timeLabels = timeLabels;
        this.imageLabels = imageLabels;

        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;

        this.numLabels = numLabels;

        this.minValue = minValue;
        this.maxValue = maxValue;
        this.changeInValues = changeInValues;

        this.interval_x = interval_x;
        this.xOffset = xOffset;
        this.yOffset = yOffset;

        const TEMPERATURE_LABELS_OFFSET_RIGHT = this.interval_x * (1 / 5); // controls the offset of the temperature labels from the right side of the canvas
        this.TEMPERATURE_GRIDLINE_END_POS =
            this.canvasWidth - (this.interval_x * 3) / 5; // controls the offset of the temperature gridlines from the right side of the canvas

        const TIME_GRIDLINE_OFFSET_TOP = (this.yOffset * 4) / 5;
        this.TIME_GRIDLINE_END_POS = (this.canvasHeight) - TIME_GRIDLINE_OFFSET_TOP;
        this.TIME_LABELS_OFFSET_BOTTOM =
            (this.yOffset * 2) / 5;
        
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.lineWidth = 1;

        this.properties = {
            TopOffset : ForecastGraph.toScale(TIME_GRIDLINE_OFFSET_TOP / canvasHeight), 
            BottomOffset : ForecastGraph.toScale(this.TIME_LABELS_OFFSET_BOTTOM / canvasHeight),
            RightOffset : ForecastGraph.toScale(TEMPERATURE_LABELS_OFFSET_RIGHT / canvasWidth),
            T : Date.now()
        }
    }

    static toScale(val : number) : string {
        return (val * 100) + "%";
    }
 
    GetY(temp: number): number {
        return (
            this.xOffset +
            (1 - (temp - this.minValue) / this.changeInValues) *
                (this.canvasHeight - (this.yOffset + this.xOffset))
        );
    }

    DrawCurve() {
        let x = 0,
            y = this.GetY(this.values[0]);

        this.ctx.beginPath();

        const curv = monotoneX(this.ctx);
        curv.lineStart();

        curv.point(x, this.canvasHeight);
        curv.point(x, y);

        for (let i = 1; i < this.numLabels; i++) {
            const temp = this.values[i];

            x += this.interval_x;
            y = this.GetY(temp);

            curv.point(x, y);
        }

        curv.point(this.canvasWidth, this.canvasHeight);
        curv.lineEnd();

        for (let i = 1; i < this.numLabels; i++) {
            const temp = this.values[i];

            x += this.interval_x;
            y = this.GetY(temp);

            this.ctx.roundRect(x, y, 10, (this.canvasHeight - this.yOffset)-y)
        }

        const midX = this.canvasWidth / 2;

        const gradient = this.ctx.createLinearGradient(
            midX,
            0,
            midX,
            this.canvasHeight
        );

        gradient.addColorStop(0, "#be8e6e");
        gradient.addColorStop(1, "#6ebdbe");

        this.ctx.globalAlpha = 0.8;

        this.ctx.strokeStyle = "rgba(0,0,0,0)";
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        this.ctx.closePath();
    }

    DrawGridlines() {
        this.ctx.beginPath();
        this.ctx.globalAlpha = 0.4;

        const num = Math.max(this.changeInValues / 2, 2);
        const interval = this.changeInValues / num;

        const positions_y_axis = {};

        for (let i = 0; i <= num; i++) {
            const y_interval = interval * i;
            const dif = (this.changeInValues - y_interval) / this.changeInValues;
            const y =
                this.xOffset +
                (1 - dif) * (this.canvasHeight - (this.yOffset + this.xOffset));

            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.TEMPERATURE_GRIDLINE_END_POS, y);

            positions_y_axis[ForecastGraph.toScale(y / this.canvasHeight)] = this.maxValue - y_interval;
        }

        this.ctx.closePath();

        this.ctx.strokeStyle = "white";
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.setLineDash([5, 15]);

        let x = 0;

        const positions_x_axis = {};
        const positions_x2_axis = {};

        for (let i = 0; i < this.numLabels - 2; i++) {
            x += this.interval_x;

            if (i % 2 != 0) {                
                const imgLabel = this.imageLabels[i];
                positions_x2_axis[ForecastGraph.toScale(x / this.canvasWidth)] = imgLabel;
                continue;
            }

            this.ctx.moveTo(x, this.yOffset * 1.5);
            this.ctx.lineTo(x, this.TIME_GRIDLINE_END_POS);

            positions_x_axis[ForecastGraph.toScale(x / this.canvasWidth)] =
                (i == 0 && "Now") || this.timeLabels[i];
        }

        this.ctx.stroke();

        return {
            x_axis: positions_x_axis,
            x2_axis: positions_x2_axis,
            y_axis: positions_y_axis,
            T : Date.now()
        };
    }
}
