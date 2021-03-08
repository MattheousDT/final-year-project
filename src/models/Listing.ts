import type { Genre, ListingType, Role } from "@utils/enums";

export class Listing {
  public id: string;
  public author: string;
  public title: string;
  public artist?: string;
  public description: string;
  public type: ListingType;
  public genres: Genre[];
  public bpm: number;
  public completion: number;
  public softwareUsed: string[];
  public collaborators: [
    {
      id: string;
      roles: Role[];
    }
  ];
  public createdAt: Date;
  public updatedAt: Date;
}
