import { writable } from "svelte/store";
import type { IProfile } from "../types/profile";

export const profile = writable<IProfile>(null);

profile.subscribe(console.log);
