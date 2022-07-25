module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  verbose: true,
  clearMocks: true,
  // setupFilesAfterEnv:["./src/lib/prisma/client.mock.ts"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
