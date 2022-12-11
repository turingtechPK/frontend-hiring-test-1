import { useEffect, useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Layout from "../components/common/Layout";
import { PAGE_TITLES } from "../constants/appUtilsConstants";
import { FormStyles } from "../styles/LoginStyles";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../thunks/loginThunk";
import { loginSelector } from "../store/slices/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthed } = useSelector(loginSelector);

  useEffect(() => {
    if (isAuthed) {
      if (typeof window !== "undefined") {
        window.location.replace("/");
      }
    }
  }, [isAuthed]);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { username, password } = credentials;
  
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(credentials));
  };
  
  return (
    <Layout pageTitle={PAGE_TITLES.login}>
      <FormStyles justifyContent="space-between">
        <TextField
          name="username"
          value={username}
          onChange={handleChange}
          id="username"
          label="User Name"
          placeholder="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <PersonOutlineOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <TextField
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          placeholder="Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <Button variant="contained" onClick={handleSubmit}>
          Log in
        </Button>
      </FormStyles>
    </Layout>
  );
};

export default Login;
