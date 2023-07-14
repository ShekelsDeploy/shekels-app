import { Chart, registerables } from "chart.js";
import { useEffect } from "react";
Chart.register(...registerables);
export default function BarGraf() {
    let myChart: Chart | any = null;
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    function componentDidMount() {
        canvas = document.getElementById("myChartBar") as HTMLCanvasElement;
        if (ctx === null || ctx === undefined) {
            ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
        }
        if (myChart) {
            myChart.destroy();
        }
        const data = {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [
              {
                label: "# of Votes",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          };
        myChart = new Chart(ctx as CanvasRenderingContext2D,
            {
                type: "bar",
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
                <canvas id="myChartBar"></canvas>
            </div>
        </>
    )
}