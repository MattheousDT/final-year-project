<script lang="ts">
  import { _ } from "svelte-i18n";
  import DashboardLayout from "@components/layouts/DashboardLayout.svelte";
  import Listing from "@components/listings/Listing.svelte";
  import type { Profile } from "@models/Profile";
  import { profile } from "@stores/profile";
  import { user } from "@stores/user";
  import { APP_NAME } from "@utils/constants";
  import { ListingType, Role } from "@utils/enums";

  export let id: string;

  let isMe: boolean;
  let editMode = false;

  $: {
    isMe = id === $user?.uid;
  }

  let listings = [
    {
      type: ListingType.original,
      title: "Bruh",
      subTitle: "bruh 2",
      tags: [Role.drums, Role.guitar, Role.mix],
    },
    {
      type: ListingType.cover,
      title: "Learning to Live",
      subTitle: "Dream Theater",
      tags: [Role.keyboard, Role.vocals],
    },
    {
      type: ListingType.cover,
      title: "Bruh",
      subTitle: "bruh 2",
      tags: [Role.drums, Role.guitar, Role.mix],
    },
  ];
</script>

<svelte:head>
  <title>{$_("nav.myProfile")} | {APP_NAME}</title>
</svelte:head>

<DashboardLayout underlapNav noPadding>
  <div
    class="banner"
    style="background-image: url({'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'})"
  />
  <div class="nav">
    <div class="container">
      <div class="row">
        <div class="col-3" />
        <div class="col-9">
          <ul>
            <li>bruh</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="side">
          <img class="profile-image" src={$user?.photoURL} alt="" />
          {#if $profile?.showFullName}
            <h4 class="text--no-margin">{$profile?.fullName}</h4>
            <h5 class="text--sub text--normal">{$profile?.username}</h5>
          {:else}
            <h4 class="text--no-margin">{$profile?.username}</h4>
          {/if}
          <p>
            {$profile?.bio}
          </p>
          {#if isMe}
            {#if editMode}
              <button
                on:click={() => (editMode = false)}
                class="button button--gradient button--wide"
              >
                Save changes
              </button>
            {:else}
              <button
                on:click={() => (editMode = true)}
                class="button button--gradient button--wide"
              >
                Edit profile
              </button>
            {/if}
          {:else}
            <button class="button button--gradient button--wide">
              Follow
            </button>
          {/if}
          <div class="stat">
            <img src="/static/icons/people.svg" alt="" />
            <p>21 Followers</p>
            <span class="dot" />
            <p>72 Following</p>
          </div>
          <div class="stat">
            <img src="/static/icons/location.svg" alt="" />
            <p>{$profile?.location}</p>
          </div>
        </div>
      </div>
      <div class="col-9">
        <div class="row">
          {#each listings as listing}
            <div class="col-4"><Listing {...listing} /></div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</DashboardLayout>

<!-- <Footer /> -->
<style lang="scss">
  @import "../../scss/variables";

  .banner {
    position: relative;
    height: 336px;
    width: 100%;
    background-image: $gradient;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -1;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($dark-background, 0.5);
    }
  }

  .nav {
    background-color: $dark-card;
    margin-bottom: $padding-lg;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        padding: $padding $padding + 5;
      }
    }
  }

  .side {
    .profile-image {
      width: 100%;
      border-radius: 50%;
      margin: -290px 0 $padding-lg;
    }

    .stat {
      display: flex;
      align-items: center;
      margin-bottom: -$padding;

      img {
        height: 36px;
        width: 36px;
        margin-right: 10px;
      }

      .dot {
        height: 4px;
        width: 4px;
        border-radius: 50%;
        margin: 0 10px;
        background: $subtext;
      }
    }
  }
</style>
