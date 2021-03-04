<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import { fade } from "svelte/transition";
  import { isLoading as i18nLoading } from "svelte-i18n";
  import { onDestroy, onMount } from "svelte";
  import Loadable from "svelte-loadable";

  import { user } from "@stores/user";
  import { auth } from "./firebase";
  import { profile } from "@stores/profile";
  import { getProfileFromDb } from "@utils/db";
  import { initI18n } from "./i18n";
  import "./firebase";

  initI18n();

  let authStateUnsubscribe: any;
  let stateLoading = true;

  $: {
    if ($user !== undefined) {
      stateLoading = false;
      console.log("loaded");
    }
  }

  onMount(() => {
    authStateUnsubscribe = auth.onAuthStateChanged(async (e) => {
      user.set(e);

      // this could probably be better, oh well!
      if ($user) {
        const data = await getProfileFromDb($user.uid);
        profile.set(data);
      }
    });
  });

  onDestroy(() => {
    // gotta unsubscribe or ram be like brrrr
    authStateUnsubscribe();
  });
</script>

{#if $i18nLoading || stateLoading}
  <!-- spinner -->
{:else}
  <div id="root" in:fade={{}}>
    <Router>
      <Route path="*">
        <Loadable loader={() => import("@pages/Error.svelte")} />
      </Route>

      <Route path="/">
        <Loadable loader={() => import("@pages/Home.svelte")} />
      </Route>
      <Route path="/signup">
        <Loadable loader={() => import("@pages/auth/Signup.svelte")} />
      </Route>
      <Route path="/login">
        <Loadable loader={() => import("@pages/auth/Login.svelte")} />
      </Route>
      <Route path="/onboarding">
        <Loadable
          loader={() => import("@pages/onboarding/Onboarding.svelte")}
        />
      </Route>

      <Route path="/dashboard/feed">
        <Loadable loader={() => import("@pages/dashboard/Feed.svelte")} />
      </Route>
      <Route path="/dashboard/profile/:id" let:params>
        <Loadable
          loader={() => import("@pages/dashboard/Profile.svelte")}
          id={params.id}
        />
      </Route>

      <Route path="/admin/i18n">
        <Loadable loader={() => import("@pages/admin/I18nEditor.svelte")} />
      </Route>
    </Router>
  </div>
{/if}
