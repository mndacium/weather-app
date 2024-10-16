import { fetchWeatherApi } from "openmeteo";
import { Weather } from "@/types";

export const getWeather = async (params: {
  [key: string]: any;
}): Promise<Weather> => {
  try {
    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const response = responses[0];

    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const utcOffsetSeconds = response.utcOffsetSeconds();

    const current = response.current()!;
    const hourly = response.hourly()!;
    const daily = response.daily()!;

    const weatherData = {
      current: {
        temperature: current.variables(0)!.value(),
        weatherCode: current.variables(1)!.value(),
      },
      daily: {
        maxTemperature: daily.variables(1)!.valuesArray()![0],
        minTemperature: daily.variables(2)!.valuesArray()![0],
      },
      hourly: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval()
      ).map((t, i) => ({
        time: new Date((t + utcOffsetSeconds) * 1000),
        temperature: hourly.variables(0)!.valuesArray()![i],
        weatherCode: hourly.variables(1)!.valuesArray()![i],
      })),
    };

    return weatherData;
  } catch (err) {
    // @ts-expect-error
    throw new Error(`Failed to fetch weather: ${err.message}`);
  }
};
