<script lang="ts">
  import { _ } from "svelte-i18n";
  import Navbar from "../../components/navbar.svelte";
  import { APP_NAME } from "../../util/constants";
  import { user } from "../../stores/user";
  import type { Role } from "../../types/listings";
  import type { Genre } from "../../types/profile";
  import { db } from "../../firebase";
  import Step1 from "./step1.svelte";
  import Step2 from "./step2.svelte";
  import Step3 from "./step3.svelte";

  let stage = 1;

  // stage 1
  let forename: string, surname: string, dob: string, location: string;
  //stage 2
  let bio: string, roles: Role[], genres: Genre[];

  // $: {
  //   if (stage === 3) {
  //     console.log(forename, surname, dob, location, bio, roles, genres);
  //     db.collection("users")
  //       .doc($user.uid)
  //       .set({
  //         forename,
  //         surname,
  //         dob: new Date(dob),
  //         location,
  //         bio,
  //         roles,
  //         genres,
  //       })
  //       .then((e) => alert("yay"));
  //   }
  // }
</script>

<svelte:head>
  <title>{$_("nav.signup")} | {APP_NAME}</title>
</svelte:head>

<Navbar />

<main>
  <section class="setup">
    <div class="container container--small relative">
      <div class="circle--gradient" />
      <div class="circle--outline" />
      <div class="row">
        <div class="col-12">
          {#if stage === 1}
            <Step1
              bind:forename
              bind:surname
              bind:dob
              bind:location
              bind:stage
            />
          {:else if stage === 2}
            <Step2 {forename} bind:bio bind:roles bind:genres bind:stage />
          {:else if stage === 3}
            <Step3 />
          {/if}
        </div>
      </div>
    </div>
  </section>
</main>

<footer />

<!-- <Footer /> -->
<style lang="scss">
  @import "../../scss/variables";

  .circle {
    &--gradient {
      position: absolute;
      z-index: -1;
      width: 900px;
      height: 900px;
      border-radius: 50%;
      background: $gradient;

      top: -500px;
      right: -100%;
    }

    &--outline {
      position: absolute;
      z-index: -1;
      width: 672px;
      height: 672px;
      border-radius: 50%;
      border: $tertiary 20px solid;

      top: 182px;
      left: -100%;
    }
  }

  :global(.progress) {
    width: 100%;
    height: 20px;
    appearance: none;
    margin-bottom: $padding;

    &::-webkit-progress-bar {
      background-color: $dark-card;
      border-radius: $radius / 2;
    }

    &::-webkit-progress-value {
      background: $gradient;
      border-radius: $radius / 2;
    }
  }

  .setup {
    position: relative;
    height: 100%;

    :global(&__dots) {
      position: absolute;
      left: -94px;
      top: -46px;
      z-index: -1;
    }
  }
</style>
