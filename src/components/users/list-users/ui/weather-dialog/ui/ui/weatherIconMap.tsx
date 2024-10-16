import Cloud from "@mui/icons-material/Cloud";
import CloudQueue from "@mui/icons-material/CloudQueue";
import WbSunny from "@mui/icons-material/WbSunny";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import Water from "@mui/icons-material/Water";
import Flood from "@mui/icons-material/Flood";
import AcUnit from "@mui/icons-material/AcUnit";
import SevereCold from "@mui/icons-material/SevereCold";
import Storm from "@mui/icons-material/Storm";
import Thunderstorm from "@mui/icons-material/Thunderstorm";
import {
  yellow,
  grey,
  blue,
  deepOrange,
  lightBlue,
} from "@mui/material/colors";

export const weatherIconMap: {
  [key: number]: { icon: React.ReactNode; label: string; color: string };
} = {
  0: { icon: <WbSunny />, label: "Clear sky", color: yellow[700] },
  1: { icon: <WbSunny />, label: "Mainly clear", color: yellow[600] },
  2: { icon: <CloudQueue />, label: "Partly cloudy", color: grey[500] },
  3: { icon: <Cloud />, label: "Overcast", color: grey[700] },
  45: { icon: <CloudOutlinedIcon />, label: "Fog", color: grey[400] },
  48: {
    icon: <CloudOutlinedIcon />,
    label: "Depositing rime fog",
    color: grey[300],
  },
  51: { icon: <Water />, label: "Light drizzle", color: lightBlue[300] },
  53: { icon: <Water />, label: "Moderate drizzle", color: lightBlue[400] },
  55: { icon: <Water />, label: "Dense drizzle", color: lightBlue[500] },
  56: { icon: <Flood />, label: "Light freezing drizzle", color: blue[300] },
  57: { icon: <Flood />, label: "Dense freezing drizzle", color: blue[400] },
  61: { icon: <Water />, label: "Slight rain", color: blue[300] },
  63: { icon: <Water />, label: "Moderate rain", color: blue[400] },
  65: { icon: <Water />, label: "Heavy rain", color: blue[500] },
  66: { icon: <Flood />, label: "Light freezing rain", color: lightBlue[500] },
  67: { icon: <Flood />, label: "Heavy freezing rain", color: blue[600] },
  71: { icon: <AcUnit />, label: "Slight snowfall", color: lightBlue[300] },
  73: { icon: <AcUnit />, label: "Moderate snowfall", color: lightBlue[400] },
  75: { icon: <AcUnit />, label: "Heavy snowfall", color: lightBlue[500] },
  77: { icon: <SevereCold />, label: "Snow grains", color: lightBlue[500] },
  80: { icon: <Storm />, label: "Slight rain showers", color: blue[300] },
  81: { icon: <Storm />, label: "Moderate rain showers", color: blue[400] },
  82: {
    icon: <Storm />,
    label: "Violent rain showers",
    color: deepOrange[500],
  },
  85: { icon: <AcUnit />, label: "Slight snow showers", color: lightBlue[300] },
  86: { icon: <AcUnit />, label: "Heavy snow showers", color: lightBlue[400] },
  95: {
    icon: <Thunderstorm />,
    label: "Slight thunderstorm",
    color: deepOrange[500],
  },
  96: {
    icon: <Thunderstorm />,
    label: "Thunderstorm with light hail",
    color: deepOrange[600],
  },
  99: {
    icon: <Thunderstorm />,
    label: "Thunderstorm with heavy hail",
    color: deepOrange[700],
  },
};
