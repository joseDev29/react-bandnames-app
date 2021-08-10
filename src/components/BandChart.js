import React, { useContext, useEffect, useState } from "react";
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { SocketContext } from "../context/SocketContext";

export const BandChart = () => {
  const { socket } = useContext(SocketContext);
  const [chartNames, setChartNames] = useState([]);
  const [chartVotes, setChartVotes] = useState([]);

  useEffect(() => {
    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      BarController,
      BubbleController,
      DoughnutController,
      LineController,
      PieController,
      PolarAreaController,
      RadarController,
      ScatterController,
      CategoryScale,
      LinearScale,
      LogarithmicScale,
      RadialLinearScale,
      TimeScale,
      TimeSeriesScale,
      Decimation,
      Filler,
      Legend,
      Title,
      Tooltip
    );

    let ctx = document.getElementById("myChart").getContext("2d");

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartNames,
        datasets: [
          {
            label: "# of Votes",
            data: chartVotes,
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
      },
      options: {
        scales: {
          xAxes: {
            stacked: true,
          },
        },
        indexAxis: "y",
      },
    });

    return () => {
      chart.destroy();
    };
  }, [chartNames, chartVotes]);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setChartNames(bands.map((band) => band.name));
      setChartVotes(bands.map((band) => band.votes));
    });
  }, []);

  return <canvas id="myChart"></canvas>;
};
