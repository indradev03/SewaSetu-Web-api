import request from "supertest";
import app from "../../index";
import Donor from "../../models/donor.model";
import Donation from "../../models/donation.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/constant";

describe("Donation Creation Integration Tests", () => {
  let donorToken: string;
  let donorId: string;

  const validDonorData = {
    username: "testdonor",
    fullName: "Test Donor",
    email: "testdonor@example.com",
    password: "password123",
    phoneNumber: "1234567890",
    gender: "male" as const,
    address: "Test Address",
  };

  const validDonationData = {
    category: "Food" as const,
    title: "Rice Donation",
    description: "10kg of rice for community kitchen",
    quantity: 10,
    unit: "Kgs" as const,
    pickupAddress: "123 Main Street, City",
  };

  // Setup: Create donor and get token before tests
  beforeAll(async () => {
    // Clean up
    await Donor.deleteMany({});
    await Donation.deleteMany({});

    // Create donor
    const hashedPassword = await bcrypt.hash(validDonorData.password, 10);
    const donor = await Donor.create({
      ...validDonorData,
      password: hashedPassword,
      role: "donor",
    });

    donorId = donor._id.toString();

    // Generate token
    donorToken = jwt.sign(
      {
        id: donor._id,
        email: donor.email,
        role: donor.role,
      },
      SECRET_KEY,
      { expiresIn: "7d" } as jwt.SignOptions
    );
  });

  // Clean up after all tests
  afterAll(async () => {
    await Donor.deleteMany({});
    await Donation.deleteMany({});
  });

  describe("POST /api/v1/donation - Success Case", () => {
    it("should successfully create a donation with valid data", async () => {
      const response = await request(app)
        .post("/api/v1/donation")
        .set("Authorization", `Bearer ${donorToken}`)
        .send(validDonationData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Donation created successfully");
      expect(response.body.data).toHaveProperty("category", validDonationData.category);
      expect(response.body.data).toHaveProperty("title", validDonationData.title);
      expect(response.body.data).toHaveProperty("description", validDonationData.description);
      expect(response.body.data).toHaveProperty("quantity", validDonationData.quantity);
      expect(response.body.data).toHaveProperty("unit", validDonationData.unit);
      expect(response.body.data).toHaveProperty("pickupAddress", validDonationData.pickupAddress);
      expect(response.body.data).toHaveProperty("donorId");
      expect(response.body.data).toHaveProperty("adminStatus", "Pending");
      expect(response.body.data).toHaveProperty("status", "Available");

      // Verify donation was saved to database
      const savedDonation = await Donation.findOne({ title: validDonationData.title });
      expect(savedDonation).toBeTruthy();
      expect(savedDonation?.donorId.toString()).toBe(donorId);
    });
  });

  describe("POST /api/v1/donation - Failure Cases", () => {
    it("should fail without authentication token", async () => {
      const response = await request(app)
        .post("/api/v1/donation")
        .send(validDonationData);

      expect(response.status).toBe(401);
    });

    it("should fail with invalid category", async () => {
      const invalidData = {
        ...validDonationData,
        category: "InvalidCategory" as any,
      };

      const response = await request(app)
        .post("/api/v1/donation")
        .set("Authorization", `Bearer ${donorToken}`)
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should fail with title too short", async () => {
      const invalidData = {
        ...validDonationData,
        title: "", // Empty title
      };

      const response = await request(app)
        .post("/api/v1/donation")
        .set("Authorization", `Bearer ${donorToken}`)
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Title is required");
    });

    it("should fail with description too short", async () => {
      const invalidData = {
        ...validDonationData,
        description: "short", // Less than 10 characters
      };

      const response = await request(app)
        .post("/api/v1/donation")
        .set("Authorization", `Bearer ${donorToken}`)
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Description must be at least 10 characters");
    });

    it("should fail with invalid quantity (less than 1)", async () => {
      const invalidData = {
        ...validDonationData,
        quantity: 0,
      };

      const response = await request(app)
        .post("/api/v1/donation")
        .set("Authorization", `Bearer ${donorToken}`)
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Quantity must be at least 1");
    });

    it("should fail with invalid unit", async () => {
      const invalidData = {
        ...validDonationData,
        unit: "InvalidUnit" as any,
      };

      const response = await request(app)
        .post("/api/v1/donation")
        .set("Authorization", `Bearer ${donorToken}`)
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should fail with pickup address too short", async () => {
      const invalidData = {
        ...validDonationData,
        pickupAddress: "123", // Less than 5 characters
      };

      const response = await request(app)
        .post("/api/v1/donation")
        .set("Authorization", `Bearer ${donorToken}`)
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Pickup address is required");
    });

    it("should fail when required fields are missing", async () => {
      const incompleteData = {
        title: "Test Donation",
        // Missing other required fields
      };

      const response = await request(app)
        .post("/api/v1/donation")
        .set("Authorization", `Bearer ${donorToken}`)
        .send(incompleteData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
