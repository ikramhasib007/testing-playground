import { CustomError } from "./custom-error";

export class UnprocessableEntityError extends CustomError {
  statusCode: number = 422;

  constructor(public message: string = "Unprocessable entity") {
    super(message);
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
