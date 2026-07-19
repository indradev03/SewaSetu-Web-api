import { DonationService } from "../../../services/donation.service";
import { DonationRepository } from "../../../repositories/donation.repository";
import { HttpException } from "../../../exceptions/http-exception";

// Mock the DonationRepository
jest.mock("../../../repositories/donation.repository");

describe("Donation Service Unit Tests", () => {
  let donationService: DonationService;

  beforeEach(() => {
    donationService = new DonationService();
    jest.clearAllMocks();
  });

  describe("createDonation - Success Case", () => {
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

      (DonationRepository.create as jest.Mock).mockResolvedValue(mockCreatedDonation);

      const result = await donationService.createDonation(mockDonationData);

      expect(DonationRepository.create).toHaveBeenCalledWith(mockDonationData);
      expect(result).toEqual(mockCreatedDonation);
    });
  });

  describe("createDonation - Failure Cases", () => {
    it("should throw error when repository fails to create donation", async () => {
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

      (DonationRepository.create as jest.Mock).mockRejectedValue(new Error("Database error"));

      await expect(donationService.createDonation(mockDonationData)).rejects.toThrow(
        "Database error"
      );
    });
  });

  describe("getDonationById - Success Case", () => {
    it("should successfully get donation by id", async () => {
      const mockDonationId = "donation123";
      const mockDonation = {
        _id: mockDonationId,
        category: "Food",
        title: "Rice Donation",
        donorId: {
          username: "testdonor",
          fullName: "Test Donor",
        },
      };

      (DonationRepository.findById as jest.Mock).mockResolvedValue(mockDonation);

      const result = await donationService.getDonationById(mockDonationId);

      expect(DonationRepository.findById).toHaveBeenCalledWith(mockDonationId);
      expect(result).toEqual(mockDonation);
    });
  });

  describe("getDonationById - Failure Cases", () => {
    it("should throw error when donation not found", async () => {
      const mockDonationId = "nonexistent";

      (DonationRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(donationService.getDonationById(mockDonationId)).rejects.toThrow(
        new HttpException(404, "Donation not found")
      );
    });
  });

  describe("updateDonation - Success Case", () => {
    it("should successfully update donation", async () => {
      const mockDonationId = "donation123";
      const mockUpdateData: any = {
        title: "Updated Title",
        quantity: 20,
      };

      const mockUpdatedDonation = {
        _id: mockDonationId,
        ...mockUpdateData,
      };

      (DonationRepository.updateById as jest.Mock).mockResolvedValue(mockUpdatedDonation);

      const result = await donationService.updateDonation(mockDonationId, mockUpdateData);

      expect(DonationRepository.updateById).toHaveBeenCalledWith(mockDonationId, mockUpdateData);
      expect(result).toEqual(mockUpdatedDonation);
    });
  });

  describe("updateDonation - Failure Cases", () => {
    it("should throw error when donation not found for update", async () => {
      const mockDonationId = "nonexistent";
      const mockUpdateData: any = {
        title: "Updated Title",
      };

      (DonationRepository.updateById as jest.Mock).mockResolvedValue(null);

      await expect(donationService.updateDonation(mockDonationId, mockUpdateData)).rejects.toThrow(
        new HttpException(404, "Donation not found")
      );
    });
  });

  describe("deleteDonation - Success Case", () => {
    it("should successfully delete donation", async () => {
      const mockDonationId = "donation123";
      const mockDeletedDonation = {
        _id: mockDonationId,
        title: "Rice Donation",
      };

      (DonationRepository.deleteById as jest.Mock).mockResolvedValue(mockDeletedDonation);

      const result = await donationService.deleteDonation(mockDonationId);

      expect(DonationRepository.deleteById).toHaveBeenCalledWith(mockDonationId);
      expect(result).toEqual(mockDeletedDonation);
    });
  });

  describe("deleteDonation - Failure Cases", () => {
    it("should throw error when donation not found for deletion", async () => {
      const mockDonationId = "nonexistent";

      (DonationRepository.deleteById as jest.Mock).mockResolvedValue(null);

      await expect(donationService.deleteDonation(mockDonationId)).rejects.toThrow(
        new HttpException(404, "Donation not found")
      );
    });
  });
});
