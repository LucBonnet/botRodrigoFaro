import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from "@discordjs/voice";
import { createReadStream } from "fs";

import ytdl from "ytdl-core";

let connection = null;
let playing = false;
let timer = null;

const WELCOME_SOUND = "https://www.youtube.com/watch?v=W8ab00LC-JQ";

export default async function playAudio(oldMember, newMember) {
  if (!newMember.channelId) return;

  const channel = newMember.channel;

  if (!connection || playing == false) {
    connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
  }

  clearTimeout(timer);
  timer = setTimeout(() => {
    connection.destroy();
  }, 5 * 60000);

  const player = createAudioPlayer();
  const stream = ytdl(WELCOME_SOUND, {
    filter: "audioonly",
  });

  const resource = createAudioResource(stream);

  player.play(resource);
  connection.subscribe(player);
  playing = true;
  player.on(AudioPlayerStatus.Idle, () => {
    playing = false;
  });
}
