import React, { useContext, useState } from "react";
import {
  Container,
  Group,
  Burger,
  Tooltip,
  Popover,
  ScrollArea,
  Card,
  Badge,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell, IconCake, IconCircleCheck } from "@tabler/icons-react";
import { HamburgerContext } from "../../../context/HamburgerContext";

interface LinkItem {
  icon: React.JSX.Element;
  label: string;
  badgeContent?: string;
}

const Header: React.FC = () => {
  const { setHamburger } = useContext(HamburgerContext);
  const [opened, { toggle }] = useDisclosure(false);

  const links: LinkItem[] = [
    { icon: <IconBell />, label: "Notification", badgeContent: "5" },
  ];

  const cardsData = [
    {
      icon: <IconCake />,
      title: "Lorem ipsum dolor sit amet consectetur,...",
      time: "2 min ago",
      date: "May 31, 2024 3:49 pm",
    },
    {
      icon: <IconCake />,
      title: "Lorem ipsum dolor sit amet consectetur,...",
      time: "2 min ago",
      date: "May 31, 2024 3:49 pm",
    },
    {
      icon: <IconCake />,
      title: "Lorem ipsum dolor sit amet consectetur,...",
      time: "2 min ago",
      date: "May 31, 2024 3:49 pm",
    },
    {
      icon: <IconCake />,
      title: "Lorem ipsum dolor sit amet consectetur,...",
      time: "2 min ago",
      date: "May 31, 2024 3:49 pm",
    },
    {
      icon: <IconCake />,
      title: "Lorem ipsum dolor sit amet consectetur,...",
      time: "2 min ago",
      date: "May 31, 2024 3:49 pm",
    },
    {
      icon: <IconCake />,
      title: "Lorem ipsum dolor sit amet consectetur,...",
      time: "2 min ago",
      date: "May 31, 2024 3:49 pm",
    },
    {
      icon: <IconCake />,
      title: "Lorem ipsum dolor sit amet consectetur,...",
      time: "2 min ago",
      date: "May 31, 2024 3:49 pm",
    },
    {
      icon: <IconCake />,
      title: "Lorem ipsum dolor sit amet consectetur,...",
      time: "2 min ago",
      date: "May 31, 2024 3:49 pm",
    },
  ];

  const items = links.map((link) => (
    <Popover
      key={link.label}
      width={400}
      position="bottom"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <Tooltip label={link.label}>
          <div className="relative cursor-pointer hover:text-blue-500">
            {link.icon}
            {link.badgeContent && (
              <Badge
                color="blue"
                variant="filled"
                size="xs"
                className="absolute top-[-10px] left-[10px]"
              >
                {link.badgeContent}
              </Badge>
            )}
          </div>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown>
        {link.label === "Notification" && (
          <Card padding={0}>
            <div className="flex items-center justify-between py-3">
              <h1 className="font-bold">Notification</h1>
              <IconCircleCheck className="cursor-pointer hover:text-blue-500" />
            </div>
            <ScrollArea h={300}>
              {cardsData.map((card, index) => (
                <Card key={index} padding="md" px={0} className="mb-1">
                  <div className="flex items-center gap-3">
                    {card.icon}
                    <div>
                      <p>{card.title}</p>
                      <div className="flex gap-2 text-sm">
                        <span>{card.time}</span>
                        <span>{card.date}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </ScrollArea>

            <Button color="blue" fullWidth mt="md" radius="md">
              View All
            </Button>
          </Card>
        )}
      </Popover.Dropdown>
    </Popover>
  ));

  return (
    <>
      <header className="md:fixed left-[300px] right-0 h-[69px] mx-1 mb-30 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 z-50">
        <Container fluid className="h-full flex justify-between items-center">
          <div className="flex">
            <div className="font-bold md:hidden">TODO</div>
          </div>
          <div className="flex gap-2 items-center">
            <Group gap={5}>{items}</Group>
            <Burger
              opened={opened}
              onClick={() => {
                toggle();
                setHamburger((prev) => ({
                  ...prev,
                  isOpen: !prev.isOpen,
                }));
              }}
              className="md:hidden"
              size="sm"
            />
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
