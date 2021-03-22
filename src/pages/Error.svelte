<script lang="ts">
  import StandardLayout from "@components/layouts/StandardLayout.svelte";
  import { APP_NAME } from "@utils/constants";
  import { onMount } from "svelte";
  import { analytics } from "../firebase";

  onMount(() => {
    analytics.logEvent("exception", { key: "404" });
  });
</script>

<svelte:head>
  <title>Error | {APP_NAME}</title>
</svelte:head>

<StandardLayout>
  <h1>Error</h1>
</StandardLayout>
