const Discord = require("discord.js");
const fs = require("fs");
const isPlaying = new Set();
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    const RockButton = new Discord.MessageButton()
        .setLabel(['Камень', 'Rock'][Server.language] + "\🌑")
        .setStyle("SECONDARY")
        .setCustomId("rock")

    const PaperButton = new Discord.MessageButton()
        .setLabel(['Бумага', 'Paper'][Server.language] + "\📄")
        .setStyle("SECONDARY")
        .setCustomId("paper")

    const ScissorsButton = new Discord.MessageButton()
        .setLabel(['Ножницы', 'Scissors'][Server.language] + "\✂️")
        .setStyle("SECONDARY")
        .setCustomId("scissors")

    const RPSGame = new Discord.MessageActionRow()
        .addComponents(RockButton)
        .addComponents(PaperButton)
        .addComponents(ScissorsButton)

    let errembed1 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(['Камень-ножницы-бумага', 'Rock-paper-scissors'][Server.language] + `\\🎮`)
        .setDescription(`**${['Укажите пользователя.', 'Indicate the user.'][Server.language]}** \\⚠️`)
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rock-paper-scissors-ru.svg/1200px-Rock-paper-scissors-ru.svg.png')

    if (!rUser) return message.channel.send({ embeds: [errembed1] })

    if (isPlaying.has(message.author.id)) {
        let isPlayingEmbed = new Discord.MessageEmbed()
            .setTitle(['Камень-ножницы-бумага', 'Rock-paper-scissors'][Server.language] + ` \\🎮`)
            .setDescription(`**${['Вы уже начали сессию, закончите её.', 'You have already started the session, finish it.'][Server.language]}** \\⚠️`)
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rock-paper-scissors-ru.svg/1200px-Rock-paper-scissors-ru.svg.png')
            .setColor("BLACK")
        return message.channel.send({ embeds: [isPlayingEmbed] })
    }

    if (isPlaying.has(rUser.user.id)) {
        let isPlayingEmbed = new Discord.MessageEmbed()
            .setTitle(['Камень-ножницы-бумага', 'Rock-paper-scissors'][Server.language] + ` \\🎮`)
            .setDescription(`**${['Ваш оппонент уже начал сессию.', 'Your opponent has already begun a session.'][Server.language]}** \\⚠️`)
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rock-paper-scissors-ru.svg/1200px-Rock-paper-scissors-ru.svg.png')
            .setColor("BLACK")
        return message.channel.send({ embeds: [isPlayingEmbed] })
    }

    isPlaying.add(message.author.id)
    isPlaying.add(rUser.user.id)

    let Random = Math.floor(Math.random() * (1 - 0 + 1)) + 0;
    let Player1; let Player2; let Player1Pick; let Player2Pick;
    let emoji = [`\\😖`, `\\😨`, `\\😓`, `\\😪`, `\\😬`, `\\😢`, `\\🤕`, `\\🤒`, `\\🤧`]
    let emoji1 = [`\\😨`, `\\😮`, `\\😝`, `\\😁`, `\\🥳`, `\\🤯`, `\\🤩`, `\\🤧`]

    if (Random == 0) { Player1 = message.author; Player2 = rUser.user }
    if (Random == 1) { Player2 = message.author; Player1 = rUser.user }

    let RPSEmbed1 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(['Камень-ножницы-бумага', 'Rock-paper-scissors'][Server.language] + ` \\🎮`)
        .setDescription(`${Player1} **VS** ${Player2}\n\n**${['Время истекло...', 'Time is up...'][Server.language]}**`)
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rock-paper-scissors-ru.svg/1200px-Rock-paper-scissors-ru.svg.png')

    let RPSEmbed6 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(['Камень-ножницы-бумага', 'Rock-paper-scissors'][Server.language] + ` \\🎮`)
        .setDescription(`${Player1} **VS** ${Player2}`)
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rock-paper-scissors-ru.svg/1200px-Rock-paper-scissors-ru.svg.png')
        .setFooter(['Игра идёт 30 сек.', 'The game goes 30 seconds.'][Server.language])

    let RPSEmbed7 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(['Камень-ножницы-бумага', 'Rock-paper-scissors'][Server.language] + ` \\🎮`)
        .setDescription(`${Player1} \\✅ **VS** ${Player2}`)
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rock-paper-scissors-ru.svg/1200px-Rock-paper-scissors-ru.svg.png')
        .setFooter(['Игра идёт 30 сек.', 'The game goes 30 seconds.'][Server.language])

    let RPSEmbed8 = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(['Камень-ножницы-бумага', 'Rock-paper-scissors'][Server.language] + ` \\🎮`)
        .setDescription(`${Player1} **VS** \\✅ ${Player2}`)
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rock-paper-scissors-ru.svg/1200px-Rock-paper-scissors-ru.svg.png')
        .setFooter(['Игра идёт 30 сек.', 'The game goes 30 seconds.'][Server.language])

    let CurretEmbed = RPSEmbed6;
    let PlayOrNo = false;

    message.channel.send({ embeds: [CurretEmbed], components: [RPSGame] }).then(async (message) => {

        const collector = await message.createMessageComponentCollector();
        setTimeout(losttimeround, 30000);

        collector.on(`collect`, async (interaction) => {

            if (interaction.user.bot) return;
            let uid = interaction.user.id;
            if (uid != Player1.id) { if (uid != Player2.id) return; }
            interaction.deferUpdate();

            if (interaction.isButton()) {

                if (uid == Player1.id) {
                    if (interaction.customId == 'rock') { Player1Pick = '\\🌑' }
                    if (interaction.customId == 'paper') { Player1Pick = '\\📄' }
                    if (interaction.customId == 'scissors') { Player1Pick = '\\✂️' }
                }

                if (uid == Player2.id) {
                    if (interaction.customId == 'rock') { Player2Pick = '\\🌑' }
                    if (interaction.customId == 'paper') { Player2Pick = '\\📄' }
                    if (interaction.customId == 'scissors') { Player2Pick = '\\✂️' }
                }

                if (Player1Pick == null) {
                    CurretEmbed = RPSEmbed8;
                } else if (Player2Pick == null) {
                    CurretEmbed = RPSEmbed7;
                } else {

                    let RPSEmbed3 = new Discord.MessageEmbed()
                        .setColor("BLACK")
                        .setTitle(['Камень-ножницы-бумага', 'Rock-paper-scissors'][Server.language] + ` \\🎮`)
                        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rock-paper-scissors-ru.svg/1200px-Rock-paper-scissors-ru.svg.png')
                        .setDescription(`${Player1} ${Player1Pick} **>** ${Player2Pick} ${Player2}\n\n**${['Победил', 'Winner'][Server.language]}:** ${Player1} ${emoji1[Math.floor(Math.random() * emoji1.length)]}`)

                    let RPSEmbed4 = new Discord.MessageEmbed()
                        .setColor("BLACK")
                        .setTitle(['Камень-ножницы-бумага', 'Rock-paper-scissors'][Server.language] + ` \\🎮`)
                        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rock-paper-scissors-ru.svg/1200px-Rock-paper-scissors-ru.svg.png')
                        .setDescription(`${Player1} ${Player1Pick} **<** ${Player2Pick} ${Player2}\n\n**${['Победил', 'Winner'][Server.language]}:** ${Player2} ${emoji1[Math.floor(Math.random() * emoji1.length)]}`)

                    let RPSEmbed5 = new Discord.MessageEmbed()
                        .setColor("BLACK")
                        .setTitle(['Камень-ножницы-бумага', 'Rock-paper-scissors'][Server.language] + ` \\🎮`)
                        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Rock-paper-scissors-ru.svg/1200px-Rock-paper-scissors-ru.svg.png')
                        .setDescription(`${Player1} ${Player1Pick} **=** ${Player2Pick} ${Player2}\n\n${emoji[Math.floor(Math.random() * emoji.length)]} **${['НИЧЬЯ', 'DRAW'][Server.language]}** ${emoji[Math.floor(Math.random() * emoji.length)]}`)

                    if (Player1Pick == '\\🌑' && Player2Pick == '\\✂️') {
                        CurretEmbed = RPSEmbed3;
                    } else if (Player1Pick == '\\📄' && Player2Pick == '\\🌑') {
                        CurretEmbed = RPSEmbed3;
                    } else if (Player1Pick == '\\✂️' && Player2Pick == '\\📄') {
                        CurretEmbed = RPSEmbed3;
                    }

                    if (Player1Pick == '\\🌑' && Player2Pick == '\\📄') {
                        CurretEmbed = RPSEmbed4;
                    } else if (Player1Pick == '\\📄' && Player2Pick == '\\✂️') {
                        CurretEmbed = RPSEmbed4;
                    } else if (Player1Pick == '\\✂️' && Player2Pick == '\\🌑') {
                        CurretEmbed = RPSEmbed4;
                    }

                    if (Player1Pick == Player2Pick) { CurretEmbed = RPSEmbed5; };

                    GGWP();

                }

                await message.edit({ embeds: [CurretEmbed], components: [RPSGame] });

            }

        })

        function GGWP() {
            PlayOrNo = true;
            isPlaying.delete(Player1.id);
            isPlaying.delete(Player2.id);
            RPSGame.components[0].setDisabled(true);
            RPSGame.components[1].setDisabled(true);
            RPSGame.components[2].setDisabled(true);
        }

        function losttimeround() {
            if (!PlayOrNo) {
                GGWP();
                CurretEmbed = RPSEmbed1;
                message.edit({ embeds: [CurretEmbed], components: [RPSGame] });
            }
        }

    })

};
module.exports.help = {
    name: "rps"
};