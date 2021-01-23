<script>
  import Navbar from "../navbar.svelte";
  import Sidebar from "../sidebar.svelte";
</script>

<Navbar hideLogo />
<main>
  <Sidebar />
  <div class="main">
    <slot />
  </div>
</main>
<footer />

<!-- <Footer /> -->
<style lang="scss">
  @import "../scss/variables";

  main {
    display: flex;
  }

  .main {
    flex: 1;
    padding: 0 $padding-lg * 2;
  }
</style>
