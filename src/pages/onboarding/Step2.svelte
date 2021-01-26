<script lang="ts">
  import { _ } from "svelte-i18n";
  import { Genre, Role } from "../../util/enums";

  export let forename: string;
  export let bio: string,
    roles: Role[] = [],
    genres: Genre[] = [];
  export let stage: number;

  const handleNext = () => {
    stage++;
  };
</script>

<h4>
  {forename
    ? $_("onboarding.heyName", { values: { name: forename } })
    : $_("onboarding.hey")}
</h4>
<h2>{$_("onboarding.title")}</h2>
<strong>{$_("onboarding.75%")}</strong>
<br />
<progress class="progress" max={100} value={75} />
<form on:submit|preventDefault={handleNext}>
  <div class="row">
    <div class="col-12">
      <h4 class="line">{$_("onboarding.musicalInformation")}</h4>
    </div>
    <div class="col-12">
      <div class="form__text-area">
        <label for="bio">{$_("onboarding.bio")}</label>
        <textarea id="bio" required bind:value={bio} />
      </div>
    </div>
    <div class="col-6">
      <div class="form__text">
        <label for="roles">{$_("onboarding.roles")}</label>
        <select required id="roles" multiple bind:value={roles}>
          {#each Object.values(Role) as role}
            <option value={Role[role]}>{$_(`roles.${role}`)}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="col-6">
      <div class="form__text">
        <label for="genres">{$_("onboarding.genres")}</label>
        <select required id="genres" multiple bind:value={genres}>
          {#each Object.values(Genre) as genre}
            <option value={Genre[genre]}>{$_(`genres.${genre}`)}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="col-12">
      <button type="submit" class="button button--gradient button--lg">
        {$_("ctas.next")}
      </button>
    </div>
  </div>
</form>

<style lang="scss">
  @import "../../scss/variables";

  h4 {
    margin: $padding-lg * 2 0 0;
  }

  button {
    margin-top: $padding;
    float: right;
  }
</style>
