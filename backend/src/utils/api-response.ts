import { Response } from "express";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data?: T;
  meta?: PaginationMeta;
}

export class ApiResponseHelper {

  // SUCCESS RESPONSE

  static success<T>(
    res: Response,
    data: T,
    status: number = 200,
    message: string = "Success",
    meta?: PaginationMeta
  ) {
    const response: ApiResponse<T> = {
      success: true,
      status,
      message,
      data,
      meta,
    };

    return res.status(status).json(response);
  }


  // ERROR RESPONSE

  static error(
    res: Response,
    message: string = "Internal Server Error",
    status: number = 500
  ) {
    const response: ApiResponse<null> = {
      success: false,
      status,
      message,
      data: null,
    };

    return res.status(status).json(response);
  }


  // PAGINATION RESPONSE (optional but useful)

  static paginated<T>(
    res: Response,
    data: T,
    meta: PaginationMeta,
    status: number = 200,
    message: string = "Success"
  ) {
    const response: ApiResponse<T> = {
      success: true,
      status,
      message,
      data,
      meta,
    };

    return res.status(status).json(response);
  }
}