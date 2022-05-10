const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });
    let User = await bot.Users.findOne({ userId: message.author.id, guildId: message.guild.id })

    var now = Date.now();

    if (User.bonusTimer > now) {

        var lost = User.bonusTimer - now;

        let secondsTik = Math.floor(lost / 1000) - Math.floor(lost / 1000 / 60) * 60; let seconds = `${secondsTik}`;
        let minutesTik = Math.floor(lost / 1000 / 60) - Math.floor(lost / 1000 / 60 / 60) * 60; let minutes = `${minutesTik}:`;
        let hoursTik = Math.floor(lost / 1000 / 60 / 60) - Math.floor(lost / 1000 / 60 / 60 / 24) * 24; let hours = `${hoursTik}:`;

        if (secondsTik < 10) { seconds = `0${seconds}` }; if (minutesTik < 10) { minutes = `0${minutes}` }; if (hoursTik < 0) { hours = `${hoursTik}:` };
    
        // if (minutesTik == 0) { if (secondsTik == 0) { seconds = `` } } else { if (secondsTik < 10) { seconds = `0${seconds}` } }
        // if (hoursTik == 0) { hours = ``; if (minutesTik == 0) { minutes = `` } } else { if (minutesTik < 10) { minutes = `0${minutes}` } }

        let embed2 = new Discord.MessageEmbed()
            .setColor('#2F3136')
            .setTitle(['Бонус', 'Bonus'][Server.language] + ` \\🤑`)
            .setDescription(`${['Вы уже были здесь. Возвращайтесь через', 'You were already here. Return through'][Server.language]} \`${hours}${minutes}${seconds}\``)

        message.reply({ embeds: [embed2] });
        return;

    }

    bonusCoins = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

    User.coins += bonusCoins;

    var past = now + 1000 * 60 * 60 * 5;
    User.bonusTimer = past;
    
    await User.save();

    let npc1 = [`путника`]
    let npc2 = [`саппорта`]
    let npc3 = [`пачку крипов`, `стак крипов`, `вражеского ${npc2[Math.floor(Math.random() * npc2.length)]}`]

    let items1 = [`сундук`, `труп путника`]

    let quest1 = [`использовал Hand of Midas`, `зачистил данж`, `выполнил квест`]

    let bonuswords = [`${message.author} ${quest1[Math.floor(Math.random() * quest1.length)]}`,
    `${message.author} ограбил ${npc1[Math.floor(Math.random() * npc1.length)]}`,
    `${message.author} наткнулся на ${items1[Math.floor(Math.random() * items1.length)]}`,
    `${message.author} зафармил ${npc3[Math.floor(Math.random() * npc3.length)]}`,]

    let embed = new Discord.MessageEmbed()
    .setColor('#2F3136')
    .setTitle(['Бонус', 'Bonus'][Server.language] + ` \\🤑`)
    .setDescription(`${[bonuswords[Math.floor(Math.random() * bonuswords.length)], `${message.author} used Hand of Midas`][Server.language]}, ${['залутав', 'took'][Server.language]} \`${bonusCoins}\` ${Server.currency}`)

    message.reply({ embeds: [embed] });


};
module.exports.help = {
    name: "bonus"
};