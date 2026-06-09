import { PinoLogger } from "@shared/logger";
import { PrismaInfrastructure } from "./infrastructure/prisma.infrastructure";
import { ProductCategoryService,ProductCategoryController } from "./product-category";
import Elysia from "elysia";
import {loggerPlugin, xCorrelationIdPlugin, globalErrorPlugin} from "@shared/plugins";

async function main() {

    const systemLogger = "system";
    const logger = new PinoLogger("product-service");
    const prisma = new PrismaInfrastructure(logger);
    
    await prisma.connectDB(systemLogger);

    // PRODUCT CATEGORY
    const productCategoryService = new ProductCategoryService(prisma.getPrismaClient()); 
    const productCategoryController = new ProductCategoryController(productCategoryService); 

    new Elysia({name : "main"})
        .use(xCorrelationIdPlugin)
        .use(loggerPlugin(logger))
        .use(productCategoryController.run())
        .use(globalErrorPlugin);
}

main();