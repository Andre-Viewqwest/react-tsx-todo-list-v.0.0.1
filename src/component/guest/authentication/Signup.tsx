import {
  TextInput,
  PasswordInput,
  Paper,
  Text,
  Container,
  Button,
} from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { useForm, UseFormReturnType } from "@mantine/form";

interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const form: UseFormReturnType<SignupFormValues> = useForm<SignupFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6
          ? null
          : "Password must be at least 6 characters long",
      confirmPassword: (value, values) =>
        value === values.password ? null : "Passwords do not match",
    },
  });

  const handleSubmit = (values: SignupFormValues) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <>
      <Container size={420} className="my-36">
        <div className="text-center text-4xl font-bold">
          <h1>Sign up</h1>
          <Text
            c="dimmed"
            size="sm"
            mt="md"
            className="flex gap-2 mx-auto text-center items-center justify-center"
          >
            <span>Already have an account?</span>
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
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
            <PasswordInput
              label="Confirm Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps("confirmPassword")}
            />
            <Button fullWidth mt="md" type="submit">
              Sign up
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Signup;
