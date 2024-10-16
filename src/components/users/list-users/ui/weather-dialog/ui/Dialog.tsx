import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { getWeather } from "@/services";
import { mapOffsetToTimezone } from "@/utils";
import { HourlyBarChart, CurrentWeatherInfo, BaseBlock } from "./ui";

export interface Props {
  user: User;
  open: boolean;
  handleClose: () => void;
}

export function WeatherDialog({ user, open, handleClose }: Props) {
  const { data: weather, isLoading } = useQuery({
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const today = new Date().toLocaleDateString();

  return (
    <Dialog onClose={handleClose} open={open} fullScreen={isMobile} fullWidth>
      <DialogTitle>
        <Stack direction="row" gap="2rem">
          <Stack flex="1">
            <Typography variant="h5" fontWeight="500">
              {`Weather information`}
            </Typography>
            <Typography>{today}</Typography>
            <Typography color="text.secondary">
              Timezone: {mapOffsetToTimezone(user.location.timezone.offset)}
            </Typography>
          </Stack>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Stack alignItems="center" justifyContent="center" height="200px">
            <CircularProgress />
          </Stack>
        ) : weather ? (
          <Stack gap="2rem">
            <BaseBlock title="Current Weather">
              <CurrentWeatherInfo weather={weather} />
            </BaseBlock>
            <BaseBlock title="Hourly Forecast">
              <HourlyBarChart hourly={weather.hourly} />
            </BaseBlock>
          </Stack>
        ) : (
          <Typography variant="body1">
            No weather info found for this user. Please try again later.
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}
