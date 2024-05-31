import { Card, Text, Badge, Group } from "@mantine/core";

interface CardData {
  title: string;
  total: number;
  description: string;
  badgeColor: string;
  badgeContent: string;
}

const Overview: React.FC = () => {
  const cardsData: CardData[] = [
    {
      title: "Total Page Views",
      total: 100252,
      description: "You made an extra 35,000 this year ",
      badgeColor: "blue",
      badgeContent: "59.3%",
    },
  ];

  return (
    <>
      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {cardsData.map((card, index) => (
          <Card shadow="sm" radius="md" withBorder key={index}>
            <div className="flex flex-col">
              <Text>{card.title}</Text>
              <Group>
                <h1 className="text-2xl font-bold">
                  {card.total.toLocaleString()}{" "}
                </h1>
                <Badge color={card.badgeColor}>{card.badgeContent}</Badge>
              </Group>
            </div>

            <Text size="sm" c="dimmed" mt="md ">
              {card.description}
            </Text>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Overview;
