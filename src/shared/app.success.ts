class AppSuccess {
  public readonly message: string;
  public readonly data: unknown;
  public readonly statusCode: number;

  constructor(message: string, data: unknown, statusCode = 200) {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }

  toJSON() {
    return {
      status: this.statusCode,
      message: this.message,
      data: this.data,
    };
  }
}

export default AppSuccess;
