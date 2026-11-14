import z from "zod";

export const orderFormSchema = z.object({
    customer_name: z.string().min(1, 'Customer name is required'),
    table_id: z.string().min(1, 'Select a table'),
    status: z.string().min(1, 'Select a table'),
});

// export const tableSchema = z.object({
//     name: z.string(),
//     description: z.string(),
//     capacity: z.number(),
//     status: z.string(),
// });

export type OrderForm = z.infer<typeof orderFormSchema>;
//export type Table = z.infer<typeof tableSchema> & { id: string };