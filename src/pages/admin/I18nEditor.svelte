<script lang="ts">
  import { _, locales, dictionary } from "svelte-i18n";
  import Navbar from "@components/Navbar.svelte";
  import { APP_NAME } from "@utils/constants";
</script>

<svelte:head>
  <title>{$_("nav.home")} | {APP_NAME}</title>
</svelte:head>

<Navbar />

<main>bruh</main>
<footer />

<!-- <Footer /> -->
<style lang="scss">
  @import "variables";
</style>
