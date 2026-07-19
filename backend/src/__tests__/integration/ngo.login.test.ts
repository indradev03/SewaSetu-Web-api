import request from "supertest";
import app from "../../index";
import NGO from "../../models/ngo.model";
import bcrypt from "bcryptjs";

describe("NGO Login Integration Tests", () => {
  const validNGOData = {
    organizationName: "Test NGO",
    registrationNumber: "TEST123456",
    yearEstablished: "2020",
    contactPerson: "John Doe",
    email: "testngo@example.com",
    password: "password123",
    impactDescription: "We help communities",
    address: "123 NGO Street",
  };

  // Clean up before each test
  beforeEach(async () => {
    await NGO.deleteMany({});
  });

  // Clean up after all tests
  afterAll(async () => {
    await NGO.deleteMany({});
  });

  describe("POST /api/v1/ngo/login - Success Case", () => {
    it("should successfully login an NGO with valid credentials", async () => {
      // First, register an NGO
      const hashedPassword = await bcrypt.hash(validNGOData.password, 10);
      await NGO.create({
        ...validNGOData,
        password: hashedPassword,
        role: "ngo",
        isVerified: true,
      });

      // Now try to login
      const loginResponse = await request(app)
        .post("/api/v1/ngo/login")
        .send({
          email: validNGOData.email,
          password: validNGOData.password,
        });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.success).toBe(true);
      expect(loginResponse.body.message).toBe("Login successful");
      expect(loginResponse.body.data).toHaveProperty("ngo");
      expect(loginResponse.body.data).toHaveProperty("token");
      expect(loginResponse.body.data.ngo).toHaveProperty("email", validNGOData.email);
      expect(loginResponse.body.data.ngo).toHaveProperty("organizationName", validNGOData.organizationName);
      expect(loginResponse.body.data.ngo).not.toHaveProperty("password");
      expect(loginResponse.body.data.token).toBeTruthy();
    });
  });

  describe("POST /api/v1/ngo/login - Failure Cases", () => {
    it("should fail with invalid email", async () => {
      const response = await request(app)
        .post("/api/v1/ngo/login")
        .send({
          email: "nonexistent@example.com",
          password: "password123",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid email or password");
    });

    it("should fail with invalid password", async () => {
      // First, register an NGO
      const hashedPassword = await bcrypt.hash(validNGOData.password, 10);
      await NGO.create({
        ...validNGOData,
        password: hashedPassword,
        role: "ngo",
        isVerified: true,
      });

      // Try to login with wrong password
      const response = await request(app)
        .post("/api/v1/ngo/login")
        .send({
          email: validNGOData.email,
          password: "wrongpassword",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid email or password");
    });

    it("should fail when NGO is not verified", async () => {
      // Register an NGO that is not verified
      const hashedPassword = await bcrypt.hash(validNGOData.password, 10);
      await NGO.create({
        ...validNGOData,
        password: hashedPassword,
        role: "ngo",
        isVerified: false, // Not verified
      });

      // Try to login
      const response = await request(app)
        .post("/api/v1/ngo/login")
        .send({
          email: validNGOData.email,
          password: validNGOData.password,
        });

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("not been verified yet");
    });

    it("should fail with invalid email format", async () => {
      const response = await request(app)
        .post("/api/v1/ngo/login")
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
        .post("/api/v1/ngo/login")
        .send({
          email: validNGOData.email,
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });
});
