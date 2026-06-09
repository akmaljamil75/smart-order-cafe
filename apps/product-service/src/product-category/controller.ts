import { ProductCategoryService } from "./service";
import Elysia from "elysia";
import { createProductCategory } from "./schema";
import { CommonSuccessResponse } from "@shared/types";

export class ProductCategoryController {

    constructor(
        private readonly productCategoryService : ProductCategoryService,
    ){}

    run() {
        return new Elysia({name : "product-category.controller"})
            .post('/v1/product', async ({body,set}) : Promise<CommonSuccessResponse> => {
                const result = await this.productCategoryService.create(body);
                set.status = 200;
                return {
                    correlation_id : "",
                    data : result,
                    message : "",
                    status : "200"
                }
            }, {body : createProductCategory});
    };

}