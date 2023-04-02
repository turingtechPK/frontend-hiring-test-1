import { userLogin } from "../state/ducks/auth/authActions";
// import { login } from "../state/ducks/auth/authApi";
// jest.mock("./api", () => ({
//   login: jest.fn(),
// }));

// describe("userLogin", () => {
//   const dispatch = jest.fn();

//   beforeEach(() => {
//     dispatch.mockClear();
//     login.mockClear();
//     sessionStorage.clear();
//   });

//   it("dispatches loginRequest action before making the login API call", async () => {
//     const mockPayload = { username: "testuser", password: "testpass" };

//     login.mockResolvedValueOnce({
//       data: { access_token: "123", refresh_token: "456" },
//     });

//     await userLogin(mockPayload)(dispatch);

//     expect(dispatch).toHaveBeenCalledWith({ type: "LOGIN_REQUEST" });
//     expect(login).toHaveBeenCalledWith(mockPayload);
//   });

//   it("dispatches loginSuccess action after successful login", async () => {
//     const mockPayload = { username: "testuser", password: "testpass" };

//     login.mockResolvedValueOnce({
//       data: { access_token: "123", refresh_token: "456" },
//     });

//     await userLogin(mockPayload)(dispatch);

//     expect(sessionStorage.getItem("access_token")).toEqual("123");
//     expect(sessionStorage.getItem("refresh_token")).toEqual("456");
//     expect(dispatch).toHaveBeenCalledWith({ type: "LOGIN_SUCCESS" });
//   });

//   it("dispatches loginFailure action on login error", async () => {
//     const mockError = new Error("Login failed");
//     const mockPayload = { username: "testuser", password: "testpass" };

//     login.mockRejectedValueOnce(mockError);

//     await userLogin(mockPayload)(dispatch);

//     expect(sessionStorage.getItem("access_token")).toBeNull();
//     expect(sessionStorage.getItem("refresh_token")).toBeNull();
//     expect(dispatch).toHaveBeenCalledWith({
//       type: "LOGIN_FAILURE",
//       payload: "Login failed",
//     });
//   });
// });
