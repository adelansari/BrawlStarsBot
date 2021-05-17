module.exports = {
    name: 'info',
    description: "info command to send reddit and youtube links!",
    execute(message, args) {
        // if (Boolean(args[0]) == false) {
        if (!(args[0])) {
            message.channel.send('Available commands after info are: youtube, reddit');
        } else if (args[0] === 'youtube') {
            message.channel.send('https://www.youtube.com/channel/UCOrRVoTQxEhJr1uYrqBS7ug');
        } else if (args[0] === 'reddit') {
            message.channel.send('https://www.reddit.com/r/BrawlBloods/');
        } else {
            message.channel.send('Invalid command');
        }
    }
}