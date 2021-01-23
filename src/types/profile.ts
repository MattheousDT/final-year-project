import type { IListing } from "./listings";

export interface IProfile {
  id: string;
  username: string;
  forename?: string;
  surname?: string;
  dob?: Date;
  location?: string;
  bio?: string;
  gearList: string[];
  listings: string[];
  lastOnline: Date;
  dateRegistered: Date;
}
