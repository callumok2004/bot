module.exports = {
    name: 'logs',
    aliases: [],
    category: 'Moderation',
    description: 'Enable/Disable certain logs in the server.',
    usage: '<enable|disable> <#channel>',
    permissions: 'MANAGE_GUILD',
    clientPerms: 'VIEW_AUDIT_LOG',
    creatorOnly: false,
    guildOnly: true,
    premiumOnly: false,
    requiresArgs: false,
    run: async (client, msg, args) => {
        const cases = ["channelUpdates", "memberUpdates", "emojiUpdates"]
        var { Logs } = require(`${process.cwd()}/src/Structures/Constants/Models.js`),
            query = {guildID: msg.guild.id};

        // const values = {

        // }
        if(!args[0]) return msg.channel.send("Please provide one of the following arguments: `list, enable, disable, setChannel`").then(message => {
            msg.delete(5000);
            message.delete(5000);
        });

        switch(args[0].toLowerCase()) {
            case "setchannel": 

                switch(args[1].toLowerCase()) {
                    case "guildupdates":
                        if(!args[2]) return msg.channel.send("Make sure to provide a channel that logs will be sent too.").then(message => {
                            msg.delete(5000);
                            message.delete(5000);
                        });
                        Logs.findOneAndUpdate(query, {guildChangeLogsChannel: args[2] }, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully set guildUpdates log channel!").then(message => {
                                msg.delete(5000);
                                message.delete(5000);
                            });
                        });
                    break;
                }
                break;
            case "enable":
            case "true":
                let embed = new client.Embed()
                .setDescription(`
                Make sure to mention which logs you want to enable!
                \`
                • ${cases.join("\n•")}
                \`
                `)
                if(!args[1]) return msg.channel.send(casesEmbed);
                switch (args[1].toLowerCase()) {
                    case "":
                        Logs.findOneAndUpdate(query, {guildChannelCreateLogs: {enabled: true }}, {upsert: true}, function(err, doc) {
                            if (err) return msg.channel.send(err);
                            msg.channel.send("Successfully enabled channelCreate logs!").then(message => {
                                msg.delete(5000);
                                message.delete(5000);
                            });
                        });
                    break;
                }
            break;
            case "disable":
            case "false":

            break;
            case "list":
            case "show":
                let embed = new client.Embed()
                    .setTitle("Livida • Log configuration")
                    .setDescription(`
                    **Log Channels**
                    • Guild Update: ${Logs.guildChangeLogsChannel}

                    **Enabled/Disabled**
                    • Channel Creation Logs: ${Logs.guildChannelCreateLogs.enabled.toString().toLowerCase().replace("true", "Enabled").replace("false", "Disabled")}
                    `)
                    msg.channel.send(embed);
            break;
        }
    }
  }
  