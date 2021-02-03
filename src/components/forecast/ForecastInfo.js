import React from "react";
import stateText from "./stateText";
import WeatherIcons from "../weathers/WeatherIcons";
import WeatherCondition from "../weathers/WeatherCondition";
import getDate from "../../utils/getDate";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  chartHeader: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    background: "inherit",
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(4),
    },
  },
  currentState: {
    fontSize: "1.5rem",
    [theme.breakpoints.up("sm")]: {
      fontSize: "2.5rem",
    },
  },
  chartHeaderMiddle: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
  },
  chartHeaderBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
  },
}));

function ForecastInfo({ forecasts, theme }) {
  const classes = useStyles();
  const { yesterdays, todays, current } = forecasts;
  const currentHour = getDate(current.dt, "HOURS");
  const rain = current.rain ? current.rain["1h"] + "mm" : null;
  const snow = current.snow ? current.snow["1h"] + "mm" : null;
  return (
    <div>
      <Box className={classes.chartHeader}>
        <Box className={classes.currentState}>
          {stateText(currentHour, {
            yesterdayTemps: yesterdays.temp,
            todayTemps: todays.temp,
          })}
        </Box>
        <Box className={classes.chartHeaderMiddle}>
          <WeatherIcons
            weatherIcon={current.weather[0].icon}
            classes="forecastIcon"
          />
          <Box>{current.temp}℃</Box>
        </Box>
        <Box className={classes.chartHeaderBottom}>
          <p>
            <WeatherCondition
              condition={current.weather[0]}
              rain={rain}
              snow={snow}
            />
          </p>
          <p style={{ padding: "10px" }}>체감온도 {current.feels_like}℃</p>
        </Box>
      </Box>
    </div>
    // </div>
  );
}

export default ForecastInfo;
