import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveUser } from "@/services";
import { User } from "@/types";
import { toast } from "react-toastify";

export const useSaveUserMutation = (user: User) => {
  const queryClient = useQueryClient();
  const randomUsersQueryKey = ["random-users"];
  const savedUsersQueryKey = ["saved-users"];

  return useMutation({
    mutationFn: async () => saveUser(user),
    onSuccess: () => {
      toast.success("User have been saved.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: randomUsersQueryKey });
      queryClient.invalidateQueries({ queryKey: savedUsersQueryKey });
    },
  });
};
