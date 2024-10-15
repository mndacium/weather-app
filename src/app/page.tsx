import { Metadata } from "next";
import { Typography } from "@mui/material";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div>
      <Typography>Hello world</Typography>
    </div>
  );
}
