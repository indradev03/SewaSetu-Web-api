import request from "supertest";
import app from "../../index";
import NGO from "../../models/ngo.model";

describe("NGO Registration Integration Tests", () => {
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

  describe("POST /api/v1/ngo/register - Success Case", () => {
    it("should register a new NGO successfully", async () => {
      const response = await request(app)
        .post("/api/v1/ngo/register")
        .field("organizationName", validNGOData.organizationName)
        .field("registrationNumber", validNGOData.registrationNumber)
        .field("yearEstablished", validNGOData.yearEstablished)
        .field("contactPerson", validNGOData.contactPerson)
        .field("email", validNGOData.email)
        .field("password", validNGOData.password)
        .field("impactDescription", validNGOData.impactDescription)
        .field("address", validNGOData.address);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("NGO registered successfully");
      expect(response.body.data).toHaveProperty("organizationName", validNGOData.organizationName);
      expect(response.body.data).toHaveProperty("email", validNGOData.email);
      expect(response.body.data).toHaveProperty("registrationNumber", validNGOData.registrationNumber);
      expect(response.body.data).not.toHaveProperty("password");
      expect(response.body.data).toHaveProperty("role", "ngo");
      expect(response.body.data).toHaveProperty("isVerified", false);

      // Verify NGO was actually saved to database
      const savedNGO = await NGO.findOne({ email: validNGOData.email });
      expect(savedNGO).toBeTruthy();
      expect(savedNGO?.organizationName).toBe(validNGOData.organizationName);
      expect(savedNGO?.isVerified).toBe(false);
    });
  });

  describe("POST /api/v1/ngo/register - Failure Cases", () => {
    it("should fail when email already exists", async () => {
      // Create first NGO
      await request(app)
        .post("/api/v1/ngo/register")
        .field("organizationName", validNGOData.organizationName)
        .field("registrationNumber", validNGOData.registrationNumber)
        .field("yearEstablished", validNGOData.yearEstablished)
        .field("contactPerson", validNGOData.contactPerson)
        .field("email", validNGOData.email)
        .field("password", validNGOData.password)
        .field("impactDescription", validNGOData.impactDescription)
        .field("address", validNGOData.address);

      // Try to register with same email but different registration number
      const duplicateEmailData = {
        ...validNGOData,
        registrationNumber: "DIFF123456",
        email: validNGOData.email, // Same email
      };

      const response = await request(app)
        .post("/api/v1/ngo/register")
        .field("organizationName", duplicateEmailData.organizationName)
        .field("registrationNumber", duplicateEmailData.registrationNumber)
        .field("yearEstablished", duplicateEmailData.yearEstablished)
        .field("contactPerson", duplicateEmailData.contactPerson)
        .field("email", duplicateEmailData.email)
        .field("password", duplicateEmailData.password)
        .field("impactDescription", duplicateEmailData.impactDescription)
        .field("address", duplicateEmailData.address);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Email already exists");
    });

    it("should fail when registration number already exists", async () => {
      // Create first NGO
      await request(app)
        .post("/api/v1/ngo/register")
        .field("organizationName", validNGOData.organizationName)
        .field("registrationNumber", validNGOData.registrationNumber)
        .field("yearEstablished", validNGOData.yearEstablished)
        .field("contactPerson", validNGOData.contactPerson)
        .field("email", validNGOData.email)
        .field("password", validNGOData.password)
        .field("impactDescription", validNGOData.impactDescription)
        .field("address", validNGOData.address);

      // Try to register with same registration number but different email
      const duplicateRegData = {
        ...validNGOData,
        registrationNumber: validNGOData.registrationNumber, // Same registration number
        email: "different@example.com",
      };

      const response = await request(app)
        .post("/api/v1/ngo/register")
        .field("organizationName", duplicateRegData.organizationName)
        .field("registrationNumber", duplicateRegData.registrationNumber)
        .field("yearEstablished", duplicateRegData.yearEstablished)
        .field("contactPerson", duplicateRegData.contactPerson)
        .field("email", duplicateRegData.email)
        .field("password", duplicateRegData.password)
        .field("impactDescription", duplicateRegData.impactDescription)
        .field("address", duplicateRegData.address);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Registration number already exists");
    });

    it("should fail with invalid email format", async () => {
      const response = await request(app)
        .post("/api/v1/ngo/register")
        .field("organizationName", validNGOData.organizationName)
        .field("registrationNumber", validNGOData.registrationNumber)
        .field("yearEstablished", validNGOData.yearEstablished)
        .field("contactPerson", validNGOData.contactPerson)
        .field("email", "invalid-email")
        .field("password", validNGOData.password)
        .field("impactDescription", validNGOData.impactDescription)
        .field("address", validNGOData.address);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Invalid email");
    });

    it("should fail with password less than 6 characters", async () => {
      const response = await request(app)
        .post("/api/v1/ngo/register")
        .field("organizationName", validNGOData.organizationName)
        .field("registrationNumber", validNGOData.registrationNumber)
        .field("yearEstablished", validNGOData.yearEstablished)
        .field("contactPerson", validNGOData.contactPerson)
        .field("email", validNGOData.email)
        .field("password", "12345")
        .field("impactDescription", validNGOData.impactDescription)
        .field("address", validNGOData.address);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Password must be at least 6 characters");
    });

    it("should fail when required fields are missing", async () => {
      const response = await request(app)
        .post("/api/v1/ngo/register")
        .field("organizationName", validNGOData.organizationName)
        // Missing other required fields

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should fail with invalid year established (less than 4 characters)", async () => {
      const response = await request(app)
        .post("/api/v1/ngo/register")
        .field("organizationName", validNGOData.organizationName)
        .field("registrationNumber", validNGOData.registrationNumber)
        .field("yearEstablished", "202") // Invalid year
        .field("contactPerson", validNGOData.contactPerson)
        .field("email", validNGOData.email)
        .field("password", validNGOData.password)
        .field("impactDescription", validNGOData.impactDescription)
        .field("address", validNGOData.address);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("Year established is required");
    });
  });
});
