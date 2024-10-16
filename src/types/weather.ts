export interface Weather {
  current: {
    temperature: number;
    weatherCode: number;
  };
  daily: {
    minTemperature: number;
    maxTemperature: number;
  };
  hourly: {
    temperature: number;
    time: Date;
    weatherCode: number;
  }[];
}
