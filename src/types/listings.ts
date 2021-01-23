import type { IProfile } from "./profile";

export enum ListingType {
  cover = "cover",
  original = "original",
}

export enum Role {
  drums = "drums",
  guitar = "guitar",
  bass = "bass",
  piano = "piano",
  keyboard = "keyboard",
  vocals = "vocals",
  mix = "mix",
  mastering = "mastering",
}

export interface IListing {
  id: string;
  author: IProfile;
  title: string;
  artist?: string;
  type: ListingType;
  genre: string; // TODO: Genre enum
  roles: [
    {
      role: Role;
      completed: boolean;
      audioUrl?: string;
    }
  ];
  bpm: number;
  imageUrl: string;

  createdAt: Date;
  updatedAt: Date;
}
