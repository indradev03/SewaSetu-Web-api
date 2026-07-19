import { DonationRepository } from "../../../repositories/donation.repository";
import Donation from "../../../models/donation.model";

// Mock the Donation model
jest.mock("../../../models/donation.model");

describe("Donation Repository Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("create - Success Case", () => {
    it("should successfully create a donation", async () => {
      const mockDonationData: any = {
        donorId: "123",
        category: "Food",
        title: "Rice Donation",
        description: "10kg of rice",
        quantity: 10,
        unit: "Kgs",
        pickupAddress: "123 Main Street",
        photos: [],
      };

      const mockCreatedDonation = {
        _id: "donation123",
        ...mockDonationData,
        adminStatus: "Pending",
        status: "Available",
      };

      (Donation.create as jest.Mock).mockResolvedValue(mockCreatedDonation);

      const result = await DonationRepository.create(mockDonationData);

      expect(Donation.create).toHaveBeenCalledWith(mockDonationData);
      expect(result).toEqual(mockCreatedDonation);
    });
  });

  describe("create - Failure Cases", () => {
    it("should throw error when database fails to create donation", async () => {
      const mockDonationData: any = {
        donorId: "123",
        category: "Food",
        title: "Rice Donation",
        description: "10kg of rice",
        quantity: 10,
        unit: "Kgs",
        pickupAddress: "123 Main Street",
        photos: [],
      };

      (Donation.create as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(DonationRepository.create(mockDonationData)).rejects.toThrow(
        "Database error"
      );
    });
  });

  describe("findById", () => {
    it("should find donation by id with populated donor", async () => {
      const mockDonationId = "donation123";
      const mockDonation = {
        _id: mockDonationId,
        category: "Food",
        title: "Rice Donation",
        donorId: {
          username: "testdonor",
          fullName: "Test Donor",
          email: "test@example.com",
        },
      };

      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
      };

      (Donation.findById as jest.Mock).mockReturnValue(mockQuery);

      const result = await DonationRepository.findById(mockDonationId);

      expect(Donation.findById).toHaveBeenCalledWith(mockDonationId);
      expect(mockQuery.populate).toHaveBeenCalledWith(
        "donorId",
        "username fullName email phoneNumber profileImage"
      );
    });

    it("should return null if donation not found", async () => {
      const mockDonationId = "nonexistent";

      const mockQuery = {
        populate: jest.fn().mockResolvedValue(null),
      };

      (Donation.findById as jest.Mock).mockReturnValue(mockQuery);

      const result = await DonationRepository.findById(mockDonationId);

      expect(result).toBeNull();
    });
  });

  describe("updateById", () => {
    it("should successfully update donation by id", async () => {
      const mockDonationId = "donation123";
      const mockUpdateData = {
        title: "Updated Title",
        quantity: 20,
      };

      const mockUpdatedDonation = {
        _id: mockDonationId,
        ...mockUpdateData,
      };

      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
      };

      (Donation.findByIdAndUpdate as jest.Mock).mockReturnValue(mockQuery);

      const result = await DonationRepository.updateById(mockDonationId, mockUpdateData);

      expect(Donation.findByIdAndUpdate).toHaveBeenCalledWith(
        mockDonationId,
        { $set: mockUpdateData },
        { new: true }
      );
    });
  });

  describe("deleteById", () => {
    it("should successfully delete donation by id", async () => {
      const mockDonationId = "donation123";
      const mockDeletedDonation = {
        _id: mockDonationId,
        title: "Rice Donation",
      };

      (Donation.findByIdAndDelete as jest.Mock).mockResolvedValue(mockDeletedDonation);

      const result = await DonationRepository.deleteById(mockDonationId);

      expect(Donation.findByIdAndDelete).toHaveBeenCalledWith(mockDonationId);
      expect(result).toEqual(mockDeletedDonation);
    });

    it("should return null if donation not found for deletion", async () => {
      const mockDonationId = "nonexistent";

      (Donation.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      const result = await DonationRepository.deleteById(mockDonationId);

      expect(result).toBeNull();
    });
  });
});
