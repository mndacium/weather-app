"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { User } from "@/types";
import { useSaveUserMutation } from "@/hooks/users";
import WeatherDialogButton from "./weather-dialog/Button";

interface Props {
  user: User;
  disabled: boolean;
  showSaveButton?: boolean;
}

export default function UserCard({
  user,
  disabled,
  showSaveButton = false,
}: Props) {
  // workaround for not being able to access local storage in SSR
  const [hideSaveButton, setHideSaveButton] = React.useState(false);

  const { mutate } = useSaveUserMutation(user);

  const handleMutation = React.useCallback(() => {
    mutate();
    setHideSaveButton(true);
  }, []);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia component="img" height="375" image={user.picture.large} />
      <CardContent>
        <Stack gap="0.5rem">
          <Stack>
            <Typography variant="h5">
              {`${user.name.title} ${user.name.first} ${user.name.last}`}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
              gutterBottom
            >
              {user.email}
            </Typography>
          </Stack>
          <Typography>
            Gender: {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
          </Typography>
          <Typography>
            Location:{" "}
            {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.country}`}
          </Typography>
          <Typography>
            Coordinates:{" "}
            {`${user.location.coordinates.latitude} ${user.location.coordinates.longitude}`}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        {showSaveButton && !hideSaveButton && (
          <Button
            size="small"
            color="primary"
            onClick={handleMutation}
            disabled={disabled}
          >
            Save
          </Button>
        )}
        <WeatherDialogButton user={user} disabled={disabled} />
      </CardActions>
    </Card>
  );
}
