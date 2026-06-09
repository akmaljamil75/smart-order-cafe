import { HeaderConstant } from "@shared/constants";
import { PinoLogger } from "@shared/logger";
import { randomUUIDv7 } from "bun";
import Elysia from "elysia";

export const loggerPlugin = (logger : PinoLogger) => new Elysia({name: 'logger.plugin'})
    .onRequest(({request}) => {
        const correlationId = request.headers.get(HeaderConstant.X_CORRELATION_ID) || randomUUIDv7();
        logger.info('Incoming Request',{
            correlationId,
            method: request.method,
            url: request.url
        });
    })
    .onAfterResponse(({request, set}) => {
        const correlationId = request.headers.get(HeaderConstant.X_CORRELATION_ID) ?? 'N/A';
        logger.info('Incoming Request',{
            correlationId,
            method: request.method,
            url: request.url,
            status: set.status
        });
    })
    .onError(({request, error}) => {
        const correlationId = request.headers.get(HeaderConstant.X_CORRELATION_ID) ?? 'N/A';
        logger.error('Error on Request', {
            correlationId,
            method: request.method,
            url: request.url,
        },error instanceof Error ? error : new Error(String(error)));
    })
    .as('scoped');