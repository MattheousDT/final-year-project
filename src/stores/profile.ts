import { writable } from "svelte/store";
import type { Profile } from "../models/Profile";

export const profile = writable<Profile>(null);

profile.subscribe(console.log);
