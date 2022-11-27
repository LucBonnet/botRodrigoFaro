import dotenv from "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

import playAudio from "./playAudio.js";

import { generateDependencyReport } from "@discordjs/voice";

console.log(generateDependencyReport());

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

client.on("ready", () => {
  console.log("Bot is running");
});

client.on("voiceStateUpdate", async (oldMember, newMember) => {
  await playAudio(oldMember, newMember);
});

client.login(process.env.TOKEN);
