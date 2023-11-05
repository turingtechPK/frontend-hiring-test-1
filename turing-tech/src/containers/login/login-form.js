import { Button, Grid, Typography } from "@mui/material";
import { StyledContainer, StyledPaper } from "./styles";
import { ControlledTextField } from "../../components";
import { useFormContext } from "react-hook-form";
import { useAuth } from "../../hooks";

export const LoginForm = () => {
  const { getValues } = useFormContext();
  const { loginUser } = useAuth();

  return (
    <StyledContainer>
      <StyledPaper>
        <Grid conatainer display={"flex"} flexDirection={"column"} gap={3}>
          <Grid item display={"flex"} flexDirection={"column"} gap={1}>
            <Grid item display="flex" gap={0.5}>
              <Typography style={{ color: "red" }}>*</Typography>
              <Typography>Username</Typography>
            </Grid>

            <Grid item display="flex">
              <ControlledTextField name="username" />
            </Grid>
          </Grid>

          <Grid item display={"flex"} flexDirection={"column"} gap={1}>
            <Grid item display="flex" gap={0.5}>
              <Typography style={{ color: "red" }}>*</Typography>
              <Typography>Password</Typography>
            </Grid>

            <Grid item display="flex">
              <ControlledTextField name="password" type="password" />
            </Grid>
          </Grid>

          <Grid item display="flex">
            <Button
              variant={"contained"}
              onClick={() => {
                const values = getValues();
                loginUser({
                  variables: {
                    input: {
                      username: values?.username,
                      password: values?.password,
                    },
                  },
                });
              }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </StyledPaper>
    </StyledContainer>
  );
};
