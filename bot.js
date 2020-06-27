// !!!!!!!!!!!!!!!!!!!!! //
//   Put token in .env   //
// !!!!!!!!!!!!!!!!!!!!! //
const db = require("quick.db")
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require("request")
const cheerio = require("cheerio")
// the prefix before commands
let prefix = '*';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
  if (message.guild.id !== "725671583452233800") return;
let args = message.content.split(" ").slice(1)
  //if (message.content.startsWith(".catch")) {
  //  if(message.author.id !== "700308551154794546") return
   request("https://testemod.000webhostapp.com/novoarquivio.txt", function (error,response,body) {
   //if (body.replace(" ","") !== "jogador1") return
  
  //  if (await db.fetch("jogador") == null || await db.fetch("jogador") !== "1") {
   //   db.set("jogador","1")
      //message.reply("teste")
    
  
  if (message.content.startsWith('')) {
   //if (await db.fetch("jogador") !== "1") return;
    if (message.author.id !== "665301904791699476") return;
  console.log(message.embeds[0])
 if(!message.embeds[0]) return;
 if (!message.embeds[0].description.startsWith("Guess the pokémon аnd type")) return;// .cаtch <pokémon> to cаtch it!") return
   let url = message.embeds[0].image.url
      //  let url = message.embeds[0].thumbnail.url
  
    
    const request = require('request');
const cheerio = require('cheerio')
const blackList= [
    "Imagens",
    "The",
    "Celebrate",
    "Pokemon",
    "Pokémon"
]
    

request({
    url: 'https://images.google.com/searchbyimage?image_url=' + url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    },
  }, (error, response, body) => {
      let html = cheerio.load(body)
      let names = [];
      html('h3').each(function(i, elem) {
          let arr = html(this).text().split(" ");
          let name  = arr[0].replace(":","");
          if(blackList.indexOf(name) == -1 && isNaN(name)){
        if(name.toLowerCase() == "mega"){
            name += " " + arr[1];
        }
        if( names.indexOf(name) == -1 ){
          names.push(name);
        }
          }
      });
 for (let i = 0; i < names.length; i++) {
   let q = names[i].toLowerCase()
  request("https://pokeapi.co/api/v2/pokemon/" + q, (er, re, bd) => {
    if (bd == "Not Found") return
  })
   let pref = message.embeds[0].description
   let pref1 = pref.split(" ")

   message.channel.startTyping()
   setTimeout(() => {
    message.channel.send(">name" + q.replace("mimikyu's","mimikyu"))
 
     message.channel.stopTyping()
   },50)
   
  /*
   message.channel.startTyping()
   setTimeout(() => {
     message.channel.send(".info latest")
     message.channel.stopTyping()
   },2000)*/
  break;
  
  
    
    
 }
//message.channel.send("Possiveis Nomes: \n" + names.join("\n"));
  });
  }
   })
    
  
  /*
  if (message.content.startsWith("This is the wrong")) {
    if(message.author.id !== "365975655608745985") return;
    setTimeout(() => {
    message.channel.send(".hint")
    },3000)
  }
  */
})

// use .env
client.login(process.env.TOKEN);