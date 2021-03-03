import { db } from "../firebase";
import { plainToClass } from "class-transformer";
import { Profile } from "@models/Profile";

export const getProfileFromDb = async (userId: string) =>
  db
    .collection("users")
    .doc(userId)
    .get()
    .then((e) =>
      e.exists
        ? plainToClass(Profile, { ...e.data(), dob: e.data().dob.toDate() })
        : null
    );

export const getFollowCount = async (id: string) =>
  db
    .collection("follows")
    .where("followee", "==", id)
    .get()
    .then((e) => e.docs.length);

export const getFollowingCount = async (id: string) =>
  db
    .collection("follows")
    .where("follower", "==", id)
    .get()
    .then((e) => e.docs.length);

export const addFollow = async (followeeId: string, followerId: string) =>
  db.collection("follows").doc().set({
    followee: followeeId,
    follower: followerId,
  });

export const removeFollow = async (followeeId: string, followerId: string) =>
  db
    .collection("follows")
    .where("follower", "==", followerId)
    .where("followee", "==", followeeId)
    .get()
    .then((e) => db.collection("follows").doc(e.docs[0].id).delete());

export const getFollowerProfiles = async (ids: string[]) =>
  db
    .collection("users")
    .where("id", "in", ids)
    .get()
    .then((e) =>
      e.docs.map((f) =>
        plainToClass(Profile, { ...f.data(), dob: f.data().dob.toDate() })
      )
    );
