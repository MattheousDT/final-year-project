<script>
  import Navbar from "../Navbar.svelte";
  import Sidebar from "../Sidebar.svelte";

  export let underlapNav = false;
  export let noPadding = false;
</script>

<Navbar hideLogo />
<main>
  <Sidebar />
  <div class:underlapNav class:noPadding class="main">
    <slot />
  </div>
</main>
<footer />

<!-- <Footer /> -->
<style lang="scss">
  @import "variables";

  main {
    display: flex;
  }

  .main {
    flex: 1;
    padding: 0 $padding-lg * 2;

    &.underlapNav {
      margin-top: -86px;
    }

    &.noPadding {
      padding: 0;
    }
  }
</style>
