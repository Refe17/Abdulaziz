const Discord = require ("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const prefix = "$"
bot.commands = new Discord.Collection();

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
  if(commandfile) commandfile.run(bot,message,args);
  
  if(cmd === `${prefix}wgive`){
    message.delete();
    if(message.member.roles.has(r => r.id === "520744618698997760"))
   if(!message.member.roles) return message.channel.send(an8l3)
    let role = message.guild.roles.find(r => r.id === "520737346321252377");
    if(!role) return message.channel.send("Couldn't Find This Role")
    let member = message.mentions.members.first();
    if(!member) return message.channel.send("Please Mention a User")
    member.addRole(role).catch(console.error);
    message.channel.send("**DONE**")

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
    let role = message.guild.roles.find(r => r.id === "520737346321252377");
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
    message.guild.members.filter(m => m.presence.status !== 'offline').forEach(m => {
      m.send(`${argresult}\n ${m}`);
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
