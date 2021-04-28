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
  import { getProfileById, getProfilesById } from "../../services/profileService";
  import type { Profile } from "@models/Profile";
  import { default as ProfileCard } from "@components/Profile.svelte";
  import { getListingsByUserId } from "@services/listingService";
  import type { IListing } from "@models/Listing";
  import Spinner from "@components/Spinner.svelte";

  export let id: string;

  let isMe: boolean;
  let currentProfile: Profile;
  let editMode = false;

  let followers: Follow[] = [];
  let following: Follow[] = [];

  let followerProfiles: Profile[] = null;
  let followingProfiles: Profile[] = null;

  let listings: Promise<IListing[]> = new Promise(() => null);

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

  const _follow = async () => {
    await addFollow(currentProfile.id, $user.data?.uid);
    getFollowers(id).then((e) => (followers = e));
    followerProfiles = followerProfiles.concat($profile.data);
  };

  const _unfollow = async () => {
    await removeFollow(currentProfile.id, $user.data?.uid);
    getFollowers(id).then((e) => (followers = e));
    followerProfiles.filter((x) => x.id !== $user.data?.uid);
  };

  $: {
    isMe = id === $user.data?.uid;

    if (!currentProfile || currentProfile.id !== id) {
      tab = "listings";

      listings = getListingsByUserId(id);

      followingProfiles = [];
      followerProfiles = [];

      getFollowers(id).then((e) => (followers = e));
      getFollowing(id).then((e) => (following = e));

      (async function () {
        if (isMe) {
          currentProfile = $profile.data;
        } else {
          currentProfile = await getProfileById(id);
        }
      })();
    }
  }

  $: {
    if (tab === "followers" && followerProfiles?.length != followers.length) {
      _getFollowerProfiles();
    }
    if (tab === "following" && followingProfiles?.length != following.length) {
      _getFollowingProfiles();
    }
  }
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
                icon: "media",
              },
              {
                label: $_("profile.about"),
                value: "about",
                icon: "info",
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
          <img class="profile-image" src={currentProfile?.image} alt="" />
          {#if editMode}
            <div class="form__text">
              <label for="username">{$_("forms.username")}</label>
              <input
                id="username"
                required
                type="text"
                autocomplete="nickname"
                pattern={`^[a-z0-9_-]{3, 15}$`}
                value={currentProfile?.username}
              />
            </div>
            <div class="form__text">
              <label for="forename">{$_("forms.forename")}</label>
              <input
                id="forename"
                required
                type="text"
                autocomplete="given-name"
                value={currentProfile?.forename}
              />
            </div>
            <div class="form__text">
              <label for="surname">{$_("forms.surname")}</label>
              <input
                id="surname"
                required
                type="text"
                autocomplete="family-name"
                value={currentProfile?.surname}
              />
            </div>
            <div class="form__text-area">
              <label for="bio">{$_("forms.bio")}</label>
              <textarea name="bio" id="bio" value={currentProfile?.bio} rows={4} />
            </div>
          {:else}
            {#if currentProfile?.showFullName}
              <h4 class="text--no-margin">{currentProfile?.fullName}</h4>
              <h5 class="text--sub text--normal">{currentProfile?.username}</h5>
            {:else}
              <h4 class="text--no-margin">{currentProfile?.username}</h4>
            {/if}
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
          {:else if followers.find((e) => e.follower === $user.data?.uid)}
            <button on:click={_unfollow} class="button button--gradient button--wide">
              {$_("ctas.unfollow")}
            </button>
          {:else}
            <button on:click={_follow} class="button button--gradient button--wide">
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
            {#await listings}
              <div class="col-12">
                <div class="spinner">
                  <Spinner />
                </div>
              </div>
            {:then data}
              {#each data as listing}
                <div class="col-4">
                  <Listing {listing} />
                </div>
              {/each}
            {/await}
          {:else if tab === "media"}
            <h3>media tab</h3>
          {:else if tab === "about"}
            <h3>about tab</h3>
          {:else if tab === "followers"}
            <div class="col-12">
              <h4>{$_("profile.followers")}</h4>
            </div>
            {#each followerProfiles as p}
              <div class="col-12">
                <ProfileCard
                  profile={p}
                  isFollowing={!!followingProfiles.find((x) => x.id === p.id)}
                />
              </div>
            {/each}
          {:else if tab === "following"}
            <div class="col-12">
              <h4>{$_("profile.following")}</h4>
            </div>
            {#each followingProfiles as p}
              <div class="col-12">
                <ProfileCard profile={p} isFollowing={true} />
              </div>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  </div>
</DashboardLayout>

<!-- <Footer /> -->
<style lang="scss">
  @import "variables";

  .spinner {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .banner {
    position: relative;
    height: 254px + $nav-height;
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
