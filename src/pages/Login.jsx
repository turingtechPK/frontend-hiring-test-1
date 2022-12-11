import { Button, InputAdornment, TextField } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Layout from "../components/common/Layout";
import { PAGE_TITLES } from "../constants/appUtilsConstants";
import { FormStyles } from "../styles/LoginStyles";

const Login = () => {
  return (
    <Layout pageTitle={PAGE_TITLES.login}>
      <FormStyles justifyContent="space-between">
        <TextField
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
          id="password"
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
        <Button variant="contained">Log in</Button>
      </FormStyles>
    </Layout>
  );
};

export default Login;
