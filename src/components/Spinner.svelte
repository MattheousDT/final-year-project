<svelte:options namespace="svg" />

<script lang="ts">
  export let size = 100;
  export let type:
    | "gradient"
    | "primary"
    | "secondary"
    | "tertiary"
    | "grey"
    | "white" = "gradient";
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 100 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    class={type}
    d="M90 50C90 72.0914 72.0914 90 50 90C27.9086 90 10 72.0914 10 50C10 27.9086 27.9086 10 50 10V0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50H90Z"
  />
</svg>

<style lang="scss">
  @import "variables";

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes gradientAnimation {
    0% {
      fill: $primary;
    }
    50% {
      fill: $secondary;
    }
    100% {
      fill: $primary;
    }
  }

  svg {
    animation: spin 700ms infinite linear;
  }

  path {
    &.gradient {
      animation: gradientAnimation 2s infinite;
    }

    &.primary {
      fill: $primary;
    }

    &.secondary {
      fill: $secondary;
    }

    &.tertiary {
      fill: $tertiary;
    }

    &.grey {
      fill: $grey;
    }

    &.white {
      fill: $white;
    }
  }
</style>
