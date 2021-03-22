<script lang="ts">
  import { onMount } from "svelte";
  import { _ } from "svelte-i18n";
  import { link } from "svelte-routing";

  import StandardLayout from "@components/layouts/StandardLayout.svelte";
  import Laptop from "@components/decorations/Laptop.svelte";
  import Mobile from "@components/decorations/Mobile.svelte";
  import { APP_NAME } from "@utils/constants";
  import Waveform from "@components/decorations/Waveform.svelte";
  import { logPageView } from "../firebase";

  let y: number;
  let moreInfo: HTMLElement;

  onMount(() => {
    logPageView();
  });
</script>

<svelte:head>
  <title>{$_("nav.home")} | {APP_NAME}</title>
</svelte:head>

<svelte:window bind:scrollY={y} />

<StandardLayout>
  <section class="jumbotron">
    <img class="jumbotron__dots" src="/static/decorations/dots.svg" alt="" />
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
            <a
              use:link
              href="/signup"
              class="button button--lg button--gradient"
            >
              {$_("ctas.signUpNow")}
            </a>
            <button
              on:click={() =>
                moreInfo.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                })}
              class="button button--lg button--grey"
            >
              {$_("ctas.moreInfo")}
            </button>
          </div>
          <div class="jumbotron__media">
            <Waveform />
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
  <section bind:this={moreInfo} />
</StandardLayout>

<style lang="scss">
  @import "variables";

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

      @include media-down(md) {
        top: -360px;
        right: -500px;
      }
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

      @include media-down(md) {
        top: 280px;
      }
    }
  }

  .jumbotron {
    position: relative;
    text-align: center;
    padding: $padding-lg * 4 0;

    &__buttons {
      padding-top: $padding-lg * 2;
      @include media-down(sm) {
        display: flex;
        flex-direction: column;
      }
      :last-child {
        margin-left: $padding;
        @include media-down(sm) {
          margin-left: 0;
          margin-top: $padding;
        }
      }
    }

    &__media {
      position: relative;
      width: 100%;
      display: inline-block;
      margin-top: $padding-lg * 4;
    }

    :global &__laptop {
      max-width: 100%;
    }

    :global &__mobile {
      position: absolute !important;
      max-width: 30%;
      bottom: -90px;
      right: 15%;
    }

    &__dots {
      position: absolute;
      left: 50%;
      top: 5px;
      transform: translate(-50%, -100%);
      z-index: -1;
    }
  }
</style>
