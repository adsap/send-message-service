export class ResponseHelper {
  static success(
    res: any,
    message: string,
    result: any = null,
    statusCode: number = 200,
  ) {
    return res.status(statusCode).json({
      status: 'success',
      message,
      result,
    });
  }

  static error(
    res: any,
    message: string,
    statusCode: number = 500,
    errors: any = null,
  ) {
    return res.status(statusCode).json({
      status: 'error',
      message,
      errors,
    });
  }
}
