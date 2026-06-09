import { PrismaClient } from "apps/product-service/prisma/generated/prisma/client";
import { CreateProductCategory, DeleteProductCategory, DisableProductCategory, UpdateProductCategory } from "./type";
import { ProductCategoryModel } from "apps/product-service/prisma/generated/prisma/models";
import { ConflictError, NotFoundError, UnprocessableEntityError } from "@shared/errors";

export class ProductCategoryService {

    constructor(
        private readonly prismaClient : PrismaClient
    ){};

    async create(body : CreateProductCategory) : Promise<ProductCategoryModel> {
        return await this.prismaClient.productCategory.create({
            data : {
                description : body.description,
                name : body.name
            },
        })
    };

    async update(body : UpdateProductCategory, id : number) : Promise<ProductCategoryModel> {
        return await this.prismaClient.$transaction(async (tx) => {
            const data = await tx.$queryRaw<ProductCategoryModel>`
                SELECT * 
                FROM product_categories 
                WHERE id = ${id}
                AND is_active = ${true}
                FOR UPDATE
            `;
            if(!data) throw new NotFoundError("Product category not found");
            return await tx.productCategory.update({
                where : {
                    id : id
                },
                data : {
                    description : body.description,
                    name : body.name
                },
            })
        });
    };

    async delete(body: DeleteProductCategory): Promise<void> {
        await this.prismaClient.$transaction(async (tx) => {
            const data = await tx.$queryRaw<ProductCategoryModel>`
                SELECT * 
                FROM product_categories 
                WHERE id = ${body.id}
                FOR UPDATE
            `;

            if (!data) {
                throw new NotFoundError("Product category not found");
            }

            const product = await tx.product.findFirst({
                where: { product_category_id: body.id }
            });

            if (product) {
                throw new ConflictError(
                    "Cannot delete product category because it is still used by one or more products"
                );
            }

            return await tx.productCategory.delete({
                where: {
                    id: body.id
                },
            });
        });
    }

    async disable(body: DisableProductCategory): Promise<ProductCategoryModel> {
        return await this.prismaClient.$transaction(async (tx) => {
            const data = await tx.$queryRaw<ProductCategoryModel>`
                SELECT * 
                FROM product_categories 
                WHERE id = ${body.id}
                FOR UPDATE
            `;

            if (!data) {
                throw new NotFoundError("Product category not found");
            }

            if(!data.is_active) {
                throw new UnprocessableEntityError("Product category is inactive and cannot be processed")
            }

            const product = await tx.product.findFirst({
                where: { product_category_id: body.id }
            });

            if (product) {
                throw new ConflictError(
                    "Cannot delete product category because it is still used by one or more products"
                );
            }

            return await tx.productCategory.update({
                where: {
                    id: body.id
                },
                data : {
                    is_active : false
                }
            });
        });
    }

    async enable(body: DeleteProductCategory): Promise<ProductCategoryModel> {
        return await this.prismaClient.$transaction(async (tx) => {
            const data = await tx.$queryRaw<ProductCategoryModel>`
                SELECT * 
                FROM product_categories 
                WHERE id = ${body.id}
                FOR UPDATE
            `;

            if (!data) {
                throw new NotFoundError("Product category not found");
            }

            if(data.is_active) {
                throw new UnprocessableEntityError("Product category is active and cannot be processed")
            }

            return await tx.productCategory.update({
                where: {
                    id: body.id
                },
                data : {
                    is_active : true
                }
            });
        });
    }

    async list(): Promise<ProductCategoryModel[]> {
        return await this.prismaClient.productCategory.findMany();
    }

    async findOne(id : number): Promise<ProductCategoryModel | null> {
        return await this.prismaClient.productCategory.findUnique({where : {id}});
    }

}