import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: { message: string; field?: string }[]) {
    super('Invalid request parameters');
  }

  serializeErrors() {
    return this.errors;
  }
}
