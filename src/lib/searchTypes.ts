export type SearchResult = {
  type: "destination" | "category" | "story";
  title: string;
  description: string;
  href: string;
};
