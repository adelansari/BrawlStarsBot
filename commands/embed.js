module.exports = {
    name: 'embed',
    description: "this is a ping command!",
    execute(message, args) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed()
            .setTitle('A slick little embed')
            .setColor(0x008080)
            .addField('Current Server',message.guild.name,true)
            .addField('Player Name',message.author.username)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
            message.channel.send(embed);
    }
}