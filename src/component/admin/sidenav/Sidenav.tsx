import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Group,
  Code,
  ScrollArea,
  Text,
  Collapse,
  ThemeIcon,
  Avatar,
  Button,
  Menu,
} from "@mantine/core";
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconChevronLeft,
  IconChevronDown,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

// UserButton Component
const UserButton: React.FC = () => {
  return (
    <Menu shadow="md">
      <Menu.Target>
        <Button variant="subtle">
          <Avatar radius="xl" />
          <div className="flex flex-col items-start text-sm">
            <span className="ml-2">John Doe</span>
            <span className="ml-2">Admin</span>
          </div>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

// LinksGroup Component
interface LinksGroupProps {
  label: string;
  icon: React.FC<any>;
  link: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

const LinksGroup: React.FC<LinksGroupProps> = ({
  label,
  icon: Icon,
  link,
  initiallyOpened,
  links,
}) => {
  const [opened, setOpened] = useState(
    initiallyOpened ||
      (links &&
        links.some((subLink) => window.location.pathname === subLink.link))
  );
  const location = useLocation();

  const isActive = (link: string) => location.pathname === link;

  return (
    <>
      <div
        onClick={() => setOpened((o) => !o)}
        className={`w-full p-2 cursor-pointer hover:bg-gray-100 ${
          isActive(link) ? "bg-gray-100 text-blue-500" : ""
        }`}
      >
        <Group justify="space-between" align="center">
          <div className="flex items-center">
            <ThemeIcon variant="light">
              <Icon />
            </ThemeIcon>
            <Link to={link} className="pl-4">
              {label}
            </Link>
          </div>
          {links && (
            <div className="transform transition-transform">
              {opened ? <IconChevronDown /> : <IconChevronLeft />}
            </div>
          )}
        </Group>
      </div>

      <div className="border-l border-gray-300 mx-auto ml-[23px]">
        {links && (
          <Collapse in={opened}>
            {links.map((subLink) => (
              <Link
                to={subLink.link}
                key={subLink.label}
                className={`flex flex-col pl-12 py-1 hover:bg-gray-100 ${
                  isActive(subLink.link) ? "bg-gray-100 text-blue-500" : ""
                }`}
              >
                {subLink.label}
              </Link>
            ))}
          </Collapse>
        )}
      </div>
    </>
  );
};

// Logo Component
const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-between">
      <span className="font-bold text-xl">Todo</span>
      <Code fw={700}>v.0.0.1</Code>
    </div>
  );
};

// Sidenav Component
const mockdata = [
  { label: "Dashboard", icon: IconGauge, link: "/" },
  {
    label: "Market news",
    icon: IconNotes,
    links: [
      { label: "Forecasts", link: "/forecasts" },
      { label: "Outlook", link: "/outlook" },
      { label: "Real time", link: "/realtime" },
    ],
  },
  {
    label: "Releases",
    icon: IconCalendarStats,
    links: [
      { label: "Upcoming releases", link: "/upcoming-release" },
      { label: "Previous releases", link: "/previous-release" },
      { label: "Releases schedule", link: "/releases-release" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics, link: "/analytics" },
  { label: "Contracts", icon: IconFileAnalytics, link: "/contracts" },
  { label: "Settings", icon: IconAdjustments, link: "/settings" },
  {
    label: "Security",
    icon: IconLock,
    links: [
      { label: "Enable 2FA", link: "/enable-2fa" },
      { label: "Change password", link: "/change-password" },
      { label: "Recovery codes", link: "/recovery-codes" },
    ],
  },
];

const Sidenav: React.FC = () => {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  const linksStyles: React.CSSProperties = {
    flex: 1,
    marginLeft: `calc(var(--mantine-spacing-md) * -1)`,
    marginRight: `calc(var(--mantine-spacing-md) * -1)`,
  };

  return (
    <nav className="bg-white w-[300px] p-2 flex flex-col border-r border-gray-300 h-screen fixed">
      <div className="p-4 text-black border-b border-gray-300">
        <Logo />
      </div>

      <ScrollArea style={linksStyles} className="flex">
        <div className="p-8">{links}</div>
      </ScrollArea>

      <div className="p-4 text-black border-t border-gray-300">
        <UserButton />
      </div>
    </nav>
  );
};

export default Sidenav;