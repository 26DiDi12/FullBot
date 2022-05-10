const Discord = require("discord.js");
const fs = require("fs");
const isPlaying = new Set();
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    const AcceptButton = new Discord.MessageButton()
        .setLabel(['Принять', 'Accept'][Server.language])
        .setStyle("SUCCESS")
        .setCustomId("accept")

    const CancelButton = new Discord.MessageButton()
        .setLabel(['Отклонить', 'Reject'][Server.language])
        .setStyle("DANGER")
        .setCustomId("cancel")

    const EmptyButton1 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty1")

    const EmptyButton2 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty2")

    const EmptyButton3 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty3")

    const EmptyButton4 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty4")

    const EmptyButton5 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty5")

    const EmptyButton6 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty6")

    const EmptyButton7 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty7")

    const EmptyButton8 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty8")

    const EmptyButton9 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty9")

    const AcceptMenu = new Discord.MessageActionRow()
        .addComponents(AcceptButton)
        .addComponents(CancelButton)

    const TTTGame1 = new Discord.MessageActionRow()
        .addComponents(EmptyButton1)
        .addComponents(EmptyButton2)
        .addComponents(EmptyButton3)
    const TTTGame2 = new Discord.MessageActionRow()
        .addComponents(EmptyButton4)
        .addComponents(EmptyButton5)
        .addComponents(EmptyButton6)
    const TTTGame3 = new Discord.MessageActionRow()
        .addComponents(EmptyButton7)
        .addComponents(EmptyButton8)
        .addComponents(EmptyButton9)

    let errembed1 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(`${['Крестики-нолики', 'Tic-tac-toe'][Server.language]} \\🎮`)
        .setDescription(`**${['Укажите пользователя.', 'Indicate the user.'][Server.language]}** \\⚠️`)

    if (!rUser) return message.channel.send({ embeds: [errembed1] })

    if (isPlaying.has(message.author.id)) {
        let isPlayingEmbed = new Discord.MessageEmbed()
            .setTitle(`${['Крестики-нолики', 'Tic-tac-toe'][Server.language]} \\🎮`)
            .setDescription(`**${['Вы уже начали сессию, закончите её.', 'You have already started the session, finish it.'][Server.language]}** \\⚠️`)
            .setColor("BLACK")
        return message.channel.send({ embeds: [isPlayingEmbed] })
    }

    if (isPlaying.has(rUser.user.id)) {
        let isPlayingEmbed = new Discord.MessageEmbed()
            .setTitle(`${['Крестики-нолики', 'Tic-tac-toe'][Server.language]} \\🎮`)
            .setDescription(`**${['Ваш оппонент уже начал сессию.', 'Your opponent has already begun a session.'][Server.language]}** \\⚠️`)
            .setColor("BLACK")
        return message.channel.send({ embeds: [isPlayingEmbed] })
    }

    isPlaying.add(message.author.id)
    isPlaying.add(rUser.user.id)
    let Author = message.author;

    let Random = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    let Player1; let Player2; let PlayerLength = true;
    let emoji = [`\\😖`, `\\😨`, `\\😓`, `\\😪`, `\\😬`, `\\😢`, `\\🤕`, `\\🤒`, `\\🤧`]
    let emoji1 = [`\\😨`, `\\😮`, `\\😝`, `\\😁`, `\\🥳`, `\\🤯`, `\\🤩`, `\\🤧`]

    if (Random == 0) { Player1 = message.author; Player2 = rUser.user }
    if (Random == 1) { Player2 = message.author; Player1 = rUser.user }

    let errembed2 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(`${['Крестики-нолики', 'Tic-tac-toe'][Server.language]} \\🎮`)
        .setDescription(`${rUser.user} ${['не ответил', 'did not answer'][Server.language]} ${emoji[Math.floor(Math.random() * emoji.length)]}`)

    let TTTEmbed0 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(`${['Крестики-нолики', 'Tic-tac-toe'][Server.language]} \\🎮`)
        .setDescription(`${['Ждём', 'Wait'][Server.language]} ${rUser.user} ${emoji1[Math.floor(Math.random() * emoji1.length)]}`)
        .setFooter(`${['Ожидание длится 15 сек.', 'Waiting lasts 15 seconds.'][Server.language]}`)

    let TTTEmbed1 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(`${['Крестики-нолики', 'Tic-tac-toe'][Server.language]} \\🎮`)
        .setDescription(`${rUser.user} ${['струсил', 'refused'][Server.language]} ${emoji[Math.floor(Math.random() * emoji.length)]}`)

    let TTTEmbed12 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(`${['Крестики-нолики', 'Tic-tac-toe'][Server.language]} \\🎮`)
        .setDescription(`${Author} ${['отказался', 'refused'][Server.language]} ${emoji[Math.floor(Math.random() * emoji.length)]}`)

    let TTTEmbed3 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(`${['Крестики-нолики', 'Tic-tac-toe'][Server.language]} \\🎮`)
        .setDescription(`\\❌ ${Player1} **VS** ${Player2} \\⭕\n\n**${['Победил', 'Winner'][Server.language]}:** ${Player1} ${emoji1[Math.floor(Math.random() * emoji1.length)]}`)

    let TTTEmbed4 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(`${['Крестики-нолики', 'Tic-tac-toe'][Server.language]} \\🎮`)
        .setDescription(`\\❌ ${Player1} **VS** ${Player2} \\⭕\n\n**${['Победил', 'Winner'][Server.language]}:** ${Player2} ${emoji1[Math.floor(Math.random() * emoji1.length)]}`)

    let TTTEmbed5 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(`${['Крестики-нолики', 'Tic-tac-toe'][Server.language]} \\🎮`)
        .setDescription(`\\❌ ${Player1} **VS** ${Player2} \\⭕\n\n${emoji[Math.floor(Math.random() * emoji.length)]} **${['НИЧЬЯ', 'DRAW'][Server.language]}** ${emoji[Math.floor(Math.random() * emoji.length)]}`)

    let TTTEmbed6 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(`${['Крестики-нолики', 'Tic-tac-toe'][Server.language]} \\🎮`)
        .setDescription(`\\❌ ${Player1} **VS** ${Player2} \\⭕\n\n**${['Сейчас ходит', 'Now he walks'][Server.language]}:** ${Player1} \\❌`)
        .setFooter(`${['Игра идёт 180 сек.', 'The game goes 180 seconds.'][Server.language]}`)

    let TTTEmbed7 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(`${['Крестики-нолики', 'Tic-tac-toe'][Server.language]} \\🎮`)
        .setDescription(`\\❌ ${Player1} **VS** ${Player2} \\⭕\n\n**${['Сейчас ходит', 'Now he walks'][Server.language]}:** ${Player2} \\⭕`)
        .setFooter(`${['Игра идёт 180 сек.', 'The game goes 180 seconds.'][Server.language]}`)

    let PlayOrNo = false;
    let PlayOrNo1 = false;
    let CurretEmbed = TTTEmbed6;

    message.channel.send({ embeds: [TTTEmbed0], components: [AcceptMenu] }).then(async (message) => {

        const collector = await message.createMessageComponentCollector();

        collector.on(`collect`, async (interaction) => {

            if (interaction.user.bot) return;
            let uid = interaction.user.id;
            if (uid != Player1.id) { if (uid != Player2.id) return; }
            interaction.deferUpdate();

            if (interaction.isButton()) {

                if (interaction.customId == 'cancel') {
                    if (uid == rUser.user.id) {
                        isPlaying.delete(Author.id)
                        isPlaying.delete(rUser.user.id)
                        PlayOrNo = true;
                        message.edit({ embeds: [TTTEmbed1], components: [] });
                        return;
                    } else if (uid == Author.id) {
                        isPlaying.delete(Author.id)
                        isPlaying.delete(rUser.user.id)
                        PlayOrNo = true;
                        message.edit({ embeds: [TTTEmbed12], components: [] });
                        return;
                    } else { return }
                }

                if (interaction.customId == 'accept') {
                    if (uid == rUser.user.id) {
                        setTimeout(losttimeround, 180000);
                        PlayOrNo = true;
                        message.edit({ embeds: [CurretEmbed], components: [TTTGame1, TTTGame2, TTTGame3] });
                        return;
                    } else { return }
                }

                if (PlayerLength) {
                    if (uid == Player1.id) {
                        CurretEmbed = TTTEmbed7;
                        if (interaction.customId == 'empty1') { TTTGame1.components[0].setLabel("❌"); TTTGame1.components[0].setStyle("DANGER"); TTTGame1.components[0].setCustomId('x1'); }
                        if (interaction.customId == 'empty2') { TTTGame1.components[1].setLabel("❌"); TTTGame1.components[1].setStyle("DANGER"); TTTGame1.components[1].setCustomId('x2'); }
                        if (interaction.customId == 'empty3') { TTTGame1.components[2].setLabel("❌"); TTTGame1.components[2].setStyle("DANGER"); TTTGame1.components[2].setCustomId('x3'); }
                        if (interaction.customId == 'empty4') { TTTGame2.components[0].setLabel("❌"); TTTGame2.components[0].setStyle("DANGER"); TTTGame2.components[0].setCustomId('x4'); }
                        if (interaction.customId == 'empty5') { TTTGame2.components[1].setLabel("❌"); TTTGame2.components[1].setStyle("DANGER"); TTTGame2.components[1].setCustomId('x5'); }
                        if (interaction.customId == 'empty6') { TTTGame2.components[2].setLabel("❌"); TTTGame2.components[2].setStyle("DANGER"); TTTGame2.components[2].setCustomId('x6'); }
                        if (interaction.customId == 'empty7') { TTTGame3.components[0].setLabel("❌"); TTTGame3.components[0].setStyle("DANGER"); TTTGame3.components[0].setCustomId('x7'); }
                        if (interaction.customId == 'empty8') { TTTGame3.components[1].setLabel("❌"); TTTGame3.components[1].setStyle("DANGER"); TTTGame3.components[1].setCustomId('x8'); }
                        if (interaction.customId == 'empty9') { TTTGame3.components[2].setLabel("❌"); TTTGame3.components[2].setStyle("DANGER"); TTTGame3.components[2].setCustomId('x9'); }
                        PlayerLength = false;
                    }
                } else {
                    if (uid == Player2.id) {
                        CurretEmbed = TTTEmbed6;
                        if (interaction.customId == 'empty1') { TTTGame1.components[0].setLabel("⭕"); TTTGame1.components[0].setStyle("PRIMARY"); TTTGame1.components[0].setCustomId('o1'); }
                        if (interaction.customId == 'empty2') { TTTGame1.components[1].setLabel("⭕"); TTTGame1.components[1].setStyle("PRIMARY"); TTTGame1.components[1].setCustomId('o2'); }
                        if (interaction.customId == 'empty3') { TTTGame1.components[2].setLabel("⭕"); TTTGame1.components[2].setStyle("PRIMARY"); TTTGame1.components[2].setCustomId('o3'); }
                        if (interaction.customId == 'empty4') { TTTGame2.components[0].setLabel("⭕"); TTTGame2.components[0].setStyle("PRIMARY"); TTTGame2.components[0].setCustomId('o4'); }
                        if (interaction.customId == 'empty5') { TTTGame2.components[1].setLabel("⭕"); TTTGame2.components[1].setStyle("PRIMARY"); TTTGame2.components[1].setCustomId('o5'); }
                        if (interaction.customId == 'empty6') { TTTGame2.components[2].setLabel("⭕"); TTTGame2.components[2].setStyle("PRIMARY"); TTTGame2.components[2].setCustomId('o6'); }
                        if (interaction.customId == 'empty7') { TTTGame3.components[0].setLabel("⭕"); TTTGame3.components[0].setStyle("PRIMARY"); TTTGame3.components[0].setCustomId('o7'); }
                        if (interaction.customId == 'empty8') { TTTGame3.components[1].setLabel("⭕"); TTTGame3.components[1].setStyle("PRIMARY"); TTTGame3.components[1].setCustomId('o8'); }
                        if (interaction.customId == 'empty9') { TTTGame3.components[2].setLabel("⭕"); TTTGame3.components[2].setStyle("PRIMARY"); TTTGame3.components[2].setCustomId('o9'); }
                        PlayerLength = true;
                    }
                }

                if (TTTGame1.components[0].label != '⠀') {
                    if (TTTGame1.components[1].label != '⠀') {
                        if (TTTGame1.components[2].label != '⠀') {
                            if (TTTGame2.components[0].label != '⠀') {
                                if (TTTGame2.components[1].label != '⠀') {
                                    if (TTTGame2.components[2].label != '⠀') {
                                        if (TTTGame3.components[0].label != '⠀') {
                                            if (TTTGame3.components[1].label != '⠀') {
                                                if (TTTGame3.components[2].label != '⠀') {
                                                    CurretEmbed = TTTEmbed5; GGWP();
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if (TTTGame1.components[0].label == "❌") { if (TTTGame1.components[1].label == "❌") { if (TTTGame1.components[2].label == "❌") { CurretEmbed = TTTEmbed3; GGWP(); } } }
                if (TTTGame2.components[0].label == "❌") { if (TTTGame2.components[1].label == "❌") { if (TTTGame2.components[2].label == "❌") { CurretEmbed = TTTEmbed3; GGWP(); } } }
                if (TTTGame3.components[0].label == "❌") { if (TTTGame3.components[1].label == "❌") { if (TTTGame3.components[2].label == "❌") { CurretEmbed = TTTEmbed3; GGWP(); } } }
                if (TTTGame1.components[0].label == "❌") { if (TTTGame2.components[0].label == "❌") { if (TTTGame3.components[0].label == "❌") { CurretEmbed = TTTEmbed3; GGWP(); } } }
                if (TTTGame1.components[1].label == "❌") { if (TTTGame2.components[1].label == "❌") { if (TTTGame3.components[1].label == "❌") { CurretEmbed = TTTEmbed3; GGWP(); } } }
                if (TTTGame1.components[2].label == "❌") { if (TTTGame2.components[2].label == "❌") { if (TTTGame3.components[2].label == "❌") { CurretEmbed = TTTEmbed3; GGWP(); } } }
                if (TTTGame1.components[0].label == "❌") { if (TTTGame2.components[1].label == "❌") { if (TTTGame3.components[2].label == "❌") { CurretEmbed = TTTEmbed3; GGWP(); } } }
                if (TTTGame1.components[2].label == "❌") { if (TTTGame2.components[1].label == "❌") { if (TTTGame3.components[0].label == "❌") { CurretEmbed = TTTEmbed3; GGWP(); } } }

                if (TTTGame1.components[0].label == "⭕") { if (TTTGame1.components[1].label == "⭕") { if (TTTGame1.components[2].label == "⭕") { CurretEmbed = TTTEmbed4; GGWP(); } } }
                if (TTTGame2.components[0].label == "⭕") { if (TTTGame2.components[1].label == "⭕") { if (TTTGame2.components[2].label == "⭕") { CurretEmbed = TTTEmbed4; GGWP(); } } }
                if (TTTGame3.components[0].label == "⭕") { if (TTTGame3.components[1].label == "⭕") { if (TTTGame3.components[2].label == "⭕") { CurretEmbed = TTTEmbed4; GGWP(); } } }
                if (TTTGame1.components[0].label == "⭕") { if (TTTGame2.components[0].label == "⭕") { if (TTTGame3.components[0].label == "⭕") { CurretEmbed = TTTEmbed4; GGWP(); } } }
                if (TTTGame1.components[1].label == "⭕") { if (TTTGame2.components[1].label == "⭕") { if (TTTGame3.components[1].label == "⭕") { CurretEmbed = TTTEmbed4; GGWP(); } } }
                if (TTTGame1.components[2].label == "⭕") { if (TTTGame2.components[2].label == "⭕") { if (TTTGame3.components[2].label == "⭕") { CurretEmbed = TTTEmbed4; GGWP(); } } }
                if (TTTGame1.components[0].label == "⭕") { if (TTTGame2.components[1].label == "⭕") { if (TTTGame3.components[2].label == "⭕") { CurretEmbed = TTTEmbed4; GGWP(); } } }
                if (TTTGame1.components[2].label == "⭕") { if (TTTGame2.components[1].label == "⭕") { if (TTTGame3.components[0].label == "⭕") { CurretEmbed = TTTEmbed4; GGWP(); } } }

                await message.edit({ embeds: [CurretEmbed], components: [TTTGame1, TTTGame2, TTTGame3] });

            }

            function losttimeround() {
                if (!PlayOrNo1) {
                    CurretEmbed = TTTEmbed5; GGWP();
                    message.edit({ embeds: [CurretEmbed], components: [TTTGame1, TTTGame2, TTTGame3] });
                }
            }

            function GGWP() {
                PlayOrNo1 = true;
                isPlaying.delete(Player1.id);
                isPlaying.delete(Player2.id);
                TTTGame1.components[0].setDisabled(true);
                TTTGame1.components[1].setDisabled(true);
                TTTGame1.components[2].setDisabled(true);
                TTTGame2.components[0].setDisabled(true);
                TTTGame2.components[1].setDisabled(true);
                TTTGame2.components[2].setDisabled(true);
                TTTGame3.components[0].setDisabled(true);
                TTTGame3.components[1].setDisabled(true);
                TTTGame3.components[2].setDisabled(true);
            }

        })

        function losttime() { if (!PlayOrNo) { isPlaying.delete(Author.id); isPlaying.delete(rUser.user.id); message.edit({ embeds: [errembed2], components: [] }) } } setTimeout(losttime, 15000);

    })

};
module.exports.help = {
    name: "ttt"
};