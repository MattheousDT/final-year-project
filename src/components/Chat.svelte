<script lang="ts">
  import { afterUpdate, beforeUpdate, onMount } from "svelte";
  import { _, locale } from "svelte-i18n";

  import { formatTime } from "@utils/formatters";

  interface IMessage {
    id: number;
    text: string;
    author: string;
    image?: string;
    date: number;
  }

  let messages: IMessage[] = [
    {
      id: 0,
      text: "blah blah",
      author: "Lukasz",
      image:
        "https://lh3.googleusercontent.com/a-/AOh14GitHEaC1Vc_34qD8o6RXl269-lE9a00umrfReQr1SU=s96-c",
      date: Date.now() - 10,
    },
    {
      id: 1,
      text: "blah blah",
      author: "Lukasz",
      image:
        "https://lh3.googleusercontent.com/a-/AOh14GitHEaC1Vc_34qD8o6RXl269-lE9a00umrfReQr1SU=s96-c",
      date: Date.now() - 8,
    },
    {
      id: 2,
      text: "blah blah",
      author: "Lukasz",
      image:
        "https://lh3.googleusercontent.com/a-/AOh14GitHEaC1Vc_34qD8o6RXl269-lE9a00umrfReQr1SU=s96-c",
      date: Date.now() - 8,
    },
    {
      id: 3,
      text: "blah blah",
      author: "me",
      date: Date.now() - 4,
    },
    {
      id: 4,
      text: "blah blah",
      author: "Lukasz",
      image:
        "https://lh3.googleusercontent.com/a-/AOh14GitHEaC1Vc_34qD8o6RXl269-lE9a00umrfReQr1SU=s96-c",
      date: Date.now() - 2,
    },
  ];

  let input: string;

  const submit = () => {
    if (!input) return;

    messages = messages.concat({
      id: messages.length,
      author: "me",
      text: input,
      date: Date.now(),
    });
    input = "";
  };

  let div;
  let autoscroll;

  onMount(() => {
    div.scrollTo(0, div.scrollHeight);
  });

  beforeUpdate(() => {
    autoscroll =
      div && div.offsetHeight + div.scrollTop > div.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) div.scrollTo(0, div.scrollHeight);
  });
</script>

<div class="chat">
  <div class="messages" bind:this={div}>
    {#each messages as message (message.id)}
      <div class="message" class:message--self={message.author === "me"}>
        {#if message.image}
          <img src={message.image} alt="" />
        {/if}
        <div class="message__details">
          {#if message.author !== "me"}
            <small>
              {message.author} • {formatTime($locale, message.date)}
            </small>
          {/if}
          <div class="message__bubble">
            <p class="text--no-margin">{message.text}</p>
          </div>
        </div>
      </div>
    {/each}
  </div>
  <div class="inputs form__text">
    <input
      type="text"
      aria-label={$_("chat.messageBox")}
      placeholder={$_("chat.placeholder")}
      bind:value={input}
      on:keydown={(e) => (e.key === "Enter" ? submit() : null)}
    />
    <button
      title={$_("chat.send")}
      type="submit"
      class="button button--circle-icon button--gradient"
      on:click={submit}
    >
      <img src="/static/icons/send.svg" alt="" />
    </button>
  </div>
</div>

<style lang="scss">
  @import "variables";

  .chat {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 800px;
  }

  .inputs {
    flex-direction: row;
    margin: $padding-lg 0 $padding-lg * 2;
    input {
      flex: 1;
      margin-right: $padding;
    }
  }

  .messages {
    overflow-y: auto;
  }

  .message {
    display: flex;
    align-items: flex-end;
    margin-bottom: $padding;

    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: $padding;
    }

    small {
      display: block;
      padding-left: $padding;
    }

    &__details {
      max-width: 55%;
    }

    &__bubble {
      display: inline-block;
      background: $dark-card;
      padding: $padding - 4px $padding;
      border-radius: $radius $radius $radius 0;
    }

    &--self {
      justify-content: flex-end;
      .message__bubble {
        background: $gradient;
        border-radius: $radius $radius 0 $radius;
      }
    }
  }
</style>
