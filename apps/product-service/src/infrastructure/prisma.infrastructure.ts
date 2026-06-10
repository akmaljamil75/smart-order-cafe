import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "apps/product-service/prisma/generated/prisma/client";
import { databaseConf } from "@shared/config";
import { PinoLogger } from "@shared/logger";

const adapter = new PrismaPg({
  application_name : databaseConf.DATABASE_APPLICATION_NAME,
  connectionString: databaseConf.DATABASE_URL,
  min : databaseConf.DATABASE_CONNECTION_MIN,
  max : databaseConf.DATABASE_CONNECTION_MAX,
  idleTimeoutMillis : databaseConf.DATABASE_CONNECTION_IDLE_TIMEOUT_MILLIS,
  connectionTimeoutMillis : databaseConf.DATABASE_CONNECTION_TIMEOUT_MILLIS,
  maxLifetimeSeconds : databaseConf.DATABASE_CONNECTION_MAX_LIFETIME_SECONDS
});

const prismaClient = new PrismaClient({
  adapter,
  transactionOptions : {
    timeout : databaseConf.DATABASE_TIMEOUT_TRANSACTION_IN_MS
  },
});

export class PrismaInfrastructure {
  constructor(
    private readonly logger: PinoLogger
  ) {}

  connect = async (correlationId : string) => {
    this.logger.info("Starting database connection...", {correlationId});

    try {
      await prismaClient.$connect();

      this.logger.info(
        "Database connection established successfully",
        {correlationId},
      );
    } catch (error) {
      this.logger.error(
        "Failed to connect to database",
        {correlationId},
        error instanceof Error ? error : new Error(String(error))
      );
      process.exit(1);
    }
  };

  disconnect = async (correlationId : string) => {
    this.logger.info("Closing database connection...",{correlationId});
    try {
      await prismaClient.$disconnect();

      this.logger.info(
        "Database connection closed successfully",
        {correlationId}
      );
    } catch (error) {
      this.logger.error(
        "Failed to disconnect from database",
        {correlationId},
        error instanceof Error ? error : new Error(String(error))
      );
      process.exit(1);
    }
  };

  getPrismaClient = () => {
    return prismaClient;
  };

}