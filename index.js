const Discord = require ("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const prefix = "$"
const ms = require ("ms");
const ytdl = require ('ytdl-core')
const fs = require ("fs");
const active = new Map()
const ownerID = "284151161291014144"
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files)=>{
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
if(jsfile.length <= 0){
    console.log("couldn't find commands,")
    return;
}

jsfile.forEach((f,i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`)
    bot.commands.set(props.help.name, props);
})
})
let ops = {
    ownerID: ownerID,
    active: active
}

bot.on(`ready`, ()=>{
  console.log(`${bot.user.username} is online!`);
  console.log(`----------------`);
  console.log(`VAMPIRES Bot- Script By : Azoqz`);
  console.log(`----------------`);
  console.log(`ON ${bot.guilds.size} Servers '     Script By : Azoqz ' `);
  console.log(`----------------`);
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setStatus("dnd")
  bot.user.setGame(`$bc | Vampires`, "https://www.twitch.tv/azoqzmj")
})  

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  
  let prefix = `$`
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args,ops);

  bot.on('message', async msg => {
  if (msg.author.id === midi || msg.author.id === "284151161291014144" || msg.member.roles.some(r => ["Logan DJ", "The Music Meister"].includes(r.name))) {
    if (!msg.content.startsWith(config.prefix)) return undefined;
    const args = msg.content.split(' ');
    const searchString = args.slice(1).join(' ');
    var url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
    const serverQueue = queue.get(msg.guild.id);
    let command = msg.content.toLowerCase().split(' ')[0];
    command = command.slice(config.prefix.length)
    if (command === 'play') {
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, msg, voiceChannel, true);
            }
            return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    msg.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the 🔎 results ranging from 1-10.
      `);
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 10000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        return msg.channel.send('No or invalid value entered, cancelling video selection.');
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return msg.channel.send('🆘 I could not obtain any search results.');
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    }
    if (command === 'fav') {
        var url = favsong[args[1]] ? favsong[args[1]].replace(/<(.+)>/g, '$1') : '';
        console.log(favsong[args[1]]);
        console.log(" ")
        const voiceChannel = msg.member.voiceChannel;
        if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);
                await handleVideo(video2, msg, voiceChannel, true);
            }
            return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    msg.channel.send(`__**Song selection:**__\nPlease Choose a song on this list from 1-` + favsong.length + "\nSongs");
                    var songarnum = 1;
                    while (songarnum < favsong.length) {
                        msg.channel.send(songarnum + ". " + favsong[songarnum])
                        songarnum++
                    }
                } catch (err) {
                    console.error(err);
                    return msg.channel.send('🆘 I could not obtain any search results.');
                }
            }
            return handleVideo(video, msg, voiceChannel);
        }
    } else if (command === 'skip') {
        if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
        if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
        serverQueue.connection.dispatcher.end('Skip command has been used!');
        return undefined;
    } else if (command === 'stop') {
        if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
        if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end('Stop command has been used!');
        return undefined;
    } else if (command === 'volume' || command === 'vol') {
        if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
        if (!serverQueue) return msg.channel.send('There is nothing playing.');
        if (!args[1]) return msg.channel.send(`The current volume is: **${serverQueue.volume}**`);
        serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        var volval;
        if (serverQueue.volume == 1) {
            volval = `○──── :loud_sound:⠀`
        }
        if (serverQueue.volume == 2) {
            volval = `─○─── :loud_sound:⠀`
        }
        if (serverQueue.volume == 3) {
            volval = `──○── :loud_sound:⠀`
        }
        if (serverQueue.volume == 4) {
            volval = `───○─ :loud_sound:⠀`
        }
        if (serverQueue.volume == 5) {
            volval = `────○ :loud_sound:⠀`
        }
        msg.channel.send(volval)

    } else if (command === 'np') {
        if (!serverQueue) return msg.channel.send('There is nothing playing.');
        return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
    } else if (command === 'queue') {
        if (!serverQueue) return msg.channel.send('There is nothing playing.');
        return msg.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
`);
    } else if (command === 'pause') {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return msg.channel.send('⏸ Paused the music for you!');
        }
        return msg.channel.send('There is nothing playing.');
    } else if (command === 'resume') {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return msg.channel.send('▶ Resumed the music for you!');
        }
        return msg.channel.send('There is nothing playing.');
    }
    return undefined;
}
});
async function handleVideo(video, msg, voiceChannel, playlist = false) {
const serverQueue = queue.get(msg.guild.id);
console.log(chalk.red("MOOOOSIK"));
const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`
};
if (!serverQueue) {
    const queueConstruct = {
        textChannel: msg.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
    };
    queue.set(msg.guild.id, queueConstruct);
    queueConstruct.songs.push(song);
    try {
        var connection = await voiceChannel.join();
        queueConstruct.connection = connection;
        play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
        console.error(`I could not join the voice channel: ${error}`);
        queue.delete(msg.guild.id);
        return msg.channel.send(`I could not join the voice channel: ${error}`);
    }
} else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
}
return undefined;
}

