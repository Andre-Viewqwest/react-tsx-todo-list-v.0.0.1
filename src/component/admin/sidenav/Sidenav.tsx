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
    <Menu shadow="md">
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
            <Text key={link.label} className="pl-12 py-1">
              {link.label}
            </Text>
          ))}
        </Collapse>
      )}
    </>
  );
};

// Logo Component
const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <span className="font-bold text-xl">Brand</span>
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

  const navbarStyles: React.CSSProperties = {
    backgroundColor: "var(--mantine-color-white, #fff)",
    height: rem(800),
    width: rem(300),
    padding: "var(--mantine-spacing-md)",
    paddingBottom: 0,
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid var(--mantine-color-gray-3, #ccc)",
  };

  const headerStyles: React.CSSProperties = {
    padding: `var(--mantine-spacing-md)`,
    paddingTop: 0,
    marginLeft: `calc(var(--mantine-spacing-md) * -1)`,
    marginRight: `calc(var(--mantine-spacing-md) * -1)`,
    color: `var(--mantine-color-black)`,
    borderBottom: `1px solid var(--mantine-color-gray-3)`,
  };

  const linksStyles: React.CSSProperties = {
    flex: 1,
    marginLeft: `calc(var(--mantine-spacing-md) * -1)`,
    marginRight: `calc(var(--mantine-spacing-md) * -1)`,
  };

  const linksInnerStyles: React.CSSProperties = {
    paddingTop: `var(--mantine-spacing-xl)`,
    paddingBottom: `var(--mantine-spacing-xl)`,
  };

  const footerStyles: React.CSSProperties = {
    marginLeft: `calc(var(--mantine-spacing-md) * -1)`,
    marginRight: `calc(var(--mantine-spacing-md) * -1)`,
    borderTop: `1px solid var(--mantine-color-gray-3)`,
    padding: `var(--mantine-spacing-md)`,
  };

  return (
    <nav className="bg-white h-[800px] w-[300px] p-md pb-0 flex flex-col border-r border-gray-300">
      <div className="p-md pt-0 -ml-md -mr-md text-black border-b border-gray-300">
        <div className="flex items-center justify-between">
          <Logo />
          <Code fw={700}>v3.1.2</Code>
        </div>
      </div>

      <ScrollArea style={linksStyles}>
        <div style={linksInnerStyles}>{links}</div>
      </ScrollArea>

      <div style={footerStyles}>
        <UserButton />
      </div>
    </nav>
  );
};

export default Sidenav;
