<script lang="ts">
  import { _ } from "svelte-i18n";
  import DashboardLayout from "@components/layouts/DashboardLayout.svelte";
  import { APP_NAME } from "@utils/constants";
</script>

<svelte:head>
  <title>{$_("nav.settings")} | {APP_NAME}</title>
</svelte:head>

<DashboardLayout>
  <h4 class="line">{$_("nav.settings")}</h4>
  <h2>
    {$_("nav.myProfile")}
  </h2>
  <div class="row">
    <div class="col-12">
      <p>bruh</p>
    </div>
  </div>
</DashboardLayout>

<!-- <Footer /> -->
<style lang="scss">
  @import "variables";
</style>
