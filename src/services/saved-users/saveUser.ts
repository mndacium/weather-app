import { SAVED_USERS_LOCAL_STORAGE_KEY } from "@/constants";
import { User } from "@/types";

export const saveUser = (newUser: User) => {
  const savedUsers = localStorage.getItem(SAVED_USERS_LOCAL_STORAGE_KEY);

  let parsedUsers: User[] = [];

  if (savedUsers) {
    parsedUsers = JSON.parse(savedUsers);
  }

  parsedUsers = [...parsedUsers, newUser];

  localStorage.setItem(
    SAVED_USERS_LOCAL_STORAGE_KEY,
    JSON.stringify(parsedUsers)
  );
};
