import { Request, Response, NextFunction } from "express";
import { AuthController } from "../../../controllers/auth.controller";
import { DonorService } from "../../../services/donor.service";
import { NGOService } from "../../../services/ngo.service";

// Mock the services
jest.mock("../../../services/donor.service");
jest.mock("../../../services/ngo.service");

describe("Auth Controller Unit Tests", () => {
  let authController: AuthController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    authController = new AuthController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe("forgotPasswordDonor - Success Case", () => {
    it("should successfully send reset code for donor", async () => {
      mockRequest.body = {
        email: "test@example.com",
      };

      const mockResult = { message: "Reset code sent to email" };
      (DonorService.prototype.forgotPassword as jest.Mock).mockResolvedValue(mockResult);

      await authController.forgotPasswordDonor(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe("forgotPasswordDonor - Failure Cases", () => {
    it("should call next with error when validation fails", async () => {
      mockRequest.body = {
        email: "invalid-email",
      };

      await authController.forgotPasswordDonor(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it("should call next with error when service throws error", async () => {
      mockRequest.body = {
        email: "test@example.com",
      };

      const mockError = new Error("Service error");
      (DonorService.prototype.forgotPassword as jest.Mock).mockRejectedValue(mockError);

      await authController.forgotPasswordDonor(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("verifyResetCodeDonor - Success Case", () => {
    it("should successfully verify reset code for donor", async () => {
      mockRequest.body = {
        email: "test@example.com",
        code: "123456",
      };

      const mockResult = { message: "Code verified successfully" };
      (DonorService.prototype.verifyResetCode as jest.Mock).mockResolvedValue(mockResult);

      await authController.verifyResetCodeDonor(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe("verifyResetCodeDonor - Failure Cases", () => {
    it("should call next with error when validation fails", async () => {
      mockRequest.body = {
        email: "test@example.com",
        code: "123", // Invalid code length
      };

      await authController.verifyResetCodeDonor(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("resetPasswordDonor - Success Case", () => {
    it("should successfully reset password for donor", async () => {
      mockRequest.body = {
        email: "test@example.com",
        code: "123456",
        newPassword: "newpassword123",
        confirmPassword: "newpassword123",
      };

      const mockResult = { message: "Password reset successfully" };
      (DonorService.prototype.resetPassword as jest.Mock).mockResolvedValue(mockResult);

      await authController.resetPasswordDonor(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe("resetPasswordDonor - Failure Cases", () => {
    it("should call next with error when passwords don't match", async () => {
      mockRequest.body = {
        email: "test@example.com",
        code: "123456",
        newPassword: "newpassword123",
        confirmPassword: "differentpassword",
      };

      await authController.resetPasswordDonor(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("forgotPasswordNGO - Success Case", () => {
    it("should successfully send reset code for NGO", async () => {
      mockRequest.body = {
        email: "ngo@example.com",
      };

      const mockResult = { message: "Reset code sent to email" };
      (NGOService.prototype.forgotPassword as jest.Mock).mockResolvedValue(mockResult);

      await authController.forgotPasswordNGO(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe("forgotPasswordNGO - Failure Cases", () => {
    it("should call next with error when NGO not found", async () => {
      mockRequest.body = {
        email: "nonexistent@example.com",
      };

      const mockError = new Error("NGO not found");
      (NGOService.prototype.forgotPassword as jest.Mock).mockRejectedValue(mockError);

      await authController.forgotPasswordNGO(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });
  });

  describe("verifyResetCodeNGO - Success Case", () => {
    it("should successfully verify reset code for NGO", async () => {
      mockRequest.body = {
        email: "ngo@example.com",
        code: "123456",
      };

      const mockResult = { message: "Code verified successfully" };
      (NGOService.prototype.verifyResetCode as jest.Mock).mockResolvedValue(mockResult);

      await authController.verifyResetCodeNGO(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe("resetPasswordNGO - Success Case", () => {
    it("should successfully reset password for NGO", async () => {
      mockRequest.body = {
        email: "ngo@example.com",
        code: "123456",
        newPassword: "newpassword123",
        confirmPassword: "newpassword123",
      };

      const mockResult = { message: "Password reset successfully" };
      (NGOService.prototype.resetPassword as jest.Mock).mockResolvedValue(mockResult);

      await authController.resetPasswordNGO(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
