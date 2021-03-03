import type { Genre, ListingType, Role } from "@utils/enums";

export class Listing {
  public id: string;
  public author: any;
  public title: string;
  public artist?: string;
  public type: ListingType;
  public genres: Genre[];
  public roles: [{ role: Role; progress: number; audioUrl?: string }];
  public bpm: number;
  public imageUrl: string;
  public createdAt: Date;
  public updatedAt: Date;
}
