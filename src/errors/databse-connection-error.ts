import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode: number = 503; // Service Unavailable
  reason = "Database connection error";

  constructor() {
    super("Failed to connect database");

    // Only because we are extending a built class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
