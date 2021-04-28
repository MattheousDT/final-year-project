<script>
  export let icon: string;
  export let color: "primary" | "secondary" | "tertiary" | "secondary-dark";
</script>

<button on:click class="button button--icon-text button--wide {color}">
  <img src="/static/icons/{icon}.svg" alt="" />
  <p><slot /></p>
</button>

<style lang="scss">
  @import "variables";

  button {
    margin-bottom: $padding-lg;
    padding: $padding - 2 $padding-lg;

    &.primary {
      @include focusShadow($primary);
      background-color: $primary;
      &:hover {
        background-color: lighten($primary, 6);
      }
    }
    &.secondary {
      @include focusShadow($secondary);
      background-color: $secondary;
      &:hover {
        background-color: lighten($secondary, 6);
      }
    }
    &.tertiary {
      @include focusShadow($tertiary);
      background-color: $tertiary;
      &:hover {
        background-color: lighten($tertiary, 6);
      }
    }
    &.secondary-dark {
      @include focusShadow($secondary-dark);
      background-color: $secondary-dark;
      &:hover {
        background-color: lighten($secondary-dark, 6);
      }
    }
  }
</style>
