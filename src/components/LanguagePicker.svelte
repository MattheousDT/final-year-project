<script lang="ts">
  import { locale, _ } from "svelte-i18n";
  import { fade, scale } from "svelte/transition";
  import { LANGUAGES } from "@utils/constants";

  export let visibility: boolean;
</script>

<svelte:head>
  <style>
    body {
      overflow: hidden;
    }
  </style>
</svelte:head>

<div
  class="background"
  on:click|self={() => (visibility = false)}
  transition:fade={{ duration: 250 }}
>
  <div
    class="modal"
    role="dialog"
    transition:scale={{ start: 0.8, duration: 250 }}
  >
    <div class="header">
      <h4 class="text--no-margin">{$_("ctas.selectALanguage")}</h4>
    </div>
    <div class="row">
      {#each Object.entries(LANGUAGES) as [key, val]}
        <div class="col-6">
          <button
            on:click={() => locale.set(key)}
            class:button--gradient={key === $locale}
            class="button"
          >
            {val}
          </button>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  @import "variables";

  .background {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(black, 0.7);
    z-index: 99;
  }

  .modal {
    width: 100%;
    max-width: 794px;
    border-radius: $radius-lg;
    padding: 40px 40px 40px - $padding;
    background-color: $dark-card;
  }

  .header {
    padding-bottom: $padding-lg;
    border-bottom: $dark-border 3px solid;
    margin-bottom: $padding-lg;
  }

  button {
    width: 100%;
    margin-bottom: $padding;
  }
</style>
