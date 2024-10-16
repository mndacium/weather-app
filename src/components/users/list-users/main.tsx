"use client";

import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import UserCard from "./ui/UserCard";
import { User, UsersPage } from "@/types";
import { getAllSavedUsers } from "@/services";
import React from "react";

interface Props {
  queryKey: QueryKey;
  getUsers: (page: number) => Promise<UsersPage>;
  label: string;
  noUsersMessage: string | React.ReactNode;
  showSaveButton?: boolean;
}

export function ListUsers({
  queryKey,
  getUsers,
  label,
  noUsersMessage,
  showSaveButton = false,
}: Props) {
  const [savedUsers, setSavedUsers] = React.useState<User[]>([]);
  const [isSavedUsersLoading, setIsSavedUsersLoading] = React.useState(true);

  // workaround for not being able to access local storage in SSR
  React.useEffect(() => {
    const localStorageSavedUsers = getAllSavedUsers();
    setSavedUsers(localStorageSavedUsers);
    setIsSavedUsersLoading(false);
  }, []);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getUsers(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  if (status === "error" || error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (status === "pending") {
    return (
      <Stack alignItems="center">
        <CircularProgress size="5rem" />
      </Stack>
    );
  }

  if (!data || data.pages[0].users.length == 0) {
    return typeof noUsersMessage === "string" ? (
      <Typography variant="h5">{noUsersMessage}</Typography>
    ) : (
      noUsersMessage
    );
  }

  return (
    <Stack alignItems="center" gap="3rem">
      <Typography variant="h4">{label}</Typography>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={12} width="100%">
        {data.pages.map(({ users }) =>
          users.map((user) => (
            <Grid key={user.email} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <UserCard
                user={user}
                showSaveButton={
                  showSaveButton &&
                  !savedUsers.some(
                    (savedUser) => savedUser.email === user.email
                  )
                }
                disabled={isSavedUsersLoading}
              />
            </Grid>
          ))
        )}
        <Stack alignItems="center" width="100%" gap="2rem">
          {isFetching && !isFetchingNextPage ? (
            <Stack alignItems="center">
              <CircularProgress size="5rem" />
            </Stack>
          ) : null}

          <Button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            variant="contained"
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
          </Button>
        </Stack>
      </Grid>
    </Stack>
  );
}
