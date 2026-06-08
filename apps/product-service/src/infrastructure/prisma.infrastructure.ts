import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "apps/product-service/prisma/generated/prisma/client";
import { databaseConf } from "@shared/config";

const adapter = new PrismaPg({
  application_name : databaseConf.DATABASE_APPLICATION_NAME,
  connectionString: databaseConf.DATABASE_URL,
  min : databaseConf.DATABASE_CONNECTION_MIN,
  max : databaseConf.DATABASE_CONNECTION_MAX,
  idleTimeoutMillis : databaseConf.DATABASE_CONNECTION_IDLE_TIMEOUT_MILLIS,
  connectionTimeoutMillis : databaseConf.DATABASE_CONNECTION_TIMEOUT_MILLIS,
  maxLifetimeSeconds : databaseConf.DATABASE_CONNECTION_MAX_LIFETIME_SECONDS
});

export const prisma = new PrismaClient({
  adapter,
  transactionOptions : {
    timeout : databaseConf.DATABASE_TIMEOUT_TRANSACTION_IN_MS
  },
});