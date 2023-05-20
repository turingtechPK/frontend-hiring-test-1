import { Layout } from "@/components";
import { useState, useEffect, useContext, FC } from "react";
import { Center, TextInput, Paper, Button } from "@mantine/core";
import { useMutation } from "@apollo/client";
import { AuthContext } from "@/components";
import { LOGIN_MUTATION } from "@/api/mutation";
import { AuthResponseType } from "@/lib/types";

import Router from "next/router";

interface LoginData {
  login: AuthResponseType;
}

interface LoginVars {
  username: string;
  password: string;
}

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthData } = useContext(AuthContext);
  const [login, { loading, error }] = useMutation<LoginData, LoginVars>(
    LOGIN_MUTATION,
    {
      onCompleted: (data) => {
        setAuthData(data.login);
        Router.push("/");
      },
    }
  );

  const handleLogin = () => {
    login({ variables: { username, password } });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token)
      Router.push("/");
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  return (
    <Layout>
      <Center>
        <Paper
          p="xl"
          shadow="md"
          radius="md"
          style={{ backgroundColor: "#f3eeee", width: "700px" }}
        >
          <TextInput
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
            placeholder="Enter your username"
            required
            variant="filled"
            size="lg"
            style={{ marginBottom: 15 }}
          />
          <TextInput
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            placeholder="Enter your password"
            required
            variant="filled"
            size="lg"
            type="password"
            style={{ marginBottom: 15 }}
          />
          <Center>
            <Button color="indigo" onClick={handleLogin} fullWidth>
              Login
            </Button>
          </Center>
        </Paper>
      </Center>
    </Layout>
  );
};

export default Login;
