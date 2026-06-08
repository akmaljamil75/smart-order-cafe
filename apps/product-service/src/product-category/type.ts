import z from "zod";
import { createProductCategory, deleteProductCategory, disableProductCategory, enableProductCategory, updateProductCategory } from "./schema";

export type CreateProductCategory = z.infer<typeof createProductCategory>;
export type UpdateProductCategory = z.infer<typeof updateProductCategory>;
export type DeleteProductCategory = z.infer<typeof deleteProductCategory>;
export type DisableProductCategory = z.infer<typeof disableProductCategory>;
export type EnableProductCategory = z.infer<typeof enableProductCategory>;
