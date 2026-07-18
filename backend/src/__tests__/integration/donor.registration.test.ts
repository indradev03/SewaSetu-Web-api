import request from "supertest";
import app from "../../index";
import Donor from "../../models/donor.model";

describe("Donor Registration Integration Tests", () => {
  const validDonorData = {
    username: "testdonor",
    fullName: "Test Donor",
    email: "testdonor@example.com",
    password: "password123",
    phoneNumber: "1234567890",
    gender: "male" as const,
    address: "Test Address",
  };

  // Clean up before each test
  beforeEach(async () => {
    await Donor.deleteMany({});
  });

  // Clean up after all tests
  afterAll(async () => {
    await Donor.deleteMany({});
  });

  describe("POST /api/v1/donor/register - Success Case", () => {
    it("should register a new donor successfully", async () => {
      const response = await request(app)
        .post("/api/v1/donor/register")
        .send(validDonorData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Donor registered successfully");
      expect(response.body.data).toHaveProperty("username", validDonorData.username);
      expect(response.body.data).toHaveProperty("email", validDonorData.email);
      expect(response.body.data).toHaveProperty("fullName", validDonorData.fullName);
      expect(response.body.data).not.toHaveProperty("password");
      expect(response.body.data).toHaveProperty("role", "donor");

      // Verify donor was actually saved to database
      const savedDonor = await Donor.findOne({ email: validDonorData.email });
      expect(savedDonor).toBeTruthy();
      expect(savedDonor?.username).toBe(validDonorData.username);
    });
  });

  describe("POST /api/v1/donor/register - Failure Cases", () => {
    it("should fail when email already exists", async () => {
      // Create first donor
      await request(app)
        .post("/api/v1/donor/register")
        .send(validDonorData);

      // Try to register with same email but different username
      const duplicateEmailData = {
        ...validDonorData,
        username: "differentdonor",
        email: validDonorData.email, // Same email
      };

      const response = await request(app)
        .post("/api/v1/donor/register")
        .send(duplicateEmailData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Email or username already exists");
    });

    it("should fail when username already exists", async () => {
      // Create first donor
      await request(app)
        .post("/api/v1/donor/register")
        .send(validDonorData);

      // Try to register with same username but different email
      const duplicateUsernameData = {
        ...validDonorData,
        username: validDonorData.username, // Same username
        email: "different@example.com",
      };

      const response = await request(app)
        .post("/api/v1/donor/register")
        .send(duplicateUsernameData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Email or username already exists");
    });

    it("should fail with invalid email format", async () => {
      const invalidEmailData = {
        ...validDonorData,
        email: "invalid-email",
      };

      const response = await request(app)
        .post("/api/v1/donor/register")
        .send(invalidEmailData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Invalid email");
    });

    it("should fail with password less than 6 characters", async () => {
      const shortPasswordData = {
        ...validDonorData,
        password: "12345",
      };

      const response = await request(app)
        .post("/api/v1/donor/register")
        .send(shortPasswordData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Password must be at least 6 characters");
    });

    it("should fail when required fields are missing", async () => {
      const incompleteData = {
        username: "testdonor",
        // Missing fullName, email, password, phoneNumber
      };

      const response = await request(app)
        .post("/api/v1/donor/register")
        .send(incompleteData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
