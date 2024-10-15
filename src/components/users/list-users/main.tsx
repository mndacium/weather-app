"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { getRandomUsers } from "@/services";
import UserCard from "./ui/UserCard";

export function ListUsers() {
  const { data, error, fetchNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["random-users"],
      queryFn: ({ pageParam }) => getRandomUsers(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  if (status === "error" || error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  if (status === "pending") {
    <CircularProgress size="large" />;
  }

  if (!data?.pages?.[0]?.users) {
    return (
      <Alert severity="error">No users fetched. Please try again later.</Alert>
    );
  }

  return (
    <main>
      <Grid container spacing={{ xs: 2, md: 4 }} columns={12}>
        {data.pages.map(({ users }) =>
          users.map((user) => (
            <Grid key={user.email} size={{ xs: 12, md: 6, lg: 4 }}>
              <UserCard user={user} showSaveButton />
            </Grid>
          ))
        )}
        <Stack alignItems="center" width="100%">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="contained"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </Button>
          {isFetching && !isFetchingNextPage ? (
            <CircularProgress size="large" />
          ) : null}
        </Stack>
      </Grid>
    </main>
  );
}
