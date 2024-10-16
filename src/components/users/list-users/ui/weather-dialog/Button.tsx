import * as React from "react";
import Button from "@mui/material/Button";
import { User } from "@/types";
import WeatherDialog from "./Dialog";

export interface Props {
  user: User;
  disabled: boolean;
}

export default function WeatherDialogButton({ user, disabled }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        size="small"
        color="primary"
        disabled={disabled}
        onClick={handleClickOpen}
      >
        Weather
      </Button>
      {open && (
        <WeatherDialog user={user} open={open} handleClose={handleClose} />
      )}
    </>
  );
}
