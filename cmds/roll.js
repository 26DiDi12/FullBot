const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    let errorembed1 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`${['Число должно быть целым.', 'The number should be whole.'][Server.language]} \\⚠️`)

    let errorembed2 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`${['Нужно указать число.', 'You need to specify the number.'][Server.language]} \\⚠️`)

    if (!args[0]) {

        args[0] = 1;
        args[1] = 100;

    }

    let minnumber1 = isNaN(args[0]);
    if (minnumber1 == true) {

        message.reply({ embeds: [errorembed2] });
        return

    }

    if (args[0]) { args[0] *= 1 }
    if (args[1]) { args[1] *= 1 }

    if (args[0]) {

        if (Number.isInteger(args[0]) == false) {

            message.reply({ embeds: [errorembed1] });
            return

        }

        if (!args[1]) {

            args[1] = args[0];
            args[0] = 1;

        }

    }

    let minnumber2 = isNaN(args[1]);
    if (minnumber2 == true) {

        message.reply({ embeds: [errorembed2] });
        return

    }

    if (Number.isInteger(args[1]) == false) {

        message.reply({ embeds: [errorembed1] });
        return

    }

    rollnumber = Math.floor(Math.random() * (args[1] - args[0] + 1)) + args[0];

    let embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(`**${message.author.username}** ${['получает случайное число', 'gets a random number'][Server.language]} (${args[0]}-${args[1]}): \`${rollnumber}\``)

    message.reply({ embeds: [embed] });

};
module.exports.help = {
    name: "roll"
};