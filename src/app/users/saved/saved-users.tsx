"use client";

import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { getPaginatedSavedUsers } from "@/services";
import { ListUsers } from "@/components/users";

export default function SavedUsers() {
  const queryKey = ["saved-users"];

  return (
    <ListUsers
      queryKey={queryKey}
      getUsers={getPaginatedSavedUsers}
      noUsersMessage={
        <Typography variant="h5">
          No saved users found. <Link href="/">Try to add some</Link>
        </Typography>
      }
    />
  );
}
