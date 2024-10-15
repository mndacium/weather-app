import { Metadata } from "next";
import { getRandomUsers } from "@/services";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ListUsers } from "@/components/users";
import { User } from "@/types";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["random-users"],
    queryFn: ({ pageParam }) => getRandomUsers(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage: { users: User[]; nextPage: number }) =>
      lastPage.nextPage,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ListUsers />
    </HydrationBoundary>
  );
}
