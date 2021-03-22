<script lang="ts">
  import { link } from "svelte-routing";
  import { locale, _ } from "svelte-i18n";

  import { user } from "@stores/user";
  import { profile } from "@stores/profile";
  import LanguagePicker from "./LanguagePicker.svelte";
  import { LANGUAGES } from "@utils/constants";

  export let hideLogo = false;

  let langVisiblity: boolean;
</script>

<header>
  <nav>
    <span>
      {#if !hideLogo}
        <a class="logo" href="/" use:link>
          <img
            src="/static/logos/logo.svg"
            alt={$_("nav.home")}
            class="logo--desktop"
          />
          <img
            src="/static/logos/logo-small.svg"
            alt={$_("nav.home")}
            class="logo--mobile"
          />
        </a>
      {/if}
    </span>
    <ul>
      <li>
        <button
          on:click={() => (langVisiblity = !langVisiblity)}
          class="button button--flat button--icon"
        >
          <img src="/static/icons/globe.svg" alt="" />{LANGUAGES[$locale]}
        </button>
      </li>
      {#if $user.data}
        <li>
          <a
            href="/dashboard/feed"
            use:link
            class="button button--blur button--image"
          >
            <img
              src={$user.data.photoURL ??
                "https://www.streamscheme.com/wp-content/uploads/2020/09/PogU.png"}
              alt=""
            />
            {$profile.data?.displayName ||
              $user.data.displayName ||
              $user.data.email}
          </a>
        </li>
      {:else}
        <li>
          <a class="button button--lg button--blur" href="/signin" use:link>
            {$_("ctas.signIn")}
          </a>
        </li>
      {/if}
    </ul>
  </nav>
</header>

{#if langVisiblity}
  <LanguagePicker bind:visibility={langVisiblity} />
{/if}

<style lang="scss">
  @import "variables";

  header {
    z-index: 1;
  }

  nav {
    height: $nav-height;
    padding: $padding $padding-lg * 2;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include media-down(xl) {
      padding: $padding;
    }

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
    }

    li {
      margin-left: $padding;
    }
  }

  .logo {
    display: flex;

    &--desktop {
      height: 50px;
      @include media-down(sm) {
        display: none;
      }
    }

    &--mobile {
      height: 50px;
      @include media-up(md) {
        display: none;
      }
    }
  }
</style>
