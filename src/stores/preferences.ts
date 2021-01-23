import { writable } from "svelte/store";

// Define user prefs
interface IUserPrefs {
  sidebarExpanded: boolean;
}

// Set default if they don't exist
const defaultPrefs: IUserPrefs = {
  sidebarExpanded: false,
};

// Grab the local prefs, set to undefined if on server
const localUserPrefs =
  typeof localStorage !== "undefined"
    ? localStorage.getItem("prefs")
    : undefined;

// Initialise user prefs state
export const userPrefs = writable<IUserPrefs>(
  localUserPrefs
    ? JSON.parse(localUserPrefs)
    : JSON.parse(JSON.stringify(defaultPrefs))
);

// Keep local storage in sync with state if on client
userPrefs.subscribe((e) => {
  localUserPrefs !== undefined &&
    localStorage.setItem("prefs", JSON.stringify(e));
});
