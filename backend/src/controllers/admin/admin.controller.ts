import { Request, Response } from "express";
import mongoose from "mongoose";
import { ApiResponseHelper } from "../../utils/api-response";
import { AdminService } from "../../services/admin/admin.service";

const service = new AdminService();

interface QueryParams {
  page?: string;
  limit?: string;
  search?: string;
}

export class AdminController {
  // DASHBOARD

  async dashboard(req: Request, res: Response) {
    try {
      const data = await service.dashboard();

      return ApiResponseHelper.success(
        res,
        data,
        200,
        "Dashboard loaded successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Internal Server Error",
        error.status || 500,
      );
    }
  }

  // DONORS

  async getAllDonors(req: Request, res: Response) {
    try {
      const { page, limit, search }: QueryParams = req.query;

      const { data, pagination } = await service.getAllDonors(
        page,
        limit,
        search,
      );

      return ApiResponseHelper.success(
        res,
        data,
        200,
        "Donors fetched successfully",
        pagination,
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Internal Server Error",
        error.status || 500,
      );
    }
  }

  async getDonorById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return ApiResponseHelper.error(res, "Invalid donor ID", 400);
      }

      const donor = await service.getDonorById(id);

      return ApiResponseHelper.success(
        res,
        donor,
        200,
        "Donor fetched successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Internal Server Error",
        error.status || 500,
      );
    }
  }

  async deleteDonor(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return ApiResponseHelper.error(res, "Invalid donor ID", 400);
      }

      await service.deleteDonor(id);

      return ApiResponseHelper.success(
        res,
        null,
        200,
        "Donor deleted successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Internal Server Error",
        error.status || 500,
      );
    }
  }

  // NGOs

  async getAllNGOs(req: Request, res: Response) {
    try {
      const { page, limit, search }: QueryParams = req.query;

      const { data, pagination } = await service.getAllNGOs(
        page,
        limit,
        search,
      );

      return ApiResponseHelper.success(
        res,
        data,
        200,
        "NGOs fetched successfully",
        pagination,
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Internal Server Error",
        error.status || 500,
      );
    }
  }

  async getNGOById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return ApiResponseHelper.error(res, "Invalid NGO ID", 400);
      }

      const ngo = await service.getNGOById(id);

      return ApiResponseHelper.success(
        res,
        ngo,
        200,
        "NGO fetched successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Internal Server Error",
        error.status || 500,
      );
    }
  }

  async deleteNGO(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return ApiResponseHelper.error(res, "Invalid NGO ID", 400);
      }

      await service.deleteNGO(id);

      return ApiResponseHelper.success(
        res,
        null,
        200,
        "NGO deleted successfully",
      );
    } catch (error: any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Internal Server Error",
        error.status || 500,
      );
    }
  }
}
