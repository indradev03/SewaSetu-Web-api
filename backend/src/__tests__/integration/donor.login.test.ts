import request from "supertest";
import app from "../../index";
import Donor from "../../models/donor.model";
import bcrypt from "bcryptjs";

describe("Donor Login Integration Tests", () => {
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

  describe("POST /api/v1/donor/login - Success Case", () => {
    it("should successfully login a donor with valid credentials", async () => {
      // First, register a donor
      const hashedPassword = await bcrypt.hash(validDonorData.password, 10);
      await Donor.create({
        ...validDonorData,
        password: hashedPassword,
        role: "donor",
      });

      // Now try to login
      const loginResponse = await request(app)
        .post("/api/v1/donor/login")
        .send({
          email: validDonorData.email,
          password: validDonorData.password,
        });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.success).toBe(true);
      expect(loginResponse.body.message).toBe("Login successful");
      expect(loginResponse.body.data).toHaveProperty("donor");
      expect(loginResponse.body.data).toHaveProperty("token");
      expect(loginResponse.body.data.donor).toHaveProperty("email", validDonorData.email);
      expect(loginResponse.body.data.donor).toHaveProperty("username", validDonorData.username);
      expect(loginResponse.body.data.donor).not.toHaveProperty("password");
      expect(loginResponse.body.data.token).toBeTruthy();
    });
  });

  describe("POST /api/v1/donor/login - Failure Cases", () => {
    it("should fail with invalid email", async () => {
      const response = await request(app)
        .post("/api/v1/donor/login")
        .send({
          email: "nonexistent@example.com",
          password: "password123",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid email or password");
    });

    it("should fail with invalid password", async () => {
      // First, register a donor
      const hashedPassword = await bcrypt.hash(validDonorData.password, 10);
      await Donor.create({
        ...validDonorData,
        password: hashedPassword,
        role: "donor",
      });

      // Try to login with wrong password
      const response = await request(app)
        .post("/api/v1/donor/login")
        .send({
          email: validDonorData.email,
          password: "wrongpassword",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid email or password");
    });

    it("should fail with invalid email format", async () => {
      const response = await request(app)
        .post("/api/v1/donor/login")
        .send({
          email: "invalid-email",
          password: "password123",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Invalid email");
    });

    it("should fail when password is missing", async () => {
      const response = await request(app)
        .post("/api/v1/donor/login")
        .send({
          email: validDonorData.email,
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
