import {BaseError} from './base.error';

export class InternalServerError extends BaseError {
    constructor(message: string) {
        super(message, 500);
    }
}
