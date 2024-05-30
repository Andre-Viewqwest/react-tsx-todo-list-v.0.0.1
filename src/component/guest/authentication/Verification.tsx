import { Paper, Text, Container, Button, PinInput } from "@mantine/core";
import React from "react";
import { useForm, UseFormReturnType } from "@mantine/form";

interface VerificationFormValues {
  verificationCode: string;
}

const Verification: React.FC = () => {
  const form: UseFormReturnType<VerificationFormValues> =
    useForm<VerificationFormValues>({
      initialValues: {
        verificationCode: "",
      },

      validate: {
        verificationCode: (value) =>
          /^[0-9]{6}$/.test(value) ? null : "Invalid verification code",
      },
    });

  const handleSubmit = (values: VerificationFormValues) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <>
      <Container size={420} className="my-36">
        <div className="text-center text-4xl font-bold">
          <h1>Verification</h1>
          <Text
            c="dimmed"
            size="sm"
            mt="md"
            className="flex gap-2 mx-auto text-center items-center justify-center"
          >
            <span>Please verify your account</span>
          </Text>
        </div>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <div className="flex items-center justify-between mb-4">
            <span>Verification Code </span>
            <Button>Resend</Button>
          </div>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="flex flex-col items-center">
              <PinInput
                value={form.values.verificationCode}
                onChange={(value) =>
                  form.setFieldValue("verificationCode", value)
                }
                length={6}
              />
              <Button fullWidth mt="md" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Verification;
