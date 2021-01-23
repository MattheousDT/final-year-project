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

  initI18n();
</script>

{#if !$isLoading}
  <Router>
    <Route path="*" component={Error} />

    <Route path="/" component={Index} />
    <Route path="/auth/signup" component={Signup} />
    <Route path="/auth/login" component={Login} />

    <Route path="/dashboard/feed" component={Feed} />
  </Router>
{/if}
