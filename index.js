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

  if(cmd === `${prefix}rape`){
    message.delete();
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Please Mention a User")
    let rReason = args.join(" ").slice(22);
    if(!rReason) return message.channel.send("Please make a reason to annihilate the ass / pussy of this poor human")
    let rapeEmbed = new Discord.RichEmbed()
  .setDescription("POLICE IS COMING RUN")
  .setColor("#96003e")
  .setTitle("RAPE INCOMING")
  .setTimestamp()
  .setImage("https://image.prntscr.com/image/SBIU91x3SZWqo_VXRJRkrw.png")
  .addField("You have succesfully raped", `${rUser}`)
  .addField("RAPIST", `${message.author}`)
  .addField("Reason:", rReason);
  



 return message.channel.send(rapeEmbed); 

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
bot.login(process.env.BOT_TOKEN)
