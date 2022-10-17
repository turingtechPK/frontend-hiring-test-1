import { AccountCircle, Lock, Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, IconButton, TextField } from "@mui/material"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { FormField } from "../../components/FormField"
import { MESSAGE } from "../../constants"
import { useLoginMutation } from "../../services/user"

interface FormState {
  username: string
  password: string
}

const Login: FC = () => {
  const [showpassword, setShowpassword] = useState(false)

  const [login] = useLoginMutation()

  const { control, handleSubmit } = useForm<FormState>({
    defaultValues: {
      username: "12312@asd.com",
      password: "123123123132",
    },
  })

  const onSubmit = async (value: FormState) => {
    toast.promise(login(value).unwrap(), {
      error: (e) => (e ? (Array.isArray(e) ? e[0].message : e.message) : MESSAGE.ERROR),
      loading: MESSAGE.LOADING,
      success: () => "Login Successful",
    })
  }

  return (
    <main className="bg-white relative max-w-lg w-full container p-8 space-y-3 mx-auto">
      <h3 className="text-2xl">Login</h3>
      <div>Please enter your details</div>

      <form className="space-y-5 pt-3" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="username"
          label="User Name"
          rules={{
            required: { message: "Value is Required", value: true },
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Not a valid Email",
            },
          }}
        >
          <TextField
            size="small"
            type="email"
            autoComplete="email"
            fullWidth
            placeholder="Email"
            InputProps={{
              startAdornment: <AccountCircle />,
            }}
          />
        </FormField>

        <FormField
          control={control}
          name="password"
          label="Password"
          rules={{
            required: { message: "Value is Required", value: true },
            minLength: { message: "Password Length should be 8", value: 8 },
          }}
        >
          <TextField
            size="small"
            autoComplete="current-password"
            fullWidth
            placeholder="Password"
            type={showpassword ? "text" : "password"}
            InputProps={{
              startAdornment: <Lock />,
              endAdornment: (
                <IconButton onClick={() => setShowpassword((prev) => !prev)}>
                  {showpassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
        </FormField>
        <Button type="submit" variant="contained" fullWidth>
          Log in
        </Button>
      </form>
    </main>
  )
}

export default Login
