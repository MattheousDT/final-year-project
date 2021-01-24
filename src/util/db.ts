import { db } from "../firebase";
import type { IProfile } from "../types/profile";

export const getProfile = async (userId: string) =>
  db
    .collection("users")
    .doc(userId)
    .get()
    .then((e) => e.data() as IProfile);