function play(guild, song) {
const serverQueue = queue.get(guild.id);
if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
}
console.log(serverQueue.songs);
const dispatcher = serverQueue.connection.playStream(ytdl(song.url)).on('end', reason => {
    if (reason === 'Stream is not generating quickly enough.') console.log(reason);
    else console.log(reason);
    serverQueue.songs.shift();
    play(guild, serverQueue.songs[0]);
}).on('error', error => console.error(error));
var volval;
if (serverQueue.volume == 1) {
    volval = `○──── :loud_sound:⠀`
}
if (serverQueue.volume == 2) {
    volval = `─○─── :loud_sound:⠀`
}
if (serverQueue.volume == 3) {
    volval = `──○── :loud_sound:⠀`
}
if (serverQueue.volume == 4) {
    volval = `───○─ :loud_sound:⠀`
}
if (serverQueue.volume == 5) {
    volval = `────○ :loud_sound:⠀`
}
dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
var NowEmbed = new Discord.RichEmbed().setColor("990033")
.addField(`=========================================================`,`
ɴᴏᴡ ᴘʟᴀʏɪɴɢ: **${song.title}**
:white_circle:─────────────────────────────────────────── 
◄◄⠀▐▐ ⠀►►⠀⠀　　${volval}    　　 :gear: ❐ ⊏⊐ 
========================================================= `)
.setFooter("Invite Me! Using l.invite")
.addField("Logans Server","https://discord.gg/6mvvfSm")
.addField("The Music Setup was taken from","**Logan**: [Invite](https://discordapp.com/oauth2/authorize?client_id=408070424484904960&scope=bot&permissions=2146958591)");
serverQueue.textChannel.send(NowEmbed);

}


if (message.content.startsWith(prefix + "hi")) {
  let argss = message.content.split(" ").slice(1).join(" ");
    let hiEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setThumbnail(message.author.avatarURL)
    .setColor("RED")
    .setTimestamp()
    .setFooter("Vampires")
    .addField("من سيرفر", message.guild.name, true)
    .addField ("المرسل", message.author.tag, true)
    .addField('محتوى الرسالة.',"" + argss + "")
    
    message.channel.send(hiEmbed);
    
    
    }
    
    
  if(cmd === `${prefix}mute`){
    let mRole = message.guild.roles.find("name", "Discord STAFF")
    if(message.member.roles.has(mRole.id)) {
    }else 
    return message.reply("You do not have the permission to do that.")
  
let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
if(!mUser) return message.reply("Couldn't Find User")

let muterole = message.guild.roles.find('name', "Muted");
if(!muterole){
    try{
muterole = await message.guild.createRole({
    name: "Muted",
    color: "#000000",
    permissions:[],
})
message.guild.channels.forEach(async (channel) => {
    await channel.overwritePermissions(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
    });
});
    }catch(e){
        console.log(e.stack);
    }
}
let mutetime = args[1];
if(!mutetime) return message.reply("Please specify a Time")
let mReason = args.slice(2).join(" ")
if(!mReason) return message.reply("Please Specify a Reason")


await(mUser.addRole(muterole.id));
message.reply(`<@${mUser.id}> has been muted for ${ms(ms(mutetime))}`);

setTimeout(function(){
    mUser.removeRole(muterole.id)
    let hiChannel = bot.channels.get('522277600463159326')
    hiChannel.send(`<@${mUser.id}> has been unmuted!`)
}, ms(mutetime));
let muteEmbed = new Discord.RichEmbed()
.setDescription("NEW MUTE!")
.setColor("#96003e")
.setFooter("UAE")
.setTimestamp()
.addField("For:", `${mUser} ID: ${mUser.id}`)
.addField("By:", `${message.author} ID: ${message.author.id}`)
.addField("Channel:", message.channel)
.addField("Duration", mutetime)
.addField("Reason:", mReason);



