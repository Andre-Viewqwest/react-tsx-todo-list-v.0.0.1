import {
  TextInput,
  PasswordInput,
  Checkbox,
  Paper,
  Text,
  Container,
  Button,
} from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { useForm, UseFormReturnType } from "@mantine/form";

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

const Login: React.FC = () => {
  const form: UseFormReturnType<LoginFormValues> = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6
          ? null
          : "Password must be at least 6 characters long",
    },
  });

  const handleSubmit = (values: LoginFormValues) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <>
      <Container size={420} className="my-36">
        <div className="text-center text-4xl font-bold">
          <h1>Login</h1>
          <Text c="dimmed" size="sm" ta="center" className="mt-4">
            <div className="flex gap-2 mx-auto text-center items-center justify-center mt-4">
              <span>Do not have an account yet?</span>
              <Link to="/signup" className="text-blue-500 hover:underline">
                Create account
              </Link>
            </div>
          </Text>
        </div>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <div className="mt-6 flex items-center justify-between">
              <Checkbox
                label="Remember me"
                {...form.getInputProps("remember", { type: "checkbox" })}
              />
              <Link
                to="/reset-password"
                className="text-blue-500 hover:underline text-sm"
              >
                Forgot password?
              </Link>
            </div>
            <Button fullWidth mt="xl" type="submit">
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Login;
