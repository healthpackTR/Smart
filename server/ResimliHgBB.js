const Discord = require('discord.js')
const open = require('../open.json')

exports.run = async(client, message, args, p,db) => {
let ne = args[0]
if(ne == "ayarla"){
let ch = message.mentions.channels.first()||message.guild.channels.cache.get(args[1])
if(!ch || ch.type !== "text")return client.sendFalse(`Resimli **HG BB** Kanalını Ayarlamak İçin Etiketlemelisin`,message.channel)
  
  await db.findOneAndUpdate({sunucu : message.guild.id},{$set : {resimli : ch.id}})
  client.sendTrue(`Resimli Hg BB kanalı **${ch}** Olarak Ayarlandı`,message.channel)
}else if(ne == "kapat"){
let c = await db.findOne({sunucu : message.guild.id})
if(!c.resimli) return client.sendFalse('Resimli Hg BB zaten ayarlanmamış') 
  
  await db.findOneAndUpdate({sunucu : message.guild.id},{$set : {resimli : null}})
  client.sendTrue(`Resimli **HG BB** Başarıyla Kapatıldı.`,message.channel)
} else{
  const resim = new Discord.MessageEmbed().setTitle('Resimli HG BB Sistemi').setURL('https://discord.com/api/oauth2/authorize?client_id=769110620359622676&permissions=8&scope=bot')
  .addField(`__${p}resimli-hg-bb ayarla #kanal__`,`Resimli HG BB yi Ayarlamak İçin`)
  .addField(`__${p}resimli-hg-bb kapat__`,`Bu Şekilde Kapatabilirsiniz`)
  .setFooter('Resimli HG BB Sistem')
  .setImage('https://cdn.discordapp.com/attachments/781191198315905035/781212276363493386/Gorusuruz.png')
}
}
exports.help = {
    name : "resimli-hg-bb",
    aliases : ['resimlihgbb','resimli-hg'],
    open : [true],
    perm : "no"
   
}
exports.play = {
    usage : "resimli-hg-bb #kanal",
    description : "Resimli Hg Bb kanalları ayarlarsınız"
}
