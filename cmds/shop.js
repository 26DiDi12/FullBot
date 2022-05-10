const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    const LeftButton = new Discord.MessageButton()
        .setEmoji('⬅️')
        .setStyle("SECONDARY")
        .setCustomId("left")

    const RightButton = new Discord.MessageButton()
        .setEmoji('➡️')
        .setStyle("SECONDARY")
        .setCustomId("right")

    const StopButton = new Discord.MessageButton()
        .setEmoji('⏹️')
        .setStyle("SECONDARY")
        .setCustomId("stop")

    const RolesList = new Discord.MessageSelectMenu()
        .setPlaceholder(["Роли", "Roles"][Server.language])
        .setMaxValues(1)
        .setCustomId('roleslist')

    const RolesListMenu = new Discord.MessageActionRow()
        .addComponents(RolesList)

    const ButtonsMenu = new Discord.MessageActionRow()
        .addComponents(LeftButton)
        .addComponents(StopButton)
        .addComponents(RightButton)

    let errorembed1 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setTitle(["Магазин ролей", "Roles Store"][Server.language] + ` \\⚜️`)
        .setDescription(`**${["Ролей на продажу нет.", "There are no roles for sale."][Server.language]}** \\⚠️`)

    let Role = await bot.Roles.find({ guildId: message.guild.id }); let LengthRoles = ``; let NumberPages = 0;
    if (Role.length == 0) return message.channel.send({ embeds: [errorembed1] })
    for (let i = 0; i < Role.length; ++i) {
        if (Role[i] != null) {
            if (message.guild.roles.cache.get(Role[i].roleId) != undefined) {
                NumberPages++;
                if (i < 5) {
                    RolesListMenu.components[0].addOptions([
                        {
                            label: `${message.guild.roles.cache.get(Role[i].roleId).name}`,
                            description: '',
                            value: `${i + 1}`
                        },
                    ])
                    LengthRoles += `**${i + 1}) ${message.guild.roles.cache.get(Role[i].roleId)}
        ${["Владелец роли", "Owner role"][Server.language]}: ${message.guild.members.cache.get(Role[i].roleOwnerId).user}
        ${["Стоимость", "Price"][Server.language]}: ${Role[i].roleCost} ${Server.currency}
        ${[`Куплена ${Role[i].roleBuysNumber} раз`, `Bought ${Role[i].roleBuysNumber} times`][Server.language]}**\n\n`
                }
            }
        }
    }

    let NowPage = 1; let AllPage = Math.ceil(NumberPages / 5); let Page = 0;
    if (NowPage == 1) { ButtonsMenu.components[0].setDisabled(true) } else { ButtonsMenu.components[0].setDisabled(false) }
    if (NowPage == AllPage) { ButtonsMenu.components[2].setDisabled(true) } else { ButtonsMenu.components[2].setDisabled(false) }

    let DevEmbed = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle(["Магазин ролей", "Roles Store"][Server.language] + ` \\⚜️`)
        .setDescription(`${LengthRoles}`)
        .setImage('https://cdn.discordapp.com/attachments/878193137305133076/924368074440867870/1.png')
        .setFooter(`${["Страница", "Page"][Server.language]} ` + NowPage)

    message.reply({ embeds: [DevEmbed], components: [RolesListMenu, ButtonsMenu] }).then(async (msg) => {

        const collector = await msg.createMessageComponentCollector();

        collector.on(`collect`, async (interaction) => {

            if (interaction.user.bot) return;
            let uid = interaction.user.id; interaction.deferUpdate();
            LengthRoles = ''; Page = 0; RolesListMenu.components[0].setOptions([]);

            if (interaction.isButton()) {

                if (interaction.customId == 'stop') { msg.delete(); return; }
                if (interaction.customId == 'left') { NowPage--; }
                if (interaction.customId == 'right') { NowPage++; }

                for (let i = 0; i < Role.length; ++i) {
                    Page = (NowPage - 1) * 5;
                    if (Role[i + Page] != null) {
                        if (interaction.guild.roles.cache.get(Role[i + Page].roleId) != undefined) {
                            if (i < 5) {
                                RolesListMenu.components[0].addOptions([
                                    {
                                        label: `${interaction.guild.roles.cache.get(Role[i + Page].roleId).name}`,
                                        description: '',
                                        value: `${i + 1}`
                                    },
                                ])
                                LengthRoles += `**${i + 1}) ${message.guild.roles.cache.get(Role[i].roleId)}
                                ${["Владелец роли", "Owner role"][Server.language]}: ${message.guild.members.cache.get(Role[i].roleOwnerId).user}
                                ${["Стоимость", "Price"][Server.language]}: ${Role[i].roleCost} ${Server.currency}
                                ${[`Куплена ${Role[i].roleBuysNumber} раз`, `Bought ${Role[i].roleBuysNumber} times`][Server.language]}**\n\n`
                            }
                        }
                    }
                }

                if (NowPage == 1) { ButtonsMenu.components[0].setDisabled(true) } else { ButtonsMenu.components[0].setDisabled(false) }
                if (NowPage == AllPage) { ButtonsMenu.components[2].setDisabled(true) } else { ButtonsMenu.components[2].setDisabled(false) }

                DevEmbed.setDescription(`${LengthRoles}`).setFooter(`${["Страница", "Page"][Server.language]} ` + NowPage);
                msg.edit({ embeds: [DevEmbed], components: [RolesListMenu, ButtonsMenu] });

            }

        })

    })

};
module.exports.help = {
    name: "shop",
};