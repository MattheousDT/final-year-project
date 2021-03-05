<script lang="ts">
  import { _, locale } from "svelte-i18n";
  import { link } from "svelte-routing";

  import type { ListingType, Role } from "@utils/enums";

  export let id: string;
  export let type: ListingType;
  export let title: string;
  export let subTitle: string;
  export let tags: Role[];
</script>

<a href="/dashboard/listings/{id}" use:link>
  <div class="card">
    <span class="ribbon">{$_(`listings.types.${type}`)}</span>
    <h5>{title}</h5>
    <p>{subTitle}</p>
    <div class="tags">
      {#each tags.sort((a, b) => a.localeCompare(b, $locale)) as tag}
        <small class="tag">{$_(`roles.${tag}`)}</small>
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

    .tag {
      padding: 2px 8px;
      background-color: $tertiary;
      border-radius: $radius-sm;
      margin: 10px 10px 0 0;
      &:last-of-type {
        margin-right: 0;
      }
    }
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
