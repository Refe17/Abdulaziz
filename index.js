const Discord = require ("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const prefix = "$"
bot.commands = new Discord.Collection();

bot.on(`ready`, ()=>{
bot.user.setStatus("dnd")
bot.user.setGame(`رابط | BlackShop`, "https://www.twitch.tv/azoqzmj")
})
bot.on('message', message => {
  if (message.content.startsWith("رابط")) {
    if(!message.author.bot)

message.channel.createInvite({
      thing: true,
      maxUses: 100,
      maxAge: 86400
  }).then(invite =>
    message.author.sendMessage(invite.url))

message.channel.send("**تم ارسال الرابط برسالة خاصة**")
message.author.send(`**مدة الرابط : يـوم
عدد استخدامات الرابط : 100**`)
  }
  bot.on(`ready`, () =>{
    console.log(`Bot Launched...`)

  });

  bot.on(`guildMemberAdd`, member => {
    console.log(`User ` + member.user + `has joined the server!` )

    var role = member.guild.roles.find(`name`, `Member`)

    member.addRole(role)
  });
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
