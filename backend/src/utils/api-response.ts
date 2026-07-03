import { Response } from "express";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

export interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
}

export class ApiResponseHelper {
  // SUCCESS RESPONSE

  static success<T>(
    res: Response,
    data: T,
    status: number = 200,
    message: string = "Success",
    meta?: PaginationMeta,
  ) {
    const response: ApiResponse<T> = {
      status,
      success: true,
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
    status: number = 500,
  ) {
    return res.status(status).json({
      status,
      success: false,
      message,
    });
  }

  // PAGINATED RESPONSE (OPTIONAL)

  static paginated<T>(
    res: Response,
    data: T,
    meta: PaginationMeta,
    status: number = 200,
    message: string = "Success",
  ) {
    return this.success(res, data, status, message, meta);
  }
}
