import { PasswordInput, Paper, Text, Container, Button } from "@mantine/core";
import React from "react";
import { useForm, UseFormReturnType } from "@mantine/form";

interface SignupFormValues {
  password: string;
  confirmPassword: string;
}

const UpdatePassword: React.FC = () => {
  const form: UseFormReturnType<SignupFormValues> = useForm<SignupFormValues>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validate: {
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
          <h1>Update Password</h1>
          <Text
            c="dimmed"
            size="sm"
            mt="md"
            className="flex gap-2 mx-auto text-center items-center justify-center"
          >
            <span>Ready to update your password?</span>
          </Text>
        </div>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
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
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default UpdatePassword;
