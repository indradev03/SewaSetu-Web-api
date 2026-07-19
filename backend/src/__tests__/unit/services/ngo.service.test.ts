import { NGOService } from "../../../services/ngo.service";
import { NGORepository } from "../../../repositories/ngo.repository";
import { HttpException } from "../../../exceptions/http-exception";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mock the dependencies
jest.mock("../../../repositories/ngo.repository");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("NGOService Unit Tests", () => {
  let ngoService: NGOService;

  beforeEach(() => {
    ngoService = new NGOService();
    jest.clearAllMocks();
  });

  describe("registerNGO", () => {
    it("should successfully register a new NGO", async () => {
      const mockNGOData = {
        organizationName: "Test NGO",
        registrationNumber: "TEST123",
        yearEstablished: "2020",
        contactPerson: "John Doe",
        email: "test@example.com",
        password: "password123",
        impactDescription: "We help communities",
      };

      (NGORepository.findByEmail as jest.Mock).mockResolvedValue(null);
      (NGORepository.registrationNumberExists as jest.Mock).mockResolvedValue(false);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashed_password");
      
      const mockCreatedNGO = {
        _id: "123",
        ...mockNGOData,
        password: "hashed_password",
        role: "ngo",
        isVerified: false,
        toObject: () => ({ ...mockNGOData, role: "ngo", isVerified: false }),
      };

      (NGORepository.create as jest.Mock).mockResolvedValue(mockCreatedNGO);

      const result = await ngoService.registerNGO(mockNGOData);

      expect(NGORepository.findByEmail).toHaveBeenCalledWith(mockNGOData.email);
      expect(NGORepository.registrationNumberExists).toHaveBeenCalledWith(mockNGOData.registrationNumber);
      expect(bcrypt.hash).toHaveBeenCalledWith(mockNGOData.password, 10);
      expect(NGORepository.create).toHaveBeenCalled();
      expect(result).not.toHaveProperty("password");
    });

    it("should throw error if email already exists", async () => {
      const mockNGOData = {
        organizationName: "Test NGO",
        registrationNumber: "TEST123",
        yearEstablished: "2020",
        contactPerson: "John Doe",
        email: "test@example.com",
        password: "password123",
        impactDescription: "We help communities",
      };

      (NGORepository.findByEmail as jest.Mock).mockResolvedValue({ _id: "existing" });

      await expect(ngoService.registerNGO(mockNGOData)).rejects.toThrow(
        new HttpException(400, "Email already exists")
      );
    });

    it("should throw error if registration number already exists", async () => {
      const mockNGOData = {
        organizationName: "Test NGO",
        registrationNumber: "TEST123",
        yearEstablished: "2020",
        contactPerson: "John Doe",
        email: "test@example.com",
        password: "password123",
        impactDescription: "We help communities",
      };

      (NGORepository.findByEmail as jest.Mock).mockResolvedValue(null);
      (NGORepository.registrationNumberExists as jest.Mock).mockResolvedValue(true);

      await expect(ngoService.registerNGO(mockNGOData)).rejects.toThrow(
        new HttpException(400, "Registration number already exists")
      );
    });
  });

  describe("loginNGO", () => {
    it("should successfully login an NGO", async () => {
      const mockLoginData = {
        email: "test@example.com",
        password: "password123",
      };

      const mockNGO = {
        _id: "123",
        email: mockLoginData.email,
        password: "hashed_password",
        organizationName: "Test NGO",
        role: "ngo",
        isVerified: true,
        toObject: () => ({ 
          _id: "123",
          email: mockLoginData.email,
          organizationName: "Test NGO",
          role: "ngo",
          isVerified: true,
        }),
      };

      (NGORepository.findByEmail as jest.Mock).mockResolvedValue(mockNGO);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("jwt_token");

      const result = await ngoService.loginNGO(mockLoginData);

      expect(NGORepository.findByEmail).toHaveBeenCalledWith(mockLoginData.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(mockLoginData.password, "hashed_password");
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toHaveProperty("ngo");
      expect(result).toHaveProperty("token");
      expect(result.ngo).not.toHaveProperty("password");
    });

    it("should throw error if NGO not found", async () => {
      const mockLoginData = {
        email: "test@example.com",
        password: "password123",
      };

      (NGORepository.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(ngoService.loginNGO(mockLoginData)).rejects.toThrow(
        new HttpException(400, "Invalid email or password")
      );
    });

    it("should throw error if password is invalid", async () => {
      const mockLoginData = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      const mockNGO = {
        _id: "123",
        email: mockLoginData.email,
        password: "hashed_password",
        role: "ngo",
        isVerified: true,
      };

      (NGORepository.findByEmail as jest.Mock).mockResolvedValue(mockNGO);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(ngoService.loginNGO(mockLoginData)).rejects.toThrow(
        new HttpException(400, "Invalid email or password")
      );
    });

    it("should throw error if NGO is not verified", async () => {
      const mockLoginData = {
        email: "test@example.com",
        password: "password123",
      };

      const mockNGO = {
        _id: "123",
        email: mockLoginData.email,
        password: "hashed_password",
        role: "ngo",
        isVerified: false,
      };

      (NGORepository.findByEmail as jest.Mock).mockResolvedValue(mockNGO);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(ngoService.loginNGO(mockLoginData)).rejects.toThrow(
        new HttpException(403, "Your account has not been verified yet. Please wait for an administrator to review your application.")
      );
    });
  });

  describe("getProfile", () => {
    it("should successfully get NGO profile", async () => {
      const mockNGOId = "123";
      const mockNGO = {
        _id: mockNGOId,
        organizationName: "Test NGO",
        email: "test@example.com",
        contactPerson: "John Doe",
      };

      (NGORepository.findById as jest.Mock).mockResolvedValue(mockNGO);

      const result = await ngoService.getProfile(mockNGOId);

      expect(NGORepository.findById).toHaveBeenCalledWith(mockNGOId);
      expect(result).toEqual(mockNGO);
    });

    it("should throw error if NGO not found", async () => {
      const mockNGOId = "123";

      (NGORepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(ngoService.getProfile(mockNGOId)).rejects.toThrow(
        new HttpException(404, "NGO not found")
      );
    });
  });

  describe("updateProfile", () => {
    it("should successfully update NGO profile", async () => {
      const mockNGOId = "123";
      const mockUpdateData = {
        organizationName: "Updated NGO",
        contactPerson: "Jane Doe",
      };

      const mockUpdatedNGO = {
        _id: mockNGOId,
        ...mockUpdateData,
      };

      (NGORepository.updateById as jest.Mock).mockResolvedValue(mockUpdatedNGO);

      const result = await ngoService.updateProfile(mockNGOId, mockUpdateData);

      expect(NGORepository.updateById).toHaveBeenCalledWith(mockNGOId, mockUpdateData);
      expect(result).toEqual(mockUpdatedNGO);
    });

    it("should throw error if NGO not found", async () => {
      const mockNGOId = "123";
      const mockUpdateData = {
        organizationName: "Updated NGO",
      };

      (NGORepository.updateById as jest.Mock).mockResolvedValue(null);

      await expect(ngoService.updateProfile(mockNGOId, mockUpdateData)).rejects.toThrow(
        new HttpException(404, "NGO not found")
      );
    });
  });

  describe("deleteNGO", () => {
    it("should successfully delete NGO", async () => {
      const mockNGOId = "123";
      const mockDeletedNGO = {
        _id: mockNGOId,
        organizationName: "Test NGO",
      };

      (NGORepository.deleteById as jest.Mock).mockResolvedValue(mockDeletedNGO);

      const result = await ngoService.deleteNGO(mockNGOId);

      expect(NGORepository.deleteById).toHaveBeenCalledWith(mockNGOId);
      expect(result).toEqual(mockDeletedNGO);
    });

    it("should throw error if NGO not found", async () => {
      const mockNGOId = "123";

      (NGORepository.deleteById as jest.Mock).mockResolvedValue(null);

      await expect(ngoService.deleteNGO(mockNGOId)).rejects.toThrow(
        new HttpException(404, "NGO not found")
      );
    });
  });

  describe("getVerifiedNGOs", () => {
    it("should successfully get all verified NGOs", async () => {
      const mockNGOs = [
        { _id: "1", organizationName: "NGO 1", isVerified: true },
        { _id: "2", organizationName: "NGO 2", isVerified: true },
      ];

      (NGORepository.findAllVerified as jest.Mock).mockResolvedValue(mockNGOs);

      const result = await ngoService.getVerifiedNGOs();

      expect(NGORepository.findAllVerified).toHaveBeenCalled();
      expect(result).toEqual(mockNGOs);
    });
  });
});
