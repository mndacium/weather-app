import { PAGE_SIZE, SAVED_USERS_LOCAL_STORAGE_KEY } from "@/constants";
import { User, UsersPage } from "@/types";

export const getPaginatedSavedUsers = async (
  page: number = 0
): Promise<UsersPage> => {
  const savedUsers = localStorage.getItem(SAVED_USERS_LOCAL_STORAGE_KEY);

  if (!savedUsers) {
    return { users: [], nextPage: page + 1 };
  }

  const parsedUsers: User[] = JSON.parse(savedUsers);

  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const paginatedUsers = parsedUsers.slice(start, end);

  return {
    users: paginatedUsers,
    nextPage: paginatedUsers.length < PAGE_SIZE ? undefined : page + 1,
  };
};
