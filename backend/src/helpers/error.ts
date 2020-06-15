class ErrorHandler extends Error {
  statusCode: number
  message: string

  constructor(statusCode: number, message: string) {
    super(message);
    this.message = message;
    this.statusCode = statusCode
  }

  getStatusCode(): number {
    return this.statusCode;
  }
}

const handleError = (err, res) => {
  const { getStatusCode, message } = err;
  const statusCode = getStatusCode()
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

export { ErrorHandler, handleError };
