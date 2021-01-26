<script lang="ts">
  import { _ } from "svelte-i18n";
  import Laptop from "../components/decorations/Laptop.svelte";
  import Mobile from "../components/decorations/Mobile.svelte";
  import Navbar from "../components/Navbar.svelte";
  import Dots from "../svg/dots.svg";
  import { APP_NAME } from "../util/constants";

  let y: number;
</script>

<svelte:head>
  <title>{$_("nav.home")} | {APP_NAME}</title>
</svelte:head>

<svelte:window bind:scrollY={y} />

<Navbar />

<main>
  <section class="jumbotron">
    <Dots class="jumbotron__dots" />
    <div class="container relative">
      <div style="transform: translateY({y / 5}px)" class="circle--gradient" />
      <div
        style="transform: translateY(-{y * 0.3}px)"
        class="circle--outline"
      />
      <div class="row">
        <div class="col-12">
          <h1>
            {$_("home.title")}
            <br />
            {$_("home.title2")}
          </h1>
          <h5 class="text--sub text--semi-bold">{$_("home.subtitle")}</h5>
          <div class="jumbotron__buttons">
            <a href="/signup" class="button button--lg button--gradient"
              >{$_("ctas.signUpNow")}</a
            >
            <a href="/components" class="button button--lg button--grey"
              >{$_("ctas.moreInfo")}</a
            >
          </div>
          <div class="jumbotron__media">
            <Laptop
              className="jumbotron__laptop"
              video="/static/test.mp4"
              image="https://media.discordapp.net/attachments/379432139856412682/800140616805515264/unknown.png?width=1178&height=663"
            />
            <Mobile
              style="transform: translateY(-{y * 0.2}px)"
              className="jumbotron__mobile"
              video="/static/test2.webm"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
<footer />

<!-- <Footer /> -->
<style lang="scss">
  @import "../scss/variables";

  .circle {
    &--gradient {
      position: absolute;
      z-index: -1;
      width: 568px;
      height: 568px;
      border-radius: 50%;
      background: $gradient;

      top: -284px;
      right: -350px;
    }

    &--outline {
      position: absolute;
      z-index: -1;
      width: 450px;
      height: 450px;
      border-radius: 50%;
      border: $tertiary 20px solid;

      top: 182px;
      left: -360px;
      transform: translateX(-100%);
    }
  }

  .jumbotron {
    position: relative;
    text-align: center;
    padding: $padding-lg * 4 0;

    &__buttons {
      padding-top: $padding-lg * 2;
      :last-child {
        margin-left: $padding;
      }
    }

    &__media {
      position: relative;
      width: 100%;
      display: inline-block;
      margin-top: $padding-lg * 4;
    }

    :global(&__laptop) {
      max-width: 100%;
    }

    :global(&__mobile) {
      position: absolute !important;
      max-width: 30%;
      bottom: -90px;
      right: 15%;
    }

    :global(&__dots) {
      position: absolute;
      left: 50%;
      top: 5px;
      transform: translate(-50%, -100%);
      z-index: -1;
    }
  }
</style>
