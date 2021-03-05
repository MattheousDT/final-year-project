<script lang="ts">
  import firebase from "firebase";
  import { navigate } from "svelte-routing";
  import { locale, _ } from "svelte-i18n";
  import Navbar from "@components/Navbar.svelte";
  // import Dots from "../../svg/dots.svg";
  import { auth } from "../../firebase";
  import { APP_NAME } from "@utils/constants";
  import { getProfileFromDb } from "@utils/db";

  let email: string;
  let password: string;

  let error: string;

  let provider = new firebase.auth.GoogleAuthProvider();

  $: {
    auth.languageCode = $locale;
  }

  const signUpWithEmailAndPassword = async () => {
    try {
      error = null;
      await auth.createUserWithEmailAndPassword(email, password);
      navigate("/onboarding");
    } catch (err) {
      error = $_(`firebaseErrors.${err.code}`);
    }
  };

  const signInWithGoogle = async () => {
    try {
      error = null;
      const google = await auth.signInWithPopup(provider);
      const profile = await getProfileFromDb(google.user.uid);
      if (profile) {
        navigate("/dashboard/feed");
      } else {
        navigate("/onboarding");
      }
    } catch (err) {
      error = $_(`firebaseErrors.${err.code}`);
    }
  };
</script>

<svelte:head>
  <title>{$_("nav.signup")} | {APP_NAME}</title>
</svelte:head>

<Navbar />

<main>
  <section class="auth">
    <div class="container relative">
      <div class="circle--gradient" />
      <div class="circle--outline" />
      <div class="row">
        <div class="col-12">
          <div class="card">
            <!-- <Dots class="auth__dots" /> -->
            <h4>{$_("auth.signupTitle", { values: { name: APP_NAME } })}</h4>
            <form
              action=""
              on:submit|preventDefault={signUpWithEmailAndPassword}
            >
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
                  autocomplete="off"
                />
              </div>
              {#if error}
                <small class="error">{error}</small>
              {/if}
              <div class="buttons">
                <button type="submit" class="button button--gradient">
                  {$_("nav.signup")}
                </button>
                <button
                  on:click={signInWithGoogle}
                  type="button"
                  class="button button--icon"
                >
                  <img src="/static/icons/google.svg" alt="" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<footer />

<!-- <Footer /> -->
<style lang="scss">
  @import "variables";

  h4 {
    margin: $padding-lg * 2 0 $padding-lg;
  }

  .card {
    position: relative;
    max-width: 460px;
    margin: 0 auto;
    border-radius: $radius-lg;

    form {
      .buttons {
        display: flex;
        margin-top: $padding-lg * 2;
        .button--gradient {
          flex: 1;
        }
        .button--icon {
          @include focusShadow($white);
          background-color: $white;
          margin-left: $padding;
          img {
            margin-right: 0;
          }
        }
      }
    }
  }

  .error {
    margin-bottom: 0;
    color: $error;
  }

  .circle {
    &--gradient {
      position: absolute;
      z-index: -1;
      width: 900px;
      height: 900px;
      border-radius: 50%;
      background: $gradient;

      top: -500px;
      right: -300px;
    }

    &--outline {
      position: absolute;
      z-index: -1;
      width: 672px;
      height: 672px;
      border-radius: 50%;
      border: $tertiary 20px solid;

      top: 182px;
      left: -330px;
    }
  }

  .auth {
    position: relative;
    height: 100%;
    text-align: center;
    padding: $padding-lg * 4 0;

    :global &__dots {
      position: absolute;
      left: -94px;
      top: -46px;
      z-index: -1;
    }
  }
</style>
