import { validateMintConfig } from "../src";
import { mintConfigSchema } from "../src";

describe("validateMintConfig", () => {
  test("returns error when missing config object", () => {
    const results = validateMintConfig(null);
    expect(results.status).toEqual("error");
    expect(results.errors.length).toEqual(1);
  });

  test("returns error when missing config object", () => {
    const results = validateMintConfig({});
    expect(results.status).toEqual("error");
    expect(results.errors.length).toEqual(1);
  });
});

describe("mintConfigSchema", () => {
  test("zod to json schema generation is successful", () => {
    expect(mintConfigSchema.$ref).toEqual("#/definitions/mintConfigSchema");
  })
})