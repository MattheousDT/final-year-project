<script lang="ts">
  import { _ } from "svelte-i18n";
  import DashboardLayout from "@components/layouts/DashboardLayout.svelte";
  import Listing from "@components/listings/Listing.svelte";
  import { APP_NAME } from "@utils/constants";
  import QuickAction from "@components/QuickAction.svelte";
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";
  import { getListingsByUserId } from "@services/listingService";
  import { user } from "@stores/user";
  import type { IListing } from "@models/Listing";
  import Spinner from "@components/Spinner.svelte";

  let myListings: Promise<IListing[]> = new Promise(() => null);

  onMount(async () => {
    myListings = getListingsByUserId($user.data.uid);
  });
</script>

<svelte:head>
  <title>{$_("dashboard.dashboard")} | {APP_NAME}</title>
</svelte:head>

<DashboardLayout noPadding>
  <div class="container">
    <!-- Quick actions -->
    <div class="row">
      <div class="col-12">
        <h4 class="line">{$_("dashboard.dashboard")}</h4>
        <h2>
          {$_("dashboard.quickActions")}
        </h2>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <QuickAction
          icon="add"
          color="primary"
          on:click={() => navigate("/dashboard/listings/create")}
        >
          {$_("listings.create")}
        </QuickAction>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <QuickAction icon="listing" color="secondary">Quick Action</QuickAction>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <QuickAction icon="listing" color="tertiary">Quick Action</QuickAction>
      </div>
      <div class="col-12 col-md-6 col-xl-3">
        <QuickAction icon="listing" color="secondary-dark">Quick Action</QuickAction>
      </div>
    </div>
    <!-- My listings -->
    <div class="row">
      <div class="col-12">
        <h2>
          {$_("listings.yourListings")}
          <button
            class="button button--outline button--lg"
            on:click={() => navigate(`/dashboard/profile/${$user.data.uid}`)}
          >
            {$_("ctas.viewAll")}
          </button>
        </h2>
      </div>
      {#await myListings}
        <div class="col-12">
          <div class="spinner">
            <Spinner />
          </div>
        </div>
      {:then arr}
        {#each arr as listing}
          <div class="col-12 col-md-6 col-xl-3">
            <Listing {listing} />
          </div>
        {/each}
      {/await}
    </div>
    <!-- Recommended listings -->
    <!-- <div class="row">
      <div class="col-12">
        <h2>
          {$_("dashboard.recommendedForYou")}
          <button class="button button--outline button--lg">
            {$_("ctas.viewAll")}
          </button>
        </h2>
      </div>
      {#each dummyListings as listing}
        <div class="col-12 col-md-6 col-xl-3">
          <Listing {listing} />
        </div>
      {/each}
    </div> -->
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

  h2 {
    button {
      transform: translateY(-12px);
      margin-left: $padding;
    }
  }

  .row:not(:first-of-type) {
    margin-top: $padding-lg;
  }
</style>
