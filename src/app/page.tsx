import { Metadata } from "next";
import { getRandomUsers } from "@/services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ListUsers } from "@/components/users";
import { UsersPage } from "@/types";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const queryClient = new QueryClient();

  const queryKey = ["random-users"];

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getRandomUsers(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: UsersPage) => lastPage.nextPage,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListUsers
        queryKey={queryKey}
        getUsers={getRandomUsers}
        noUsersMessage="No random users found. Please try again later."
        showSaveButton
      />
    </HydrationBoundary>
  );
}
