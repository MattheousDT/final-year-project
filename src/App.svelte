<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import { isLoading as i18nLoading } from "svelte-i18n";
  import { onDestroy, onMount } from "svelte";

  import { user } from "./stores/user";
  import { auth } from "./firebase";
  import { profile } from "./stores/profile";
  import { getProfileFromDb } from "./util/db";
  import { initI18n } from "./i18n";
  import "./firebase";

  import Home from "./pages/Home.svelte";
  import Signup from "./pages/auth/Signup.svelte";
  import Feed from "./pages/dashboard/Feed.svelte";
  import Error from "./pages/Error.svelte";
  import Login from "./pages/auth/Login.svelte";
  import Onboarding from "./pages/onboarding/Onboarding.svelte";

  initI18n();

  let authStateUnsubscribe: any;
  let stateLoading = true;
  let documentLoading = true;

  onMount(() => {
    authStateUnsubscribe = auth.onAuthStateChanged(async (e) => {
      user.set(e);

      // this could probably be better, oh well!
      if ($user) {
        const data = await getProfileFromDb($user.uid);
        profile.set(data);
      }

      stateLoading = false;
    });

    if (document.readyState == "complete") documentLoading = false;
  });

  onDestroy(() => {
    // gotta unsubscribe or ram be like brrrr
    authStateUnsubscribe();
  });
</script>

{#if $i18nLoading && stateLoading && documentLoading}
  <!-- spinner -->
{:else}
  <div id="root">
    <Router>
      <Route path="*" component={Error} />

      <Route path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/onboarding" component={Onboarding} />

      <Route path="/dashboard/feed" component={Feed} />
    </Router>
  </div>
{/if}
