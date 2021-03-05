<script lang="ts">
  import { _ } from "svelte-i18n";
  import { navigate } from "svelte-routing";
</script>

<h4>{$_("onboarding.finishPre")}</h4>
<h2>{$_("onboarding.finishTitle")}</h2>
<div class="row">
  <div class="col-12">
    <strong>
      {$_("onboarding.finishBold")}
    </strong>
    <p>
      {$_("onboarding.finishParagraph")}
    </p>
    <button
      on:click={() => navigate("/dashboard/feed")}
      class="button button--gradient button--lg"
    >
      {$_("ctas.letsGo")}
    </button>
  </div>
</div>

<style lang="scss">
  @import "variables";

  h4 {
    margin: $padding-lg * 2 0 0;
  }

  button {
    margin-top: $padding;
    float: right;
  }

  strong {
    font-weight: 700;
  }
</style>
