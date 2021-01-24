<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import { isLoading } from "svelte-i18n";

  import { initI18n } from "./i18n";
  import "./firebase";
  import Index from "./routes/index.svelte";
  import Signup from "./routes/auth/signup.svelte";
  import Feed from "./routes/dashboard/feed.svelte";
  import Error from "./routes/error.svelte";
  import Login from "./routes/auth/login.svelte";
  import { onDestroy, onMount } from "svelte";
  import { user } from "./stores/user";
  import { auth, db } from "./firebase";
  import { profile } from "./stores/profile";
  import { getProfile } from "./util/db";
  import Onboarding from "./routes/onboarding/onboarding.svelte";

  initI18n();

  let authStateUnsubscribe: any;

  onMount(() => {
    authStateUnsubscribe = auth.onAuthStateChanged(async (e) => {
      user.set(e);

      // this could probably be better, oh well!
      if ($user) {
        const data = await getProfile($user.uid);
        profile.set(data);
      }
    });
  });

  onDestroy(() => {
    // gotta unsubscribe or ram be like brrrr
    authStateUnsubscribe();
  });
</script>

{#if !$isLoading}
  <div id="root">
    <Router>
      <Route path="*" component={Error} />

      <Route path="/" component={Index} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/onboarding" component={Onboarding} />

      <Route path="/dashboard/feed" component={Feed} />
    </Router>
  </div>
{/if}
