import { baseUrl } from "./config/api";

describe("login", () => {
  it("login user", async () => {
    const result = await baseUrl.post("/login", {
      username: "demo",
      password: "demo",
    });

    expect(result).toBeTruthy();
    expect(result.status).toBe(200);
    expect(result.data.username).toBe("demo");
  });
});
