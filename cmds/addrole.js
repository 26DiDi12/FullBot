const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    if (!message.member.permissions.has("ADMINISTRATOR")) { return } else if (message.author.id != '360180982264889346') { return }
    let rRole = message.mentions.roles.first() || message.guild.roles.cache.get(message.content.split(" ").slice(1)[0]);

    let errorembed1 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setDescription(`Укажите роль. \\⚠️`)

    let errorembed2 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setDescription(`Эта роль уже добавлена. \\⚠️`)

    let errorembed3 = new Discord.MessageEmbed()
        .setColor("#2F3136")
        .setDescription(`Введите команду правильно! | n!addrole <ценник> <роль> \\⚠️`)

    if (!rRole) return message.channel.send({ embeds: [errorembed1] })
    if (rRole) { if (!args[0]) return message.channel.send({ embeds: [errorembed3] }) }
    args[0] *= 1;
    let minnumber = isNaN(args[0]);
    if (minnumber == true) return message.channel.send({ embeds: [errorembed3] })

    let Role = await bot.Roles.findOne({ roleId: rRole.id, guildId: message.guild.id })
    if (Role == null) {
        Role = new bot.Roles({
            guildId: message.guild.id,
            roleId: rRole.id,
            roleName: rRole.name,
            roleOwnerId: message.author.id,
            roleCost: args[0],
            roleBuysNumber: 0
        })
        await Role.save();
        Role = await bot.Roles.findOne({ roleId: rRole.id, guildId: message.guild.id });

        let Embed = new Discord.MessageEmbed()
            .setColor('BLACK')
            .setTitle(`Ваша роль добавлена 👀`)
            .setDescription(`**Роль: ${message.guild.roles.cache.get(Role.roleId)}**
            **Владелец роли: ${message.guild.members.cache.get(Role.roleOwnerId).user}**
            **Стоимость: ${Role.roleCost} ${Server.currency}**
            **Куплена ${Role.roleBuysNumber} раз**`)

        message.reply({ embeds: [Embed] })
        return;

    } else {
        message.channel.send({ embeds: [errorembed2] });
        return;
    }

};
module.exports.help = {
    name: "addrole",
};