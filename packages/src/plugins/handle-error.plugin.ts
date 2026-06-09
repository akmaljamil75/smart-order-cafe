import {Elysia} from 'elysia';
import {BaseError, ServiceUnavailableError} from '../errors';
import { CommonFailedResponse } from '@shared/types';
import { HeaderConstant } from '@shared/constants';

export const globalErrorPlugin = new Elysia({name: 'handle.error.plugin'})
    .error({
        SERVICE_UNAVAILABLE: ServiceUnavailableError,
        BASE_EXCEPTION: BaseError
    })
    .onError(({code, request, set, error}) => {
        const correlationId = request.headers.get(HeaderConstant.X_CORRELATION_ID) || 'N/A';
        set.headers[HeaderConstant.X_CORRELATION_ID] = correlationId;
        set.status = 500;
        const resp : CommonFailedResponse = {
            status: '500',
            message: 'Internal Server Error',
            correlation_id: correlationId,
            error: null,
        };
        switch (code) {
        case 'SERVICE_UNAVAILABLE':
            resp.status = '503';
            resp.message = error.message;
            set.status = 503;
            break;
        case 'BASE_EXCEPTION':
            resp.status = error.httpStatus.toString();
            resp.message = error.message;
            set.status = error.httpStatus;
            break;
        case 'VALIDATION':
            resp.status = '400';
            resp.message = 'Validation Error';
            resp.error = error.all.map((item) => ({
                field: item.path,
                message: item.message,
            }));
            set.status = 400;
            break;
        case 'NOT_FOUND':
            resp.status = '404';
            resp.message = error.message;
            set.status = 404;
            break;
        case 'PARSE':
            resp.status = '400';
            resp.message = 'Malformed Request';
            set.status = 400;
            break;
        default:
            break;
        }
        return resp;
    })
    .as('scoped');
