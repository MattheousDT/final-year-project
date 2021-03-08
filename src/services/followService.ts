import { plainToClass } from "class-transformer";

import { db } from "../firebase";
import { Follow } from "@models/Follow";

export const getFollowers = async (id: string): Promise<Follow[]> =>
  db
    .collection("follows")
    .where("followee", "==", id)
    .get()
    .then((e) => e.docs.map((f) => plainToClass(Follow, f.data())));

export const getFollowing = async (id: string): Promise<Follow[]> =>
  db
    .collection("follows")
    .where("follower", "==", id)
    .get()
    .then((e) => e.docs.map((f) => plainToClass(Follow, f.data())));

export const addFollow = async (
  followeeId: string,
  followerId: string
): Promise<void> =>
  db.collection("follows").doc().set({
    followee: followeeId,
    follower: followerId,
  });

export const removeFollow = async (
  followeeId: string,
  followerId: string
): Promise<void> =>
  db
    .collection("follows")
    .where("follower", "==", followerId)
    .where("followee", "==", followeeId)
    .get()
    .then((e) => db.collection("follows").doc(e.docs[0].id).delete());
