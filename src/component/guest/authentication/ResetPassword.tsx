import {
  TextInput,
  Anchor,
  Paper,
  Text,
  Container,
  Group,
  Button,
  Center,
  Box,
  rem,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";

const ResetPassword: React.FC = () => {
  return (
    <>
      <Container size={420} className="my-36">
        <div className="text-center text-4xl font-bold">
          <h1>Forgot your password?</h1>
          <Text c="dimmed" size="sm" ta="center" className="mt-4">
            <Text
              c="dimmed"
              size="sm"
              mt="md"
              className="flex gap-2 mx-auto text-center items-center justify-center"
            >
              <span> Enter your email to get a reset link</span>
            </Text>
          </Text>
        </div>
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput label="Your email" placeholder="me@mantine.dev" required />
          <Group justify="space-between" mt="lg">
            <Anchor c="dimmed" size="sm">
              <Center inline>
                <IconArrowLeft
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
                <Link to="/">Back to the login page</Link>
              </Center>
            </Anchor>
            <Button>Reset password</Button>
          </Group>
        </Paper>
      </Container>
    </>
  );
};

export default ResetPassword;
