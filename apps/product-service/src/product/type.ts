import z from "zod";
import { createProduct, deleteProduct, disableProduct, enableProduct, updateProduct } from "./schema";

export type CreateProduct = z.infer<typeof createProduct>;
export type UpdateProduct = z.infer<typeof updateProduct>;
export type DeleteProduct = z.infer<typeof deleteProduct>;
export type DisableProduct = z.infer<typeof disableProduct>;
export type EnableProduct = z.infer<typeof enableProduct>;