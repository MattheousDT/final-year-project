<script>
  export let size: "small" | "large" = "small";
</script>

<small class="tag tag--{size}">
  <slot />
</small>

<style lang="scss">
  @import "variables";

  .tag {
    display: inline-block;
    padding: 2px 8px;
    background-color: $tertiary;
    border-radius: $radius-sm;
    margin: 10px 10px 0 0;

    &--large {
      padding: 6px $padding;
      font-size: 1rem;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
</style>
