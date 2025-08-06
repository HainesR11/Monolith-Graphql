export default class QueryError extends Error {
  private readonly type: string;
  private readonly errorMessage: string;

  constructor(message: string, error: Error, queryType?: string) {
    super();
    this.errorMessage = message;
    this.name = "QueryError";
    this.type = queryType || "Query";
    this.handleError(error);
  }

  isUndefined(error?: Error): boolean {
    return error?.message.includes("Cannot read properties of undefined")
      ? true
      : false;
  }

  handleError(error: Error): Error {
    if (this.isUndefined(error)) {
      throw new Error(this.errorMessage);
    }
    throw new Error(`Error running ${this.type}: ${error.message}`);
  }
}
