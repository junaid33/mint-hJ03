import { versionsSchema } from "../../src/schemas/versions";

describe("versionsSchema", () => {
  test("returns an error when versions is declared but empty", () => {
    const data = versionsSchema.safeParse([]);
    expect(data.success).toEqual(false);
  });

  test("works when versions is not declared", () => {
    const data = versionsSchema.safeParse(undefined);
    expect(data.success).toEqual(true);
  });
});
