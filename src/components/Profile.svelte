<script lang="ts">
  import { _ } from "svelte-i18n";
  import { link } from "svelte-routing";
  import type { Profile } from "@models/Profile";
  import { addFollow, removeFollow } from "@services/followService";
  import { user } from "@stores/user";

  export let profile: Profile;
  export let isFollowing: boolean;

  const follow = async () => {
    await addFollow(profile.id, $user.data?.uid);
    isFollowing = true;
  };

  const unfollow = async () => {
    await removeFollow(profile.id, $user.data?.uid);
    isFollowing = true;
  };
</script>

<a href="/dashboard/profile/{profile.id}" use:link>
  <div class="card">
    <div class="row">
      <div class="col profile__image">
        <img src={profile.image} alt="" />
      </div>
      <div class="col profile__main">
        <span>
          <h5>{profile.displayName}</h5>
          {#if profile.showFullName}
            <p class="text--sub">{profile.username}</p>
          {/if}
        </span>
        <p>{profile.bio}</p>
        <div class="stat">
          <img src="/static/icons/location.svg" alt="" />
          <small>{profile.location}</small>
        </div>
      </div>
      <div class="col profile__buttons">
        {#if isFollowing}
          <button on:click={unfollow} class="button button--lg button--input">
            {$_("ctas.unfollow")}
          </button>
        {:else}
          <button on:click={follow} class="button button--lg button--gradient">
            {$_("ctas.follow")}
          </button>
        {/if}
      </div>
    </div>
  </div>
</a>

<style lang="scss">
  @import "variables";

  a {
    text-decoration: none;
    outline: none;

    &:focus .card {
      @include shadow($primary);
    }
    .card {
      @include hoverBackground;
    }
  }

  .profile {
    &__image {
      img {
        width: 79px;
        height: 79px;
        border-radius: $radius;
        object-fit: cover;
      }
    }

    &__main {
      flex: 1;

      p {
        margin: 0 0 5px;
      }

      span {
        display: inline-flex;
        align-items: center;
        > * {
          margin: 0;
        }

        p {
          margin-left: 10px;
        }
      }
    }
  }

  .stat {
    display: flex;
    align-items: center;

    img {
      height: 24px;
      width: 24px;
      margin-right: 10px;
    }
  }
</style>
