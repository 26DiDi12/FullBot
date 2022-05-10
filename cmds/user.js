const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

  const Server = await bot.Servers.findOne({ guildId: message.guild.id });

  if (!rUser) { rUser = message.member }
  await rUser.user.fetch();

  let statuses = {
    online: ['В сети 🟢', 'Online 🟢'][Server.language],
    idle: ['Нет на месте 🟠', 'Idle 🟠'][Server.language],
    dnd: ['Не беспокоить 🔴', 'Do not disturb 🔴'][Server.language],
    offline: ['Не в сети ⚫', 'Offline ⚫'][Server.language],
  }

  let st = ''

  if (rUser.presence == null) { st = 'offline' } else { st = rUser.presence.status }

  let UserCreatedAt = new Date(rUser.user.createdAt);
  let registeredDate = UserCreatedAt.getHours() + ":" + UserCreatedAt.getMinutes() + " | " + UserCreatedAt.toLocaleDateString(['ru-RU', 'us-US'][Server.language]);

  let UserJoinedAt = new Date(rUser.joinedTimestamp);
  let joinedDate = UserJoinedAt.getHours() + ":" + UserJoinedAt.getMinutes() + " | " + UserJoinedAt.toLocaleDateString(['ru-RU', 'us-US'][Server.language]);

  let UserNick = `**${['Ник пользователя', 'User nickname'][Server.language]}:** \`${rUser.user.tag}\``
  let UserStatus = `**${['Статус пользователя', 'User status'][Server.language]}:** \`${statuses[st]}\``
  let UserID = `**${['ID пользователя', 'User ID'][Server.language]}:** \`${rUser.user.id}\``
  let UserDataRegistry = `**${['Дата регистрации', 'The date of registration'][Server.language]}:** \`${registeredDate}\``
  let UserDataJoinToServer = `**${['Дата захода на сервер', 'Vailing date for the server'][Server.language]}:** \`${joinedDate}\``
  let UserAvatar = `**${['Аватарка пользователя', 'User avatar'][Server.language]}:** [\`AvatarURL\`](${rUser.displayAvatarURL({ dynamic:true }) + `?size=1024`})`
  let UserUseBanner = ``; 

  let UserBanner = ``;
  if (rUser.user.bannerURL({ dynamic: true }) != null) {
    UserUseBanner = rUser.user.bannerURL({ dynamic: true }) + `?size=512`;
    UserAvatar = `**${['Аватарка', 'Avatar'][Server.language]}:** [\`AvatarURL\`](${rUser.displayAvatarURL({ dynamic:true }) + `?size=1024`})`
    UserBanner = `** | ${['Баннер', 'Banner'][Server.language]}:** [\`BannerURL\`](${UserUseBanner})` 
  }
  
  let UserAvatar2 = ``
  if (rUser.displayAvatarURL({ dynamic:true }) != rUser.user.displayAvatarURL({ dynamic:true })) {
    UserAvatar = `**${['Аватарка', 'Avatar'][Server.language]} 1:** [\`AvatarURL\`](${rUser.displayAvatarURL({ dynamic:true }) + `?size=1024`})`
    UserAvatar2 = `\n> **${['Аватарка', 'Avatar'][Server.language]} 2:** [\`AvatarURL\`](${rUser.user.displayAvatarURL({ dynamic:true }) + `?size=1024`})`
  }

  let embed = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTitle(['Пользователь', 'User'][Server.language] + " | " + rUser.user.tag)
    .addField(`${['Основная информация', 'Basic information'][Server.language]}:`, `> ${UserNick}\n> ${UserStatus}\n> ${UserID}\n> ${UserDataRegistry}\n> ${UserDataJoinToServer}\n> ${UserAvatar}${UserBanner}${UserAvatar2}`, false)
    // .setAuthor(['Пользователь', 'User'][Server.language] + " | " + rUser.user.tag, rUser.displayAvatarURL({ dynamic:true }))
    .setThumbnail(rUser.displayAvatarURL({ dynamic:true }))
    .setImage(UserUseBanner);

  message.reply({ embeds: [embed] })

};
module.exports.help = {
  name: "user",
  alias: "u",
};