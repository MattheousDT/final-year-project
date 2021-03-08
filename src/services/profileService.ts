import { plainToClass } from "class-transformer";

import { db } from "../firebase";
import { Profile } from "@models/Profile";

export const getProfileById = async (userId: string) =>
  db
    .collection("users")
    .doc(userId)
    .get()
    .then((e) =>
      e.exists
        ? plainToClass(Profile, { ...e.data(), dob: e.data().dob.toDate() })
        : null
    );

export const getProfilesById = async (ids: string[]): Promise<Profile[]> =>
  db
    .collection("users")
    .where("id", "in", ids)
    .get()
    .then((e) =>
      e.docs.map((f) =>
        plainToClass(Profile, { ...f.data(), dob: f.data().dob.toDate() })
      )
    );
