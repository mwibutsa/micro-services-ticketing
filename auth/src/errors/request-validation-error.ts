import type { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(private errors: ValidationError[]) {
    super("Invalid request parameters");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const errs = this.errors.map((err) => {
      const field = "path" in err ? (err.path as string) : undefined;
      return { message: err.msg as string, field };
    });
    return errs;
  }
}

export { RequestValidationError };
