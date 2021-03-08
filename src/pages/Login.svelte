<script lang="ts">
  import { _ } from "svelte-i18n";
  import Navbar from "@components/Navbar.svelte";
  // import Dots from "../../svg/dots.svg";
  import { APP_NAME } from "@utils/constants";
  import AuthModal from "@components/AuthModal.svelte";
  import { onMount } from "svelte";
  import { logPageView } from "../firebase";

  onMount(() => {
    logPageView();
  });
</script>

<svelte:head>
  <title>{$_("ctas.signIn")} | {APP_NAME}</title>
</svelte:head>

<Navbar />

<main>
  <section class="auth">
    <div class="container relative">
      <div class="circle--gradient" />
      <div class="circle--outline" />
      <div class="row">
        <div class="col-12">
          <AuthModal />
        </div>
      </div>
    </div>
  </section>
</main>

<footer />

<!-- <Footer /> -->
<style lang="scss">
  @import "variables";
  .circle {
    &--gradient {
      position: absolute;
      z-index: -1;
      width: 900px;
      height: 900px;
      border-radius: 50%;
      background: $gradient;

      top: -500px;
      right: -300px;
    }

    &--outline {
      position: absolute;
      z-index: -1;
      width: 672px;
      height: 672px;
      border-radius: 50%;
      border: $tertiary 20px solid;

      top: 182px;
      left: -330px;
    }
  }

  .auth {
    position: relative;
    height: 100%;
    text-align: center;
    padding: $padding-lg * 4 0;

    :global &__dots {
      position: absolute;
      left: -94px;
      top: -46px;
      z-index: -1;
    }
  }
</style>
