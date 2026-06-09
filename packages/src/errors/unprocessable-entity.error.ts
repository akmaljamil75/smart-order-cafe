import {BaseError} from './base.error';

export class UnprocessableEntityError extends BaseError {
    constructor(message: string) {
        super(message, 422);
    }
}
