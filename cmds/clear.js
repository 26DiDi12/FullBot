const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    let errorembed1 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setDescription(`${['Нужно указать число от \`1\` до \`100\`', 'You need to specify the number from \`1 \` to \`100 \`'][Server.language]} \\⚠️`)

    let errorembed2 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setDescription(`${['Нужно указать число не больше \`100\`', 'You need to specify the number no more than \`100 \`'][Server.language]} \\⚠️`)

    let errorembed3 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setDescription(`${['Нужно указать число не меньше \`1\`', 'You need to specify the number no less \`1 \`'][Server.language]} \\⚠️`)

    let errorembed4 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setDescription(`${['Число должно быть целое.', 'The number should be the whole.'][Server.language]} \\⚠️`)

    try {

        if (message.guild.members.cache.get(bot.user.id).permissions.has("MANAGE_MESSAGES")) {

            if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

            if (!args[0]) return message.channel.send({ embeds: [errorembed1] })

            args[0] = args[0] * 1;
            let minnumber = isNaN(args[0]);

            if (minnumber == true) return message.channel.send({ embeds: [errorembed1] })

            if (args[0] > 100) return message.channel.send({ embeds: [errorembed2] })
            if (args[0] < 1) return message.channel.send({ embeds: [errorembed3] })
            if (Number.isInteger(args[0]) == false) return message.channel.send({ embeds: [errorembed4] })

            await message.delete().catch(err => console.log(`CMD: clear | 1.${err.name} | 2.${err.message}`));

            let messages = ''

            message.channel.bulkDelete(args[0], true).then(m => {

                if (m.size.toString().endsWith('0')) { parseInt(m.size); messages = 'сообщений' }
                if (m.size.toString().endsWith('1')) { parseInt(m.size); messages = 'сообщение' }
                if (m.size === '11') { parseInt(m.size); messages = 'сообщений' }
                if (m.size.toString().endsWith('2')) { parseInt(m.size); messages = 'сообщения' }
                if (m.size === '12') { parseInt(m.size); messages = 'сообщений' }
                if (m.size.toString().endsWith('3')) { parseInt(m.size); messages = 'сообщения' }
                if (m.size === '13') { parseInt(m.size); messages = 'сообщений' }
                if (m.size.toString().endsWith('4')) { parseInt(m.size); messages = 'сообщения' }
                if (m.size === '14') { parseInt(m.size); messages = 'сообщений' }
                if (m.size.toString().endsWith('5')) { parseInt(m.size); messages = 'сообщений' }
                if (m.size.toString().endsWith('6')) { parseInt(m.size); messages = 'сообщений' }
                if (m.size.toString().endsWith('7')) { parseInt(m.size); messages = 'сообщений' }
                if (m.size.toString().endsWith('8')) { parseInt(m.size); messages = 'сообщений' }
                if (m.size.toString().endsWith('9')) { parseInt(m.size); messages = 'сообщений' }

                let cleartext = ["я лишил жизни", "я испепелил", "я уничтожил", "я истребил"]

                let clearembed = new Discord.MessageEmbed()
                    .setColor("#2F3136")
                    .setDescription(`${message.author}, ${[cleartext[Math.floor(Math.random() * cleartext.length)], 'I deleted'][Server.language]} \`${m.size}\` ${[messages, 'messages'][Server.language]}!`)

                message.channel.send({ embeds: [clearembed] }).then(msg => {

                    setTimeout(() => { msg.delete().catch(err => console.log(`CMD: clear | 1.${err.name} | 2.${err.message}`)); }, 5000)

                })

            });

        }

    } catch (err) {

        console.log(`CMD: clear | 1.${err.name} | 2.${err.message}`);

    }

};
module.exports.help = {
    name: "clear"
};