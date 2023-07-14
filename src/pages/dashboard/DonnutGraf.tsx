import { Chart, registerables } from "chart.js";
import { useEffect } from "react";
Chart.register(...registerables);
export default function DonnutGraf() {
    let myChart: Chart | any = null;
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    function componentDidMount() {
        canvas = document.getElementById("myChart") as HTMLCanvasElement;
        if (ctx === null || ctx === undefined) {
            ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
        }
        if (myChart) {
            myChart.destroy();
        }
        const data = {
            labels: [
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [300, 50, 100],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        };
        const config = {
            type: 'doughnut',
            data: data,
        };
        myChart = new Chart(ctx as CanvasRenderingContext2D,
            {
                type: "doughnut",
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
    }
    useEffect(() => {
        // Update the document title using the browser API
        componentDidMount();
    });
    return (
        <>
            <div className="h-72 px-20">
                <canvas id="myChart"></canvas>
            </div>
        </>
    )
}