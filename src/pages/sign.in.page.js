import { useState, useEffect } from "react";
import AjaxCall from "../services/ajax";
import { useNavigate } from "react-router-dom";

const SignIn = (props) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   // loginUser();
  // }, []);

  async function loginUser() {
    const params = {
      username: email,
      password: password,
    };

    AjaxCall("POST", "auth/login", params, false, false)
      .then(function (response) {
        localStorage.setItem(
          "SavedToken",
          "Bearer " + response.access_token,
          "RefreshToken",
          response.refresh_token
        );

        navigate("/details");
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  return (
    <div className="signin-background">
      <div className="sigin-form ">
        <div className="form-setup">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginUser();
            }}
          >
            <label htmlFor="email">
              <span className="red-star">*</span> User Name
            </label>

            <input
              id="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">
              <span className="red-star">*</span> Password
            </label>

            <input
              id="password"
              value={password}
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
