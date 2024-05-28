import React from "react";
import { Container, Title, Text, List, Group, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "react-router-dom";

import donut from "../../../assets/images/donut.svg";

const Hero: React.FC = () => {
  return (
    <>
      <Container size="xl">
        <div className="flex justify-between py-20 md:py-32">
          <div className="">
            <Title className="text-light-dark font-Greycliff font-semibold text-4xl md:text-2xl">
              Todo List Hero - Your Ultimate Productivity Companion
            </Title> 
            
            <Text className="text-dimmed mt-4">
              Build fully functional accessible web applications faster than
              ever – Mantine includes more than 120 customizable components and
              hooks to cover you in any situation
            </Text>

            <List className="mt-10 space-y-2">
              <List.Item>
                <b>Intuitive Task Management:</b> – Say goodbye to the chaos of
                scattered to-do lists and hello to organized productivity.
              </List.Item>
              <List.Item>
                <b>Customizable Categories:</b> – Tailor your task lists to suit
                your unique needs and preferences.
              </List.Item>
              <List.Item>
                <b>Deadline Reminders:</b> – Never miss a deadline again with
                Todo List Hero's built-in reminder system.
              </List.Item>
            </List>

            <Group className="mt-10">
              <Button className="w-full md:w-auto rounded-xl" size="md">
                Get started
              </Button>
              <Button
                variant="default"
                className="w-full mt-4 md:mt-0 md:w-auto rounded-xl"
                size="md"
              >
                Source code
              </Button>
            </Group>
          </div>
          <div className="hidden md:block">
            <img src={donut} alt="Hero Image" className="w-376px h-356px" />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Hero;
