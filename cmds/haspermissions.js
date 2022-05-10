const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    if (!rUser) { rUser = message.member }

    let all_permissions_number = 31;
    let permissions_number = 0;

    let CreateInstantInvite = rUser.permissions.has("CREATE_INSTANT_INVITE")
    let CreateInstantInvite_TEXT = '❌';
    if (CreateInstantInvite) { CreateInstantInvite_TEXT = '✅'; permissions_number++; }

    let KickMembers = rUser.permissions.has("KICK_MEMBERS")
    let KickMembers_TEXT = '❌';
    if (KickMembers) { KickMembers_TEXT = '✅'; permissions_number++; }

    let BanMembers = rUser.permissions.has("BAN_MEMBERS")
    let BanMembers_TEXT = '❌';
    if (BanMembers) { BanMembers_TEXT = '✅'; permissions_number++; }

    let Administrator = rUser.permissions.has("ADMINISTRATOR")
    let Administrator_TEXT = '❌';
    if (Administrator) { Administrator_TEXT = '✅'; permissions_number++; }

    let ManageChannels = rUser.permissions.has("MANAGE_CHANNELS")
    let ManageChannels_TEXT = '❌';
    if (ManageChannels) { ManageChannels_TEXT = '✅'; permissions_number++; }

    let ManageGuild = rUser.permissions.has("MANAGE_GUILD")
    let ManageGuild_TEXT = '❌';
    if (ManageGuild) { ManageGuild_TEXT = '✅'; permissions_number++; }

    let AddReactions = rUser.permissions.has("ADD_REACTIONS")
    let AddReactions_TEXT = '❌';
    if (AddReactions) { AddReactions_TEXT = '✅'; permissions_number++; }

    let ViewAuditLog = rUser.permissions.has("VIEW_AUDIT_LOG")
    let ViewAuditLog_TEXT = '❌';
    if (ViewAuditLog) { ViewAuditLog_TEXT = '✅'; permissions_number++; }

    let PrioritySpeaker = rUser.permissions.has("PRIORITY_SPEAKER")
    let PrioritySpeaker_TEXT = '❌';
    if (PrioritySpeaker) { PrioritySpeaker_TEXT = '✅'; permissions_number++; }

    let Stream = rUser.permissions.has("STREAM")
    let Stream_TEXT = '❌';
    if (Stream) { Stream_TEXT = '✅'; permissions_number++; }

    let ViewChannel = rUser.permissions.has("VIEW_CHANNEL")
    let ViewChannel_TEXT = '❌';
    if (ViewChannel) { ViewChannel_TEXT = '✅'; permissions_number++; }

    let SendMessages = rUser.permissions.has("SEND_MESSAGES")
    let SendMessages_TEXT = '❌';
    if (SendMessages) { SendMessages_TEXT = '✅'; permissions_number++; }

    let SendTTSMessages = rUser.permissions.has("SEND_TTS_MESSAGES")
    let SendTTSMessages_TEXT = '❌';
    if (SendTTSMessages) { SendTTSMessages_TEXT = '✅'; permissions_number++; }

    let ManageMessages = rUser.permissions.has("MANAGE_MESSAGES")
    let ManageMessages_TEXT = '❌';
    if (ManageMessages) { ManageMessages_TEXT = '✅'; permissions_number++; }

    let EmbedLinks = rUser.permissions.has("EMBED_LINKS")
    let EmbedLinks_TEXT = '❌';
    if (EmbedLinks) { EmbedLinks_TEXT = '✅'; permissions_number++; }

    let AttachFiles = rUser.permissions.has("ATTACH_FILES")
    let AttachFiles_TEXT = '❌';
    if (AttachFiles) { AttachFiles_TEXT = '✅'; permissions_number++; }

    let ReadMessageHistory = rUser.permissions.has("READ_MESSAGE_HISTORY")
    let ReadMessageHistory_TEXT = '❌';
    if (ReadMessageHistory) { ReadMessageHistory_TEXT = '✅'; permissions_number++; }

    let MentionEveryone = rUser.permissions.has("MENTION_EVERYONE")
    let MentionEveryone_TEXT = '❌';
    if (MentionEveryone) { MentionEveryone_TEXT = '✅'; permissions_number++; }

    let UseExternalEmojis = rUser.permissions.has("USE_EXTERNAL_EMOJIS")
    let UseExternalEmojis_TEXT = '❌';
    if (UseExternalEmojis) { UseExternalEmojis_TEXT = '✅'; permissions_number++; }

    let ViewGuildInsights = rUser.permissions.has("VIEW_GUILD_INSIGHTS")
    let ViewGuildInsights_TEXT = '❌';
    if (ViewGuildInsights) { ViewGuildInsights_TEXT = '✅'; permissions_number++; }

    let Connect = rUser.permissions.has("CONNECT")
    let Connect_TEXT = '❌';
    if (Connect) { Connect_TEXT = '✅'; permissions_number++; }

    let Speak = rUser.permissions.has("SPEAK")
    let Speak_TEXT = '❌';
    if (Speak) { Speak_TEXT = '✅'; permissions_number++; }

    let MuteMembers = rUser.permissions.has("MUTE_MEMBERS")
    let MuteMembers_TEXT = '❌';
    if (MuteMembers) { MuteMembers_TEXT = '✅'; permissions_number++; }

    let DeafenMembers = rUser.permissions.has("DEAFEN_MEMBERS")
    let DeafenMembers_TEXT = '❌';
    if (DeafenMembers) { DeafenMembers_TEXT = '✅'; permissions_number++; }

    let MoveMembers = rUser.permissions.has("MOVE_MEMBERS")
    let MoveMembers_TEXT = '❌';
    if (MoveMembers) { MoveMembers_TEXT = '✅'; permissions_number++; }

    let UseVad = rUser.permissions.has("USE_VAD")
    let UseVad_TEXT = '❌';
    if (UseVad) { UseVad_TEXT = '✅'; permissions_number++; }

    let ChangeNickname = rUser.permissions.has("CHANGE_NICKNAME")
    let ChangeNickname_TEXT = '❌';
    if (ChangeNickname) { ChangeNickname_TEXT = '✅'; permissions_number++; }

    let ManageNicknames = rUser.permissions.has("MANAGE_NICKNAMES")
    let ManageNicknames_TEXT = '❌';
    if (ManageNicknames) { ManageNicknames_TEXT = '✅'; permissions_number++; }

    let ManageRoles = rUser.permissions.has("MANAGE_ROLES")
    let ManageRoles_TEXT = '❌';
    if (ManageRoles) { ManageRoles_TEXT = '✅'; permissions_number++; }

    let ManageWebhooks = rUser.permissions.has("MANAGE_WEBHOOKS")
    let ManageWebhooks_TEXT = '❌';
    if (ManageWebhooks) { ManageWebhooks_TEXT = '✅'; permissions_number++; }

    let ManageEmojis = rUser.permissions.has("MANAGE_EMOJIS_AND_STICKERS")
    let ManageEmojis_TEXT = '❌';
    if (ManageEmojis) { ManageEmojis_TEXT = '✅'; permissions_number++; }

    all_permissions_number -= permissions_number;

    let embed = new Discord.MessageEmbed()
        .setColor('BLACK')
        .setTitle(['Привелегии', 'Privilege'][Server.language] + " \\👑" + rUser.user.tag)
        .setDescription(`\`\`\`ADMINISTRATOR: ${Administrator_TEXT}
ADD_REACTIONS: ${AddReactions_TEXT}
ATTACH_FILES: ${AttachFiles_TEXT}
BAN_MEMBERS: ${BanMembers_TEXT}
CHANGE_NICKNAME: ${ChangeNickname_TEXT}
CONNECT: ${Connect_TEXT}
CREATE_INSTANT_INVITE: ${CreateInstantInvite_TEXT}
DEAFEN_MEMBERS: ${DeafenMembers_TEXT}
EMBED_LINKS: ${EmbedLinks_TEXT}
KICK_MEMBERS: ${KickMembers_TEXT}
MANAGE_CHANNELS: ${ManageChannels_TEXT}
MANAGE_EMOJIS_AND_STICKERS: ${ManageEmojis_TEXT}
MANAGE_GUILD: ${ManageGuild_TEXT}
MANAGE_MESSAGES: ${ManageMessages_TEXT}
MANAGE_NICKNAMES: ${ManageNicknames_TEXT}
MANAGE_ROLES: ${ManageRoles_TEXT}
MANAGE_WEBHOOKS: ${ManageWebhooks_TEXT}
MENTION_EVERYONE: ${MentionEveryone_TEXT}
MOVE_MEMBERS: ${MoveMembers_TEXT}
MUTE_MEMBERS: ${MuteMembers_TEXT}
PRIORITY_SPEAKER: ${PrioritySpeaker_TEXT}
READ_MESSAGE_HISTORY: ${ReadMessageHistory_TEXT}
SEND_MESSAGES: ${SendMessages_TEXT}
SEND_TTS_MESSAGES: ${SendTTSMessages_TEXT}
SPEAK: ${Speak_TEXT}
STREAM: ${Stream_TEXT}
USE_EXTERNAL_EMOJIS: ${UseExternalEmojis_TEXT}
USE_VAD: ${UseVad_TEXT}
VIEW_AUDIT_LOG: ${ViewAuditLog_TEXT}
VIEW_CHANNEL: ${ViewChannel_TEXT}
VIEW_GUILD_INSIGHTS: ${ViewGuildInsights_TEXT}

${permissions_number} — ✅ | ${all_permissions_number} — ❌\`\`\``)

    message.reply({ embeds: [embed] });

};
module.exports.help = {
    name: "haspermissions",
    alias: "hasp",
};