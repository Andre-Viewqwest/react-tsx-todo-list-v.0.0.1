import React, { useState } from "react";
import { Card, Text, Badge, Group } from "@mantine/core";

interface CardData {
  title: string;
  total: number;
  description: string;
  badgeColor: string;
  badgeContent: string;
}

const Cards: React.FC = () => {
  // Initialize state for cardsData
  const [data, setData] = useState<CardData[]>([
    {
      title: "Total Page Views",
      total: 100252,
      description: "You made an extra 35,000 this year ",
      badgeColor: "blue",
      badgeContent: "59.3%",
    },
    {
      title: "Total Page Views",
      total: 100252,
      description: "You made an extra 35,000 this year ",
      badgeColor: "blue",
      badgeContent: "59.3%",
    },
    {
      title: "Total Page Views",
      total: 100252,
      description: "You made an extra 35,000 this year ",
      badgeColor: "blue",
      badgeContent: "59.3%",
    },
    {
      title: "Total Page Views",
      total: 100252,
      description: "You made an extra 35,000 this year ",
      badgeColor: "blue",
      badgeContent: "59.3%",
    },
  ]);

  return (
    <>
      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <Card shadow="sm" radius="md" withBorder key={index}>
            <div className="flex flex-col">
              <Text>{item.title}</Text>
              <Group>
                <h1 className="text-2xl font-bold">
                  {item.total.toLocaleString()}{" "}
                </h1>
                <Badge color={item.badgeColor}>{item.badgeContent}</Badge>
              </Group>
            </div>

            <Text size="sm" c="dimmed" mt="md ">
              {item.description}
            </Text>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Cards;
