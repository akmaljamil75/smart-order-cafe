import {BaseError} from './base.error';

export class ServiceUnavailableError extends BaseError {
    constructor(message: string) {
        super(message, 503);
    }
}
