import React, { useContext, useEffect, useState } from "react";
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
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconBell, IconCake, IconCircleCheck } from "@tabler/icons-react";
import { HamburgerContext } from "../../../context/HamburgerContext";
import { useLocation } from "react-router-dom";

interface LinkItem {
  icon: React.JSX.Element;
  label: string;
  badgeContent?: string;
}

const Header: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const location = useLocation();

  const { hamburger, setHamburger } = useContext(HamburgerContext);
  const [pathname, setPathname] = useState<string>(location.pathname);

  useEffect(() => {
    const currentPathname = location.pathname.slice(1);
    const capitalizedPathname =
      currentPathname.charAt(0).toUpperCase() +
      currentPathname.slice(1).toLowerCase();
    setPathname(capitalizedPathname == "" ? "Dashboard" : capitalizedPathname);
  }, [location]);

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
      width={isMobile ? 300 : 400} // Conditionally set the width
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
      <header className="fixed left-0 right-0 md:left-[300px] md:right-0 h-[69px] mx-1 mb-30 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 z-50">
        <Container fluid className="h-full flex justify-between items-center">
          <div className="flex">
            <div className="font-bold">{pathname}</div>
          </div>
          <div className="flex gap-2 items-center">
            <Group gap={5}>{items}</Group>
            <Burger
              opened={hamburger.isOpen}
              onClick={() => {
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
