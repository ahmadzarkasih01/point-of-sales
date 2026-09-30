import DialogDelete from "@/components/common/dialog-delete";
import { profile } from "@/types/auth";
import { startTransition, useActionState, useEffect } from "react";
import { deleteUser } from "../action";
import { INITIAL_STATE_ACTION } from "@/constants/general-constant";
import { toast } from "sonner";

export default function DialogDeleteUser({
  refetch,
  open,
  currentData,
  handleChangeAction,
}: {
  refetch: () => void;
  currentData?: profile;
  open: boolean;
  handleChangeAction: (open: boolean) => void;
}) {
  const [deleteUserState, deleteUserAction, isPendingDeleteUser] =
    useActionState(deleteUser, INITIAL_STATE_ACTION);

  useEffect(() => {
    if (deleteUserState?.status === "error") {
      toast.error("Delete user Failed", {
        description: deleteUserState.errors?._form?.[0],
      });
    }

    if (deleteUserState?.status === "success") {
      toast.success("Delete user Success");
      handleChangeAction?.(false);
      refetch();
      //setDialogOpen(false);
    }
  }, [deleteUserState]);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData!.id as string);
    formData.append("avatar_url", currentData!.avatar_url as string);

    startTransition(() => {
      deleteUserAction(formData);
    });
  };

  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      isLoading={isPendingDeleteUser}
      onSubmit={onSubmit}
      title="User"
    />
  );
}
