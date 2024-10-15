import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveUser } from "@/services";
import { User } from "@/types";

export const useSaveUserMutation = (user: User) => {
  const queryClient = useQueryClient();
  const randomUsersQueryKey = ["random-users"];
  const savedUsersQueryKey = ["saved-users"];

  return useMutation({
    mutationFn: async () => saveUser(user),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: randomUsersQueryKey });
      queryClient.invalidateQueries({ queryKey: savedUsersQueryKey });
    },
  });
};
