import {CustomError} from "./custom-error";

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor() {
        super();
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{message: 'Bad Request'}];
    }
}