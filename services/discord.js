const Discord = require('discord.js');
const bot = require('./discord-bot');

const client = new Discord.Client();
client.login(process.env.CLIENT_TOKEN);

client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(process.env.MESSAGE_PREFIX) !== 0) return;

  const args = message.content
    .slice(process.env.MESSAGE_PREFIX.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  const context = {
    textChannel: message.channel,
    voiceChannel: message.member.voice.channel,
  };
  bot.processCommand(context, command, args);
});

exports.isGuildMember = async (userID) => {
  const guild = await client.guilds.fetch(process.env.GUILD_ID);
  const member = await guild.members.fetch(userID);
  return member;
};
