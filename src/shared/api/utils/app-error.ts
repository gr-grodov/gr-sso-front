export interface ErrorField {
  field: string;
  message: string;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly errors: ErrorField[];

  constructor(code: string,message?: string,errors: ErrorField[] = []) {
    super(message);

    this.name = "AppError";
    this.code = code;
    this.errors = errors;

    Object.setPrototypeOf(this, AppError.prototype);
  }

  static of(code: string, errors: ErrorField[]): AppError;
  static of(code: string, message: string): AppError;
  static of(code: string): AppError;
  static of(code: string, messageOrErrors?: string | ErrorField[]): AppError {
    if (Array.isArray(messageOrErrors)) {
      return new AppError(code, undefined, messageOrErrors);
    }

    return new AppError(code, messageOrErrors);
  }
}