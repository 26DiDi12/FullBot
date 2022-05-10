const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    if (!rUser) { rUser = message.member }
    await rUser.user.fetch();

    let emoji = [`\\🥵`, `\\🥶`, `\\😱`, `\\😨`, `\\🤯`, `\\😳`, `\\😬`, `\\😵`, `\\😍`, `\\🥴`, `\\😈`, `\\🤫`]

    let TwoBanners = false;

    let UserBanner = `**${["Баннер", "Banner"][Server.language]}**`
    let UserBanner2 = ``
    // if (rUser.displayAvatarURL({ dynamic: true }) != rUser.user.displayAvatarURL({ dynamic: true })) {
    //     UserBanner = `**${["Баннер", "Banner"][Server.language]} 1**`
    //     UserBanner2 = `**${["Баннер", "Banner"][Server.language]} 2**`
    //     TwoBanners = true;
    // }

    if (rUser.user.bannerURL({ dynamic: true }) == null) {

        let embed1 = new Discord.MessageEmbed()
            .setColor('BLACK')
            .setDescription(`**${[`У ${rUser.user} нет баннера.`, `${rUser.user} does not have a banner.`][Server.language]}** \\⚠️`)

        message.reply({ embeds: [embed1] })
        return;

    }

    let embed = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setDescription(`${emoji[Math.floor(Math.random() * emoji.length)]} ${UserBanner} ${rUser.user}`)
        .setImage(rUser.user.bannerURL({ dynamic: true }) + `?size=512`);

    let embed2 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setDescription(`${emoji[Math.floor(Math.random() * emoji.length)]} ${UserBanner2} ${rUser.user}`)
        .setImage(rUser.user.displayAvatarURL({ dynamic: true }) + `?size=1024`);

    if (TwoBanners) { message.reply({ embeds: [embed, embed2] }) } else { message.reply({ embeds: [embed] }) }

};
module.exports.help = {
    name: "banner",
    alias: 'b'
};