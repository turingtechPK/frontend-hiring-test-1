export function getToken() {
  const tokenString: any = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}
