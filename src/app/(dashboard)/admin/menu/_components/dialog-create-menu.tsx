import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Preview } from "@/types/general";
import { createMenu } from "../action";
import { MenuForm, menuSchemaForm } from "@/validations/menu-validation";
import { INITIAL_MENU, INITIAL_STATE_MENU } from "@/constants/menu-constant";
import FormMenu from "./form-menu";

export default function DialogCreateMenu({
  refetch,
  setDialogOpen,
}: {
  refetch: () => void;
  setDialogOpen: (open: boolean) => void;
}) {
  const form = useForm<MenuForm>({
    resolver: zodResolver(menuSchemaForm),
    defaultValues: INITIAL_MENU,
  });

  const [createMenuState, createMenuAction, isPendingCreateMenu] =
    useActionState(createMenu, INITIAL_STATE_MENU);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, key === "image_url" ? (preview!.file ?? "") : value);
    });

    startTransition(() => {
      createMenuAction(formData);
    });
  });

  useEffect(() => {
    if (createMenuState?.status === "error") {
      toast.error("Create menu Failed", {
        description: createMenuState.errors?._form?.[0],
      });
    }

    if (createMenuState?.status === "success") {
      toast.success("Create menu Success");
      form.reset();
      setPreview(undefined);
      refetch();
      setDialogOpen(false);
    }
  }, [createMenuState]);
  return (
    <FormMenu
      form={form}
      onSubmit={onSubmit}
      isLoading={isPendingCreateMenu}
      type="Create"
      preview={preview}
      setPreview={setPreview}
    />
  );
}
