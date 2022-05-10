const Discord = require("discord.js");
const fs = require("fs");
let minstavka = 100;
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    let errorembed1 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setTitle('Spin Machine \\🎰')
        .setDescription(`${["Выберете цвет", "Choose the color"][Server.language]} | Red [1.5x] Black [2x] Green [15x] \\⚠️`)

    let errorembed2 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setTitle('Spin Machine \\🎰')
        .setDescription(`${["Введите команду правильно!", "Enter the command correctly!"][Server.language]} | ${Server.botPrefix}spin <${["цвет", "color"][Server.language]}> <${["сумма", "number"][Server.language]}> \\⚠️`)

    let errorembed3 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setTitle('Spin Machine \\🎰')
        .setDescription(`${["Минимальная ставка", "Minimum rate"][Server.language]} \`${minstavka}\` \\⚠️`)

    let errorembed4 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setTitle('Spin Machine \\🎰')
        .setDescription(`${["Вам нехватает денег!", "You are not enough money!"][Server.language]} \\⚠️`)

    let errorembed6 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setTitle('Spin Machine \\🎰')
        .setDescription(`${["Ставка должна быть целой.", "The bet should be whole."][Server.language]} \\⚠️`)

    try {

        if (!args[0]) return message.reply({ embeds: [errorembed1] })
        if (!args[1]) return message.reply({ embeds: [errorembed2] })
        let minnumber = isNaN(args[1]);
        if (minnumber == true) return message.reply({ embeds: [errorembed2] })
        args[1] = args[1] * 1;

        let redcolor = ['RED', 'Red', 'red', 'R', 'r']
        let blackcolor = ['BLACK', 'Black', 'black', 'B', 'b']
        let greencolor = ['GREEN', 'Green', 'green', 'G', 'g']

        if (redcolor.some(word => message.content.includes(word))) { args[0] = 'r' }
        if (blackcolor.some(word => message.content.includes(word))) { args[0] = 'b' }
        if (greencolor.some(word => message.content.includes(word))) { args[0] = 'g' }

        if (args[0] != 'r') {
            if (args[0] != 'b') {
                if (args[0] != 'g') {
                    message.reply({ embeds: [errorembed1] })
                    return
                }
            }
        }

        let User = await bot.Users.findOne({ userId: message.author.id, guildId: message.guild.id })

        if (args[1] < minstavka) return message.reply({ embeds: [errorembed3] })
        if (args[1] > User.coins) return message.reply({ embeds: [errorembed4] })
        if (Number.isInteger(args[1]) == false) return message.reply({ embeds: [errorembed6] })

        let mnojitel = 0; let chance = 0; let stavka = ''; let circle = ''; let Profit = 0 - args[1]; let End; let rollnumber1;
        
        if (args[0] == 'r') {
            mnojitel = 1.5; chance = 50; stavka = 'Red'; circle = '\\🔴'; rollnumber1 = Math.floor(Math.random() * (33 - 1 + 1)) + 1;
        } else if (args[0] == 'b') {
            mnojitel = 2; chance = 30; stavka = 'Black'; circle = '\\⚫'; rollnumber1 = Math.floor(Math.random() * (53 - 1 + 1)) + 1;
        } else if (args[0] == 'g') {
            mnojitel = 15; chance = 3; stavka = 'Green'; circle = '\\🟢'; rollnumber1 = Math.floor(Math.random() * (80 - 1 + 1)) + 1;
        }

        let rollnumber = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

        if (rollnumber <= chance) {
            End = circle;
            Profit += args[1] * mnojitel
            User.coins += Profit;
            await User.save();

            let WinEmbed = new Discord.MessageEmbed()
                .setColor("#2F3136")
                .setTitle('Spin Machine \\🎰')
                .setDescription(`**${["Выпало", "Color"][Server.language]}:** ${End}\n**${["Шанс", "Chance"][Server.language]}:** \`${chance}%\``)
                .addField(["Профит", "Profit"][Server.language], `\`+${Profit}\` ${Server.currency}`, true)
                .addField(["Остаток", "Coins"][Server.language], `\`${User.coins}\` ${Server.currency}`, true)
    
            message.reply({ embeds: [WinEmbed] })

        } else {

            if (args[0] == 'r') {
                if (rollnumber1 <= 30) { End = '\\⚫' } else { End = '\\🟢' }
            } else if (args[0] == 'b') {
                if (rollnumber1 <= 50) { End = '\\🔴' } else { End = '\\🟢' }
            }else if (args[0] == 'g') {
                if (rollnumber1 <= 50) { End = '\\🔴' } else { End = '\\⚫' }
            }

            User.coins += Profit;
            await User.save();

            let LoseEmbed = new Discord.MessageEmbed()
                .setColor("#2F3136")
                .setTitle('Spin Machine \\🎰')
                .setDescription(`**${["Выпало", "Color"][Server.language]}:** ${End}\n**${["Шанс", "Chance"][Server.language]}:** \`${chance}%\``)
                .addField(["Профит", "Profit"][Server.language], `\`${Profit}\` ${Server.currency}`, true)
                .addField(["Остаток", "Coins"][Server.language], `\`${User.coins}\` ${Server.currency}`, true)
    
            message.reply({ embeds: [LoseEmbed] })

        }

    } catch (err) {

        console.log(`CMD: spin | 1.${err.name} | 2.${err.message}`);

    }

};
module.exports.help = {
    name: "spin"
};