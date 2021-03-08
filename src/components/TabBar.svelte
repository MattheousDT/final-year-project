<script lang="ts">
  import type ITabItem from "@models/ITabItem";

  export let items: ITabItem[];
  export let defaultTabIndex = 0;
  export let selected = items[defaultTabIndex].value;
</script>

<div class="tabbar">
  {#each items as item}
    <input
      id={item.value}
      type="radio"
      value={item.value}
      bind:group={selected}
    />
    <label for={item.value} class:flex={item.flex}>
      {#if item.icon}
        <img src="/static/icons/{item.icon}.svg" alt="" />
      {/if}
      <p class="text--no-margin">{item.label}</p>
    </label>
  {/each}
</div>

<style lang="scss">
  @import "variables";

  .tabbar {
    display: flex;
  }

  label {
    @include hoverBackground;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    padding: $padding $padding + 5 $padding $padding;
    cursor: pointer;

    &.flex {
      flex: 1;
    }

    &::after {
      content: "";
      position: absolute;
      height: 0px;
      width: 100%;
      background: $gradient;
      left: 0;
      bottom: 0;
      transition: height $transitionSpeed $easing;
    }
  }

  img {
    height: 36px;
    width: 36px;
    margin-right: 10px;
  }

  input {
    position: absolute;
    left: -100vw;

    &:focus + label {
      background-color: $dark-card-trans;
    }

    &:checked + label::after {
      height: 4px;
    }
  }
</style>
