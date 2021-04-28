<script lang="ts">
  import { _ } from "svelte-i18n";
  import DashboardLayout from "@components/layouts/DashboardLayout.svelte";
  import { APP_NAME } from "@utils/constants";
  import type { IListing, IListingCreate } from "@models/Listing";
  import { ListingType, Genre, Role } from "@utils/enums";
  import { createListing } from "@services/listingService";
  import { user } from "@stores/user";

  let form: IListingCreate = {
    author: null,
    title: null,
    artist: null,
    description: null,
    type: ListingType.cover,
    genres: [],
    bpm: 120,
    softwareUsed: null,
    roles: [],
    unlisted: false,
  };

  const handleSubmit = async () => {
    form.author = $user.data.uid;
    console.log(form);
    try {
      await createListing(form);
      alert("success");
    } catch (err) {
      console.error(err);
      alert("Error creating listing");
    }
  };
</script>

<svelte:head>
  <title>{$_("listings.create")} | {APP_NAME}</title>
</svelte:head>

<DashboardLayout noPadding>
  <div class="container">
    <h4 class="line">{$_("listings.listings")}</h4>
    <h2>
      {$_("listings.create")}
    </h2>
    <form class="row" on:submit|preventDefault={handleSubmit}>
      <div class="col-4">
        <div class="form__text">
          <label for="name">{$_("listings.title")}</label>
          <input id="name" type="text" required bind:value={form.title} />
        </div>
      </div>
      <div class="col-4">
        <div class="form__text">
          <label for="artist">{$_("listings.artist")}</label>
          <input id="artist" type="text" required bind:value={form.artist} />
        </div>
      </div>
      <div class="col-4">
        <div class="form__text">
          <label for="original">{$_("listings.types.original")}</label>
          <input id="original" type="radio" bind:group={form.type} value={ListingType.original} />
          <label for="cover">{$_("listings.types.cover")}</label>
          <input id="cover" type="radio" bind:group={form.type} value={ListingType.cover} />
        </div>
      </div>
      <div class="col-4">
        <div class="form__text">
          <label for="genres">{$_("listings.genres")}</label>
          <select id="genres" type="text" required multiple bind:value={form.genres}>
            {#each Object.values(Genre) as genre}
              <option value={Genre[genre]}>{$_(`genres.${genre}`)}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="col-4">
        <div class="form__text">
          <label for="roles">{$_("listings.roles")}</label>
          <select id="roles" type="text" required multiple bind:value={form.roles}>
            {#each Object.values(Role) as role}
              <option value={Role[role]}>{$_(`roles.${role}`)}</option>
            {/each}
          </select>
        </div>
      </div>
      <div class="col-4">
        <div class="form__text">
          <label for="bpm">{$_("listings.bpm")}</label>
          <input id="bpm" type="number" required bind:value={form.bpm} />
        </div>
      </div>
      <div class="col-4">
        <div class="form__text">
          <label for="softwareUsed">{$_("listings.softwareUsed")}</label>
          <input id="softwareUsed" type="text" bind:value={form.softwareUsed} />
        </div>
      </div>
      <div class="col-8">
        <div class="form__text">
          <label for="description">{$_("listings.brief")}</label>
          <textarea id="description" required bind:value={form.description} />
          <small class="text--sub">
            {$_("listings.briefCaption")}
            <a href="https://dl.acm.org/doi/abs/10.1145/1880071.1880073" class="text--accent">
              {$_("ctas.source")}
            </a>
          </small>
        </div>
      </div>
      <div class="col-12 bottom-buttons">
        <div class="form__checkbox">
          <input id="showFullName" type="checkbox" bind:checked={form.unlisted} />
          <label for="showFullName">{$_("listings.makeUnlisted")}</label>
        </div>
        <button type="submit" class="button button--gradient button--icon-text button--lg">
          <img src="/static/icons/save.svg" alt="" />
          <p>{$_("ctas.saveChanges")}</p>
        </button>
      </div>
    </form>
  </div>
</DashboardLayout>

<!-- <Footer /> -->
<style lang="scss">
  @import "variables";

  .bottom-buttons {
    margin-top: $padding-lg * 2;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .form__checkbox {
      margin: 0 $padding-lg 0 0;
      padding: 0;
    }
  }
</style>
