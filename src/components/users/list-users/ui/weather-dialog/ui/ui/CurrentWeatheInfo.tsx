import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { weatherIconMap } from "./weatherIconMap";
import { Weather } from "@/types";
import SvgIcon from "@mui/material/SvgIcon";

interface Props {
  weather: Weather;
}

export function CurrentWeatherInfo({ weather }: Props) {
  const weatherInfo = weatherIconMap[weather.current.weatherCode];

  if (!weatherInfo) {
    return null;
  }

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      flex={1}
      justifyContent="space-between"
      alignItems={{ xs: "start", md: "center" }}
      gap="1rem"
    >
      <Stack flexDirection="row" alignItems="center" gap="0.75rem">
        <SvgIcon htmlColor={weatherInfo.color} style={{ fontSize: 40 }}>
          {weatherInfo.icon}
        </SvgIcon>
        <Stack>
          <Typography variant="h6" fontWeight="700">
            {weather.current.temperature.toFixed()}°C
          </Typography>
          <Typography color="text.secondary">{weatherInfo.label}</Typography>
        </Stack>
      </Stack>

      <Stack>
        <Stack direction="row" gap="0.25rem" alignItems="center">
          <DeviceThermostatIcon />
          <Typography variant="body1" fontWeight={500}>
            High: {weather.daily.maxTemperature.toFixed()}
            °C
          </Typography>
        </Stack>
        <Stack direction="row" gap="0.25rem" alignItems="center">
          <DeviceThermostatIcon />
          <Typography variant="body1" fontWeight={500}>
            Low: {weather.daily.minTemperature.toFixed()}
            °C
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
