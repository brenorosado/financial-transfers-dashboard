// import type { Config } from "jest";
const nextJest = require("next/jest");
// import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(config);
