import z from 'zod';

export const menuSchemaForm = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.string().min(1, 'Price is required'),
    discount: z.string().min(1, 'Discount is required'),
    category: z.string().min(1, 'Category is required'),
    // make bug here
    image_url: z.any().optional(),
    is_available: z.string().min(1, 'Availability is required'),
});

export const menuSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    discount: z.number(),
    category: z.string(),
    image_url: z.any(),
    is_available: z.boolean(),
});

export type MenuForm = z.infer<typeof menuSchemaForm>;
export type Menu = z.infer<typeof menuSchema> & { id: string };