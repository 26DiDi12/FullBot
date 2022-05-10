const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    let online_emoji = bot.emojis.cache.get("906698384314859530");
    let idle_emoji = bot.emojis.cache.get("906698384235171840");
    let dnd_emoji = bot.emojis.cache.get("906698384415543316");
    let offline_emoji = bot.emojis.cache.get("906698383949967402");

    let ServerCreatedAt = new Date(message.guild.createdAt);
    let registeredDate = ServerCreatedAt.getHours() + ":" + ServerCreatedAt.getMinutes() + " | " + ServerCreatedAt.toLocaleDateString(['ru-RU', 'us-US'][Server.language]);

    let onlinestatus = message.guild.members.cache.filter(m => m.presence !== null).filter(m => m.presence.status === 'online').size - 1;
    let idlestatus = message.guild.members.cache.filter(m => m.presence !== null).filter(m => m.presence.status === 'idle').size;
    let dndstatus = message.guild.members.cache.filter(m => m.presence !== null).filter(m => m.presence.status === 'dnd').size + 1;
    let offlinestatus = message.guild.members.cache.filter(m => m.presence === null).size;

    let ServerAllUsers = `**\\👥 ${['Всего', 'Total'][Server.language]}:** \`${message.guild.memberCount}\``
    let ServerUsers = `**\\👤 ${['Люди', 'People'][Server.language]}:** \`${message.guild.members.cache.filter(m => m.user.bot === false).size}\``
    let ServerBots = `**\\🤖 ${['Боты', 'Boots'][Server.language]}:** \`${message.guild.members.cache.filter(m => m.user.bot === true).size}\``
    let UsersStatus = `**${online_emoji}${['В сети', 'Online'][Server.language]}:** \`${onlinestatus}\`\n**${idle_emoji}${['Нет на месте', 'Idle'][Server.language]}:** \`${idlestatus}\`\n**${dnd_emoji}${['Не беспокоить', 'Do not disturb'][Server.language]}:** \`${dndstatus}\`\n**${offline_emoji}${['Не в сети', 'Offline'][Server.language]}:** \`${offlinestatus}\``

    let OwnerServerName = `**${['Владелец сервера', 'Server owner'][Server.language]}:** \`${message.guild.members.cache.get(message.guild.ownerId).user.tag}\``
    let OwnerServerID = `**${['ID владельца', 'Owner ID'][Server.language]}:** \`${message.guild.ownerId}\``
    let ServerName = `**${['Название сервера', 'Server name'][Server.language]}:** \`${message.guild.name}\``
    let ServerID = `**${['ID сервера', 'Server ID'][Server.language]}:** \`${message.guild.id}\``
    let ServerDataRegistry = `**${['Дата создания', 'Date of creation'][Server.language]}:** \`${registeredDate}\``
    let ServerAvatar = `**${['Аватарка сервера', 'Server avatar'][Server.language]}:** [\`AvatarURL\`](${message.guild.iconURL({ dynamic: true }) + `?size=1024`})`
    let ServerUseBanner = ``;

    let ServerBanner = ``;
    if (message.guild.bannerURL() != null) {
        ServerUseBanner = message.guild.bannerURL() + `?size=512`;
        ServerAvatar = `**${['Аватарка', 'Avatar'][Server.language]}:** [\`AvatarURL\`](${message.guild.iconURL({ dynamic: true }) + `?size=1024`})`
        ServerBanner = `** | ${['Баннер', 'Banner'][Server.language]}:** [\`BannerURL\`](${ServerUseBanner})`
    }

    let embed = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle(['Сервер', 'Server'][Server.language] + " | " + message.guild.name)
        .addField(`${['Основная информация', 'Basic information'][Server.language]}:`, `> ${OwnerServerName}\n> ${OwnerServerID}\n> ${ServerName}\n> ${ServerID}\n> ${ServerDataRegistry}\n> ${ServerAvatar}${ServerBanner}`, false)
        .addField(`${['Участники', 'Members'][Server.language]}:`, `${UsersStatus}`, true)
        .addField(`⠀`, `${ServerAllUsers}\n${ServerUsers}\n${ServerBots}`, true)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setImage(ServerUseBanner);

    message.reply({ embeds: [embed] })

};
module.exports.help = {
    name: "server",
    alias: "s",
};