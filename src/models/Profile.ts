import type { Genre, Role } from "@utils/enums";

export class Profile {
  public username?: string;
  public showFullName: boolean;
  public image?: string;
  public banner?: string;
  public forename: string;
  public surname: string;
  public dob: Date;
  public location: string;
  public bio: string;
  public gearList?: string[];
  public roles: Role[];
  public genres: Genre[];
  public listings?: string[];
  public lastActive?: Date;

  get fullName(): string {
    return `${this.forename} ${this.surname}`;
  }

  get age(): number {
    const ageDifMs = Date.now() - this.dob.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  get displayName(): string {
    return this.showFullName ? this.fullName : this.username;
  }
}
