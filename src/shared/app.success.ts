class AppSuccess {
  public readonly message: string;
  public readonly data: any;
  public readonly statusCode: number;

  constructor(message: string, data: any, statusCode = 200) {
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
