import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-datalabels";
import "./chart.css";
import getDate from "../../utils/getDate";
import setHourIndex from "../../utils/getHourIndex";
import { IconContext } from "react-icons";
import { WiCloudy } from "react-icons/wi";

function setTemp(yesterday, today, tomorrows) {
  const current = [...yesterday, ...today, ...tomorrows];
  const prev = [...yesterday, ...yesterday, ...today];
  return { current, prev };
}

const setData = (now, labels, temps) => {
  return {
    labels: labels,
    datasets: [
      {
        label: "오늘 날씨",
        data: temps.current,
        fill: false,
        backgroundColor: "rgb(101, 81, 0)",
        borderColor: "rgba(101, 81, 0)",
        pointStyle: "circle",
        yAxisID: "y-axis-1",
      },
      {
        label: "어제 날씨",
        data: temps.prev,
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        borderColor: "rgba(54, 162, 235, 0.3)",
        pointStyle: "circle",
        yAxisID: "y-axis-1",
        datalabels: {
          backgroundColor: (context) => {
            if (context.dataIndex === now) return "pink";
            if (context.active && context.dataIndex < 8) return "rgba(0,0,0,0)";

            return "white";
          },
          borderColor: (context) => {
            if (context.active && context.dataIndex < 8) return "rgba(0,0,0,0)";

            return "rgba(54, 162, 235, 0.3)";
          },
          color: (context) => {
            if (context.active && context.dataIndex < 8) return "rgba(0,0,0,0)";

            return "black";
          },
        },
      },
    ],
  };
};

const setLabelesOption = (now) => {
  return {
    align: (context) => {
      if (context.active) {
        const index = context.dataIndex;
        const datasets = context.chart.data.datasets;
        const v0 = datasets[0].data[index];
        const v1 = datasets[1].data[index];
        const invert = v0 - v1 > 0;
        return context.datasetIndex === 0
          ? invert
            ? "end"
            : "start"
          : invert
          ? "start"
          : "end";
      }
      return "center";
    },
    backgroundColor: (context) => {
      if (context.dataIndex === now) return "pink";
      if (context.active) return "white";
      if (context.dataIndex % 8 !== 0) return "white";

      return context.dataset.backgroundColor;
    },
    borderColor: (context) => {
      console.log(context);

      return context.dataset.backgroundColor;
    },
    borderRadius: (context) => {
      return context.active ? 0 : 16;
    },
    borderWidth: 3,
    color: (context) => {
      if (context.active) return "black";
      if (context.dataIndex % 8 === 0) return "white";

      return context.dataset.backgroundColor;
    },
    font: {
      weight: "bold",
    },
    padding: 3,
    offset: 8,
    textAlign: "center",
    formatter: (value, context) => {
      value = Math.round(value);
      return context.active
        ? context.dataset.label + "\n" + value + "℃"
        : Math.round(value);
    },
    listeners: {
      click: (context) => {
        console.log("click: " + context.dataIndex);
      },
    },
  };
};

const setOptions = (labeles) => {
  return {
    plugins: {
      datalabels: labeles,
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: false,
            fontColor: "black",
            fontSize: 16,
            minRotation: 0,
            maxRotation: 0,
            callback: (value, index) => {
              if (index % 8 === 0) return value;
              return value[1];
            },
          },
          gridLines: {
            display: true,
          },
        },
      ],
      yAxes: [
        {
          id: "y-axis-1",
          display: false,
          ticks: {
            suggestedMin: -20,
            suggestedMax: 40,
            stepSize: 1,
          },
          zeroLineColor: "rgba(0, 0, 0, 0.25)",
          zeroLineWidth: 1,
        },
      ],
    },
    layout: {
      padding: {
        top: 16,
        bottom: 16,
        left: 16,
        right: 16,
      },
    },
    hover: {
      mode: "index",
      intersect: false,
    },
    // responsive: false,
    maintainAspectRatio: false,
    tooltip: { enable: false },
  };
};

function Graph({ yesterdays, todays, tomorrows, lastUpdate }) {
  const currentIndex = setHourIndex(getDate(lastUpdate, "HOURS")) + 8;

  const labels = [...yesterdays.dt, ...todays.dt, ...tomorrows.dt];
  const temps = setTemp(yesterdays.temp, todays.temp, tomorrows.temp);
  const data = setData(currentIndex, labels, temps);
  const labelsOption = setLabelesOption(currentIndex);
  const options = setOptions(labelsOption);
  return (
    <>
      <div className="chartWrapper">
        <p>{`업데이트: ${getDate(lastUpdate, "HOURS")}시${getDate(
          lastUpdate,
          "MINUTES"
        )}분`}</p>
        <div className="chartAreaWrapper">
          <div className="chartIcons">
            <IconContext.Provider value={{ size: "2.5rem", margin: "0.5rem" }}>
              <WiCloudy />
              <WiCloudy />
              <WiCloudy />
              <WiCloudy />
              <WiCloudy />
              <WiCloudy />
            </IconContext.Provider>
          </div>
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
}

export default Graph;
