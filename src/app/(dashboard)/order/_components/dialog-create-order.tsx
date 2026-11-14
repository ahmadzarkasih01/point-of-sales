import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createOrder } from "../actions";
import { Table } from "@/validations/table-validation";
import { OrderForm, orderFormSchema } from "@/validations/order-validation";
import {
  INITIAL_ORDER,
  INITIAL_STATE_ORDER,
  STATUS_CREATE_ORDER,
} from "@/constants/order-constant";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormInput from "@/components/common/form-input";
import FormSelect from "@/components/common/form-select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function DialogCreateOrder({
  tables,
  setDialogOpen,
}: {
  tables: Table[] | undefined | null;
  setDialogOpen: (open: boolean) => void;
}) {
  const form = useForm<OrderForm>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: INITIAL_ORDER,
  });

  const [createOrderState, createOrderAction, isPendingCreateOrder] =
    useActionState(createOrder, INITIAL_STATE_ORDER);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      createOrderAction(formData);
    });
  });

  useEffect(() => {
    if (createOrderState?.status === "error") {
      toast.error("Create order Failed", {
        description: createOrderState.errors?._form?.[0],
      });
    }

    if (createOrderState?.status === "success") {
      toast.success("Create order Success");
      form.reset();
      setDialogOpen(false);
    }
  }, [createOrderState]);

  return (
    <DialogContent className="sm:max-w-[425px] max-h-[90vh]">
      <form {...form} onSubmit={onSubmit} className="space-y-4">
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
          <DialogDescription>Add a new order from customer</DialogDescription>
        </DialogHeader>
        <div className="space-y-4  max-h-[50vh] px-1 overflow-y-auto">
          <FormInput
            form={form}
            name="customer_name"
            label="Customer Name"
            placeholder="Insert customer name here"
          />
          <FormSelect
            form={form}
            name="table_id"
            label="Table"
            selectItem={(tables ?? []).map((table: Table) => ({
              value: `${table.id}`,
              label: `${table.name} - ${table.status} (${table.capacity})`,
              disabled: table.status !== "available",
            }))}
          />
          <FormSelect
            form={form}
            name="status"
            label="Status"
            selectItem={STATUS_CREATE_ORDER}
          />
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="submit">
            {isPendingCreateOrder ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
