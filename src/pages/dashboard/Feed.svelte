<script lang="ts">
  import { _ } from "svelte-i18n";
  import DashboardLayout from "../../components/layouts/DashboardLayout.svelte";
  import Listing from "../../components/listings/Listing.svelte";
  import { ListingType, Role } from "../../util/enums";
  import { APP_NAME } from "../../util/constants";

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
    {
      type: ListingType.cover,
      title: "Bruh",
      subTitle: "bruh 2",
      tags: [Role.drums, Role.guitar, Role.mix],
    },
  ];
</script>

<svelte:head>
  <title>{$_("listings.myFeed")} | {APP_NAME}</title>
</svelte:head>

<DashboardLayout>
  <h4 class="line">{$_("listings.myFeed")}</h4>
  <h1>
    {$_("listings.collaborations")}
    <button class="button button--outline button--lg">
      {$_("ctas.viewAll")}
    </button>
  </h1>
  <div class="row">
    {#each listings as listing}
      <div class="col-12 col-lg-6 col-xl-4 col-xxl-3 col-xxxl-2">
        <Listing {...listing} />
      </div>
    {/each}
  </div>
</DashboardLayout>

<!-- <Footer /> -->
<style lang="scss">
  @import "../../scss/variables";

  h1 {
    button {
      transform: translateY(-20px);
      margin-left: $padding;
    }
  }
</style>
