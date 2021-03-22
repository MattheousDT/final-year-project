<script>
  import Navbar from "../Navbar.svelte";

  export let underlapNav = false;
</script>

<Navbar />
<main class:underlapNav>
  <slot />
</main>
<footer />

<style lang="scss">
  @import "variables";

  main.underlapNav {
    margin-top: $nav-height;
  }
</style>
