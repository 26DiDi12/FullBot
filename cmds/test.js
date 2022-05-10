const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

  if (!rUser) { rUser = message.member }
  await rUser.user.fetch();

  let statuses = {
    online: 'В сети 🟢',
    idle: 'Нет на месте 🟠',
    dnd: 'Не беспокоить 🔴',
    offline: 'Не в сети ⚫',
  }

  let st = ''

  if (rUser.presence == null) { st = 'offline' } else { st = rUser.presence.status }

  let UserCreatedAt = new Date(rUser.user.createdAt);
  let registeredDate = UserCreatedAt.getHours() + ":" + UserCreatedAt.getMinutes() + " | " + UserCreatedAt.toLocaleDateString('ru-RU');

  let UserJoinedAt = new Date(rUser.joinedTimestamp);
  let joinedDate = UserJoinedAt.getHours() + ":" + UserJoinedAt.getMinutes() + " | " + UserJoinedAt.toLocaleDateString('ru-RU');

  let UserNick = `**Ник пользователя:** \`${rUser.user.tag}\``
  let UserStatus = `**Статус пользователя:** \`${statuses[st]}\``
  let UserID = `**ID пользователя:** \`${rUser.user.id}\``
  let UserDataRegistry = `**Дата регистрации:** \`${registeredDate}\``
  let UserDataJoinToServer = `**Дата захода на сервер:** \`${joinedDate}\``
  let UserAvatar = `**Аватарка:** [\`AvatarURL\`](${rUser.displayAvatarURL({ dynamic:true }) + `?size=1024`})`
  let UserUseBanner = ``; let UserBanner = ``;
  if (rUser.user.bannerURL({ dynamic: true } != null)) {
    UserUseBanner = rUser.user.bannerURL({ dynamic: true }) + `?size=512`;
    UserBanner = `** | Баннер:** [\`BannerURL\`](${UserUseBanner})` 
  }

  let embed = new Discord.MessageEmbed()
    .setColor('BLACK')
    .addField(`Основная информация:`, `> ${UserNick}\n> ${UserStatus}\n> ${UserID}\n> ${UserDataRegistry}\n> ${UserDataJoinToServer}\n> ${UserAvatar}${UserBanner}`, false)
    .setAuthor("Пользователь | " + rUser.user.tag, rUser.user.displayAvatarURL({ dynamic:true }))
    .setThumbnail(rUser.user.displayAvatarURL({ dynamic:true }))
    .setImage(UserUseBanner);

  message.reply({ embeds: [embed] })

};
module.exports.help = {
  name: "test"
};