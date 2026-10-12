import { describe, expect, it } from "vitest";
import { contactSchema, createRateLimiter } from "./contact";

const valid = {
  name: "Jane",
  email: "jane@example.com",
  message: "Hello, I would like to talk.",
  website: "",
};

describe("contactSchema", () => {
  it("accepts a complete message", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects a filled honeypot and reports field errors as message keys", () => {
    expect(contactSchema.safeParse({ ...valid, website: "spam.example" }).success).toBe(false);
    const result = contactSchema.safeParse({ ...valid, email: "nope", message: "hi" });
    expect(result.error?.issues.map((issue) => issue.message)).toEqual([
      "emailInvalid",
      "messageTooShort",
    ]);
  });
});

describe("createRateLimiter", () => {
  it("blocks after the limit and frees up once the window passes", () => {
    const isLimited = createRateLimiter(2, 1000);
    expect(isLimited("ip", 0)).toBe(false);
    expect(isLimited("ip", 10)).toBe(false);
    expect(isLimited("ip", 20)).toBe(true);
    expect(isLimited("other", 20)).toBe(false);
    expect(isLimited("ip", 1015)).toBe(false);
  });
});
