<script lang="ts">
  import { locale, _ } from "svelte-i18n";
  import { link } from "svelte-routing";

  import DashboardLayout from "@components/layouts/DashboardLayout.svelte";
  import { APP_NAME } from "@utils/constants";
  import TabBar from "@components/TabBar.svelte";
  import Chat from "@components/Chat.svelte";
  import Tag from "@components/Tag.svelte";
  import { onMount } from "svelte";
  import { getListingById } from "@services/listingService";
  import Spinner from "@components/Spinner.svelte";
  import type { IListing } from "@models/Listing";

  let listing: Promise<IListing> = new Promise(() => null);
  export let id: string;

  onMount(() => {
    listing = getListingById(id);
  });

  let tab = "details";
</script>

<svelte:head>
  <title>{$_("listings.listings")} | {APP_NAME}</title>
</svelte:head>

<DashboardLayout underlapNav noPadding>
  {#await listing}
    <Spinner />
  {:then data}
    <header>
      <div class="container">
        <div class="row main">
          <div class="col-12 col-md-9">
            <a use:link href="/dashboard/listings" class="back">
              <img src="/static/icons/back.svg" alt="" />
              <p class="text--no-margin">Back to all collaborations</p>
            </a>
            <h3 class="text--no-margin">
              {data.title}
            </h3>
            <h4 class="text--normal text--sub text--no-margin">
              {data.artist}
            </h4>
          </div>
          <div class="col-12 col-md-3">
            <aside>
              <div class="tags">
                {#each data.genres.sort((a, b) => a.localeCompare(b, $locale)) as genre}
                  <Tag size="large">{$_(`genres.${genre}`)}</Tag>
                {/each}
                <Tag size="large">{$_(`listings.types.${data.type}`)}</Tag>
              </div>
            </aside>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <TabBar
              bind:selected={tab}
              items={[
                {
                  label: $_("listings.details"),
                  value: "details",
                  icon: "info",
                },
                {
                  label: $_("listings.files"),
                  value: "files",
                  icon: "clip",
                },
                {
                  label: $_("listings.discussion"),
                  value: "chat",
                  icon: "messages",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </header>
    {#if tab === "details"}
      <section class="container">
        <div class="row">
          <div class="col-8">
            <h4 class="mt--lg">{$_("listings.description")}</h4>
            <p>{data.description}</p>
          </div>
          <div class="col-4">
            <div class="card mt">
              <h4>{$_("listings.collaborators")}</h4>
              <!-- {#each data.collaborators as collaborator}
                {#await getProfileById(collaborator.id) then p}
                  <div class="collaborator">
                    <img src={p.image} alt="" />
                    <div>
                      <h5 class="text--no-margin">{p.displayName}</h5>
                      <p
                        class:text--accent={collaborator.id === data.author}
                        class="text--no-margin text--sub"
                      >
                        {collaborator.roles.map((e) => $_(`roles.${e}`)).join(", ")}
                      </p>
                    </div>
                  </div>
                {/await}
              {/each} -->
            </div>
          </div>
        </div>
      </section>
    {:else if tab === "files"}
      <!-- else if content here -->
    {:else if tab === "chat"}
      <section class="container">
        <div class="row">
          <div class="col-8">
            <Chat />
          </div>
          <div class="col-4">
            <div class="card mt">
              <!-- {#each data.collaborators as collaborator}
                {#await getProfileById(collaborator.id) then p}
                  <div class="collaborator">
                    <img src={p.image} alt="" />
                    <div>
                      <h5 class="text--no-margin">{p.displayName}</h5>
                      <p
                        class:text--accent={collaborator.id === data.author}
                        class="text--no-margin text--sub"
                      >
                        {collaborator.roles.map((e) => $_(`roles.${e}`)).join(", ")}
                      </p>
                    </div>
                  </div>
                {/await}
              {/each} -->
            </div>
          </div>
        </div>
      </section>
    {/if}
  {/await}
</DashboardLayout>

<!-- <Footer /> -->
<style lang="scss">
  @import "variables";

  .mt {
    margin-top: $padding-lg;
    &--lg {
      margin-top: $padding-lg * 2;
    }
  }

  header {
    padding-top: $nav-height;
    background-color: $dark-card;

    .back {
      display: flex;
      align-items: center;
      text-decoration: none;
      margin-bottom: $padding-lg;

      img {
        height: 22px;
        width: 22px;
        transform: translateY(-2px);
        margin-right: 10px;
      }
    }

    .main {
      padding: $padding-lg 0;
    }

    aside {
      text-align: right;

      @include media-up(md) {
        margin-top: $padding * 3;
      }
    }

    .tags {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
  }

  .collaborator {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: $padding-lg;
    }

    img {
      height: 64px;
      width: 64px;
      object-fit: cover;
      border-radius: $radius;
      margin-right: 20px;
    }
  }
</style>
