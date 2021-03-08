<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let amount = 58;
  export let startingHeight = 0;
  export let speed = 750;

  let items: number[] = Array(amount).fill(startingHeight);

  const randomIntFromInterval = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const updateHeightsInterval = setInterval(
    () => (items = items.map((_, i) => randomIntFromInterval(50, 380))),
    speed
  );

  onMount(() => {
    updateHeightsInterval;
  });

  onDestroy(() => {
    clearInterval(updateHeightsInterval);
  });
</script>

<div class="waveform">
  {#each items as i}
    <span
      class="wave"
      style="height: {i}px; transition: height {speed}ms ease-out;"
    />
  {/each}
</div>

<style lang="scss">
  @import "variables";

  .waveform {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    height: 380px;
    z-index: -5;
    margin-top: -100px;
  }

  .wave {
    width: 8px;
    height: 200px;
    border-radius: 100px;
    margin: 0 $padding/2;
    background-color: $dark-card;
  }
</style>
