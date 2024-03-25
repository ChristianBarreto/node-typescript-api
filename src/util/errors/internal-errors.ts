export class InternalError extends Error {
  constructor(
    public message: string,
    protected code: number = 500,
    protected description?: string
  ) {
    super(message);
    this.name = this.constructor.name; // shows the correct name
    Error.captureStackTrace(this, this.constructor); // when showing the error, it removes the class and show only the error
  }
}