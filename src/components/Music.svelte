<script lang="ts">
  import { mixDown } from "@utils/audio";

  const ctx = new window.AudioContext();
  const mix = ctx.createBufferSource();

  let wav1: AudioBuffer;
  let wav2: AudioBuffer;

  const bruh = async () => {
    wav1 = await fetch("/static/1.wav")
      .then((resp) => resp.arrayBuffer())
      .then((buf) => ctx.decodeAudioData(buf));
    wav2 = await fetch("/static/2.wav")
      .then((resp) => resp.arrayBuffer())
      .then((buf) => ctx.decodeAudioData(buf));

    let songLength = 0;

    for (let track of [wav1, wav2]) {
      if (track.length > songLength) {
        songLength = track.length;
      }
    }

    //call our function here
    mix.buffer = mixDown(ctx, [wav1, wav2], songLength, 2);

    mix.connect(ctx.destination);

    //will playback the entire mixdown
    mix.start();
  };
</script>

<button on:click={() => bruh()}>initialise bruh</button>
