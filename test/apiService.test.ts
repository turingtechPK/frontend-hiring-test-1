import { api } from "@/app/utils/apiService";

global.fetch = jest.fn();

describe("API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it("should log in successfully and store tokens", async () => {
    const mockResponse = {
      access_token: "mockAccessToken",
      refresh_token: "mockRefreshToken",
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    await api.login("testUser", "testPassword");

    expect(localStorage.getItem("accessToken")).toBe("mockAccessToken");
    expect(localStorage.getItem("refreshToken")).toBe("mockRefreshToken");
  });

  it("should throw an error on failed login", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(api.login("testUser", "wrongPassword")).rejects.toThrow(
      "Login failed"
    );
  });
});
