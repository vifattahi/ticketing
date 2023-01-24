import {CustomError} from "./custom-error";

export class AlreadyExistsError extends CustomError{
    statusCode = 409;

    constructor() {
        super();
        Object.setPrototypeOf(this, AlreadyExistsError.prototype);
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{message: 'Already Exists!'}];
    }
}