const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args, rUser, uid) => {

    if (message.author.id != '360180982264889346') return
    message.delete().catch();

    let botmessage = args.join(" ");

    if (!botmessage) { return console.log('!say <количество сообщений> <текст>') }

    let minnumber = isNaN(args[0]);
    if (minnumber == true) {

        botmessage = args.join(" ");
        bot.send(botmessage);

    } else {

        args[0] *= 1

        botmessage = args.slice(1).join(" ");

        if (botmessage == '') {

            botmessage = args.join(" ");
            bot.send(botmessage);

        } else {

            let messagesnumber = setInterval(() => {

                if (args[0] <= 0) {

                    clearInterval(messagesnumber)
                    return

                }

                bot.send(botmessage);
                args[0]--;

            }, 0);

        }

    }

};
module.exports.help = {
    name: "say"
};