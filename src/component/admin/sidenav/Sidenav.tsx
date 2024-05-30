import React, { useState } from "react";
import {
  Group,
  Code,
  ScrollArea,
  rem,
  UnstyledButton,
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

// UserButton Component
const UserButton: React.FC = () => {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="subtle">
          <Avatar radius="xl" />
          <span className="ml-2">User Name</span>
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
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

const LinksGroup: React.FC<LinksGroupProps> = ({
  label,
  icon: Icon,
  initiallyOpened,
  links,
}) => {
  const [opened, setOpened] = useState(initiallyOpened || false);

  return (
    <>
      <UnstyledButton onClick={() => setOpened((o) => !o)} className="w-full">
        <Group>
          <Group>
            <ThemeIcon variant="light">
              <Icon />
            </ThemeIcon>
            <Text>{label}</Text>
          </Group>
          {links && (opened ? <IconChevronDown /> : <IconChevronLeft />)}
        </Group>
      </UnstyledButton>
      {links && (
        <Collapse in={opened}>
          {links.map((link) => (
            <Text key={link.label} className="pl-9 pt-2">
              {link.label}
            </Text>
          ))}
        </Collapse>
      )}
    </>
  );
};

// Logo Component
const Logo: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  return (
    <div style={{ ...style }} className="flex items-center">
      <img src="/path/to/logo.png" alt="Logo" className="w-30" />
      <span className="font-bold text-2xl ml-2">Brand</span>
    </div>
  );
};

// Sidenav Component
const mockdata = [
  { label: "Dashboard", icon: IconGauge },
  {
    label: "Market news",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Overview", link: "/" },
      { label: "Forecasts", link: "/" },
      { label: "Outlook", link: "/" },
      { label: "Real time", link: "/" },
    ],
  },
  {
    label: "Releases",
    icon: IconCalendarStats,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics },
  { label: "Contracts", icon: IconFileAnalytics },
  { label: "Settings", icon: IconAdjustments },
  {
    label: "Security",
    icon: IconLock,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
];

const Sidenav: React.FC = () => {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className="bg-white dark:bg-dark-6 h-[800px] w-[300px] p-md pb-0 flex flex-col border-r border-gray-300 dark:border-dark-4">
      <div className="p-md pt-0 -ml-md -mr-md text-black dark:text-white border-b border-gray-300 dark:border-dark-4">
        <Group>
          <Logo style={{ width: rem(120) }} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className="flex-1 -ml-md -mr-md">
        <div className="py-xl">{links}</div>
      </ScrollArea>

      <div className="mt-auto -ml-md -mr-md border-t border-gray-300 dark:border-dark-4">
        <UserButton />
      </div>
    </nav>
  );
};

export default Sidenav;
