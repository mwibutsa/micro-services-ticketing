import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: any[]) {
    super("Invalid request parameters");
    this.errors = errors;
    this.statusCode = 400;
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const errs = this.errors.map((err: any) => {
      const field = "path" in err ? err.path : undefined;
      return { message: err.msg, field };
    });

    return errs;
  }
}
