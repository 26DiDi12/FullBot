const Discord = require("discord.js");
const fs = require("fs");
let minstavka = 10;
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    let errorembed2 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setTitle('Slot Machine \\🎰')
        .setDescription(`${["Введите команду правильно!", "Enter the command correctly!"][Server.language]} | ${Server.botPrefix}slot <${["сумма", "number"][Server.language]}> \\⚠️`)

    let errorembed3 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setTitle('Slot Machine \\🎰')
        .setDescription(`${["Минимальная ставка", "Minimum rate"][Server.language]} \`${minstavka}\` \\⚠️`)

    let errorembed4 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setTitle('Slot Machine \\🎰')
        .setDescription(`${["Вам нехватает денег!", "You are not enough money!"][Server.language]} \\⚠️`)

    let errorembed6 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setTitle('Slot Machine \\🎰')
        .setDescription(`${["Ставка должна быть целой.", "The bet should be whole."][Server.language]} \\⚠️`)

    try {

        if (!args[0]) return message.reply({ embeds: [errorembed2] })
        let minnumber = isNaN(args[0]);
        if (minnumber == true) return message.reply({ embeds: [errorembed2] })
        args[0] = args[0] * 1;

        let User = await bot.Users.findOne({ userId: message.author.id, guildId: message.guild.id })

        if (args[0] < minstavka) return message.reply({ embeds: [errorembed3] })
        if (args[0] > User.coins) return message.reply({ embeds: [errorembed4] })
        if (Number.isInteger(args[0]) == false) return message.reply({ embeds: [errorembed6] })

        let Slots = ['🍪', '🍒', '🍋', '🍑', '🍇', '🍓', '🍉', '💶', '💰', '💎', '🛎️']; let Profit = 0 - args[0]; let Win = false;

        let Slot1 = Slots[Math.floor(Math.random() * Slots.length)];
        let Slot2 = Slots[Math.floor(Math.random() * Slots.length)];
        let Slot3 = Slots[Math.floor(Math.random() * Slots.length)];

        let Slot4 = Slots[Math.floor(Math.random() * Slots.length)];
        let Slot5 = Slots[Math.floor(Math.random() * Slots.length)];
        let Slot6 = Slots[Math.floor(Math.random() * Slots.length)];

        let Slot7 = Slots[Math.floor(Math.random() * Slots.length)];
        let Slot8 = Slots[Math.floor(Math.random() * Slots.length)];
        let Slot9 = Slots[Math.floor(Math.random() * Slots.length)];

        //x1
        if (Slot1 == '🍪' && Slot2 == '🍪' && Slot3 == '🍪') { Profit = args[0]; Win = true; }
        if (Slot1 == '🍒' && Slot2 == '🍒') { Profit = args[0]; Win = true; } else if (Slot1 == '🍒' && Slot3 == '🍒') { Profit = args[0]; Win = true; } else if (Slot3 == '🍒' && Slot2 == '🍒') { Profit = args[0]; Win = true; }
        //x3
        if (Slot1 == '🍋' && Slot2 == '🍋') { Profit = args[0] * 3; Win = true; } else if (Slot1 == '🍋' && Slot3 == '🍋') { Profit = args[0] * 3; Win = true; } else if (Slot3 == '🍋' && Slot2 == '🍋') { Profit = args[0] * 3; Win = true; }
        if (Slot1 == '🍑' && Slot2 == '🍑') { Profit = args[0] * 3; Win = true; } else if (Slot1 == '🍑' && Slot3 == '🍑') { Profit = args[0] * 3; Win = true; } else if (Slot3 == '🍑' && Slot2 == '🍑') { Profit = args[0] * 3; Win = true; }
        if (Slot1 == '🍇' && Slot2 == '🍇') { Profit = args[0] * 3; Win = true; } else if (Slot1 == '🍇' && Slot3 == '🍇') { Profit = args[0] * 3; Win = true; } else if (Slot3 == '🍇' && Slot2 == '🍇') { Profit = args[0] * 3; Win = true; }
        if (Slot1 == '🍓' && Slot2 == '🍓') { Profit = args[0] * 3; Win = true; } else if (Slot1 == '🍓' && Slot3 == '🍓') { Profit = args[0] * 3; Win = true; } else if (Slot3 == '🍓' && Slot2 == '🍓') { Profit = args[0] * 3; Win = true; }
        if (Slot1 == '🍉' && Slot2 == '🍉') { Profit = args[0] * 3; Win = true; } else if (Slot1 == '🍉' && Slot3 == '🍉') { Profit = args[0] * 3; Win = true; } else if (Slot3 == '🍉' && Slot2 == '🍉') { Profit = args[0] * 3; Win = true; }
        //x10
        if (Slot1 == '🍋' && Slot2 == '🍋' && Slot3 == '🍋') { Profit = args[0] * 10; Win = true; }
        if (Slot1 == '🍑' && Slot2 == '🍑' && Slot3 == '🍑') { Profit = args[0] * 10; Win = true; }
        if (Slot1 == '🍇' && Slot2 == '🍇' && Slot3 == '🍇') { Profit = args[0] * 10; Win = true; }
        if (Slot1 == '🍓' && Slot2 == '🍓' && Slot3 == '🍓') { Profit = args[0] * 10; Win = true; }
        if (Slot1 == '🍉' && Slot2 == '🍉' && Slot3 == '🍉') { Profit = args[0] * 10; Win = true; }
        if (Slot1 == '💶' && Slot2 == '💶') { Profit = args[0] * 10; Win = true; } else if (Slot1 == '💶' && Slot3 == '💶') { Profit = args[0] * 10; Win = true; } else if (Slot3 == '💶' && Slot2 == '💶') { Profit = args[0] * 10; Win = true; }
        //x20
        if (Slot1 == '💰' && Slot2 == '💰') { Profit = args[0] * 20; Win = true; } else if (Slot1 == '💰' && Slot3 == '💰') { Profit = args[0] * 20; Win = true; } else if (Slot3 == '💰' && Slot2 == '💰') { Profit = args[0] * 20; Win = true; }
        if (Slot1 == '💎' && Slot2 == '💎') { Profit = args[0] * 20; Win = true; } else if (Slot1 == '💎' && Slot3 == '💎') { Profit = args[0] * 20; Win = true; } else if (Slot3 == '💎' && Slot2 == '💎') { Profit = args[0] * 20; Win = true; }
        //x30
        if (Slot1 == '💶' && Slot2 == '💶' && Slot3 == '💶') { Profit = args[0] * 30; Win = true; }
        //x75
        if (Slot1 == '💰' && Slot2 == '💰' && Slot3 == '💰') { Profit = args[0] * 75; Win = true; }
        if (Slot1 == '🛎️' && Slot2 == '🛎️' && Slot3 == '🛎️') { Profit = args[0] * 75; Win = true; }
        //xJACKPOT
        if (Slot1 == '💎' && Slot2 == '💎' && Slot3 == '💎') { Profit = args[0] * 100; Win = true; }

        if (Win) {
            User.coins += Profit;
            await User.save();

            if (Slot1 == '💎' && Slot2 == '💎' && Slot3 == '💎') {

                let JACKPOTEmbed = new Discord.MessageEmbed()
                    .setColor("#2F3136")
                    .setTitle('Slot Machine \\🎰')
                    .setDescription(`• ${Slot4} • ${Slot5} • ${Slot6} • 
                    • ${Slot1} • ${Slot2} • ${Slot3} • << **!!!JACKPOT!!!**
                    • ${Slot7} • ${Slot8} • ${Slot9} • `)
                    .addField(["Профит", "Profit"][Server.language], `\`+${Profit}\` ${Server.currency}`, true)
                    .addField(["Остаток", "Coins"][Server.language], `\`${User.coins}\` ${Server.currency}`, true)

                message.reply({ embeds: [JACKPOTEmbed] })

            } else {

                let WinEmbed = new Discord.MessageEmbed()
                    .setColor("#2F3136")
                    .setTitle('Slot Machine \\🎰')
                    .setDescription(`• ${Slot4} • ${Slot5} • ${Slot6} • 
                    • ${Slot1} • ${Slot2} • ${Slot3} • <<
                    • ${Slot7} • ${Slot8} • ${Slot9} • `)
                    .addField(["Профит", "Profit"][Server.language], `\`+${Profit}\` ${Server.currency}`, true)
                    .addField(["Остаток", "Coins"][Server.language], `\`${User.coins}\` ${Server.currency}`, true)

                message.reply({ embeds: [WinEmbed] })

            }

        } else {
            User.coins += Profit;
            await User.save();

            let LoseEmbed = new Discord.MessageEmbed()
                .setColor("#2F3136")
                .setTitle('Slot Machine \\🎰')
                .setDescription(`• ${Slot4} • ${Slot5} • ${Slot6} • 
                • ${Slot1} • ${Slot2} • ${Slot3} • <<
                • ${Slot7} • ${Slot8} • ${Slot9} • `)
                .addField(["Профит", "Profit"][Server.language], `\`${Profit}\` ${Server.currency}`, true)
                .addField(["Остаток", "Coins"][Server.language], `\`${User.coins}\` ${Server.currency}`, true)

            message.reply({ embeds: [LoseEmbed] })

        }

    } catch (err) {

        console.log(`CMD: slot | 1.${err.name} | 2.${err.message}`);

    }

};
module.exports.help = {
    name: "slot"
};