let muteChannel = bot.channels.get('522277401724583967').send(muteEmbed)
if(!muteChannel) return message.channel.send("Can't Find Channel");
muteChannel.send(muteEmbed).then(()=>{

    return;
    
})
  }

  if(cmd === `${prefix}fly`){


    let replies = ["https://cdn.discordapp.com/attachments/429271562772938755/519901058252931072/image0.gif",]
    let result = Math.floor((Math.random() * replies.length))
    
      let flyEmbed = new Discord.RichEmbed()
      .setColor("#96003e")
      .setTimestamp()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setTitle("i BELIEVE I CAN FLY")
      .setImage(replies[result])
    
    
    message.channel.send(flyEmbed); 
    }
    if(cmd === `${prefix}fly`){


      let replies = ["https://cdn.discordapp.com/attachments/429271562772938755/519901058252931072/image0.gif",]
      let result = Math.floor((Math.random() * replies.length))
      
        let flyEmbed = new Discord.RichEmbed()
        .setColor("#96003e")
        .setTimestamp()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle("i BELIEVE I CAN FLY")
        .setImage(replies[result])
      
      
      message.channel.send(flyEmbed); 
      }
      if(cmd === `${prefix}fly`){


        let replies = ["https://cdn.discordapp.com/attachments/429271562772938755/519901058252931072/image0.gif",]
        let result = Math.floor((Math.random() * replies.length))
        
          let flyEmbed = new Discord.RichEmbed()
          .setColor("#96003e")
          .setTimestamp()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setTitle("i BELIEVE I CAN FLY")
          .setImage(replies[result])
        
        
        message.channel.send(flyEmbed); 
        }
        if(cmd === `${prefix}fly`){


          let replies = ["https://cdn.discordapp.com/attachments/429271562772938755/519901058252931072/image0.gif",]
          let result = Math.floor((Math.random() * replies.length))
          
            let flyEmbed = new Discord.RichEmbed()
            .setColor("#96003e")
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setTitle("i BELIEVE I CAN FLY")
            .setImage(replies[result])
          
          
          message.channel.send(flyEmbed); 
          }
  if (message.content.startsWith(prefix + "ask")) {
    if(!args[2]) return message.reply("Ask a full question bitch")
    let replies = ["Yes", "No"]
    
    let result = Math.floor((Math.random() * replies.length));
    
    let question = args.slice(0).join(" ")
    
    let RandomEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag)
    .setColor("#42ebf4")
    .addField("Question", question, true)
    .addField("Answer", replies[result])
    
    message.channel.send(RandomEmbed);
    }
  
  if(cmd === `${prefix}wgive`){
    message.delete();
    let wRole = message.guild.roles.find("name", "CUT TWEET MANAGER")
    if(message.member.roles.has(wRole.id)) {
      let roleID = "521645534428004362";
      let member = message.mentions.members.first();
      if(!member) return message.channel.send("Please Mention a User")
      member.addRole(roleID).catch(console.error);
      message.channel.send("**DONE**")
    }else
    message.reply("You do not have the permission to do that.")

  

    let wgEmbed = new Discord.RichEmbed()
    .setDescription("NEW Winner Give!")
    .setColor("#96003e")
    .setTimestamp()
    .addField("For:", `${member} ID: ${member.id}`)
    .addField("By:", `${message.author} ID: ${message.author.id}`)
    .addField("Channel:", message.channel)
    let wChannel = bot.channels.get('520741225662513154').send(wgEmbed)
    if(!wChannel) return message.channel.send("Can't Find Channel");
return;

  }
  if(cmd === `${prefix}wrevoke`){
    message.delete();
    if (message.author.id != "284151161291014144")
    if (message.author.id != "515231975150452758")
    if (message.author.id != "340755335230914561")
    if (!message.author.id) return message.channel.send("Only Cut Tweet Managers Can use this command")
    let role = message.guild.roles.find(r => r.id === "521645534428004362");
    let member = message.mentions.members.first();
    if(!member) return message.channel.send("Please Mention a User")
    member.removeRole(role).catch(console.error);
    message.channel.send("**DONE**")

    let wEmbed = new Discord.RichEmbed()
    .setDescription("NEW Winner REVOKE!")
    .setColor("#96003e")
    .setTimestamp()
    .addField("For:", `${member} ID: ${member.id}`)
    .addField("By:", `${message.author} ID: ${message.author.id}`)
    .addField("Channel:", message.channel)
    let wChannel = bot.channels.get('520741211179581441').send(wEmbed)
    if(!wChannel) return message.channel.send("Can't Find Channel");
return;
  }
  if(cmd === `${prefix}fuck`){
    message.delete();
    let fUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!fUser) return message.channel.send("Please Mention a User")
    let fuckEmbed = new Discord.RichEmbed()
    .setColor("#96003e")
    .setTimestamp()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage("https://cdn.discordapp.com/attachments/464876757472903187/520399573169209344/tenor.gif")
    .setDescription(`${message.author} You have succesfully FUCKED ${fUser}`)
    .setFooter("Vampires")
    return message.channel.send(fuckEmbed); 
  }
  
  if(cmd === `${prefix}rape`){
    message.delete();
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Please Mention a User")
    let rReason = args.join(" ").slice(22);
    if(!rReason) return message.channel.send("What's The Reason :thinking:")
    let rapeEmbed = new Discord.RichEmbed()
    .setColor("#96003e")
    .setTimestamp()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setImage("https://image.prntscr.com/image/SBIU91x3SZWqo_VXRJRkrw.png")
    .setDescription(`${message.author} You have succesfully raped ${rUser}`)
    .addField("Reason:", rReason);



 return message.channel.send(rapeEmbed); 
  }
 if(cmd === `${prefix}hug`){

  let hUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!hUser) return message.channel.send("Please Mention a User")

