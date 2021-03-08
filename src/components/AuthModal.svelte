<script lang="ts">
  import firebase from "firebase";
  import { analytics, auth } from "../firebase";
  import { locale, _ } from "svelte-i18n";
  import { navigate } from "svelte-routing";
  import { getProfileById } from "@services/profileService";
  import TabBar from "./TabBar.svelte";

  let email: string;
  let password: string;

  let mode: "signin" | "signup";

  let error: string;

  let provider = new firebase.auth.GoogleAuthProvider();

  $: {
    auth.languageCode = $locale;
  }

  const handleEmailPassword = async () => {
    if (mode === "signin") {
      try {
        error = null;
        await auth.signInWithEmailAndPassword(email, password);
        analytics.logEvent("login", { method: "email" });
        navigate("/dashboard/feed");
      } catch (err) {
        error = $_(`firebaseErrors.${err.code}`);
      }
    } else {
      try {
        error = null;
        await auth.createUserWithEmailAndPassword(email, password);
        analytics.logEvent("sign_up", { method: "email" });
        navigate("/onboarding");
      } catch (err) {
        error = $_(`firebaseErrors.${err.code}`);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      error = null;
      const google = await auth.signInWithPopup(provider);
      const profile = await getProfileById(google.user.uid);
      if (profile) {
        analytics.logEvent("login", { method: "google" });
        navigate("/dashboard/feed");
      } else {
        analytics.logEvent("sign_up", { method: "google" });
        navigate("/onboarding");
      }
    } catch (err) {
      error = $_(`firebaseErrors.${err.code}`);
    }
  };
</script>

<form action="" on:submit|preventDefault={handleEmailPassword}>
  <div class="card">
    <TabBar
      bind:selected={mode}
      items={[
        {
          label: $_("ctas.signIn"),
          value: "signin",
          flex: true,
        },
        {
          label: $_("ctas.signUp"),
          value: "signup",
          flex: true,
        },
      ]}
    />
    <div class="inputs">
      <div class="form__text">
        <label for="email">{$_("auth.email")}</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          autocomplete="email"
        />
      </div>
      <div class="form__text">
        <label for="password">{$_("auth.password")}</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          autocomplete="current-password"
        />
      </div>
      {#if error}
        <small class="error">{error}</small>
      {/if}
    </div>
    <div class="buttons">
      <button type="submit" class="button button--gradient">
        {mode === "signin" ? $_("ctas.signIn") : $_("ctas.signUp")}
      </button>
      <button
        on:click={signInWithGoogle}
        type="button"
        class="button button--icon-text button--input"
      >
        <img src="/static/icons/google.svg" alt="" />
        <p>{$_("ctas.signInWithGoogle")}</p>
      </button>
    </div>
  </div>
</form>

<style lang="scss">
  @import "variables";

  .card {
    position: relative;
    max-width: 460px;
    margin: 0 auto;
    border-radius: $radius-lg;
  }

  .inputs {
    margin: $padding * 3 0;
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;

    button {
      flex: 1 0 100%;

      &:not(:last-child) {
        margin-bottom: $padding;
      }
    }
  }

  .error {
    margin-bottom: 0;
    color: $error;
  }
</style>
