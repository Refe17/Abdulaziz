const moment = require('moment');
const ms = require("ms");
const fs = require("fs")
const bantimer = JSON.parse(fs.readFileSync("./timer/bantimer.json", "utf8"));
const banlist = JSON.parse(fs.readFileSync("./banlist.json", "utf8"));


module.exports.run = async (bot, msg, args, custom_functions) => {
    msg.delete();
    let tagged = msg.guild.member(msg.mentions.users.first() || args[1]);
    let i = parseInt(args[2], 10)
    if(!tagged) return msg.reply(`الرجاء تحديد الشخص`).then(msg=>{
        msg.delete(ms(`2 seconds`));
    })
    if(msg.member.roles.has('507567590340558848')) msg.reply(`لا يمكنك حظره!`).then(msg=>{
        msg.delete(ms(`2.5 seconds`))
    })
    if(tagged.bot) return msg.reply(`لا يمكنك حظر بوت!`).then(msg=>{
        msg.delete(ms(`2.5 seconds`));
    })
    if(!msg.guild.member(tagged).bannable) return msg.reply(`لا استطيع حظره!`).then(msg=>{
        msg.delete(ms(`2.5 seconds`));
    })
    var rn = banlist[i].reason;
    var time = banlist[i].timeins;
    let unqieID = Date.now() + tagged.discriminator + msg.author.discriminator;
    var embed = new Discord.RichEmbed()
        .setTitle(`New Ban!`)
        .addField(`Banned:`, `<@${tagged.id}> | ${tagged.id}`)
        .addField(`By:`, `<@${msg.author.id}> | ${msg.author.id}`)
        .addField(`Reason:`, rn)
        .addField(`Duration:`, toTime.fromSeconds(time).humanize())
        .setFooter(`Case ID: ${unqieID}`)
        .setColor("DARK_RED")
        .setTimestamp()
        .setThumbnail(tagged.avatarURL)
    msg.guild.member(tagged).ban(rn).then(()=>{
        bot.channels.get('523612546037448706').send(embed).then(()=>{
          bantimer[tagged.id] = {
            guild: msg.guild.id,
            time: Date.now() + toTime.fromSeconds(time).ms(),
            unqieID: unqieID,
          }
          fs.writeFile('./timer/bantimer.json', JSON.stringify(bantimer, null, 4), err =>{
            if(err) throw err;
          })
          let now = moment();
          let sql = `insert into discord_bans(User, UserBy, Reason, UniqeID, Date, isBanned) values ("${tagged.id}", "${msg.author.id}", "${rn}", "${unqieID}", "${now.format('YYYY-MM-DD HH:mm:ss')}", "${true}")`;
          con.query(sql)
          msg.reply(`Done!`)
        })
    })
}
 
module.exports.help = {
  name: "aban",
  aliases: ["ban", "b"],
  permission: 2,
}
