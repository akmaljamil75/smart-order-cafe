import { z } from "zod";

export const createProduct= z.object({
    name: z
        .string({  message: "name must be a string"})
        .min(1, { message: "name cannot be empty" })
        .max(50, { message: "name must not exceed 50 characters" }),

    description: z
        .string({ message: "Description must be a string"})
        .max(100, { message: "Description must not exceed 100 characters"}),
    product_category_id: z.number("Product ID must be a number"),
    price: z.string({message: 'price must be a string'})
        .max(13, {message: 'price must not exceed 16 characters'})
        .regex(/^\d{1,8}\.\d{2}$/, {
            message: 'price must be a numeric string with up to 13 digits and exactly 2 decimal places (e.g. \'10000.00\')',
        }),
    stock: z
        .number({message: 'stock must be a string'})
        .nonnegative({message: "Stock cannot be negative. Minimum value is 0"})
});

export const updateProduct= z.object({
    name: z
        .string({
            message: "name must be a string",
        })
        .min(1, { message: "name cannot be empty" })
        .max(50, { message: "name must not exceed 50 characters" }),

    description: z
        .string({
            message: "Description must be a string",
        })
        .max(100, {
            message: "Description must not exceed 100 characters",
        }),
    product_category_id: z.number("Product ID must be a number"),
    price: z.string({message: 'price must be a string'})
        .max(13, {message: 'price must not exceed 16 characters'})
        .regex(/^\d{1,8}\.\d{2}$/, {
            message: 'price must be a numeric string with up to 13 digits and exactly 2 decimal places (e.g. \'10000.00\')',
    }),
});

export const deleteProduct= z.object({
    id: z
        .number({
            message: "ID must be a number",
        })
        .int({
            message: "ID must be an integer",
        })
        .positive({
            message: "ID must be greater than 0",
        }),
});

export const disableProduct= z.object({
    id: z
        .number({
            message: "ID must be a number",
        })
        .int({
            message: "ID must be an integer",
        })
        .positive({
            message: "ID must be greater than 0",
        }),
});

export const enableProduct= z.object({
    id: z
        .number({
            message: "ID must be a number",
        })
        .int({
            message: "ID must be an integer",
        })
        .positive({
            message: "ID must be greater than 0",
        }),
});
