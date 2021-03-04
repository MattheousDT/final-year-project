<script lang="ts">
  export let image: string = null;
  export let video: string = null;
  export let className: string = null;
  export let style: string = null;
</script>

<div class="laptop {className}" {style}>
  {#if video}
    <video class="media" autoplay muted loop>
      <track kind="captions" />
      <source src={video} type="video/webm" />
    </video>
  {:else}
    <img class="media" src={image} alt="" />
  {/if}

  <svg
    class="frame"
    width="888"
    height="472"
    viewBox="0 0 888 472"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M64 30C64 13.4315 77.4315 0 94 0H793C809.569 0 823 13.4315 823 30V432C823 448.569 809.569 462 793 462H94C77.4315 462 64 448.569 64 432V30Z"
      fill="white"
    />
    <path d="M0 441H888V459H0V441Z" fill="white" />
    <path
      d="M0 459H888L831 472H57C49 472 38.5673 469.696 27 467C16.2898 464.504 0 459 0 459Z"
      fill="white"
    />
  </svg>
</div>

<style lang="scss">
  @import "../../scss/variables";

  .laptop {
    display: inline-block;
    position: relative;
    z-index: -1;
  }

  .media {
    position: absolute;
    // This was cancer
    width: 80%;
    height: 83%;
    left: 50%;
    top: 6%;
    transform: translateX(-50%);
    object-fit: cover;
  }

  .frame {
    width: 100%;
    height: 100%;
  }
</style>
