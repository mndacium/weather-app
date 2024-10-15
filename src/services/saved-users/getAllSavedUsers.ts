import { SAVED_USERS_LOCAL_STORAGE_KEY } from "@/constants";
import { User } from "@/types";

export const getAllSavedUsers = (): User[] => {
  if (typeof window === "undefined") return [];

  const savedUsers = localStorage.getItem(SAVED_USERS_LOCAL_STORAGE_KEY);

  if (!savedUsers) {
    return [];
  }

  const parsedUsers: User[] = JSON.parse(savedUsers);

  return parsedUsers;
};
