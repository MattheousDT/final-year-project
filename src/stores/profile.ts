import { writable } from "svelte/store";
import type { Profile } from "@models/Profile";

export enum ProfileStoreStatus {
  LOADING,
  LOADED,
}

type IProfileStore =
  | {
      status: ProfileStoreStatus.LOADING;
      data?: never;
    }
  | {
      status: ProfileStoreStatus.LOADED;
      data?: Profile;
    };

export const profile = writable<IProfileStore>({
  status: ProfileStoreStatus.LOADING,
});
