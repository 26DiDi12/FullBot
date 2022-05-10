const Discord = require("discord.js");
const fs = require("fs");
const Genius = require("genius-lyrics");
const Client = new Genius.Client("9nWWvG9rQWKkjCfHz81-u9XR7o0V8xyrhYEVdcu4M3FsGeX7KBqCFWOoe1p569LD");
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

    let errembed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setTitle(['Текст песни', 'Lyrics'][Server.language] + `\\🎤`)
        .setDescription(`**${['Укажите название песни', 'Indicate the name of the song'][Server.language]}** \\⚠️`)

    let botmessage = args.join(" ");
    if (!botmessage) return message.reply({ embeds: [errembed] })
    
    const searches = await Client.songs.search(botmessage);
    const firstSong = searches[0];
    if (firstSong == undefined) return message.reply({ embeds: [errembed] })

    let Embed = new Discord.MessageEmbed()
        .setAuthor(firstSong.artist.name, firstSong.artist.thumbnail, firstSong.artist.url)
        .setTitle(`${firstSong.title} \\🎤`)
        .setDescription(await firstSong.lyrics())
        .setThumbnail(firstSong._raw.song_art_image_thumbnail_url)
        .setImage('https://cdn.discordapp.com/attachments/878193137305133076/924368074440867870/1.png')
        .setColor("BLACK")
        .setURL(firstSong.url)
        .setFooter(`${['Дата релиза', 'Date of release'][Server.language]} - ` + firstSong._raw.release_date_for_display)

    message.reply({ embeds: [Embed] })

};
module.exports.help = {
    name: "lyrics"
};