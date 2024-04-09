import { baseUrl } from "./config/api";

describe("post", () => {
  it("get all post", async () => {
    const result = await baseUrl.get("/post");
    expect(result).toBeTruthy();
    expect(result.status).toBe(200);
  });

  it("get a post", async () => {
    const result = await baseUrl.get("/post");
    const post = await baseUrl.get(`/post/${result.data[0]._id}`);

    expect(post).toBeTruthy();
    expect(post.status).toBe(200);
  });
});
