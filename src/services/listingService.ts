import { plainToClass } from "class-transformer";

import { db } from "../firebase";
import { Listing } from "@models/Listing";
import type { IListingCreate } from "@models/Listing";

export const createListing = async (listing: IListingCreate) =>
  db.collection("listings").add(listing);

export const getListingsByUserId = async (userId: string): Promise<Listing[]> =>
  db
    .collection("listings")
    .where("author", "==", userId)
    .get()
    .then((e) => e.docs.map((f) => plainToClass(Listing, { ...f.data(), id: f.id })));

export const getListingById = async (listingId: string): Promise<Listing> =>
  db
    .collection("listings")
    .doc(listingId)
    .get()
    .then((e) => plainToClass(Listing, { ...e.data(), id: e.id }));
