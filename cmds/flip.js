const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    let flip = [['ОРЁЛ', 'EAGLE'][Server.language], ['РЕШКА', 'TAILS'][Server.language]]
    let win = ['выиграли', 'won'][Server.language]
    let lose = ['проиграли', 'lose'][Server.language]
    let winorlose = ''

    let moneyflip = flip[Math.floor(Math.random() * flip.length)]

    let errorembed2 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setDescription(['Укажите сторону монетки.', 'Indicate the side of the coin.'][Server.language] + `\\⚠️`)

    if (args[0]) {

        let pwords = ['p', 'P', 'РЕШКА', 'решка', 'р', 'Р']
        let owords = ['o', 'O', 'ОРЕЛ', 'Орел', 'орел', 'орёл', 'ОРЁЛ', 'О', 'о']

        if (pwords.some(word => message.content.includes(word))) { args[0] = 'Решка' }
        if (owords.some(word => message.content.includes(word))) { args[0] = 'Орёл' }

        if (args[0] != 'Решка') {
            if (args[0] != 'Орёл') {
                message.reply({ embeds: [errorembed2] })
                return
            }
        }

        if (args[0] == 'Решка') { if (moneyflip == ['ОРЁЛ', 'EAGLE'][Server.language]) { winorlose = lose } else { winorlose = win } }
        if (args[0] == 'Орёл') { if (moneyflip == ['РЕШКА', 'TAILS'][Server.language]) { winorlose = lose } else { winorlose = win } }

        let embedmonetka = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription(`**${message.author.username}** ${['подбрасывает монетку', 'throws a coin'][Server.language]}: ***${moneyflip}***\n${['Вы', 'You'][Server.language]} ${winorlose}`)

        message.reply({ embeds: [embedmonetka] });

    } else {

        let embed = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setDescription(`**${message.author.username}** ${['подбрасывает монетку', 'throws a coin'][Server.language]}: ***${flip[Math.floor(Math.random() * flip.length)]}***`)

        message.reply({ embeds: [embed] });

    }

};
module.exports.help = {
    name: "flip"
};