const Discord = require('discord.js');
const Discordimport = require('../index.js');
const { Client } = require("brawlstars");
const { MessageEmbed, ReactionEmoji } = require('discord.js');
// const BrawlStars = require('brawlstars');
require('dotenv').config()
const bstoken = process.env.BS_TOKEN;
const bsclient = new Client(bstoken, {
    cache: true, // default is true
    cacheOptions: undefined /* options for node-cache, default is undefined. */
});

const logo = 'https://scfiles.egnyte.com/openpublicdocument.do?forceDownload=false&preview=true&thumbNail=true&w=1200&h=1200&type=proportional&forceDownload=false&link_id=zTctdcnT3v&entryId=3d510220-7ec6-4bc8-b992-68b49a55e40f&cb=1603388380278'
const BrawlStarsClub = '#28YCLJYVL'

module.exports = {
    name: 'bs',
    description: "brawl stars command to fetch data",
    execute(client, message, args) {


        bsclient.getPlayer(args[0])
            .then((player) => {
                const bsName = player.name;
                const highestTrophies = player.highestTrophies;
                const x3v3wins = player.x3vs3Victories;
                const club = player.club;
                // const clubtag = club.name.replace("#", "");
                // const clublink = 'https://www.starlist.pro/stats/club/';

                bsclient.getClub(club.tag)
                    .then((clubmember) => {
                        const clubmembers = clubmember.members;
                        const bsMember = clubmembers.find(({ name }) => name === bsName);
                        const bsMemberRole = bsMember.role;
                        if (bsMemberRole === 'member') {
                            MemberRole = 'Member';
                        } else if (bsMemberRole === 'senior') {
                            MemberRole = 'Senior';
                        } else if (bsMemberRole === 'vicePresident') {
                            MemberRole = 'Vice President';
                        } else if (bsMemberRole === 'president') {
                            MemberRole = 'President';
                        }


                        // ServerRole = 
                        // if(club.tag === "ur clan")
                        console.log(MemberRole)

                        const bsembed = new Discordimport.Discord.MessageEmbed()
                            .setTitle('Is this you?')
                            .setColor(0x008080)
                            // .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                            .addField('Player Name', bsName)
                            .addField('<:Trophies:768983154068684810> Highest Trophies', highestTrophies)
                            .addField('<:3v3:768982614887235584> 3v3 Wins', x3v3wins)
                            .addField('<:Club:768888643355279362> Club', club.tag + "  |  " + club.name)
                            .addField(':fire: Club Role:   ', MemberRole)
                            .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
                            .setThumbnail(logo);

                        message.channel.send(bsembed)
                            .then((reaction) => {
                                reaction1 = reaction.react('✅');
                                reaction2 = reaction.react('❌');
                                let rolee = message.guild.roles.cache.find(r => r.name === MemberRole);
                                let msgid = reaction.id;
                                console.log(rolee.id);
                                console.log(msgid);

                                client.on('messageReactionAdd', async (reaction, user) => {
                                    const { name } = reaction.emoji;
                                    const member = reaction.message.guild.members.cache.get(user.id);
                                    if (message.author.bot) return;
                                    else if (reaction.message.id === msgid) {
                                        switch (name) {
                                            case '✅':
                                                if (club.tag === BrawlStarsClub) {
                                                    member.roles.add(rolee.id);
                                                    message.member.setNickname(bsName);
                                                    // return message.channel.send({ embed: { color: "GREEN", description: `Successfully changed **${member}** nickname to **${bsName}**` } });
                                                } else {
                                                    let guestrole = message.guild.roles.cache.find(r => r.name === 'Guest');
                                                    member.roles.add(guestrole.id);
                                                    message.member.setNickname(bsName);
                                                    // return message.channel.send({ embed: { color: "GREEN", description: `Successfully changed **${member}** nickname to **${bsName}**` } });
                                                }
                                                break;
                                            case '❌':
                                                break;
                                        };
                                    };
                                });
                    });
            });







    });




    // .then((clubmember) => {
    //     const clubrole = club.trophies;
    //     console.log(clubrole);
    // });




    // let asyncFunction = async function() {
    //     const player = await bsclient.getPlayer(args[0]);
    //     const bsName = player.name;
    //     const trophy = player.trophies;
    //     const x3v3wins = player.x3vs3Victories;
    //     return {bsName,trophy,x3v3wins};
    // };

    // let {bsName,trophy,x3v3wins} = asyncFunction();
    // // const club = player.club;

    // const bsembed = new bsimport.Discord.MessageEmbed()
    //     .setTitle('Is this you?')
    //     .setColor(0x008080)
    //     .addField('Player Name', player.bsName)
    //     .addField('<:Trophies:768919256934776902> Trophies', player.trophy)
    //     .addField('<:3v3:768918972249669662> 3v3 Wins', player.x3v3wins)
    //     // .addField('<:Club:768888643355279362> Club', club)
    //     .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    //     .setThumbnail(logo);
    // message.channel.send(bsembed);
}
}