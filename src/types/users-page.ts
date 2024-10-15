import { User } from "./user";

export interface UsersPage {
  users: User[];
  nextPage?: number;
}
