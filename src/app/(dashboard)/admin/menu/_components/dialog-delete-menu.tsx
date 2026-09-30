import DialogDelete from "@/components/common/dialog-delete";
import { startTransition, useActionState, useEffect } from "react";
import { INITIAL_STATE_ACTION } from "@/constants/general-constant";
import { toast } from "sonner";
import { deleteMenu } from "../action";
import { Menu } from "@/validations/menu-validation";

export default function DialogDeleteMenu({
  refetch,
  open,
  currentData,
  handleChangeAction,
}: {
  refetch: () => void;
  currentData?: Menu;
  open: boolean;
  handleChangeAction: (open: boolean) => void;
}) {
  const [deleteMenuState, deleteMenuAction, isPendingDeleteMenu] =
    useActionState(deleteMenu, INITIAL_STATE_ACTION);

  useEffect(() => {
    if (deleteMenuState?.status === "error") {
      toast.error("Delete menu Failed", {
        description: deleteMenuState.errors?._form?.[0],
      });
    }

    if (deleteMenuState?.status === "success") {
      toast.success("Delete menu Success");
      handleChangeAction?.(false);
      refetch();
      //setDialogOpen(false);
    }
  }, [deleteMenuState]);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("id", currentData!.id as string);
    formData.append("image_url", currentData!.image_url as string);

    startTransition(() => {
      deleteMenuAction(formData);
    });
  };

  return (
    <DialogDelete
      open={open}
      onOpenChange={handleChangeAction}
      isLoading={isPendingDeleteMenu}
      onSubmit={onSubmit}
      title="Menu"
    />
  );
}
