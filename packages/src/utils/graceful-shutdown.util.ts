import { PinoLogger } from '@shared/logger';
import { gracefulshutdownConfig } from '../config';

type Signal = "SIGINT" | "SIGTERM";

export class GracefulShutdownUtil {
    private static _isShuttingDown : boolean = false;

    static async handle(logger : PinoLogger, callback: () => Promise<void>): Promise<void> {
        try {
            if (this._isShuttingDown) {
                logger.info('Shutdown already in progress, skipping...', {correlationId : 'SYSTEM'});
                return;
            }

            this._isShuttingDown = true;

            logger.info('Graceful shutdown started', {
                pid: process.pid,
                delay_ms: gracefulshutdownConfig.GRACEFUL_SHUTDOWN_PERIOD_MS,
            });

            logger.info('Delay...',  {correlationId : 'SYSTEM'});
            await new Promise<void>((resolve) => setTimeout(resolve, gracefulshutdownConfig.GRACEFUL_SHUTDOWN_PERIOD_MS));

            logger.info('Executing shutdown callbacks...',  {correlationId : 'SYSTEM'});
            await callback();

            logger.info('Graceful shutdown completed successfully',  {correlationId : 'SYSTEM'});
            process.exit(0);
        } catch (err) {
            logger.error('Error during graceful shutdown:',  {correlationId : 'SYSTEM'}, err instanceof Error ? err : new Error(String(err)));
            process.exit(1);
        }
    }

    static get isShuttingDown() {
        return this._isShuttingDown;
    }

    static register(signal : Signal, logger : PinoLogger, correlationId : string, callback: () => Promise<void>) {
        process.on(signal, async () => {
            logger.info(`graceful shutdown started - ${signal}`, {correlationId : correlationId});
            await this.handle(logger, callback);
            logger.info(`graceful shutdown finished - ${signal}`, {correlationId : correlationId});
        })
    }


}
