import { HeaderConstant } from "@shared/constants";
import { randomUUIDv7 } from "bun";
import Elysia from "elysia";

export const xCorrelationIdPlugin = new Elysia({name : "x-correlation-id.plugin"})
    .onRequest(({request}) => {
        const correlationId = request.headers.get(HeaderConstant.X_CORRELATION_ID) || randomUUIDv7();
        request.headers.set(HeaderConstant.X_CORRELATION_ID, correlationId);
    });