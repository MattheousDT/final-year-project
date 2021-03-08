<script lang="ts">
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

<h1>it's fucked</h1>
