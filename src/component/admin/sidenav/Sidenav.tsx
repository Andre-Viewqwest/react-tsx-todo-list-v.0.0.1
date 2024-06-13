import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Group,
  Code,
  ScrollArea,
  Collapse,
  ThemeIcon,
  Avatar,
  Menu,
} from "@mantine/core";
import {
  IconNotes,
  IconGauge,
  IconChevronLeft,
  IconChevronDown,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

import { HamburgerContext } from "../../../context/HamburgerContext";

// LinksGroup Component
interface LinksGroupProps {
  label: string;
  icon: React.FC<any>;
  link: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

const mockDataUserButton = [
  // { label: "Dashboard", icon: IconGauge, link: "/" },
  {
    label: "Settings",
    icon: IconNotes,
    links: [
      { label: "Profile", link: "/profile" },
      { label: "Logout", link: "#" },
    ],
  },
];

const UserButton: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPathname = location.pathname;
    console.log(currentPathname);
  }, [location]);

  return (
    <Menu shadow="md">
      <Menu.Target>
        <div className="flex cursor-pointer">
          <Avatar radius="xl" />
          <div className="flex flex-col items-start text-sm">
            <span className="ml-2 text-md">John Doe</span>
            <span className="ml-2 text-gray-500">Admin</span>
          </div>
        </div>
      </Menu.Target>

      <Menu.Dropdown style={{ width: "200px" }}>
        {/* Map mockdata array to Menu.Item components */}
        {mockDataUserButton.map((item, index) => (
          <React.Fragment key={index}>
            <Menu.Label>{item.label}</Menu.Label>
            {item.links ? (
              item.links.map((linkItem, linkIndex) => (
                <Link to={linkItem.link} key={linkIndex}>
                  <Menu.Item
                    className={`${
                      location.pathname === item.link
                        ? "bg-gray-100 text-blue-500"
                        : ""
                    }`}
                  >
                    {linkItem.label}
                  </Menu.Item>
                </Link>
              ))
            ) : (
              <Menu.Item
                className={`${
                  location.pathname === item.link
                    ? "bg-gray-100 text-blue-500"
                    : ""
                }`}
              >
                {item.label}
              </Menu.Item>
            )}
          </React.Fragment>
        ))}
      </Menu.Dropdown>
    </Menu>
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
      {typeof link === "string" ? (
        <Link to={link} className="flex items-center">
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
                <span className="pl-4">{label}</span>
              </div>
              {links && (
                <div className="transform transition-transform">
                  {opened ? <IconChevronDown /> : <IconChevronLeft />}
                </div>
              )}
            </Group>
          </div>
        </Link>
      ) : (
        <div className="flex items-center">
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
                <span className="pl-4">{label}</span>
              </div>
              {links && (
                <div className="transform transition-transform">
                  {opened ? <IconChevronDown /> : <IconChevronLeft />}
                </div>
              )}
            </Group>
          </div>
        </div>
      )}

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

// Sidenav Component | CHANGES here if theres new route
const mockdataSideNav = [
  { label: "Dashboard", icon: IconGauge, link: "/" },
  {
    label: "Management",
    icon: IconNotes,
    links: [
      { label: "Logs", link: "/logs" },
      { label: "Accounts", link: "/accounts" },
    ],
  },
  { label: "Todo", icon: IconGauge, link: "/todo" },
  // {
  //   label: "Releases",
  //   icon: IconCalendarStats,
  //   links: [
  //     { label: "Forecasts", link: "/forecasts" },
  //     { label: "Outlook", link: "/outlook" },
  //     { label: "Real time", link: "/realtime" },
  //   ],
  // },
  // { label: "Analytics", icon: IconPresentationAnalytics, link: "/analytics" },
  // { label: "Contracts", icon: IconFileAnalytics, link: "/contracts" },
  // { label: "Settings", icon: IconAdjustments, link: "/settings" },
  // {
  //   label: "Security",
  //   icon: IconLock,
  //   links: [
  //     { label: "Enable 2FA", link: "/enable-2fa" },
  //     { label: "Change password", link: "/change-password" },
  //     { label: "Recovery codes", link: "/recovery-codes" },
  //   ],
  // },
];

const Sidenav: React.FC = () => {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 320px)");
  const { setHamburger } = useContext(HamburgerContext);

  const links = mockdataSideNav.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  useEffect(() => {
    setHamburger((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, [location]);

  const linksStyles: React.CSSProperties = {
    flex: 1,
    marginLeft: `calc(var(--mantine-spacing-md) * -1)`,
    marginRight: `calc(var(--mantine-spacing-md) * -1)`,
  };

  return (
    <nav
      className={`bg-white ${
        isMobile ? "w-[250px]" : "w-[300px]"
      }  p-2 flex flex-col border-r border-gray-300 h-screen fixed`}
    >
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
