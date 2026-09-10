import {
  INITIAL_CREATE_USER_FORM,
  INITIAL_STATE_CREATE_USER,
  INITIAL_STATE_UPDATE_USER,
} from "@/constants/auth-constant";
import {
  CreateUserForm,
  createUserSchema,
  UpdateUserForm,
  updateUserSchema,
} from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../action";
import { toast } from "sonner";
import { Preview } from "@/types/general";
import FormUser from "./form-user";

export default function DialogUpdateUser({
  refetch,
  setDialogOpen,
}: {
  refetch: () => void;
  setDialogOpen: (open: boolean) => void;
}) {
  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
  });

  const [updateUserState, updateUserAction, isPendingUpdateUser] =
    useActionState(updateUser, INITIAL_STATE_UPDATE_USER);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(
        key,
        key === "avatar_url" ? (preview!.file ?? "") : value,
      );
    });

    startTransition(() => {
      createUserAction(formData);
    });
  });

  useEffect(() => {
    if (createUserState?.status === "error") {
      toast.error("Create user Failed", {
        description: createUserState.errors?._form?.[0],
      });
    }

    if (createUserState?.status === "success") {
      toast.success("Create user Success");
      form.reset();
      setPreview(undefined);
      refetch();
      setDialogOpen(false);
    }
  }, [createUserState]);
  return (
    <FormUser
      form={form}
      onSubmit={onSubmit}
      isLoading={isPendingUpdateUser}
      type="Create"
      preview={preview}
      setPreview={setPreview}
    />
  );
}
