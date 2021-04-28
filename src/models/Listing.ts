import type { Genre, ListingType, Role } from "@utils/enums";

export interface IListing {
  id: string;
  author: string;
  title: string;
  artist?: string;
  description: string;
  type: ListingType;
  genres: Genre[];
  bpm: number;
  completion: number;
  softwareUsed?: string;
  roles: Role[];
  collaborators: [{ id: string; roles: Role[] }];
  unlisted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IListingCreate
  extends Omit<IListing, "id" | "completion" | "collaborators" | "createdAt" | "updatedAt"> {}

export class Listing implements IListing {
  id: string;
  author: string;
  title: string;
  artist?: string;
  description: string;
  type: ListingType;
  genres: Genre[];
  bpm: number;
  completion: number;
  softwareUsed?: string;
  roles: Role[];
  collaborators: [{ id: string; roles: Role[] }];
  unlisted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
