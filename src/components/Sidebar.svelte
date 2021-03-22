<script lang="ts">
  import { _ } from "svelte-i18n";
  import { link, navigate } from "svelte-routing";
  import { auth } from "../firebase";

  import { userPrefs } from "@stores/preferences";
  import { profile } from "@stores/profile";
  import { user } from "@stores/user";

  let location = typeof window !== "undefined" ? window.location.pathname : "";

  const updateSidebarState = () =>
    userPrefs.update((e) => ({
      ...e,
      sidebarExpanded: !e.sidebarExpanded,
    }));

  $: routes = [
    {
      name: $_("listings.myFeed"),
      icon: "home",
      route: "/dashboard/feed",
    },
    {
      name: $_("listings.listings"),
      icon: "listing",
      route: "/dashboard/listings",
    },
    {
      name: $_("nav.settings"),
      icon: "cog",
      route: "/dashboard/settings",
    },
    {
      name: $_("ctas.signOut"),
      icon: "signout",
      cb: () => auth.signOut().then(() => navigate("/")),
    },
  ];
</script>

<div class="under" class:expanded={$userPrefs.sidebarExpanded} />
<aside class:expanded={$userPrefs.sidebarExpanded}>
  <a href="/" aria-label={$_("nav.home")} use:link>
    <img src="/static/logos/logo-small.svg" alt={$_("nav.home")} class="logo" />
  </a>
  <div class="profile">
    <ul>
      <li class:active={location === `/dashboard/profile/${$user.data?.uid}`}>
        <a
          use:link
          href="/dashboard/profile/{$user.data?.uid}"
          class="nav-button nav-button--img"
          aria-label={$_("nav.myProfile")}
        >
          <img
            src={$user.data?.photoURL ??
              "https://www.streamscheme.com/wp-content/uploads/2020/09/PogU.png"}
            alt=""
          />
          <p>
            {$profile.data?.displayName ||
              $user.data?.displayName ||
              $user.data?.email}
          </p>
        </a>
      </li>
    </ul>
  </div>
  <ul class="main">
    {#each routes as r}
      <li class:active={location.startsWith(r.route)}>
        {#if r.cb}
          <button
            on:click={r.cb}
            class="nav-button nav-button--icon"
            aria-label={r.name}
          >
            <img src="/static/icons/{r.icon}.svg" alt="" />
            <p>{r.name}</p>
          </button>
        {:else}
          <a
            use:link
            href={r.route}
            class="nav-button nav-button--icon"
            aria-label={r.name}
          >
            <img src="/static/icons/{r.icon}.svg" alt="" />
            <p>{r.name}</p>
          </a>
        {/if}
      </li>
    {/each}
  </ul>
  <div class="footer">
    <ul>
      <li on:click={updateSidebarState}>
        <button
          class="nav-button nav-button--icon"
          aria-label={$userPrefs.sidebarExpanded
            ? $_("nav.collapseMenu")
            : $_("nav.expandMenu")}
        >
          <img src="/static/icons/arrows.svg" alt="" />
          <p>{$_("nav.collapseMenu")}</p>
        </button>
      </li>
    </ul>
  </div>
</aside>

<style lang="scss">
  @import "variables";

  $transitionSpeed: 200ms;
  $easing: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  aside {
    z-index: 1;
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 $padding-lg;
    background-color: $dark-card;
    width: 102px;
    transition: width $transitionSpeed $easing;

    &.expanded {
      width: 354px;
    }
  }

  .under {
    height: 100%;
    background-color: $dark-card;
    width: 102px;
    transition: width $transitionSpeed $easing;
    &.expanded {
      width: 354px;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: $padding-lg -$padding-lg 0 -$padding-lg;
    overflow-y: auto;

    &.main {
      flex: 1;
    }
  }

  li {
    position: relative;
    margin: 0;

    &::before {
      content: "";
      position: absolute;
      height: 100%;
      width: 0px;
      background: $gradient;
      left: 0;
      top: 0;
      transition: width $transitionSpeed $easing;
    }

    &.active::before {
      width: 8px;
    }
  }

  .profile {
    padding: $padding + 86px 0 $padding;
    border-bottom: $grey 2px solid;
    margin-bottom: $padding;
  }

  .footer {
    padding: $padding 0 $padding;
    border-top: $grey 2px solid;
    margin-top: $padding;
  }

  .nav-button {
    @include focusBackground;
    @include hoverBackground;
    cursor: pointer;
    background-color: $dark-card;
    padding: 0;
    border: none;
    overflow: hidden;
    padding: $padding $padding-lg;
    width: 100%;
    text-decoration: none;

    p {
      display: none;
      margin: 0 0 0 $padding;
      white-space: nowrap;
      font-weight: 700;
    }

    &--img {
      display: flex;
      align-items: center;
      img {
        border-radius: $radius-sm;
        height: 42px;
        width: 42px;
        object-fit: cover;
      }
    }

    &--icon {
      display: flex;
      align-items: center;

      img {
        height: 42px;
        width: 42px;
        transition: transform $transitionSpeed $easing;
      }
    }
  }

  .logo {
    position: absolute;
    top: $padding-lg;
    left: 28px;
    width: 45px;
    z-index: 1;
  }

  .expanded {
    .nav-button {
      p {
        display: block;
        width: auto;
      }
    }

    .footer {
      img {
        transform: rotateY(180deg);
      }
    }
  }
</style>
