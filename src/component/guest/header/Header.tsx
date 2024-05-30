import React, { useState, useEffect } from "react";
import { Container, Group, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";

interface LinkItem {
  link: string;
  label: string;
}

const links: LinkItem[] = [
  { link: "/login", label: "Login" },
  { link: "/signup", label: "Signup" },
];

const Header: React.FC = () => {
  const location = useLocation();
  const [active, setActive] = useState<string | null>(null);
  const [opened, { toggle }] = useDisclosure(false);

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={`block px-3 py-2 rounded-md text-sm font-medium ${
        active === link.link
          ? "bg-blue-600 text-white"
          : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      <header className="h-14 mb-30 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <Container
          size="xl"
          className="h-full flex justify-between items-center"
        >
          <Link to="/" className="font-bold">
            TODO
          </Link>
          <div className="hidden md:flex">
            <Group gap={5}>{items}</Group>
          </div>
          <Burger
            opened={opened}
            onClick={toggle}
            className="md:hidden"
            size="sm"
          />
        </Container>
      </header>
      <div className={`md:hidden ${opened ? "block" : "hidden"}`}>
        <div className="flex flex-col space-y-1 px-2 pb-3 pt-4">{items}</div>
      </div>
    </>
  );
};

export default Header;
