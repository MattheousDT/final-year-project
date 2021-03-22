<script lang="ts">
  import { _ } from "svelte-i18n";
  import StandardLayout from "@components/layouts/StandardLayout.svelte";
  import { APP_NAME } from "@utils/constants";
  import AuthCard from "@components/AuthCard.svelte";
  import { onMount } from "svelte";
  import { logPageView } from "../firebase";

  export let mode: "signin" | "signup" = "signin";

  onMount(() => {
    logPageView();
  });
</script>

<svelte:head>
  <title>
    {mode === "signin" ? $_("ctas.signIn") : $_("ctas.signUp")} | {APP_NAME}
  </title>
</svelte:head>

<StandardLayout>
  <section class="auth">
    <div class="container relative">
      <div class="circle--gradient" />
      <div class="circle--outline" />
      <div class="row">
        <div class="col-12">
          <AuthCard {mode} />
        </div>
      </div>
    </div>
  </section>
</StandardLayout>

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
  }
</style>
