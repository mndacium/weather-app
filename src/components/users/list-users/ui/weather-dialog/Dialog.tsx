import * as React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getWeather } from "@/services";
import { mapOffsetToTimezone } from "@/utils";

export interface Props {
  user: User;
  open: boolean;
  handleClose: () => void;
}

export default function WeatherDialog({ user, open, handleClose }: Props) {
  const { data: weather } = useQuery({
    queryKey: ["weather", user.email],
    queryFn: () =>
      getWeather({
        latitude: user.location.coordinates.latitude,
        longitude: user.location.coordinates.longitude,
        current: ["temperature_2m", "weather_code"],
        hourly: ["temperature_2m", "weather_code"],
        daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
        forecast_hours: 5,
        forecast_days: 1,
        timezone: mapOffsetToTimezone(user.location.timezone.offset),
      }),
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        Weather for
        {` ${user.name.title} ${user.name.first} ${user.name.last}`}
      </DialogTitle>
      <DialogContent>
        <Typography>
          Timezone: {mapOffsetToTimezone(user.location.timezone.offset)}
        </Typography>
        <Typography fontWeight="500">Current:</Typography>
        <Typography>
          Temperature: {weather?.current.temperature}
          Weather: {weather?.current.weatherCode}
        </Typography>
        <Typography fontWeight="500">Daily:</Typography>
        <Typography>
          Maximal temperature: {weather?.daily.maxTemperature}
          Minimal temperature: {weather?.daily.minTemperature}
        </Typography>
        <Typography fontWeight="500">Hourly:</Typography>
        {weather?.hourly.map((hour) => (
          <Typography>
            Temperature: {hour.temperature}
            Time: {hour.time.toISOString()}
            Weather: {hour.weatherCode}
          </Typography>
        ))}
      </DialogContent>
    </Dialog>
  );
}
