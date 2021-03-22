import { writable } from "svelte/store";
import type firebase from "firebase";

export enum UserStoreStatus {
  LOADING,
  LOADED,
}

type IUserStore =
  | {
      status: UserStoreStatus.LOADING;
      data?: never;
    }
  | {
      status: UserStoreStatus.LOADED;
      data?: firebase.User;
    };

export const user = writable<IUserStore>({ status: UserStoreStatus.LOADING });