let replies = ["https://cdn.discordapp.com/attachments/517612631155146766/519874185863102480/hug_3.gif",
 "https://sweetytextmessages.com/wp-content/uploads/2018/10/Super-Cute-Anime-Love-Gifs-1.gif", 
 "https://cdn.discordapp.com/attachments/515936545467924510/519860737296957450/hug.gif",
"https://cdn.discordapp.com/attachments/517612631155146766/519874189507821568/hug2.gif",
"https://cdn.discordapp.com/attachments/517612631155146766/519874191642853386/hug_4.gif",
"https://cdn.discordapp.com/attachments/517612631155146766/519874196558577684/hug_5.gif",
"https://thumbs.gfycat.com/BlindOblongAmurratsnake-small.gif",]
let result = Math.floor((Math.random() * replies.length))

  let hugEmbed = new Discord.RichEmbed()
  .setColor("#96003e")
  .setTimestamp()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setDescription(`${message.author} You have Hugged ${hUser}`)
  .setImage(replies[result])


message.channel.send(hugEmbed); 
 }
if(cmd === `${prefix}kiss`){

  let kiUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kiUser) return message.channel.send("Please Mention a User")

let replies = ["https://thumbs.gfycat.com/FondEvergreenIcterinewarbler-max-1mb.gif",
 "https://data.whicdn.com/images/71929912/original.gif", 
 "https://media1.tenor.com/images/9be36a386cabf6638f5c578989853b38/tenor.gif?itemid=12192867",
"https://media1.tenor.com/images/15a068076a1e6d940e6d5777bed1547a/tenor.gif?itemid=12192869",
"https://25.media.tumblr.com/7b6fa44a9e507fd31b7783797421f6c4/tumblr_mvypcz3LeC1slr9goo1_500.gif",
"https://cdn.discordapp.com/attachments/519617478700171314/519888824860672000/aaa.gif",
"https://cdn.discordapp.com/attachments/519617478700171314/519895147702648833/kiss1.gif",]
let result = Math.floor((Math.random() * replies.length))

  let kissEmbed = new Discord.RichEmbed()
  .setColor("#96003e")
  .setTimestamp()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setDescription(`${message.author} You have Kissed :kissing: ${kiUser}`)
  .setImage(replies[result])


message.channel.send(kissEmbed); 
}
if(cmd === `${prefix}slap`){

  let sUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!sUser) return message.channel.send("Please Mention a User")

