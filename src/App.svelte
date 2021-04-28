<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import { fade } from "svelte/transition";
  import { isLoading as i18nLoading } from "svelte-i18n";
  import { onDestroy, onMount } from "svelte";
  import Loadable from "svelte-loadable";

  import { user, UserStoreStatus } from "@stores/user";
  import { analytics, auth } from "./firebase";
  import { profile, ProfileStoreStatus } from "@stores/profile";
  import { getProfileById } from "./services/profileService";
  import { initI18n } from "./i18n";
  import "./firebase";
  import Spinner from "@components/Spinner.svelte";

  initI18n();

  let authStateUnsubscribe: any;

  onMount(() => {
    authStateUnsubscribe = auth.onAuthStateChanged(async (e) => {
      user.set({ status: UserStoreStatus.LOADED, data: e });

      // this could probably be better, oh well!
      if ($user.data) {
        const data = await getProfileById($user.data.uid);
        profile.set({ status: ProfileStoreStatus.LOADED, data });
      }
    });
  });

  onDestroy(() => {
    // gotta unsubscribe or ram be like brrrr
    authStateUnsubscribe();
  });
</script>

{#if $i18nLoading || $user.status === UserStoreStatus.LOADING}
  <div class="spinner-container" out:fade={{}}>
    <Spinner />
  </div>
{:else}
  <div id="root" in:fade={{}}>
    <Router>
      <Route path="*">
        <Loadable loader={() => import("@pages/Error.svelte")} />
      </Route>

      <Route path="/">
        <Loadable loader={() => import("@pages/Home.svelte")} />
      </Route>
      <Route path="/signin">
        <Loadable loader={() => import("@pages/Login.svelte")} mode="signin" />
      </Route>
      <Route path="/signup">
        <Loadable loader={() => import("@pages/Login.svelte")} mode="signup" />
      </Route>

      <Route path="/onboarding">
        <Loadable loader={() => import("@pages/onboarding/Onboarding.svelte")} />
      </Route>

      <Route path="/dashboard/feed">
        <Loadable loader={() => import("@pages/dashboard/Feed.svelte")} />
      </Route>
      <Route path="/dashboard/profile/:id" let:params>
        <Loadable loader={() => import("@pages/dashboard/Profile.svelte")} id={params.id} />
      </Route>
      <Route path="/dashboard/listings/create">
        <Loadable loader={() => import("@pages/dashboard/CreateListing.svelte")} />
      </Route>
      <Route path="/dashboard/listings/:id" let:params>
        <Loadable loader={() => import("@pages/dashboard/Listing.svelte")} id={params.id} />
      </Route>
    </Router>
  </div>
{/if}

<style>
  .spinner-container {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
  }
</style>
