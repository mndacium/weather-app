import { Metadata } from "next";
import SavedUsers from "./saved-users";

export const metadata: Metadata = {
  title: "Saved users",
};

export default async function SavedUsersPage() {
  return <SavedUsers />;
}
