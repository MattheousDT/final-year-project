<script lang="ts">
  import { _, locale } from "svelte-i18n";
  import { link } from "svelte-routing";

  import type { ListingType, Role } from "@utils/enums";
  import Tag from "@components/Tag.svelte";
  import type { IListing } from "@models/Listing";

  export let listing: Partial<IListing>;
</script>

<a href="/dashboard/listings/{listing.id}" use:link>
  <div class="card">
    <span class="ribbon">{$_(`listings.types.${listing.type}`)}</span>
    <h5>{listing.title}</h5>
    <p>{listing.artist}</p>
    <div class="tags">
      {#each listing.roles.sort((a, b) => a.localeCompare(b, $locale)) as tag}
        <Tag>{$_(`roles.${tag}`)}</Tag>
      {/each}
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

  .card {
    position: relative;
    height: calc(100% - 30px);
    margin-bottom: $padding-lg;
  }

  h5 {
    margin: $padding * 3 0 0;
  }

  p {
    margin: 0;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
  }

  .ribbon {
    position: absolute;
    display: flex;
    align-items: center;
    padding: 0 $padding + 5;
    background: $gradient;
    font-weight: 700;
    top: $padding;
    left: -8px;
    border-radius: 4px 4px 4px 0;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15);

    &::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 8px 8px 0;
      border-color: transparent darken($primary, 20) transparent transparent;
      left: 0;
      bottom: 0;
      transform: translateY(100%);
    }
  }
</style>
