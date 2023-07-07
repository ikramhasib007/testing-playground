import { CustomError } from "./custom-error";

export class BadReqeustError extends CustomError {
  statusCode: number = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadReqeustError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
