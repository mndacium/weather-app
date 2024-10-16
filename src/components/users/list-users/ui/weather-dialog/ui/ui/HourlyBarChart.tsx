import * as React from "react";
import moment from "moment";
import { BarChart } from "@mui/x-charts/BarChart";
import Stack from "@mui/material/Stack";
import { Weather } from "@/types";
import { weatherIconMap } from "./weatherIconMap";

export interface Props {
  hourly: Weather["hourly"];
}

export function HourlyBarChart({ hourly }: Props) {
  const hourlyData = hourly.map((hour) => ({
    time: hour.time,
    temperature: hour.temperature,
    weatherDescription: weatherIconMap[hour.weatherCode].label || null,
  }));

  return (
    <Stack width="100%" maxWidth="400px" alignSelf="center">
      <BarChart
        series={[
          {
            dataKey: "temperature",
          },
        ]}
        dataset={hourly}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "time",
            valueFormatter: (time, context) =>
              context.location === "tick"
                ? moment(time).format("HH A")
                : `${moment(time).format("HH A")}: ${
                    hourlyData.find((h) => h.time === time)?.weatherDescription
                  }`,
          },
        ]}
        yAxis={[{ sx: { display: "none" } }]}
        height={200}
        margin={{ left: 0, right: 0, top: 16 }}
        barLabel={(item) => `${item.value?.toFixed()}°C`}
      />
    </Stack>
  );
}
