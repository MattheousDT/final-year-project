import type { IListing, Role } from "./listings";

export enum Genre {
  rock = "rock",
  pop = "pop",
}

export interface IProfile {
  username: string;
  forename?: string;
  surname?: string;
  dob?: Date;
  location?: string;
  bio?: string;
  gearList?: string[];
  roles: Role[];
  genres: Genre[];
  listings: string[];
  lastOnline: Date;
  dateRegistered: Date;
}
