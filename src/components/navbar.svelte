<script lang="ts">
  import { link } from "svelte-routing";
  import { locale, _ } from "svelte-i18n";

  import { user } from "../stores/user";
  import { LANGUAGES } from "../util/constants";
  import LanguagePicker from "./LanguagePicker.svelte";
  import { auth } from "../firebase";
  import { profile } from "../stores/profile";

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
      {#if $user}
        <li>
          <a
            href="/dashboard/feed"
            use:link
            on:contextmenu={() => auth.signOut()}
            class="button button--blur button--image"
          >
            <img
              src={$user.photoURL ??
                "https://www.streamscheme.com/wp-content/uploads/2020/09/PogU.png"}
              alt=""
            />
            {$profile?.getFullName() || $user?.displayName || $user?.email}
          </a>
        </li>
      {:else}
        <li>
          <a class="button button--flat" href="/login" use:link>
            {$_("nav.login")}
          </a>
        </li>
        <li>
          <a class="button button--lg button--blur" href="/signup" use:link>
            {$_("nav.signup")}
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
  @import "../scss/variables";

  nav {
    height: 82px;
    padding: $padding $padding-lg * 2;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include media-down(md) {
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
