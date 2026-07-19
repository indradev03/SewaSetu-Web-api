import { DonorRepository } from "../../../repositories/donor.repository";
import Donor from "../../../models/donor.model";

// Mock the Donor model
jest.mock("../../../models/donor.model");

describe("DonorRepository Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new donor", async () => {
      const mockDonorData = {
        username: "testdonor",
        fullName: "Test Donor",
        email: "test@example.com",
        password: "hashed_password",
        phoneNumber: "1234567890",
      };

      const mockCreatedDonor = {
        _id: "123",
        ...mockDonorData,
      };

      (Donor.create as jest.Mock).mockResolvedValue(mockCreatedDonor);

      const result = await DonorRepository.create(mockDonorData);

      expect(Donor.create).toHaveBeenCalledWith(mockDonorData);
      expect(result).toEqual(mockCreatedDonor);
    });
  });

  describe("findById", () => {
    it("should find donor by id without password", async () => {
      const mockDonorId = "123";
      const mockDonor = {
        _id: mockDonorId,
        username: "testdonor",
        email: "test@example.com",
      };

      const mockQuery = {
        select: jest.fn().mockResolvedValue(mockDonor),
      };

      (Donor.findById as jest.Mock).mockReturnValue(mockQuery);

      const result = await DonorRepository.findById(mockDonorId);

      expect(Donor.findById).toHaveBeenCalledWith(mockDonorId);
      expect(mockQuery.select).toHaveBeenCalledWith("-password");
      expect(result).toEqual(mockDonor);
    });

    it("should return null if donor not found", async () => {
      const mockDonorId = "123";

      const mockQuery = {
        select: jest.fn().mockResolvedValue(null),
      };

      (Donor.findById as jest.Mock).mockReturnValue(mockQuery);

      const result = await DonorRepository.findById(mockDonorId);

      expect(result).toBeNull();
    });
  });

  describe("findByEmail", () => {
    it("should find donor by email", async () => {
      const mockEmail = "test@example.com";
      const mockDonor = {
        _id: "123",
        email: mockEmail,
        username: "testdonor",
      };

      (Donor.findOne as jest.Mock).mockResolvedValue(mockDonor);

      const result = await DonorRepository.findByEmail(mockEmail);

      expect(Donor.findOne).toHaveBeenCalledWith({ email: mockEmail });
      expect(result).toEqual(mockDonor);
    });

    it("should return null if email not found", async () => {
      const mockEmail = "nonexistent@example.com";

      (Donor.findOne as jest.Mock).mockResolvedValue(null);

      const result = await DonorRepository.findByEmail(mockEmail);

      expect(result).toBeNull();
    });
  });

  describe("findByUsername", () => {
    it("should find donor by username", async () => {
      const mockUsername = "testdonor";
      const mockDonor = {
        _id: "123",
        username: mockUsername,
        email: "test@example.com",
      };

      (Donor.findOne as jest.Mock).mockResolvedValue(mockDonor);

      const result = await DonorRepository.findByUsername(mockUsername);

      expect(Donor.findOne).toHaveBeenCalledWith({ username: mockUsername });
      expect(result).toEqual(mockDonor);
    });
  });

  describe("findByEmailOrUsername", () => {
    it("should find donor by email or username", async () => {
      const mockEmail = "test@example.com";
      const mockUsername = "testdonor";
      const mockDonor = {
        _id: "123",
        email: mockEmail,
        username: mockUsername,
      };

      (Donor.findOne as jest.Mock).mockResolvedValue(mockDonor);

      const result = await DonorRepository.findByEmailOrUsername(mockEmail, mockUsername);

      expect(Donor.findOne).toHaveBeenCalledWith({
        $or: [{ email: mockEmail }, { username: mockUsername }],
      });
      expect(result).toEqual(mockDonor);
    });

    it("should return null if neither email nor username found", async () => {
      const mockEmail = "nonexistent@example.com";
      const mockUsername = "nonexistent";

      (Donor.findOne as jest.Mock).mockResolvedValue(null);

      const result = await DonorRepository.findByEmailOrUsername(mockEmail, mockUsername);

      expect(result).toBeNull();
    });
  });

  describe("updateById", () => {
    it("should update donor by id", async () => {
      const mockDonorId = "123";
      const mockUpdateData = {
        fullName: "Updated Name",
        phoneNumber: "9876543210",
      };

      const mockUpdatedDonor = {
        _id: mockDonorId,
        ...mockUpdateData,
      };

      const mockQuery = {
        select: jest.fn().mockResolvedValue(mockUpdatedDonor),
      };

      (Donor.findByIdAndUpdate as jest.Mock).mockReturnValue(mockQuery);

      const result = await DonorRepository.updateById(mockDonorId, mockUpdateData);

      expect(Donor.findByIdAndUpdate).toHaveBeenCalledWith(
        mockDonorId,
        { $set: mockUpdateData },
        { new: true }
      );
      expect(mockQuery.select).toHaveBeenCalledWith("-password");
      expect(result).toEqual(mockUpdatedDonor);
    });
  });

  describe("deleteById", () => {
    it("should delete donor by id", async () => {
      const mockDonorId = "123";
      const mockDeletedDonor = {
        _id: mockDonorId,
        username: "testdonor",
      };

      (Donor.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedDonor);

      const result = await DonorRepository.deleteById(mockDonorId);

      expect(Donor.findByIdAndDelete).toHaveBeenCalledWith(mockDonorId);
      expect(result).toEqual(mockDeletedDonor);
    });

    it("should return null if donor not found for deletion", async () => {
      const mockDonorId = "nonexistent";

      (Donor.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const result = await DonorRepository.deleteById(mockDonorId);

      expect(result).toBeNull();
    });
  });

  describe("emailExists", () => {
    it("should return true if email exists", async () => {
      const mockEmail = "test@example.com";

      (Donor.exists as jest.Mock).mockResolvedValue({ _id: "123" });

      const result = await DonorRepository.emailExists(mockEmail);

      expect(Donor.exists).toHaveBeenCalledWith({ email: mockEmail });
      expect(result).toBe(true);
    });

    it("should return false if email does not exist", async () => {
      const mockEmail = "nonexistent@example.com";

      (Donor.exists as jest.Mock).mockResolvedValue(null);

      const result = await DonorRepository.emailExists(mockEmail);

      expect(result).toBe(false);
    });
  });

  describe("usernameExists", () => {
    it("should return true if username exists", async () => {
      const mockUsername = "testdonor";

      (Donor.exists as jest.Mock).mockResolvedValue({ _id: "123" });

      const result = await DonorRepository.usernameExists(mockUsername);

      expect(Donor.exists).toHaveBeenCalledWith({ username: mockUsername });
      expect(result).toBe(true);
    });

    it("should return false if username does not exist", async () => {
      const mockUsername = "nonexistent";

      (Donor.exists as jest.Mock).mockResolvedValue(null);

      const result = await DonorRepository.usernameExists(mockUsername);

      expect(result).toBe(false);
    });
  });

  describe("findByIdWithPassword", () => {
    it("should find donor by id with password", async () => {
      const mockDonorId = "123";
      const mockDonor = {
        _id: mockDonorId,
        username: "testdonor",
        email: "test@example.com",
        password: "hashed_password",
      };

      (Donor.findById as jest.Mock).mockResolvedValue(mockDonor);

      const result = await DonorRepository.findByIdWithPassword(mockDonorId);

      expect(Donor.findById).toHaveBeenCalledWith(mockDonorId);
      expect(result).toEqual(mockDonor);
    });
  });
});
