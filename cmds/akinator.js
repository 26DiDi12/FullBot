const Discord = require("discord.js");
const fs = require("fs");
const { Aki } = require('aki-api');
const isPlaying = new Set();
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    const BaitList = new Discord.MessageSelectMenu()
        .setPlaceholder(['Ваш ответ', 'Your response'][Server.language])
        .setDisabled(false)
        .setOptions([
            {
                label: ['Скорее всего да', 'Probably yes'][Server.language],
                description: '',
                value: 'mbyes'
            },
            {
                label: ['Да', 'Yes'][Server.language],
                description: '',
                value: 'yes'
            },
            {
                label: ['Не знаю', 'IDK'][Server.language],
                description: '',
                value: 'mb'
            },
            {
                label: ['Нет', 'No'][Server.language],
                description: '',
                value: 'no'
            },
            {
                label: ['Скорее всего нет', 'Probably no'][Server.language],
                description: '',
                value: 'mbno'
            },
        ])
        .setMaxValues(1)
        .setCustomId('baitlist')

    const Stop = new Discord.MessageButton()
        .setLabel(['Стоп', 'Stop'][Server.language])
        .setStyle("DANGER")
        .setCustomId("stop")

    const Back = new Discord.MessageButton()
        .setLabel(['Назад', 'Back'][Server.language])
        .setStyle("PRIMARY")
        .setCustomId("back")
        .setDisabled(true)

    const MyHERO = new Discord.MessageButton()
        .setLabel(['Да', 'Yes'][Server.language])
        .setStyle("SUCCESS")
        .setCustomId("myhero")

    const NoMyHERO = new Discord.MessageButton()
        .setLabel(['Нет', 'No'][Server.language])
        .setStyle("DANGER")
        .setCustomId("nomyhero")

    const AkiMenu1 = new Discord.MessageActionRow()
        .addComponents(Back)
        .addComponents(Stop)

    const BaitListMenu = new Discord.MessageActionRow()
        .addComponents(BaitList)

    const AkiMenu2 = new Discord.MessageActionRow()
        .addComponents(MyHERO)
        .addComponents(NoMyHERO)

    if (isPlaying.has(message.author.id)) {
        let isPlayingEmbed = new Discord.MessageEmbed()
            .setTitle(['Акинатор', 'Akinator'][Server.language] + ` \\🔮`)
            .setDescription(`**${['Вы уже начали сессию, закончите её.', 'You have already started the session, finish it.'][Server.language]}** \\⚠️`)
            .setThumbnail('https://www.upswell.jp/img/icon_akinator.png')
            .setColor("BLACK")
        return message.channel.send({ embeds: [isPlayingEmbed] })
    }

    isPlaying.add(message.author.id)

    let Author = message.author;
    let emoji = [`\\😁`, `\\😌`, `\\😏`, `\\🤩`, `\\😎`, `\\😛`]
    let emoji1 = [`\\😖`, `\\😨`, `\\😓`, `\\😪`, `\\😬`, `\\😢`, `\\🤕`, `\\🤒`, `\\🤧`]
    let loadnigemoji = bot.emojis.cache.get('968525327359950888')

    let startEmbed = new Discord.MessageEmbed()
        .setTitle(['Акинатор', 'Akinator'][Server.language] + ` \\🔮`)
        .setDescription(`**${['Скоро начнём, ждите...', 'Lets start soon, wait...'][Server.language]}**`)
        .setThumbnail('https://www.upswell.jp/img/icon_akinator.png')
        .setColor("BLACK")

    let stopEmbed = new Discord.MessageEmbed()
        .setTitle(['Акинатор', 'Akinator'][Server.language] + ` \\🔮`)
        .setDescription(`**${['...', 'Stopped...'][Server.language]}**`)
        .setThumbnail('https://www.upswell.jp/img/icon_akinator.png')
        .setColor("BLACK")

    await message.channel.send({ embeds: [startEmbed] }).then(async (msg) => {

        let region = ['ru', 'en'][Server.language];
        let aki = new Aki({ region });
        await aki.start();

        let akiEmbed = new Discord.MessageEmbed()
            .setTitle(['Акинатор', 'Akinator'][Server.language] + ` \\🔮`)
            .setDescription(`**${['Прогресс', 'Progress'][Server.language]}: 0%**`)
            .addField(`${['Вопрос', 'Question'][Server.language]} ${aki.currentStep + 1}:`, `${aki.question}`, false)
            .setThumbnail('https://www.upswell.jp/img/icon_akinator.png')
            .setColor("BLACK")

        await msg.edit({ embeds: [akiEmbed], components: [BaitListMenu, AkiMenu1] }).then(async (message) => {

            const collector = await message.createMessageComponentCollector();

            collector.on(`collect`, async (interaction) => {

                if (interaction.user.bot) return;
                let uid = interaction.user.id;
                if (uid != Author.id) return;
                interaction.deferUpdate();

                let thinkingEmbed = new Discord.MessageEmbed()
                    .setTitle(['Акинатор', 'Akinator'][Server.language] + ` \\🔮`)
                    .setDescription(`**${['Прогресс', 'Progress'][Server.language]}: ???%**`)
                    .addField(`${['Анализирую ответ', 'I analyze the answer'][Server.language]}`, `${loadnigemoji}`, false)
                    .setThumbnail('https://www.upswell.jp/img/icon_akinator.png')
                    .setColor("BLACK")

                BaitListMenu.components[0].setDisabled(true);
                AkiMenu1.components[0].setDisabled(true);
                AkiMenu1.components[1].setDisabled(true);

                if (interaction.isButton()) {
                    if (interaction.customId == 'stop') { await message.edit({ embeds: [stopEmbed], components: [] }); isPlaying.delete(uid); return; }
                    if (interaction.customId == 'back') { await message.edit({ embeds: [thinkingEmbed], components: [BaitListMenu, AkiMenu1] }); await aki.back(); }
                }

                if (interaction.isSelectMenu()) {
                    if (interaction.customId == 'baitlist') {
                        if (interaction.values[0] == 'yes') { await message.edit({ embeds: [thinkingEmbed], components: [BaitListMenu, AkiMenu1] }); await aki.step(0); }
                        if (interaction.values[0] == 'mbyes') { await message.edit({ embeds: [thinkingEmbed], components: [BaitListMenu, AkiMenu1] }); await aki.step(3); }
                        if (interaction.values[0] == 'mb') { await message.edit({ embeds: [thinkingEmbed], components: [BaitListMenu, AkiMenu1] }); await aki.step(2); }
                        if (interaction.values[0] == 'no') { await message.edit({ embeds: [thinkingEmbed], components: [BaitListMenu, AkiMenu1] }); await aki.step(1); }
                        if (interaction.values[0] == 'mbno') { await message.edit({ embeds: [thinkingEmbed], components: [BaitListMenu, AkiMenu1] }); await aki.step(4); }
                    }
                }

                if ((aki.progress >= 95 || aki.currentStep >= 78)) {
                    await aki.win();
                    let akiRanking = aki.answers[0].ranking;
                    let guessEmbed = new Discord.MessageEmbed()
                        .setTitle(['Акинатор', 'Akinator'][Server.language] + ` \\🔮`)
                        .setDescription(`**${[`Я на ${Math.round(aki.progress)}% уверен, что вы загадывали это`, `I am ${Math.round(aki.progress)}% sure that you made this`][Server.language]}:**\n
                            **• ${['Имя', 'Name'][Server.language]}:** ${aki.answers[0].name}\n
                            **• ${['Описание', 'Description'][Server.language]}:** ${aki.answers[0].description}\n
                            **• ${['Рейтинг', 'Rating'][Server.language]}:** ${akiRanking}`)
                        .setImage(aki.answers[0].absolute_picture_path)
                        .setThumbnail('https://www.upswell.jp/img/icon_akinator.png')
                        .setColor("BLACK")
                    await message.edit({ embeds: [guessEmbed], components: [AkiMenu2] });
                    if (interaction.isButton()) {
                        if (interaction.customId == 'myhero') {
                            guessEmbed.setDescription(`**${['Ну это было легко', 'Well it was easy'][Server.language]} ${emoji[Math.floor(Math.random() * emoji.length)]}**\n
                            **• ${['Имя', 'Name'][Server.language]}:** ${aki.answers[0].name}\n
                            **• ${['Описание', 'Description'][Server.language]}:** ${aki.answers[0].description}\n
                            **• ${['Рейтинг', 'Rating'][Server.language]}:** ${akiRanking}`)
                            await message.edit({ embeds: [guessEmbed], components: [] });
                            isPlaying.delete(uid);
                            return;
                        }
                        if (interaction.customId == 'nomyhero') {
                            guessEmbed.setDescription(`**${['Ну я пытался', 'Well, I tried'][Server.language]} ${emoji1[Math.floor(Math.random() * emoji1.length)]}**\n
                            **• ${['Имя', 'Name'][Server.language]}:** ${aki.answers[0].name}\n
                            **• ${['Описание', 'Description'][Server.language]}:** ${aki.answers[0].description}\n
                            **• ${['Рейтинг', 'Rating'][Server.language]}:** ${akiRanking}`)
                            await message.edit({ embeds: [guessEmbed], components: [] })
                            isPlaying.delete(uid);
                            return;
                        }
                    }
                } else {
                    BaitListMenu.components[0].setDisabled(false);
                    AkiMenu1.components[1].setDisabled(false);
                    if (aki.currentStep <= 0) { AkiMenu1.components[0].setDisabled(true) } else { AkiMenu1.components[0].setDisabled(false) }
                    let updatedAkiEmbed = new Discord.MessageEmbed()
                        .setTitle(['Акинатор', 'Akinator'][Server.language] + ` \\🔮`)
                        .setDescription(`**${['Прогресс', 'Progress'][Server.language]}: ${Math.round(aki.progress)}%**`)
                        .addField(`${['Вопрос', 'Question'][Server.language]} ${aki.currentStep + 1}:`, `${aki.question}`, false)
                        .setThumbnail('https://www.upswell.jp/img/icon_akinator.png')
                        .setColor("BLACK")
                    await message.edit({ embeds: [updatedAkiEmbed], components: [BaitListMenu, AkiMenu1] })
                }

            })

        })

    })

};
module.exports.help = {
    name: "aki",
    alias: "akinator"
};