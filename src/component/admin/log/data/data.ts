// data.ts
interface DataSourceItem {
  id: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const dataSource: DataSourceItem[] = [
  {
    id: "1",
    image: "https://example.com/image.jpg",
    description: "A sample image description.",
    created_at: "2024-06-03T12:00:00Z",
    updated_at: "2024-06-03T15:00:00Z",
  },
  {
    id: "2",
    image: "https://example.com/another-image.jpg",
    description: "Another sample image description.",
    created_at: "2024-06-02T10:00:00Z",
    updated_at: "2024-06-03T11:00:00Z",
  },
];

export default dataSource;
