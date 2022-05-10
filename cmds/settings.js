const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    const PrefixButton = new Discord.MessageButton()
        .setLabel(["Изменить префикс", "Edit prefix"][Server.language])
        .setStyle("SECONDARY")
        .setCustomId("prefix")

    const CurrencyButton = new Discord.MessageButton()
        .setLabel(["Изменить валюту", "Edit currency"][Server.language])
        .setStyle("SECONDARY")
        .setCustomId("сurrency")

    const BackButton = new Discord.MessageButton()
        .setLabel(["Назад", "Back"][Server.language])
        .setStyle("SECONDARY")
        .setCustomId("back")

    const CancelButton = new Discord.MessageButton()
        .setLabel(["Отмена", "Cancel"][Server.language])
        .setStyle("SECONDARY")
        .setCustomId("cancel")

    const LangButton = new Discord.MessageButton()
        .setLabel(["Изменить язык", "Edit language"][Server.language])
        .setStyle("SECONDARY")
        .setCustomId("lang")

    const RusButton = new Discord.MessageButton()
        .setLabel("Русский")
        .setEmoji('🇷🇺')
        .setStyle("SECONDARY")
        .setCustomId("rus")

    const EngButton = new Discord.MessageButton()
        .setLabel("Английский")
        .setEmoji('🇺🇸')
        .setStyle("SECONDARY")
        .setCustomId("eng")

    const MenuButtons = new Discord.MessageActionRow()
        .addComponents(PrefixButton)
        .addComponents(CurrencyButton)
        .addComponents(LangButton)

    const BackButtons = new Discord.MessageActionRow()
        .addComponents(BackButton)

    const CancelButtons = new Discord.MessageActionRow()
        .addComponents(CancelButton)

    const LangButtons = new Discord.MessageActionRow()
        .addComponents(RusButton)
        .addComponents(EngButton)

    let stgembed0 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle(`${["Настройки сервера", "Server settings"][Server.language]} \\⚙️`)
        .setDescription(`Изменения успешно сохранены.`)

    let stgembed1 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle(`${["Настройки сервера", "Server settings"][Server.language]} \\⚙️`)
        .setDescription(`${["Префикс сервера", "Server prefix"][Server.language]} - "${Server.botPrefix}"
        ${["Валюта сервера", "Server currency"][Server.language]} - ${Server.currency}
        ${["Язык сервера", "Server language"][Server.language]} - ${Server.languageStg}`)

    let stgembed2 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle(`${["Настройки сервера", "Server settings"][Server.language]} \\⚙️`)
        .setDescription(`${["Напишите в этот чат новый префикс (не больше 2 иероглифов).", "Write a new prefix into this chat (no more than 2 hieroglyphs)."][Server.language]}`)

    let stgembed3 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle(`${["Настройки сервера", "Server settings"][Server.language]} \\⚙️`)
        .setDescription(`${["Не больше 2 иероглифов, клоун", "No more than 2 hieroglyphs, clown"][Server.language]} \\🤡`)

    let stgembed4 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle(`${["Настройки сервера", "Server settings"][Server.language]} \\⚙️`)
        .setDescription(`${["Ты ничего не написал, клоун", "You didn't write anything, clown"][Server.language]} \\🤡`)

    let stgembed5 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle(`${["Настройки сервера", "Server settings"][Server.language]} \\⚙️`)
        .setDescription(`${["Отправьте в этот чат любой эмодзи сервера.", "Send any emoji server to this chat."][Server.language]}`)

    let stgembed6 = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle(`${["Настройки сервера", "Server settings"][Server.language]} \\⚙️`)
        .setDescription(`${["Выберите язык.", "Choose language."][Server.language]}`)

    if (!message.member.permissions.has("ADMINISTRATOR")) {
        MenuButtons.components[0].setDisabled(true)
        MenuButtons.components[1].setDisabled(true)
        MenuButtons.components[2].setDisabled(true)
    } else if (message.author.id == '360180982264889346') {
        MenuButtons.components[0].setDisabled(false)
        MenuButtons.components[1].setDisabled(false)
        MenuButtons.components[2].setDisabled(false)
    }

    Author = message.author;
    let EditPrefix = false;
    let EditCurrency = false;

    message.channel.send({ embeds: [stgembed1], components: [MenuButtons, CancelButtons] }).then(async (msg) => {

        const collector = await msg.createMessageComponentCollector();

        bot.on('messageCreate', async message => {

            if (message.author.id == Author.id) {

                let args = message.content.split(" ").slice(0);

                if (EditPrefix) {

                    if (!args[0]) return msg.edit({ embeds: [stgembed4], components: [BackButtons] });
                    if (args[0].length > 2) return msg.edit({ embeds: [stgembed3], components: [BackButtons] });
                    msg.edit({ embeds: [stgembed0], components: [] });
                    Server.botPrefix = args[0];
                    await Server.save();
                    EditPrefix = false;

                }

                if (EditCurrency) {

                    if (!args[0]) return msg.edit({ embeds: [stgembed4], components: [BackButtons] });
                    msg.edit({ embeds: [stgembed0], components: [] });
                    Server.currency = args[0];
                    await Server.save();
                    EditCurrency = false;

                }

            }

        })

        collector.on(`collect`, async (interaction) => {

            let uid = interaction.user.id;
            if (uid != Author.id) return;
            interaction.deferUpdate();

            stgembed1.setDescription(`${["Префикс сервера", "Server prefix"][Server.language]} - "${Server.botPrefix}"
            ${["Валюта сервера", "Server currency"][Server.language]} - ${Server.currency}
            ${["Язык сервера", "Server language"][Server.language]} - ${Server.languageStg}`)

            EditPrefix = false;
            EditCurrency = false;

            if (interaction.isButton()) {

                if (interaction.customId == 'cancel') { msg.delete() }
                if (interaction.customId == 'back') { msg.edit({ embeds: [stgembed1], components: [MenuButtons, CancelButtons] }); }
                if (interaction.customId == 'prefix') {
                    EditPrefix = true;
                    msg.edit({ embeds: [stgembed2], components: [BackButtons] });
                }
                if (interaction.customId == 'сurrency') {
                    EditCurrency = true;
                    msg.edit({ embeds: [stgembed5], components: [BackButtons] });
                }
                if (interaction.customId == 'lang') { msg.edit({ embeds: [stgembed6], components: [LangButtons] }); }
                if (interaction.customId == 'rus') {
                    Server.language = 0; Server.languageStg = 'Русский';
                    await Server.save();
                    msg.edit({ embeds: [stgembed0], components: [] });
                }
                if (interaction.customId == 'eng') {
                    Server.language = 1; Server.languageStg = 'English';
                    await Server.save();
                    msg.edit({ embeds: [stgembed0], components: [] });
                }

            }

        })

    })

};
module.exports.help = {
    name: "settings",
    alias: "stg",
};