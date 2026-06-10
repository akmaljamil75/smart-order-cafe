import { ConflictError, NotFoundError, UnprocessableEntityError } from "@shared/errors";
import { PrismaClient } from "apps/product-service/prisma/generated/prisma/client";
import { ProductCategoryModel, ProductModel } from "apps/product-service/prisma/generated/prisma/models";
import { CreateProduct, DeleteProduct, DisableProduct, UpdateProduct } from "./type";

export class ProductService {

    constructor(
        private readonly prismaClient : PrismaClient,
    ){};

    async create(body : CreateProduct) : Promise<ProductModel> {
        const category = this.prismaClient.productCategory.findUnique({where : {id : body.product_category_id}, select : {}});
        if(!category) throw new NotFoundError("Product category not found");
        return await this.prismaClient.product.create({
            data : {
                description : body.description,
                name : body.name,
                price : body.price,
                product_category_id : body.product_category_id,
                image_url : "",
                product_stock : {
                    create : {
                        stock : body.stock,
                        reserve_stock : 0
                    }
                }
            },
        })
    };

    async update(body : UpdateProduct, id : number) : Promise<ProductModel> {
        return await this.prismaClient.$transaction(async (tx) => {
            const data = await tx.$queryRaw<ProductModel>`
                SELECT * 
                FROM product_categories 
                WHERE id = ${id}
                AND is_active = ${true}
                FOR UPDATE
            `;
            if(!data) throw new NotFoundError("Product not found");
            return await tx.product.update({
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

    async delete(body: DeleteProduct): Promise<void> {
        await this.prismaClient.$transaction(async (tx) => {
            const data = await tx.$queryRaw<ProductModel>`
                SELECT * 
                FROM product_categories 
                WHERE id = ${body.id}
                FOR UPDATE
            `;

            if (!data) {
                throw new NotFoundError("Product  not found");
            }

            const product = await tx.product.findFirst({
                where: { product_id: body.id }
            });

            if (product) {
                throw new ConflictError(
                    "Cannot delete product  because it is still used by one or more products"
                );
            }

            return await tx.product.delete({
                where: {
                    id: body.id
                },
            });
        });
    }

    async disable(body: DisableProduct): Promise<ProductModel> {
        return await this.prismaClient.$transaction(async (tx) => {
            const data = await tx.$queryRaw<ProductModel>`
                SELECT * 
                FROM product_categories 
                WHERE id = ${body.id}
                FOR UPDATE
            `;

            if (!data) {
                throw new NotFoundError("Product  not found");
            }

            if(!data.is_active) {
                throw new UnprocessableEntityError("Product  is inactive and cannot be processed")
            }

            const product = await tx.product.findFirst({
                where: { product__id: body.id }
            });

            if (product) {
                throw new ConflictError(
                    "Cannot delete product  because it is still used by one or more products"
                );
            }

            return await tx.product.update({
                where: {
                    id: body.id
                },
                data : {
                    is_active : false
                }
            });
        });
    }

    async enable(body: DeleteProduct): Promise<ProductModel> {
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