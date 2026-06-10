import { PinoLogger } from "@shared/logger";
import { ProductCategoryService,ProductCategoryController } from "./product-category";
import { Elysia } from "elysia";
import { loggerPlugin, xCorrelationIdPlugin, globalErrorPlugin} from "@shared/plugins";
import { GracefulShutdownUtil } from "@shared/utils";
import { PrismaInfrastructure, RedisInfrastructure } from "./infrastructure";

async function main() {

    const systemLogger = "system";
    const logger = new PinoLogger("product-service");
    const prisma = new PrismaInfrastructure(logger);
    const redis = new RedisInfrastructure(logger);
    
    await prisma.connect(systemLogger);
    await redis.connect(systemLogger);

    // PRODUCT CATEGORY
    const productCategoryService = new ProductCategoryService(prisma.getPrismaClient()); 
    const productCategoryController = new ProductCategoryController(productCategoryService); 

    new Elysia({name : "main"})
        .use(xCorrelationIdPlugin)
        .use(loggerPlugin(logger))
        .use(productCategoryController.run())
        .use(globalErrorPlugin)
        .listen(3000);

    // GRACEFULSHUTDOWN
    GracefulShutdownUtil.register("SIGINT", logger, systemLogger, (async () => {
        redis.disconnect(systemLogger);
        await prisma.disconnect(systemLogger);
    }));
    
    GracefulShutdownUtil.register("SIGTERM", logger, systemLogger, (async () => {
        redis.disconnect(systemLogger);
        await prisma.disconnect(systemLogger);
    }));
}

main();