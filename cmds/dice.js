const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    let errorembed1 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setDescription(['Число должно быть целым.', 'The number should be whole.'][Server.language] + `\\⚠️`)

    let errorembed2 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setDescription(['Нужно указать число.', 'You need to specify the number.'][Server.language] + `\\⚠️`)

    if (!args[0]) { args[0] = 2; }

    let minnumber1 = isNaN(args[0]);
    if (minnumber1 == true) {

        message.reply({ embeds: [errorembed2] });
        return

    }

    if (args[0]) { args[0] *= 1 }

    if (args[0]) {

        if (Number.isInteger(args[0]) == false) {

            message.reply({ embeds: [errorembed1] });
            return;

        }

    }

    if (args[0] <= 0) { args[0] = 2; }

    let bones = 1;
    let FinalBones = ``;

    let bonesinterval = setInterval(() => {

        if (bones > args[0]) {

            clearInterval(bonesinterval);

            let embed = new Discord.MessageEmbed()
                .setColor("#2F3136")
                .setDescription(`**${message.author.username}** ${['кидает кости.', 'throws bones.'][Server.language]} \\🎲 (${args[0]}${['шт', 'th'][Server.language]}): \`${FinalBones}\``)

            message.reply({ embeds: [embed] });

            return;

        }

        rollnumber = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
        args[bones] = rollnumber;
        if(bones == 1) { FinalBones += `${args[bones]}`; } else { FinalBones += `:${args[bones]}`; }

        bones++;

    }, 0);

};
module.exports.help = {
    name: "dice"
};