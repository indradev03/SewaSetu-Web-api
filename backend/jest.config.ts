// jest.config.ts
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  testMatch: ["**/__tests__/**/*.test.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/index.ts",
    "!src/app.ts",
    "!src/__tests__/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.ts"],
  moduleNameMapper: {
    "^uuid$": "<rootDir>/src/__tests__/__mocks__/uuid.js",
  },
};
// 1. jest.config.ts
// 2. tsconfig.json
// 3. __test__
// 4. integ, unit
// 5. setup.ts
// 6. __mocks__
// 7. uuid.js
// 8. package.json -- "test": "jest --verbose --detectOpenHandles"

// 9. integration testing
//  - auth.test.ts
