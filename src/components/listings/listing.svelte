<script lang="ts">
  import { _, locale } from "svelte-i18n";
  import type { ListingType, Role } from "../../util/enums";

  export let type: ListingType;
  export let title: string;
  export let subTitle: string;
  export let tags: Role[];
</script>

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

<style lang="scss">
  @import "../../scss/variables";

  .card {
    position: relative;
    height: calc(100% - 30px);
    margin-bottom: $padding-lg;
  }

  h5 {
    margin: $padding * 3 0 0;
  }

  p {
    margin: 0 0 10px;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;

    .tag {
      padding: 2px 8px;
      background-color: $tertiary;
      border-radius: $radius-sm;
      margin-right: 10px;
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
