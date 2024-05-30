import React, { useState } from "react";
import { Container, Text, ActionIcon, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

interface LinkData {
  label: string;
  link: string;
}

interface GroupData {
  title: string;
  links: LinkData[];
}

const data: GroupData[] = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

const Footer: React.FC = () => {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <div>
        <Link
          key={index}
          to={link.link}
          className="text-gray-600 hover:underline"
        >
          {link.label}
        </Link>
      </div>
    ));

    return (
      <div className="wrapper" key={group.title}>
        <h1 className="title">{group.title}</h1>
        {links}
      </div>
    );
  });

  return (
    <footer className="footer mt-20 pt-8 pb-8 bg-gray-100 border-t border-gray-300">
      <Container size="xl">
        <Container
          className="flex flex-col md:flex-row items-center justify-between "
          fluid
        >
          <div className="logo flex flex-col">
            <h1 className="font-bold">TODO</h1>
            <Text className="mt-1 text-gray-600">
              Build fully functional accessible <br /> web applications faster
              than ever
            </Text>
          </div>
          <div className="groups hidden md:flex flex-wrap space-x-4">
            {groups}
          </div>
        </Container>
        <br />
        <hr />
        <br />
        <Container className="flex justify-between items-center" fluid>
          <Text className="text-gray-600 text-sm">
            ©2024 TODO All rights reserved.
          </Text>
          <Group gap={4} className="social">
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandTwitter className="w-6 h-6" stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandYoutube className="w-6 h-6" stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg" color="gray" variant="subtle">
              <IconBrandInstagram className="w-6 h-6" stroke={1.5} />
            </ActionIcon>
          </Group>
        </Container>
      </Container>
    </footer>
  );
};

export default Footer;
