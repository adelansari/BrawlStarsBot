const Discord = require('discord.js');
const client = new Discord.Client({
    partials:["MESSAGE","REACTION"]
});
require('dotenv').config();
const bot_token = process.env.BOT_TOKEN;


// const bsclient = new BrawlStars.Client( bs_token, {
//     cache: true, // default is true
//     cacheOptions: undefined /* options for node-cache, default is undefined. */
// });

module.exports = {
    Discord
}


const prefix = '!';



const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.on('ready', () => {
    console.log('This bot is online!');
})


// client.on('message', message =>{
//     let args = message.content.slice(prefix.length).split(' ');
//     switch(args[0]){
//         case 'ping':
//             message.channel.send('pong!');
//             break;
//         case 'reddit':
//             message.channel.send('https://www.reddit.com/r/BrawlBloods/');
//             break;
//         case 'info':
//             if(args[1] === 'youtube'){
//                 message.channel.send('https://www.youtube.com/channel/UCOrRVoTQxEhJr1uYrqBS7ug');
//             } else if(args[1] === 'reddit'){
//                 message.channel.send('https://www.reddit.com/r/BrawlBloods/');
//                 break;
//             } else{
//                 message.channel.send('Invalid command');
//             }
//             break;
//         case 'clear':
//             if(!args[1]) return message.reply('Error! Please defind the number of messages to delete.')
//             message.channel.bulkDelete(args[1]);
//             break;

//         case 'embed':
//             const embed = new Discord.MessageEmbed()
//             .setTitle('A slick little embed')
//             .setColor(0x008080)
//             .addField('Current Server',message.guild.name,true)
//             .addField('Player Name',message.author.username)
//             .setThumbnail(message.author.displayAvatarURL());
//             message.channel.send(embed);
//             break;


//     }
// })


client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'info') {
        client.commands.get('info').execute(message, args);
    } else if (command === 'clear') {
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.reply('You do not have permission to use that command.')
        client.commands.get('clear').execute(message, args);
    } else if (command === 'embed') {
        client.commands.get('embed').execute(message, args);
    } else if (command === 'bs') {
        client.commands.get('bs').execute(client, message, args);
    }
})

// client.on('messageReactionAdd',(reaction,user)=>{
//     const {name} = reaction.emoji;
//     const member = reaction.message.guild.members.cache.get(user.id);
//     if (reaction.message.id ==='769059229998776340'){
//         switch (name) {
//             case '✅':
//                 member.roles.add('769078615077158913')
//                 break;
//             case '❌':
//                 break;
//         }
//     }
// })

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === "general");
    if (!channel) return;

    channel.send(`Welcome to our server, ${member}, please use !bs #YourGameTag to verify yourself!`)
})

client.login(bot_token);