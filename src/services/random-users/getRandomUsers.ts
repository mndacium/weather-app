import { PAGE_SIZE } from "@/constants";
import { User } from "@/types";

export const getRandomUsers = async (
  page = 0
): Promise<{ users: User[]; nextPage: number }> => {
  const response = await fetch(
    `https://randomuser.me/api/?page=${page}&results=${PAGE_SIZE}&inc=gender,name,location,email,picture`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  const json = await response.json();

  if (!!json.error) {
    throw new Error(`Failed to fetch users. Please try again later.`);
  }

  return { users: json.results, nextPage: page + 1 };
};
