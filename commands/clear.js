const Discordimport = require('../index.js');


module.exports = {
    name: 'clear',
    description: "clear messages command!",
    execute(message, args) {
        // if (!args[0]) return message.reply('Error! Please defind the number of messages to delete.')
        if (!args[0]) return message.channel.send('Error! Please defind the number of messages to delete.')
        let num = 2;
        if (args[0]){
            num = parseInt(args[0])+1;
        }
        message.channel.bulkDelete(num);

        // const user = message.mentions.users.first()
        // const messageList = message.channel.message.fetch({limit:100})
        
    }
}