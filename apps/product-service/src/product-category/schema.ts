import { z } from "zod";

export const createProductCategory = z.object({
  name: z
    .string({
      message: "Category name must be a string",
    })
    .min(1, { message: "Category name cannot be empty" })
    .max(50, { message: "Category name must not exceed 50 characters" }),

  description: z
    .string({
      message: "Description must be a string",
    })
    .max(100, {
      message: "Description must not exceed 100 characters",
    }),
});

export const updateProductCategory = z.object({
    name: z
        .string({
            message: "Category name must be a string",
        })
        .min(1, { message: "Category name cannot be empty" })
        .max(50, { message: "Category name must not exceed 50 characters" }),

    description: z
        .string({
        message: "Description must be a string",
        })
        .max(100, {
        message: "Description must not exceed 100 characters",
        }),
});

export const deleteProductCategory = z.object({
    id: z
        .number({
            message: "Category ID must be a number",
        })
        .int({
            message: "Category ID must be an integer",
        })
        .positive({
            message: "Category ID must be greater than 0",
        }),
});

export const disableProductCategory = z.object({
    id: z
        .number({
            message: "Category ID must be a number",
        })
        .int({
            message: "Category ID must be an integer",
        })
        .positive({
            message: "Category ID must be greater than 0",
        }),
});

export const enableProductCategory = z.object({
    id: z
        .number({
            message: "Category ID must be a number",
        })
        .int({
            message: "Category ID must be an integer",
        })
        .positive({
            message: "Category ID must be greater than 0",
        }),
});
