<script lang="ts">
  import { onDestroy } from "svelte";
  import { _ } from "svelte-i18n";

  import { user } from "@stores/user";

  export let username: string,
    showFullName: boolean,
    forename: string,
    surname: string,
    dob: string,
    location: string;
  export let stage: number;

  const unsubscribe = user.subscribe((e) => {
    if (e?.displayName) {
      [forename, surname] = e.displayName.split(" ");
    }
  });

  onDestroy(() => unsubscribe());

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
<strong>{$_("onboarding.half")}</strong>
<br />
<progress class="progress" max={100} value={50} />
<form on:submit|preventDefault={handleNext}>
  <div class="row">
    <div class="col-12">
      <h4 class="line">{$_("onboarding.basicInformation")}</h4>
    </div>
    <div class="col-6">
      <div class="form__text">
        <label for="username">{$_("forms.username")}</label>
        <input
          id="username"
          required
          type="text"
          bind:value={username}
          autocomplete="nickname"
        />
      </div>
    </div>
    <div class="col-6">
      <div class="form__checkbox">
        <input id="showFullName" type="checkbox" bind:checked={showFullName} />
        <label for="showFullName">{$_("forms.showFullName")}</label>
      </div>
    </div>
    <div class="col-6">
      <div class="form__text">
        <label for="forename">{$_("forms.forename")}</label>
        <input
          id="forename"
          required
          type="text"
          bind:value={forename}
          autocomplete="given-name"
        />
      </div>
    </div>
    <div class="col-6">
      <div class="form__text">
        <label for="surname">{$_("forms.surname")}</label>
        <input
          id="surname"
          required
          type="text"
          bind:value={surname}
          autocomplete="family-name"
        />
      </div>
    </div>
    <div class="col-6">
      <div class="form__text">
        <label for="dob">{$_("forms.dob")}</label>
        <input
          id="dob"
          required
          type="date"
          bind:value={dob}
          autocomplete="bday"
        />
      </div>
    </div>
    <div class="col-6">
      <div class="form__text">
        <label for="city">{$_("forms.location")}</label>
        <input
          id="city"
          required
          type="text"
          bind:value={location}
          autocomplete="country"
        />
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
  @import "variables";

  h4 {
    margin: $padding-lg * 2 0 0;
  }

  button {
    margin-top: $padding;
    float: right;
  }
</style>
