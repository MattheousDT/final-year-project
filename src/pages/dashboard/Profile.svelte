<script lang="ts">
  import { _ } from "svelte-i18n";
  import type { Follow } from "@models/Follow";
  import DashboardLayout from "@components/layouts/DashboardLayout.svelte";
  import Listing from "@components/listings/Listing.svelte";
  import { profile } from "@stores/profile";
  import { user } from "@stores/user";
  import { APP_NAME } from "@utils/constants";
  import { ListingType, Role } from "@utils/enums";
  import { onMount } from "svelte";
  import TabBar from "@components/TabBar.svelte";
  import {
    addFollow,
    getFollowers,
    getFollowing,
    removeFollow,
  } from "../../services/followService";
  import {
    getProfileById,
    getProfilesById,
  } from "../../services/profileService";
  import type { Profile } from "@models/Profile";

  export let id: string;

  let isMe: boolean;
  let currentProfile: Profile;
  let editMode = false;

  let followers: Follow[] = [];
  let following: Follow[] = [];

  let followerProfiles: Profile[] = null;
  let followingProfiles: Profile[] = null;

  let tab: string;

  const _getFollowerProfiles = async () => {
    if (followers.length === 0) {
      return (followerProfiles = []);
    }

    followerProfiles = await getProfilesById(followers.map((e) => e.follower));
  };

  const _getFollowingProfiles = async () => {
    if (following.length === 0) {
      return (followingProfiles = []);
    }

    followingProfiles = await getProfilesById(following.map((e) => e.followee));
  };

  $: {
    isMe = id === $user?.uid;

    if (!currentProfile) {
      (async function () {
        if (isMe) {
          currentProfile = $profile;
        } else {
          currentProfile = await getProfileById(id);
        }
      })();
    }

    if (tab === "followers" && followerProfiles?.length != followers.length) {
      _getFollowerProfiles();
      console.log(followers);
    }
    if (tab === "following" && followingProfiles?.length != following.length) {
      _getFollowingProfiles();
    }
  }

  onMount(async () => {
    followers = await getFollowers(id);
    following = await getFollowing(id);
  });

  let listings = [
    {
      id: "brrrruhhhh227635",
      type: ListingType.original,
      title: "Bruh",
      subTitle: "bruh 2",
      tags: [Role.drums, Role.guitar, Role.mix],
    },
    {
      id: "brrrruhhhh227635",
      type: ListingType.cover,
      title: "Learning to Live",
      subTitle: "Dream Theater",
      tags: [Role.keyboard, Role.vocals],
    },
    {
      id: "brrrruhhhh227635",
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
          <TabBar
            bind:selected={tab}
            items={[
              {
                label: $_("listings.listings"),
                value: "listings",
                icon: "listing",
              },
              {
                label: $_("profile.media"),
                value: "media",
                icon: "location",
              },
              {
                label: $_("profile.about"),
                value: "about",
                icon: "location",
              },
            ]}
          />
        </div>
      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="side">
          <img class="profile-image" src={$user?.photoURL} alt="" />
          {#if currentProfile?.showFullName}
            <h4 class="text--no-margin">{currentProfile?.fullName}</h4>
            <h5 class="text--sub text--normal">{currentProfile?.username}</h5>
          {:else}
            <h4 class="text--no-margin">{currentProfile?.username}</h4>
          {/if}
          {#if editMode}
            <div class="form__text-area">
              <label for="bio">Bio</label>
              <textarea
                name="bio"
                id="bio"
                value={currentProfile?.bio}
                rows={4}
              />
            </div>
          {:else}
            <p>
              {currentProfile?.bio}
            </p>
          {/if}
          {#if isMe}
            {#if editMode}
              <button
                on:click={() => (editMode = false)}
                class="button button--gradient button--wide"
              >
                {$_("ctas.saveChanges")}
              </button>
            {:else}
              <button
                on:click={() => (editMode = true)}
                class="button button--gradient button--wide"
              >
                {$_("profile.edit")}
              </button>
            {/if}
          {:else if followers.find((e) => e.follower === $user?.uid)}
            <button
              on:click={async () => {
                await removeFollow(id, $user?.uid);
              }}
              class="button button--gradient button--wide"
            >
              {$_("ctas.unfollow")}
            </button>
          {:else}
            <button
              on:click={() => addFollow(id, $user?.uid)}
              class="button button--gradient button--wide"
            >
              {$_("ctas.follow")}
            </button>
          {/if}
          <div class="stat">
            <img src="/static/icons/people.svg" alt="" />
            <p class="text--clickable" on:click={() => (tab = "followers")}>
              {$_("profile.numberOfFollowers", {
                values: { number: followers.length },
              })}
            </p>
            <span class="dot" />
            <p class="text--clickable" on:click={() => (tab = "following")}>
              {$_("profile.numberOfFollowing", {
                values: { number: following.length },
              })}
            </p>
          </div>
          <div class="stat">
            <img src="/static/icons/location.svg" alt="" />
            <p>{currentProfile?.location}</p>
          </div>
        </div>
      </div>
      <div class="col-9">
        <div class="row">
          {#if tab === "listings"}
            {#each listings as listing}
              <div class="col-4">
                <Listing {...listing} />
              </div>
            {/each}
          {:else if tab === "media"}
            <h3>media tab</h3>
          {:else if tab === "about"}
            <h3>about tab</h3>
          {:else if tab === "followers"}
            <h3>{$_("profile.followers")}</h3>
            <pre>{JSON.stringify(followerProfiles, null, 2)}</pre>
          {:else if tab === "following"}
            <h3>{$_("profile.following")}</h3>
            <pre>{JSON.stringify(followingProfiles, null, 2)}</pre>
          {/if}
        </div>
      </div>
    </div>
  </div>
</DashboardLayout>

<!-- <Footer /> -->
<style lang="scss">
  @import "variables";

  .banner {
    position: relative;
    height: 254px + $navHeight;
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
