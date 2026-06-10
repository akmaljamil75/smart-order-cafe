import { redisConf } from "@shared/config";
import { PinoLogger } from "@shared/logger";
import { RedisClient } from "bun";

const redis = new RedisClient(redisConf.REDIS_URL, {
    autoReconnect : redisConf.AUTO_RECONNECT,
    maxRetries : redisConf.MAX_RETRIES,
});

export class RedisInfrastructure {
  
  constructor(
    private readonly logger: PinoLogger
  ) {}

  connect = async (correlationId : string) => {
    this.logger.info("Starting redis connection...", {correlationId});

    try {
      await redis.connect();
      this.logger.info(
        "redis connection established successfully",
        {correlationId},
      );
    } catch (error) {
      this.logger.error(
        "Failed to connect to redis",
        {correlationId},
        error instanceof Error ? error : new Error(String(error))
      );
      process.exit(1);
    }
  };

  disconnect = async (correlationId : string) => {
    this.logger.info("Closing redis connection...",{correlationId});
    try {
      redis.close();

      this.logger.info(
        "redis connection closed successfully",
        {correlationId}
      );
    } catch (error) {
      this.logger.error(
        "Failed to disconnect from redis",
        {correlationId},
        error instanceof Error ? error : new Error(String(error))
      );
      process.exit(1);
    }
  };

  getRedis = () => {
    return redis;
  };

}