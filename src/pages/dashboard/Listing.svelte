<script lang="ts">
  import { _ } from "svelte-i18n";
  import { link } from "svelte-routing";

  import DashboardLayout from "@components/layouts/DashboardLayout.svelte";
  import { APP_NAME } from "@utils/constants";
  import { Genre, ListingType, Role } from "@utils/enums";
  import TabBar from "@components/TabBar.svelte";
  import Chat from "@components/Chat.svelte";
  import { Listing } from "@models/Listing";
  import { plainToClass } from "class-transformer";
  import { getProfileById } from "../../services/profileService";
  import { profile } from "@stores/profile";

  const data = plainToClass(Listing, {
    id: 0,
    author: "LfbPY5eoVsbYpK05fOT3RFmMFl73",
    title: "Concealing Fate Pt.2",
    artist: "TesseracT",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet at mi quis arcu nunc aliquet sociis elit. Interdum penatibus gravida massa diam pretium mattis. Mi at neque, euismod sit diam ligula sit. Eu cursus morbi tempus morbi et libero venenatis molestie tincidunt. Enim proin ac semper orci nisi ut sodales sollicitudin ut. Pellentesque egestas dictumst at gravida ut egestas eu, phasellus feugiat. Urna neque tempor tellus facilisis. Nibh ultrices enim non lorem libero id arcu diam rhoncus. In aliquet semper egestas diam magna tellus, posuere pulvinar aliquam.",
    type: ListingType.cover,
    genres: [Genre.rock],
    bpm: 130,
    completion: 0.75,
    softwareUsed: ["REAPER", "Fabfilter", "NeuralDSP Fortin NTS"],
    collaborators: [
      {
        id: "LfbPY5eoVsbYpK05fOT3RFmMFl73",
        roles: [Role.guitar],
      },
      {
        id: "9jbQpff3MoarjOGTnpU8b5sPqGS2",
        roles: [Role.drums],
      },
    ],
  });

  export let id: string;
  let tab = "details";
</script>

<svelte:head>
  <title>{$_("listings.listings")} | {APP_NAME}</title>
</svelte:head>

<DashboardLayout underlapNav noPadding>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="main">
            <a use:link href="/dashboard/listings" class="back">
              <img src="/static/icons/back.svg" alt="" />
              <p class="text--no-margin">Back to all collaborations</p>
            </a>
            <h3 class="text--no-margin">{data.title}</h3>
            <h4 class="text--normal text--sub text--no-margin">
              {data.artist}
            </h4>
          </div>
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
            {#each data.collaborators as collaborator}
              {#await getProfileById(collaborator.id) then p}
                <div class="collaborator">
                  <img src={p.image} alt="" />
                  <div>
                    <h5 class="text--no-margin">{p.displayName}</h5>
                    <p
                      class:text--accent={collaborator.id === data.author}
                      class="text--no-margin text--sub"
                    >
                      {collaborator.roles
                        .map((e) => $_(`roles.${e}`))
                        .join(", ")}
                    </p>
                  </div>
                </div>
              {/await}
            {/each}
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
            {#each data.collaborators as collaborator}
              {#await getProfileById(collaborator.id) then p}
                <div class="collaborator">
                  <img src={p.image} alt="" />
                  <div>
                    <h5 class="text--no-margin">{p.displayName}</h5>
                    <p
                      class:text--accent={collaborator.id === data.author}
                      class="text--no-margin text--sub"
                    >
                      {collaborator.roles
                        .map((e) => $_(`roles.${e}`))
                        .join(", ")}
                    </p>
                  </div>
                </div>
              {/await}
            {/each}
          </div>
        </div>
      </div>
    </section>
  {/if}
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
