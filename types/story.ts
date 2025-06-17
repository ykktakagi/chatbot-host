export interface StoryScene {
  key: string;
  tags: string[];
  text: string;
  image?: string;
}

export interface StoryData {
  title: string;
  scenes: StoryScene[];
}

export interface StoryBookComponentProps {
  storyData: StoryData;
  propertyName?: string;
}