let replies = ["https://cdn.discordapp.com/attachments/517612631155146766/519881444177477633/slap5.gif",
"https://cdn.discordapp.com/attachments/517612631155146766/519881453975371776/SLAP3.gif",
"https://cdn.discordapp.com/attachments/517612631155146766/519881459629031432/SLAP4.gif",
"https://cdn.discordapp.com/attachments/517612631155146766/519881476372955137/SLAP2.gif",]
let result = Math.floor((Math.random() * replies.length))

  let slapEmbed = new Discord.RichEmbed()
  .setColor("#96003e")
  .setTimestamp()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setDescription(`${message.author} You have SLAPPED ${sUser}`)
  .setImage(replies[result])


message.channel.send(slapEmbed); 
}


if(cmd === `${prefix}kill`){

  let killUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!killUser) return message.channel.send("Please Mention a User")

let replies = ["https://cdn.discordapp.com/attachments/519617478700171314/519896710735200285/KILL4.gif",
"https://cdn.discordapp.com/attachments/519617478700171314/519896704250806302/KILL3.gif",
"https://cdn.discordapp.com/attachments/519617478700171314/519896707618570240/KILL2.gif",
"https://cdn.discordapp.com/attachments/519617478700171314/519896712026783748/KILL1.gif",]
let result = Math.floor((Math.random() * replies.length))

  let killEmbed = new Discord.RichEmbed()
  .setColor("#96003e")
  .setTimestamp()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setDescription(`${message.author}:dagger::knife: :dagger:You have Killed :dagger::knife: :dagger: ${killUser}`)
  .setImage(replies[result])


message.channel.send(killEmbed); 

  }
  if (cmd === `${prefix}anime`){
    let animeEmbed = new Discord.RichEmbed()
      .setDescription("Anime")
      .setTimestamp()
      .setColor("#96003e")
      .setImage("https://cdn.discordapp.com/attachments/516552351788826626/516664472266342411/image0.png", 200, 200);
      return message.channel.send(animeEmbed); 
  }
  if (cmd === `${prefix}porn`){
    let hubEmbed = new Discord.RichEmbed()
      .setDescription("Porn")
      .setTimestamp()
      .setColor("#96003e")
      .setImage("https://image.prntscr.com/image/tgIgtalKRYeAz_B9BGJAeg.png", 200, 200);
    return message.channel.send(hubEmbed); 
  }
     if(cmd === `${prefix}help`) {
      let helpEmbed = new Discord.RichEmbed()
      .setDescription("Server Information - Thank you for using our bot")
      .setTitle("Help")
      .setTimestamp()
      .setColor("#3498db")
      .addField("$info","gives you info about the server") 
    
      return message.channel.send(helpEmbed); 
     }

  if(cmd === `${prefix}ban`){
    message.delete();
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Please Mention a User")
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINSTRATION")) return message.channel.send("No m8 you can't do that");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No m8 you can't kick em");

    let banEmbed = new Discord.RichEmbed()
      .setDescription("NEW BAN!")
      .setColor("#96003e")
      .setTimestamp()
      .addField("For:", `${bUser} ID: ${bUser.id}`)
      .addField("By:", `${message.author} ID: ${message.author.id}`)
      .addField("Channel:", message.channel)
      .addField("Reason:", bReason);


    let banChannel = bot.channels.get('517612704223985666').send(banEmbed)
    if(!banChannel) return message.channel.send("Can't Find Channel");
    message.guild.member(bUser).ban(bReason).then(message.channel.send("**DONE!**")).then(()=>{
      banChannel.send(banEmbed).then(()=>{
        return;
      })
    })
   }
  
  if (cmd === `${prefix}kick`){
    message.delete();
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Please Mention a User")
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No m8 you can't do that");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No m8 you can't kick em");
  
    let kickEmbed = new Discord.RichEmbed()
      .setDescription("NEW KICK!")
      .setColor("#96003e")
      .setTimestamp()
      .addField("For:", `${kUser} ID: ${kUser.id}`)
      .addField("By:", `${message.author} ID: ${message.author.id}`)
      .addField("Channel:", message.channel)
      .addField("Reason:", kReason);

    let kickChannel = bot.channels.get('517612805608701952').send(kickEmbed)
    if(!kickChannel) return message.channel.send("Can't Find Channel");
    message.guild.member(kUser).kick(kReason).then(message.channel.send("**DONE!**")).then(()=>{
      kickChannel.send(kickEmbed).then(()=>{
          return;
      })
    })
 



  
    
  }

    if (cmd === `${prefix}info`){
      let bicon = bot.user.displayAvatarURL;
      let botEmbed = new Discord.RichEmbed()
        .setDescription("Server Information - Thank you for using our bot")
        .setThumbnail(bicon)
        .setTimestamp()
        .setColor("#96003e")
        .addField("Server Name", message.guild.name)
        .addField("You Joined At", message.member.joinedAt)
        .addField("Server Created On", message.guild.createdAt)
        .addField("Total Members", message.guild.memberCount)
  
      return message.channel.send(botEmbed); 
     }
    
    


     if (cmd === `${prefix}warn`){
      if (message.author.id != "284151161291014144") return;
      let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      let wReason = args.join(" ").slice(22);
    message.delete().catch();
    let botmessage = args.join(" ");
    message.channel.send(botmessage);
    
    let warnEmbed = new Discord.RichEmbed()
    .setDescription("NEW WARN!")
    .setColor("#96003e")
    .setTimestamp()
    .addField("For:", `${wUser} ID: ${wUser.id}`)
    .addField("By:", `${message.author} ID: ${message.author.id}`)
    .addField("Channel:", message.channel)
    .addField("Reason:", wReason);
    
    let warnChannel = bot.channels.get('517612689565024257').send(warnEmbed)
    if(!warnChannel) return message.channel.send("Can't Find Channel");
      warnChannel.send(warnEmbed).then(()=>{
    return;
      })
    }
  if (message.content.startsWith(prefix + "clear")) {
    message.delete();
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("**You cannot do this command**")
    if(!args[0]) return message.channel.send("Specify a Number")
    message.channel.bulkDelete(args[0]).then(()=> {
      message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
    });
  }
})

