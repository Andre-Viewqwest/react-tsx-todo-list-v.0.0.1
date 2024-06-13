import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Badge,
  Card,
  Group,
  ScrollArea,
  Avatar,
  ThemeIcon,
  Collapse,
} from "@mantine/core";
import { useState } from "react";
import {
  IconChevronDown,
  IconChevronLeft,
  IconMail,
  IconPassword,
  IconUser,
} from "@tabler/icons-react";

// LinksGroup Component
interface LinksGroupProps {
  label: string;
  icon: React.FC<any>;
  link: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

// Sidenav Component | CHANGES here if theres new route
const mockdataSideNav = [
  {
    label: "Personal Information",
    icon: IconUser,
    link: "/profile/personal-information",
  },
  {
    label: "Change Password",
    icon: IconPassword,
    link: "/profile/change-password",
  },
  { label: "Change Email", icon: IconMail, link: "/profile/change-email" },
  // {
  //   label: "Releases",
  //   icon: IconCalendarStats,
  //   links: [
  //     { label: "Forecasts", link: "/forecasts" },
  //     { label: "Outlook", link: "/outlook" },
  //     { label: "Real time", link: "/realtime" },
  //   ],
  // },
];

// Sidenav
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

// Sidenav
const mockdata = {
  image:
    "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  title: "Verudela Beach",
  country: "Croatia",
  description:
    "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
  badges: [
    { emoji: "☀️", label: "Sunny weather" },
    { emoji: "🦓", label: "Onsite zoo" },
    { emoji: "🌊", label: "Sea" },
    { emoji: "🌲", label: "Nature" },
    { emoji: "🤽", label: "Water sports" },
  ],
};

const AdminLayout: React.FC = () => {
  const { image, title, description, country, badges } = mockdata;
  const features = badges.map((badge) => (
    <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
      {badge.label}
    </Badge>
  ));

  // Sidenav
  const links = mockdataSideNav.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  // Sidenav
  const linksStyles: React.CSSProperties = {
    flex: 1,
    marginLeft: `calc(var(--mantine-spacing-md) * -1)`,
    marginRight: `calc(var(--mantine-spacing-md) * -1)`,
  };

  return (
    <>
      <div className="md:ml-[300px] grid xl:grid-cols-4 px-5 pt-24 gap-4">
        <div className="xl:col-span-1">
          <Card withBorder radius="md" p="md">
            <Card.Section>
              <div className="flex flex-col items-center justify-center px-16 pt-16">
                <Avatar src={image} alt="it's me" size="128px" />
                <div>
                  <h1 className="text-xl font-bold mt-4">John Doe</h1>
                </div>
              </div>
            </Card.Section>
            <Card.Section>
              {/* Sidenav */}
              <ScrollArea style={linksStyles} className="flex">
                <div className="p-8">{links}</div>
              </ScrollArea>
            </Card.Section>
          </Card>
        </div>

        <div className="xl:col-span-3 xl:h-[800px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
