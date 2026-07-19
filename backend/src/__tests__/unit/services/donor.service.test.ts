import { DonorService } from "../../../services/donor.service";
import { DonorRepository } from "../../../repositories/donor.repository";
import { HttpException } from "../../../exceptions/http-exception";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mock the dependencies
jest.mock("../../../repositories/donor.repository");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("DonorService Unit Tests", () => {
  let donorService: DonorService;

  beforeEach(() => {
    donorService = new DonorService();
    jest.clearAllMocks();
  });

  describe("registerDonor", () => {
    it("should successfully register a new donor", async () => {
      const mockDonorData = {
        username: "testdonor",
        fullName: "Test Donor",
        email: "test@example.com",
        password: "password123",
        phoneNumber: "1234567890",
      };

      (DonorRepository.findByEmailOrUsername as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
      
      const mockCreatedDonor = {
        _id: "123",
        ...mockDonorData,
        password: "hashed_password",
        role: "donor",
        toObject: () => ({ ...mockDonorData, role: "donor" }),
      };

      (DonorRepository.create as jest.Mock).mockResolvedValue(mockCreatedDonor);

      const result = await donorService.registerDonor(mockDonorData);

      expect(DonorRepository.findByEmailOrUsername).toHaveBeenCalledWith(
        mockDonorData.email,
        mockDonorData.username
      );
      expect(bcrypt.hash).toHaveBeenCalledWith(mockDonorData.password, 10);
      expect(DonorRepository.create).toHaveBeenCalled();
      expect(result).not.toHaveProperty("password");
    });

    it("should throw error if email or username already exists", async () => {
      const mockDonorData = {
        username: "testdonor",
        fullName: "Test Donor",
        email: "test@example.com",
        password: "password123",
        phoneNumber: "1234567890",
      };

      (DonorRepository.findByEmailOrUsername as jest.Mock).mockResolvedValue({
        _id: "existing",
        email: mockDonorData.email,
      });

      await expect(donorService.registerDonor(mockDonorData)).rejects.toThrow(
        new HttpException(400, "Email or username already exists")
      );
    });
  });

  describe("loginDonor", () => {
    it("should successfully login a donor", async () => {
      const mockLoginData = {
        email: "test@example.com",
        password: "password123",
      };

      const mockDonor = {
        _id: "123",
        email: mockLoginData.email,
        password: "hashed_password",
        username: "testdonor",
        role: "donor",
        toObject: () => ({ 
          _id: "123",
          email: mockLoginData.email,
          username: "testdonor",
          role: "donor",
        }),
      };

      (DonorRepository.findByEmail as jest.Mock).mockResolvedValue(mockDonor);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("jwt_token");

      const result = await donorService.loginDonor(mockLoginData);

      expect(DonorRepository.findByEmail).toHaveBeenCalledWith(mockLoginData.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginData.password, "hashed_password");
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toHaveProperty("donor");
      expect(result).toHaveProperty("token");
      expect(result.donor).not.toHaveProperty("password");
    });

    it("should throw error if donor not found", async () => {
      const mockLoginData = {
        email: "test@example.com",
        password: "password123",
      };

      (DonorRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(donorService.loginDonor(mockLoginData)).rejects.toThrow(
        new HttpException(400, "Invalid email or password")
      );
    });

    it("should throw error if password is invalid", async () => {
      const mockLoginData = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      const mockDonor = {
        _id: "123",
        email: mockLoginData.email,
        password: "hashed_password",
        role: "donor",
      };

      (DonorRepository.findByEmail as jest.Mock).mockResolvedValue(mockDonor);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(donorService.loginDonor(mockLoginData)).rejects.toThrow(
        new HttpException(400, "Invalid email or password")
      );
    });
  });

  describe("getProfile", () => {
    it("should successfully get donor profile", async () => {
      const mockDonorId = "123";
      const mockDonor = {
        _id: mockDonorId,
        username: "testdonor",
        email: "test@example.com",
        fullName: "Test Donor",
      };

      (DonorRepository.findById as jest.Mock).mockResolvedValue(mockDonor);

      const result = await donorService.getProfile(mockDonorId);

      expect(DonorRepository.findById).toHaveBeenCalledWith(mockDonorId);
      expect(result).toEqual(mockDonor);
    });

    it("should throw error if donor not found", async () => {
      const mockDonorId = "123";

      (DonorRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(donorService.getProfile(mockDonorId)).rejects.toThrow(
        new HttpException(404, "Donor not found")
      );
    });
  });

  describe("updateProfile", () => {
    it("should successfully update donor profile", async () => {
      const mockDonorId = "123";
      const mockUpdateData = {
        fullName: "Updated Name",
        phoneNumber: "9876543210",
      };

      const mockUpdatedDonor = {
        _id: mockDonorId,
        ...mockUpdateData,
      };

      (DonorRepository.updateById as jest.Mock).mockResolvedValue(mockUpdatedDonor);

      const result = await donorService.updateProfile(mockDonorId, mockUpdateData);

      expect(DonorRepository.updateById).toHaveBeenCalledWith(mockDonorId, mockUpdateData);
      expect(result).toEqual(mockUpdatedDonor);
    });

    it("should throw error if donor not found", async () => {
      const mockDonorId = "123";
      const mockUpdateData = {
        fullName: "Updated Name",
      };

      (DonorRepository.updateById as jest.Mock).mockResolvedValue(null);

      await expect(donorService.updateProfile(mockDonorId, mockUpdateData)).rejects.toThrow(
        new HttpException(404, "Donor not found")
      );
    });
  });

  describe("deleteAccount", () => {
    it("should successfully delete donor account", async () => {
      const mockDonorId = "123";
      const mockDeletedDonor = {
        _id: mockDonorId,
        username: "testdonor",
      };

      (DonorRepository.deleteById as jest.Mock).mockResolvedValue(mockDeletedDonor);

      const result = await donorService.deleteAccount(mockDonorId);

      expect(DonorRepository.deleteById).toHaveBeenCalledWith(mockDonorId);
      expect(result).toEqual(mockDeletedDonor);
    });

    it("should throw error if donor not found", async () => {
      const mockDonorId = "123";

      (DonorRepository.deleteById as jest.Mock).mockResolvedValue(null);

      await expect(donorService.deleteAccount(mockDonorId)).rejects.toThrow(
        new HttpException(404, "Donor not found")
      );
    });
  });
});
