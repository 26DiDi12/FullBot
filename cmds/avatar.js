const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    if (!rUser) { rUser = message.member }
    await rUser.user.fetch();

    let emoji = [`\\🥵`, `\\🥶`, `\\😱`, `\\😨`, `\\🤯`, `\\😳`, `\\😬`, `\\😵`, `\\😍`, `\\🥴`, `\\😈`, `\\🤫`]

    let TwoAvatars = false;

    let UserAvatar = `**${["Аватарка", "Avatar"][Server.language]}**`
    let UserAvatar2 = ``
    if (rUser.displayAvatarURL({ dynamic: true }) != rUser.user.displayAvatarURL({ dynamic: true })) {
        UserAvatar = `**${["Аватарка", "Avatar"][Server.language]} 1**`
        UserAvatar2 = `**${["Аватарка", "Avatar"][Server.language]} 2**`
        TwoAvatars = true;
    }

    let embed = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setDescription(`${emoji[Math.floor(Math.random() * emoji.length)]} ${UserAvatar} ${rUser.user}`)
        .setImage(rUser.displayAvatarURL({ dynamic: true }) + `?size=1024`);

    let embed2 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setDescription(`${emoji[Math.floor(Math.random() * emoji.length)]} ${UserAvatar2} ${rUser.user}`)
        .setImage(rUser.user.displayAvatarURL({ dynamic: true }) + `?size=1024`);

    if (TwoAvatars) { message.reply({ embeds: [embed, embed2] }) } else { message.reply({ embeds: [embed] }) }

};
module.exports.help = {
    name: "avatar",
    alias: 'a'
};