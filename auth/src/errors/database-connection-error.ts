export class DatabaseConnectionError extends Error {
    reason = 'Error connection database'
    constructor() {
        super();
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

}
