import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/constant";
import { DonorRepository } from "../repositories/donor.repository";
import { NGORepository } from "../repositories/ngo.repository";
import { HttpException } from "../exceptions/http-exception";
import { ApiResponseHelper } from "../utils/api-response";

type UserRole = "donor" | "ngo" | "admin";

interface JwtPayload {
  id: string;
  role: UserRole;
}

/**
 * Extend Express Request
 */
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
        email?: string;
        isVerified?: boolean;
      };
    }
  }
}

/**
 * Authentication Middleware
 */
export const authorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new HttpException(
        401,
        "Authorization header missing or malformed"
      );
    }

    const token = authHeader.replace("Bearer ", "").trim();

    const decoded = jwt.verify(
      token,
      SECRET_KEY
    ) as JwtPayload;

    if (!decoded?.id || !decoded?.role) {
      throw new HttpException(401, "Invalid token");
    }

    let user = null;

    // donor and admin are stored in Donor collection
    if (
      decoded.role === "donor" ||
      decoded.role === "admin"
    ) {
      user = await DonorRepository.findById(decoded.id);
    }

    // ngo stored in NGO collection
    if (decoded.role === "ngo") {
      user = await NGORepository.findById(decoded.id);
    }

    if (!user) {
      throw new HttpException(401, "User not found");
    }

    req.user = {
      id: user._id.toString(),
      role: decoded.role,
      email: user.email,
      isVerified: (user as any).isVerified ?? true,
    };

    next();
  } catch (error: any) {
    return ApiResponseHelper.error(
      res,
      error?.message || "Unauthorized",
      error?.status || 401
    );
  }
};

/**
 * Generic Role Authorization
 *
 * Usage:
 * authorizeRoles("admin")
 * authorizeRoles("ngo")
 * authorizeRoles("donor")
 * authorizeRoles("admin", "ngo")
 */
export const authorizeRoles =
  (...roles: UserRole[]) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!req.user) {
        throw new HttpException(
          401,
          "Authentication required"
        );
      }

      if (!roles.includes(req.user.role)) {
        throw new HttpException(
          403,
          "Access denied"
        );
      }

      next();
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error?.message || "Forbidden",
        error?.status || 403
      );
    }
  };