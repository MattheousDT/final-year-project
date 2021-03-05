<script lang="ts">
  export let image: string = null;
  export let video: string = null;
  export let className: string = null;
  export let style: string = null;
</script>

<div class="mobile {className}" {style}>
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
    width="182"
    height="363"
    viewBox="0 0 182 363"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M26.3201 0C12.9591 0 2.12789 10.8312 2.12789 24.1922L2.12789 75.5392H1C0.447715 75.5392 0 75.9869 0 76.5392L0 101.138C0 101.69 0.447715 102.138 1 102.138H2.12789L2.12789 106.393H1C0.447715 106.393 0 106.841 0 107.393L0 131.992C0 132.544 0.447715 132.992 1 132.992H2.12789L2.12789 338.691C2.12789 352.052 12.9591 362.884 26.3201 362.884H155.345C168.706 362.884 179.538 352.052 179.538 338.691V123.416H180.932C181.485 123.416 181.932 122.968 181.932 122.416V81.8588C181.932 81.3066 181.485 80.8588 180.932 80.8588H179.538V24.1922C179.538 10.8312 168.706 0 155.345 0L26.3201 0ZM26.3201 8.06408C17.4128 8.06408 10.192 15.2849 10.192 24.1922L10.192 338.691C10.192 347.599 17.4128 354.82 26.3201 354.82H155.345C164.253 354.82 171.474 347.599 171.474 338.691V24.1922C171.474 15.2849 164.253 8.06408 155.345 8.06408H131.153V12.0961C131.153 16.5498 127.543 20.1602 123.089 20.1602L58.5764 20.1602C54.1228 20.1602 50.5124 16.5498 50.5124 12.0961V8.06408L26.3201 8.06408Z"
      fill="white"
    />
  </svg>
</div>

<style lang="scss">
  @import "variables";

  .mobile {
    position: relative;
    display: inline-block;
  }

  .media {
    position: absolute;
    // this was even more cancer
    width: 93%;
    height: 93.5%;
    left: 50%;
    top: 2%;
    transform: translateX(-50%);
    object-fit: cover;
    z-index: -1;
    border-radius: 10px;
  }

  .frame {
    width: 100%;
    height: 100%;
  }
</style>