bot.on(`message`, message=>{
  if (message.content.startsWith(prefix + "bc")) {
    if (message.author.id != "502848560623255562")
    if (message.author.id != "284151161291014144") return;
    let args = message.content.split(" ").slice(1);
    var argresult = args.join(' '); 
        let hiEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .setColor("RED")
        .setTimestamp()
        .setFooter("Vampires")
        .addField("من سيرفر", message.guild.name, true)
        .addField ("المرسل", message.author.tag, true)
        .addField('محتوى الرسالة.',"" + argresult + "")
        
        
    message.guild.members.filter(m => m.presence.status !== 'offline').forEach(m => {
      m.send(hiEmbed);
    })
    message.channel.send(`\`${message.guild.members.filter(m => m.presence.status !== 'online').size}\` : عدد الاعضاء المستلمين`)
    message.delete();
  }
})


bot.on('message', message=>{
  if(message.channel.name == undefined){
    if(!message.author.bot){
      let args = message.content.split(" ").slice(0).join(" ");
      let embedArgs = new Discord.RichEmbed()
        .setAuthor('I have received a new DM !')
        .addField('message content:',"```" + args + "```")
        .setThumbnail(message.author.avatarURL)
        .setFooter('From **' + message.author.username + "#" + message.author.discriminator + ' (' + message.author.id + ')** ')
        .setTimestamp()
      bot.channels.get('517612714844225566').send(embedArgs)
    }
  }
})
const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
 }
bot.on("message", message => {
  const args = message.content.split(" ").slice(1);
  if (message.content.startsWith(prefix + "eval")) {
    if (message.author.id != "284151161291014144") return;
    try{
      const code = args.join(" ");
      let evaled = eval(code);
      if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);
      message.channel.send(clean(evaled), {code:"xl"});
    }catch (err){
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
}
  }
})

bot.on("messageUpdate", async(oldMessage, newMessage) => {

  if (oldMessage.content === newMessage.content){
  return;
  }
  var logchannel = bot.channels.get("519549974200188953")
  
  let logEmbed = new Discord.RichEmbed()
  .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
  .setThumbnail(oldMessage.author.avatarURL)
  .setColor("#96003e")
  .setDescription("Message Edited :slight_smile: :thumbsup:")
  .setTimestamp()
  .addField("Before", oldMessage.content, true)
  .addField("After", newMessage.content, true)
  
  logchannel.send(logEmbed);
})
bot.on("messageDelete", async message => {


  var deletechannel = bot.channels.get("519558373964906506")
  
  let deleteEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setThumbnail(message.author.avatarURL)
  .setColor("#96003e")
  .setDescription(":wastebasket: Message Deleted")
  .setTimestamp()
  .addField("Message", message.content, true)
  
  deletechannel.send(deleteEmbed);
})


bot.login(process.env.BOT_TOKEN)
