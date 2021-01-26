import { db } from "../firebase";
import { plainToClass } from "class-transformer";
import { Profile } from "../models/Profile";

export const getProfileFromDb = async (userId: string) =>
  db
    .collection("users")
    .doc(userId)
    .get()
    .then((e) =>
      e.data()
        ? plainToClass(Profile, { ...e.data(), dob: e.data().dob.toDate() })
        : null
    );
