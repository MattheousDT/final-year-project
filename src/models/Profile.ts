import type { Genre, Role } from "../util/enums";

export class Profile {
  public username?: string;
  public forename: string;
  public surname: string;
  public dob: Date;
  public location: string;
  public bio: string;
  public gearList?: string[];
  public roles: Role[];
  public genres: Genre[];
  public listings?: string[];
  public lastOnline?: Date;
  public dateRegistered?: Date;

  public getFullName = (): string => `${this.forename} ${this.surname}`;

  public getAge = (): number => {
    const ageDifMs = Date.now() - this.dob.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
}
