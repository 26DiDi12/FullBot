const Discord = require("discord.js");
const fs = require("fs");
const isPlaying = new Set();
module.exports.run = async (bot, message, args, rUser, uid) => {

    const Server = await bot.Servers.findOne({ guildId: message.guild.id });

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

    const EmptyButton10 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty10")

    const EmptyButton11 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty11")

    const EmptyButton12 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty12")

    const EmptyButton13 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty13")

    const EmptyButton14 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty14")

    const EmptyButton15 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty15")

    const EmptyButton16 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty16")

    const EmptyButton17 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty17")

    const EmptyButton18 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty18")

    const EmptyButton19 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty19")

    const EmptyButton20 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty20")

    const EmptyButton21 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty21")

    const EmptyButton22 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty22")

    const EmptyButton23 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty23")

    const EmptyButton24 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty24")

    const EmptyButton25 = new Discord.MessageButton()
        .setLabel("⠀")
        .setStyle("SECONDARY")
        .setCustomId("empty25")

    const MinesGame1 = new Discord.MessageActionRow()
        .addComponents(EmptyButton1)
        .addComponents(EmptyButton2)
        .addComponents(EmptyButton3)
        .addComponents(EmptyButton4)
        .addComponents(EmptyButton5)
    const MinesGame2 = new Discord.MessageActionRow()
        .addComponents(EmptyButton6)
        .addComponents(EmptyButton7)
        .addComponents(EmptyButton8)
        .addComponents(EmptyButton9)
        .addComponents(EmptyButton10)
    const MinesGame3 = new Discord.MessageActionRow()
        .addComponents(EmptyButton11)
        .addComponents(EmptyButton12)
        .addComponents(EmptyButton13)
        .addComponents(EmptyButton14)
        .addComponents(EmptyButton15)
    const MinesGame4 = new Discord.MessageActionRow()
        .addComponents(EmptyButton16)
        .addComponents(EmptyButton17)
        .addComponents(EmptyButton18)
        .addComponents(EmptyButton19)
        .addComponents(EmptyButton20)
    const MinesGame5 = new Discord.MessageActionRow()
        .addComponents(EmptyButton21)
        .addComponents(EmptyButton22)
        .addComponents(EmptyButton23)
        .addComponents(EmptyButton24)
        .addComponents(EmptyButton25)

    let Author = message.author;
    let NumbersToWin = 18;

    if (isPlaying.has(message.author.id)) {
        let isPlayingEmbed = new Discord.MessageEmbed()
            .setTitle(['Сапёр', 'Mines'][Server.language] + ` \\🎮`)
            .setDescription(`**${['Вы уже начали сессию, закончите её.', 'You have already started the session, finish it.'][Server.language]}** \\⚠️`)
            .setColor("BLACK")
        return message.channel.send({ embeds: [isPlayingEmbed] })
    }

    isPlaying.add(message.author.id)

    //7 BOMB

    let Bomb1 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
    let Bomb2 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
    let Bomb3 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
    let Bomb4 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
    let Bomb5 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
    let Bomb6 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
    let Bomb7 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
    let Random = true;
    setTimeout(losttime, 0);

    function losttime() {

        Random = true;

        if (Bomb1 == Bomb2 || Bomb1 == Bomb3 || Bomb1 == Bomb4 || Bomb1 == Bomb5 || Bomb1 == Bomb6 || Bomb1 == Bomb7) { Random = false }
        if (Bomb2 == Bomb1 || Bomb2 == Bomb3 || Bomb2 == Bomb4 || Bomb2 == Bomb5 || Bomb2 == Bomb6 || Bomb2 == Bomb7) { Random = false }
        if (Bomb3 == Bomb2 || Bomb3 == Bomb1 || Bomb3 == Bomb4 || Bomb3 == Bomb5 || Bomb3 == Bomb6 || Bomb3 == Bomb7) { Random = false }
        if (Bomb4 == Bomb2 || Bomb4 == Bomb3 || Bomb4 == Bomb1 || Bomb4 == Bomb5 || Bomb4 == Bomb6 || Bomb4 == Bomb7) { Random = false }
        if (Bomb5 == Bomb2 || Bomb5 == Bomb3 || Bomb5 == Bomb4 || Bomb5 == Bomb1 || Bomb5 == Bomb6 || Bomb5 == Bomb7) { Random = false }
        if (Bomb6 == Bomb2 || Bomb6 == Bomb3 || Bomb6 == Bomb4 || Bomb6 == Bomb5 || Bomb6 == Bomb1 || Bomb6 == Bomb7) { Random = false }
        if (Bomb7 == Bomb2 || Bomb7 == Bomb3 || Bomb7 == Bomb4 || Bomb7 == Bomb5 || Bomb7 == Bomb6 || Bomb7 == Bomb1) { Random = false }

        if (!Random) {
            Bomb1 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
            Bomb2 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
            Bomb3 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
            Bomb4 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
            Bomb5 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
            Bomb6 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
            Bomb7 = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
            setTimeout(losttime, 0);
        } else {

            // console.log(Bomb1, Bomb2, Bomb3, Bomb4, Bomb5, Bomb6, Bomb7)

            let emoji = [`\\😖`, `\\😨`, `\\😓`, `\\😪`, `\\😬`, `\\😢`, `\\🤕`, `\\🤒`, `\\🤧`]

            let MinesEmbed = new Discord.MessageEmbed()
                .setColor("BLACK")
                .setTitle(['Сапёр', 'Mines'][Server.language] + ` \\🎮`)
                .setDescription(`${message.author} ${['решил закосплеить Течиса', 'decided to enhance Tecis'][Server.language]} ${emoji[Math.floor(Math.random() * emoji.length)]}`)
                .setFooter(['Игра идёт 300 сек.', 'The game goes 300 seconds.'][Server.language])

            let MinesEmbedWin = new Discord.MessageEmbed()
                .setColor("BLACK")
                .setTitle(['Сапёр', 'Mines'][Server.language] + ` \\🎮`)
                .setDescription(`${message.author} **${['открыл все клетки', 'opened all the cells'][Server.language]}** \\🏳️`)

            let MinesEmbedLose = new Discord.MessageEmbed()
                .setColor("BLACK")
                .setTitle(['Сапёр', 'Mines'][Server.language] + ` \\🎮`)
                .setDescription(`${message.author} **${['взорвался', 'exploded'][Server.language]}** \\💥`)

            let MinesEmbedTime = new Discord.MessageEmbed()
                .setColor("BLACK")
                .setTitle(['Сапёр', 'Mines'][Server.language] + ` \\🎮`)
                .setDescription(`${message.author} **${['время истекло', 'time is up'][Server.language]}** \\⏱️`)

            let CurretEmbed = MinesEmbed;
            let PlayOrNo = false;

            message.channel.send({ embeds: [CurretEmbed], components: [MinesGame1, MinesGame2, MinesGame3, MinesGame4, MinesGame5] }).then(async (message) => {

                const collector = await message.createMessageComponentCollector();

                setTimeout(losttimeround, 300000);

                collector.on(`collect`, async (interaction) => {

                    if (interaction.user.bot) return;
                    let uid = interaction.user.id;
                    if (uid != Author.id) return;
                    interaction.deferUpdate();
                    let Number = 0; let NumberEmpty = 0; let NumberBan; let CurretMines; let CurretNumber;

                    if (interaction.isButton()) {

                        if (interaction.customId == 'empty1') { CurretNumber = 1; NumberEmpty = 1; NumberBan = ['2', '6', '7']; CurretMines = MinesGame1; }
                        if (interaction.customId == 'empty2') { CurretNumber = 2; NumberEmpty = 2; NumberBan = ['1', '3', '6', '7', '8']; CurretMines = MinesGame1; }
                        if (interaction.customId == 'empty3') { CurretNumber = 3; NumberEmpty = 3; NumberBan = ['2', '4', '7', '8', '9']; CurretMines = MinesGame1; }
                        if (interaction.customId == 'empty4') { CurretNumber = 4; NumberEmpty = 4; NumberBan = ['3', '5', '8', '9', '10']; CurretMines = MinesGame1; }
                        if (interaction.customId == 'empty5') { CurretNumber = 5; NumberEmpty = 5; NumberBan = ['4', '9', '10']; CurretMines = MinesGame1; }

                        if (interaction.customId == 'empty6') { CurretNumber = 6; NumberEmpty = 1; NumberBan = ['1', '2', '7', '11', '12']; CurretMines = MinesGame2; }
                        if (interaction.customId == 'empty7') { CurretNumber = 7; NumberEmpty = 2; NumberBan = ['1', '2', '3', '6', '8', '11', '12', '13']; CurretMines = MinesGame2; }
                        if (interaction.customId == 'empty8') { CurretNumber = 8; NumberEmpty = 3; NumberBan = ['2', '3', '4', '7', '9', '12', '13', '14']; CurretMines = MinesGame2; }
                        if (interaction.customId == 'empty9') { CurretNumber = 9; NumberEmpty = 4; NumberBan = ['3', '4', '5', '8', '10', '13', '14', '15']; CurretMines = MinesGame2; }
                        if (interaction.customId == 'empty10') { CurretNumber = 10; NumberEmpty = 5; NumberBan = ['4', '5', '9', '14', '15']; CurretMines = MinesGame2; }

                        if (interaction.customId == 'empty11') { CurretNumber = 11; NumberEmpty = 1; NumberBan = ['6', '7', '12', '16', '17']; CurretMines = MinesGame3; }
                        if (interaction.customId == 'empty12') { CurretNumber = 12; NumberEmpty = 2; NumberBan = ['6', '7', '8', '11', '13', '16', '17', '18']; CurretMines = MinesGame3; }
                        if (interaction.customId == 'empty13') { CurretNumber = 13; NumberEmpty = 3; NumberBan = ['7', '8', '9', '12', '14', '17', '18', '19']; CurretMines = MinesGame3; }
                        if (interaction.customId == 'empty14') { CurretNumber = 14; NumberEmpty = 4; NumberBan = ['8', '9', '10', '13', '15', '18', '19', '20']; CurretMines = MinesGame3; }
                        if (interaction.customId == 'empty15') { CurretNumber = 15; NumberEmpty = 5; NumberBan = ['9', '10', '14', '19', '20']; CurretMines = MinesGame3; }

                        if (interaction.customId == 'empty16') { CurretNumber = 16; NumberEmpty = 1; NumberBan = ['11', '12', '17', '21', '22']; CurretMines = MinesGame4; }
                        if (interaction.customId == 'empty17') { CurretNumber = 17; NumberEmpty = 2; NumberBan = ['11', '12', '13', '16', '18', '21', '22', '23']; CurretMines = MinesGame4; }
                        if (interaction.customId == 'empty18') { CurretNumber = 18; NumberEmpty = 3; NumberBan = ['12', '13', '14', '17', '19', '22', '23', '24']; CurretMines = MinesGame4; }
                        if (interaction.customId == 'empty19') { CurretNumber = 19; NumberEmpty = 4; NumberBan = ['13', '14', '15', '18', '20', '23', '24', '25']; CurretMines = MinesGame4; }
                        if (interaction.customId == 'empty20') { CurretNumber = 20; NumberEmpty = 5; NumberBan = ['14', '15', '19', '24', '25']; CurretMines = MinesGame4; }

                        if (interaction.customId == 'empty21') { CurretNumber = 21; NumberEmpty = 1; NumberBan = ['16', '17', '22']; CurretMines = MinesGame5; }
                        if (interaction.customId == 'empty22') { CurretNumber = 22; NumberEmpty = 2; NumberBan = ['16', '17', '18', '21', '23']; CurretMines = MinesGame5; }
                        if (interaction.customId == 'empty23') { CurretNumber = 23; NumberEmpty = 3; NumberBan = ['17', '18', '19', '22', '24']; CurretMines = MinesGame5; }
                        if (interaction.customId == 'empty24') { CurretNumber = 24; NumberEmpty = 4; NumberBan = ['18', '19', '20', '23', '25']; CurretMines = MinesGame5; }
                        if (interaction.customId == 'empty25') { CurretNumber = 25; NumberEmpty = 5; NumberBan = ['19', '20', '24']; CurretMines = MinesGame5; }

                        if (Bomb1 == CurretNumber || Bomb2 == CurretNumber || Bomb3 == CurretNumber || Bomb4 == CurretNumber || Bomb5 == CurretNumber || Bomb6 == CurretNumber || Bomb7 == CurretNumber) {
                            CurretMines.components[NumberEmpty - 1].setLabel("💣"); CurretMines.components[NumberEmpty - 1].setStyle("DANGER"); CurretEmbed = MinesEmbedLose; GGWP();
                        } else {
                            if (NumberBan.length == 3) {
                                if (Bomb1 == NumberBan[0] || Bomb1 == NumberBan[1] || Bomb1 == NumberBan[2]) Number++;
                                if (Bomb2 == NumberBan[0] || Bomb2 == NumberBan[1] || Bomb2 == NumberBan[2]) Number++;
                                if (Bomb3 == NumberBan[0] || Bomb3 == NumberBan[1] || Bomb3 == NumberBan[2]) Number++;
                                if (Bomb4 == NumberBan[0] || Bomb4 == NumberBan[1] || Bomb4 == NumberBan[2]) Number++;
                                if (Bomb5 == NumberBan[0] || Bomb5 == NumberBan[1] || Bomb5 == NumberBan[2]) Number++;
                                if (Bomb6 == NumberBan[0] || Bomb6 == NumberBan[1] || Bomb6 == NumberBan[2]) Number++;
                                if (Bomb7 == NumberBan[0] || Bomb7 == NumberBan[1] || Bomb7 == NumberBan[2]) Number++;
                            } else if (NumberBan.length == 5) {
                                if (Bomb1 == NumberBan[0] || Bomb1 == NumberBan[1] || Bomb1 == NumberBan[2] || Bomb1 == NumberBan[3] || Bomb1 == NumberBan[4]) Number++;
                                if (Bomb2 == NumberBan[0] || Bomb2 == NumberBan[1] || Bomb2 == NumberBan[2] || Bomb2 == NumberBan[3] || Bomb2 == NumberBan[4]) Number++;
                                if (Bomb3 == NumberBan[0] || Bomb3 == NumberBan[1] || Bomb3 == NumberBan[2] || Bomb3 == NumberBan[3] || Bomb3 == NumberBan[4]) Number++;
                                if (Bomb4 == NumberBan[0] || Bomb4 == NumberBan[1] || Bomb4 == NumberBan[2] || Bomb4 == NumberBan[3] || Bomb4 == NumberBan[4]) Number++;
                                if (Bomb5 == NumberBan[0] || Bomb5 == NumberBan[1] || Bomb5 == NumberBan[2] || Bomb5 == NumberBan[3] || Bomb5 == NumberBan[4]) Number++;
                                if (Bomb6 == NumberBan[0] || Bomb6 == NumberBan[1] || Bomb6 == NumberBan[2] || Bomb6 == NumberBan[3] || Bomb6 == NumberBan[4]) Number++;
                                if (Bomb7 == NumberBan[0] || Bomb7 == NumberBan[1] || Bomb7 == NumberBan[2] || Bomb7 == NumberBan[3] || Bomb7 == NumberBan[4]) Number++;
                            } else if (NumberBan.length == 8) {
                                if (Bomb1 == NumberBan[0] || Bomb1 == NumberBan[1] || Bomb1 == NumberBan[2] || Bomb1 == NumberBan[3] || Bomb1 == NumberBan[4] || Bomb1 == NumberBan[5] || Bomb1 == NumberBan[6] || Bomb1 == NumberBan[7]) Number++;
                                if (Bomb2 == NumberBan[0] || Bomb2 == NumberBan[1] || Bomb2 == NumberBan[2] || Bomb2 == NumberBan[3] || Bomb2 == NumberBan[4] || Bomb2 == NumberBan[5] || Bomb2 == NumberBan[6] || Bomb2 == NumberBan[7]) Number++;
                                if (Bomb3 == NumberBan[0] || Bomb3 == NumberBan[1] || Bomb3 == NumberBan[2] || Bomb3 == NumberBan[3] || Bomb3 == NumberBan[4] || Bomb3 == NumberBan[5] || Bomb3 == NumberBan[6] || Bomb3 == NumberBan[7]) Number++;
                                if (Bomb4 == NumberBan[0] || Bomb4 == NumberBan[1] || Bomb4 == NumberBan[2] || Bomb4 == NumberBan[3] || Bomb4 == NumberBan[4] || Bomb4 == NumberBan[5] || Bomb4 == NumberBan[6] || Bomb4 == NumberBan[7]) Number++;
                                if (Bomb5 == NumberBan[0] || Bomb5 == NumberBan[1] || Bomb5 == NumberBan[2] || Bomb5 == NumberBan[3] || Bomb5 == NumberBan[4] || Bomb5 == NumberBan[5] || Bomb5 == NumberBan[6] || Bomb5 == NumberBan[7]) Number++;
                                if (Bomb6 == NumberBan[0] || Bomb6 == NumberBan[1] || Bomb6 == NumberBan[2] || Bomb6 == NumberBan[3] || Bomb6 == NumberBan[4] || Bomb6 == NumberBan[5] || Bomb6 == NumberBan[6] || Bomb6 == NumberBan[7]) Number++;
                                if (Bomb7 == NumberBan[0] || Bomb7 == NumberBan[1] || Bomb7 == NumberBan[2] || Bomb7 == NumberBan[3] || Bomb7 == NumberBan[4] || Bomb7 == NumberBan[5] || Bomb7 == NumberBan[6] || Bomb7 == NumberBan[7]) Number++;
                            }
                            NumbersToWin--;
                            CurretMines.components[NumberEmpty - 1].setLabel(`${Number}`); CurretMines.components[NumberEmpty - 1].setStyle("PRIMARY");
                            if (NumbersToWin == 0) { CurretEmbed = MinesEmbedWin; GGWP(); }

                        }

                    }

                    await message.edit({ embeds: [CurretEmbed], components: [MinesGame1, MinesGame2, MinesGame3, MinesGame4, MinesGame5] })

                })

                function losttimeround() {
                    if (!PlayOrNo) {
                        CurretEmbed = MinesEmbedTime; GGWP();
                        message.edit({ embeds: [CurretEmbed], components: [MinesGame1, MinesGame2, MinesGame3, MinesGame4, MinesGame5] });
                    }
                }

                function GGWP() {

                    PlayOrNo = true;
                    isPlaying.delete(Author.id);

                    for (let i = 1; i <= 25; ++i) {

                        let Number = 0;

                        if (i == 1) { NumberEmpty = 1; NumberBan = ['2', '6', '7']; CurretMines = MinesGame1; }
                        if (i == 2) { NumberEmpty = 2; NumberBan = ['1', '3', '6', '7', '8']; CurretMines = MinesGame1; }
                        if (i == 3) { NumberEmpty = 3; NumberBan = ['2', '4', '7', '8', '9']; CurretMines = MinesGame1; }
                        if (i == 4) { NumberEmpty = 4; NumberBan = ['3', '5', '8', '9', '10']; CurretMines = MinesGame1; }
                        if (i == 5) { NumberEmpty = 5; NumberBan = ['4', '9', '10']; CurretMines = MinesGame1; }

                        if (i == 6) { NumberEmpty = 1; NumberBan = ['1', '2', '7', '11', '12']; CurretMines = MinesGame2; }
                        if (i == 7) { NumberEmpty = 2; NumberBan = ['1', '2', '3', '6', '8', '11', '12', '13']; CurretMines = MinesGame2; }
                        if (i == 8) { NumberEmpty = 3; NumberBan = ['2', '3', '4', '7', '9', '12', '13', '14']; CurretMines = MinesGame2; }
                        if (i == 9) { NumberEmpty = 4; NumberBan = ['3', '4', '5', '8', '10', '13', '14', '15']; CurretMines = MinesGame2; }
                        if (i == 10) { NumberEmpty = 5; NumberBan = ['4', '5', '9', '14', '15']; CurretMines = MinesGame2; }

                        if (i == 11) { NumberEmpty = 1; NumberBan = ['6', '7', '12', '16', '17']; CurretMines = MinesGame3; }
                        if (i == 12) { NumberEmpty = 2; NumberBan = ['6', '7', '8', '11', '13', '16', '17', '18']; CurretMines = MinesGame3; }
                        if (i == 13) { NumberEmpty = 3; NumberBan = ['7', '8', '9', '12', '14', '17', '18', '19']; CurretMines = MinesGame3; }
                        if (i == 14) { NumberEmpty = 4; NumberBan = ['8', '9', '10', '13', '15', '18', '19', '20']; CurretMines = MinesGame3; }
                        if (i == 15) { NumberEmpty = 5; NumberBan = ['9', '10', '14', '19', '20']; CurretMines = MinesGame3; }

                        if (i == 16) { NumberEmpty = 1; NumberBan = ['11', '12', '17', '21', '22']; CurretMines = MinesGame4; }
                        if (i == 17) { NumberEmpty = 2; NumberBan = ['11', '12', '13', '16', '18', '21', '22', '23']; CurretMines = MinesGame4; }
                        if (i == 18) { NumberEmpty = 3; NumberBan = ['12', '13', '14', '17', '19', '22', '23', '24']; CurretMines = MinesGame4; }
                        if (i == 19) { NumberEmpty = 4; NumberBan = ['13', '14', '15', '18', '20', '23', '24', '25']; CurretMines = MinesGame4; }
                        if (i == 20) { NumberEmpty = 5; NumberBan = ['14', '15', '19', '24', '25']; CurretMines = MinesGame4; }

                        if (i == 21) { NumberEmpty = 1; NumberBan = ['16', '17', '22']; CurretMines = MinesGame5; }
                        if (i == 22) { NumberEmpty = 2; NumberBan = ['16', '17', '18', '21', '23']; CurretMines = MinesGame5; }
                        if (i == 23) { NumberEmpty = 3; NumberBan = ['17', '18', '19', '22', '24']; CurretMines = MinesGame5; }
                        if (i == 24) { NumberEmpty = 4; NumberBan = ['18', '19', '20', '23', '25']; CurretMines = MinesGame5; }
                        if (i == 25) { NumberEmpty = 5; NumberBan = ['19', '20', '24']; CurretMines = MinesGame5; }

                        if (Bomb1 == i || Bomb2 == i || Bomb3 == i || Bomb4 == i || Bomb5 == i || Bomb6 == i || Bomb7 == i) {
                            CurretMines.components[NumberEmpty - 1].setLabel("💣"); CurretMines.components[NumberEmpty - 1].setStyle("DANGER"); CurretMines.components[NumberEmpty - 1].setDisabled(true);
                        } else {
                            if (NumberBan.length == 3) {
                                if (Bomb1 == NumberBan[0] || Bomb1 == NumberBan[1] || Bomb1 == NumberBan[2]) Number++;
                                if (Bomb2 == NumberBan[0] || Bomb2 == NumberBan[1] || Bomb2 == NumberBan[2]) Number++;
                                if (Bomb3 == NumberBan[0] || Bomb3 == NumberBan[1] || Bomb3 == NumberBan[2]) Number++;
                                if (Bomb4 == NumberBan[0] || Bomb4 == NumberBan[1] || Bomb4 == NumberBan[2]) Number++;
                                if (Bomb5 == NumberBan[0] || Bomb5 == NumberBan[1] || Bomb5 == NumberBan[2]) Number++;
                                if (Bomb6 == NumberBan[0] || Bomb6 == NumberBan[1] || Bomb6 == NumberBan[2]) Number++;
                                if (Bomb7 == NumberBan[0] || Bomb7 == NumberBan[1] || Bomb7 == NumberBan[2]) Number++;
                            } else if (NumberBan.length == 5) {
                                if (Bomb1 == NumberBan[0] || Bomb1 == NumberBan[1] || Bomb1 == NumberBan[2] || Bomb1 == NumberBan[3] || Bomb1 == NumberBan[4]) Number++;
                                if (Bomb2 == NumberBan[0] || Bomb2 == NumberBan[1] || Bomb2 == NumberBan[2] || Bomb2 == NumberBan[3] || Bomb2 == NumberBan[4]) Number++;
                                if (Bomb3 == NumberBan[0] || Bomb3 == NumberBan[1] || Bomb3 == NumberBan[2] || Bomb3 == NumberBan[3] || Bomb3 == NumberBan[4]) Number++;
                                if (Bomb4 == NumberBan[0] || Bomb4 == NumberBan[1] || Bomb4 == NumberBan[2] || Bomb4 == NumberBan[3] || Bomb4 == NumberBan[4]) Number++;
                                if (Bomb5 == NumberBan[0] || Bomb5 == NumberBan[1] || Bomb5 == NumberBan[2] || Bomb5 == NumberBan[3] || Bomb5 == NumberBan[4]) Number++;
                                if (Bomb6 == NumberBan[0] || Bomb6 == NumberBan[1] || Bomb6 == NumberBan[2] || Bomb6 == NumberBan[3] || Bomb6 == NumberBan[4]) Number++;
                                if (Bomb7 == NumberBan[0] || Bomb7 == NumberBan[1] || Bomb7 == NumberBan[2] || Bomb7 == NumberBan[3] || Bomb7 == NumberBan[4]) Number++;
                            } else if (NumberBan.length == 8) {
                                if (Bomb1 == NumberBan[0] || Bomb1 == NumberBan[1] || Bomb1 == NumberBan[2] || Bomb1 == NumberBan[3] || Bomb1 == NumberBan[4] || Bomb1 == NumberBan[5] || Bomb1 == NumberBan[6] || Bomb1 == NumberBan[7]) Number++;
                                if (Bomb2 == NumberBan[0] || Bomb2 == NumberBan[1] || Bomb2 == NumberBan[2] || Bomb2 == NumberBan[3] || Bomb2 == NumberBan[4] || Bomb2 == NumberBan[5] || Bomb2 == NumberBan[6] || Bomb2 == NumberBan[7]) Number++;
                                if (Bomb3 == NumberBan[0] || Bomb3 == NumberBan[1] || Bomb3 == NumberBan[2] || Bomb3 == NumberBan[3] || Bomb3 == NumberBan[4] || Bomb3 == NumberBan[5] || Bomb3 == NumberBan[6] || Bomb3 == NumberBan[7]) Number++;
                                if (Bomb4 == NumberBan[0] || Bomb4 == NumberBan[1] || Bomb4 == NumberBan[2] || Bomb4 == NumberBan[3] || Bomb4 == NumberBan[4] || Bomb4 == NumberBan[5] || Bomb4 == NumberBan[6] || Bomb4 == NumberBan[7]) Number++;
                                if (Bomb5 == NumberBan[0] || Bomb5 == NumberBan[1] || Bomb5 == NumberBan[2] || Bomb5 == NumberBan[3] || Bomb5 == NumberBan[4] || Bomb5 == NumberBan[5] || Bomb5 == NumberBan[6] || Bomb5 == NumberBan[7]) Number++;
                                if (Bomb6 == NumberBan[0] || Bomb6 == NumberBan[1] || Bomb6 == NumberBan[2] || Bomb6 == NumberBan[3] || Bomb6 == NumberBan[4] || Bomb6 == NumberBan[5] || Bomb6 == NumberBan[6] || Bomb6 == NumberBan[7]) Number++;
                                if (Bomb7 == NumberBan[0] || Bomb7 == NumberBan[1] || Bomb7 == NumberBan[2] || Bomb7 == NumberBan[3] || Bomb7 == NumberBan[4] || Bomb7 == NumberBan[5] || Bomb7 == NumberBan[6] || Bomb7 == NumberBan[7]) Number++;
                            }
                            CurretMines.components[NumberEmpty - 1].setLabel(`${Number}`); CurretMines.components[NumberEmpty - 1].setStyle("PRIMARY"); CurretMines.components[NumberEmpty - 1].setDisabled(true);
                        }

                    }

                }

            })

        }

    }

};
module.exports.help = {
    name: "mines"
};