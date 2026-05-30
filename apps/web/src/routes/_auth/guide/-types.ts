export type GuideBlock = {
  type: 'italic' | 'heading' | 'paragraph';
  text: string;
};

export type GuideWeek = {
  week: number;
  title: string;
  subtitle: string;
  body: GuideBlock[];
};

export type GuideCategory = {
  slug: string;
  title: string;
  available: boolean;
};
