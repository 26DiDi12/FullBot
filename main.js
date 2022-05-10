const { Client, Intents, MessageButton, MessageSelectMenu, MessageActionRow, MessageAttachment, Collection, GuildMember, MessageEmbed } = require('discord.js'),
  bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING] });

const Discord = require('discord.js');
const mongoose = require('mongoose')

const User = mongoose.Schema({
  userId: String,
  userName: String,
  guildId: String,
  guildName: String,
  bonusTimer: Number,
  coins: Number,
  xp: Number,
  lvl: Number,
  xplost: Number,
  top: Number,
  privateprofile: String
})

const Server = mongoose.Schema({
  guildId: String,
  guildName: String,
  ownerId: String,
  ownerUsername: String,
  botPrefix: String,
  language: Number,
  languageStg: String,
  currency: String
})

const Role = mongoose.Schema({
  guildId: String,
  roleId: String,
  roleName: String,
  roleOwnerId: String,
  roleCost: Number,
  roleBuysNumber: Number,
})

bot.commands = new Collection();
const fs = require('fs');
let config = require('./botconfig.json');
let token = config.token;

//остались: n!nsfw, n!sscreen, n!translate, n!bibametr, n!jaba, n!or, n!phrase, n!quiz, n!angry, n!cute, n!kiss, n!bug, n!votes

let cmdsnumber;
fs.readdir('./cmds/', (err, files) => {
  if (err) console.log(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) console.log("Нет комманд для загрузки!!");
  console.log(`Загружено ${jsfiles.length} комманд`);
  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    cmdsnumber = jsfiles.length;
    console.log(`${i + 1}.${f} Загружен!`);
    bot.commands.set(props.help.name, props);
    bot.commands.set(props.help.alias, props);
  });
});

bot.on('ready', async () => {

  console.log(`Запустился бот ${bot.user.username}`);

  const connectionStringCompass = "mongodb://0.0.0.0:27017/DiscordDB"

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 75000,
    family: 4,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
  };

  await mongoose.connect(connectionStringCompass, options).then(() => console.log('MongoDB Compass подключён!')).catch(err => console.log(err));

  const ServerModel = mongoose.model('Server', Server, 'Servers');
  bot.Servers = ServerModel;

  const UserModel = mongoose.model('User', User, 'Users');
  bot.Users = UserModel;

  const RoleModel = mongoose.model('Role', Role, 'Roles');
  bot.Roles = RoleModel;

  bot.user.setPresence({
    status: 'dnd',
    activities: [{
      name: `n!help  | Cmds: ${cmdsnumber} | Servers: ${bot.guilds.cache.size}`,
      type: 'WATCHING'
    }]
  })

  for (let lengthSorted = 0; lengthSorted < bot.guilds.cache.size; ++lengthSorted) {

    let Guild = bot.guilds.cache.map(m => m)[lengthSorted];
    const Server = await bot.Servers.findOne({ guildId: Guild.id })
    if (Server == null) {
      const newServer = new bot.Servers({
        guildId: Guild.id,
        guildName: Guild.name,
        ownerId: Guild.ownerId,
        ownerUsername: Guild.members.cache.get(Guild.ownerId).user.username,
        botPrefix: 'n!',
        language: 0,
        languageStg: 'Русский',
        currency: ':coin:'
      })
      await newServer.save();
    }

    for (let usersSorted = 0; usersSorted < Guild.memberCount; ++usersSorted) {

      let member = Guild.members.cache.map(m => m)[usersSorted];

      if (member != undefined) {

        let User = Guild.members.cache.map(m => m)[usersSorted].user;
        const BDUser = await bot.Users.findOne({ userId: User.id, guildId: Guild.id })

        if (BDUser == null) {
          const writeBDUser = new bot.Users({
            userId: User.id,
            userName: User.username,
            guildId: Guild.id,
            guildName: Guild.name,
            bonusTimer: 0,
            coins: 0,
            xp: 0,
            lvl: 0,
            xplost: 0,
            top: 0,
            privateprofile: false
          })
          await writeBDUser.save();
        }

      }

    }

  }

});

bot.on('messageCreate', async message => {

  try {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id })

    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    let uid = message.author.id;
    bot.send = function (msg) {
      message.channel.send(msg);
    };

    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let rUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!message.content.startsWith(Server.botPrefix)) return;
    let cmd = bot.commands.get(command.slice(Server.botPrefix.length));
    if (cmd) { if (cmd.run) { cmd.run(bot, message, args, rUser, uid) } else { cmd } }

  } catch (err) {

    console.log(`1.${err.name}\n2.${err.message}`);

  }

});

bot.on("guildCreate", async guild => {

  const Server = await bot.Servers.findOne({ guildId: guild.id })
  if (Server == null) {
    const newServer = new bot.Servers({
      guildId: guild.id,
      guildName: guild.name,
      ownerId: guild.ownerId,
      ownerUsername: guild.members.cache.get(guild.ownerId).user.username,
      botPrefix: 'n!'
    })
    await newServer.save();
  }

})

bot.login(token);
