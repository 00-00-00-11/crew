const fs = require('fs');
const http = require('http');
const chalk = require('chalk');
let id = 0;
const db = require('./Pokemons.json')
const imghash = require('imghash');
const request = require('request').defaults({ encoding: null });
let on = true;
const Discord = require('discord.js');
const client = new Discord.Client();
let guildid = "505493056770801666";
const express = require('express');
const app = express();

let botmessage = "";
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.commands = new Discord.Collection();
client.cmdhelp = new Discord.Collection();


client.loadCommands = () => {
  fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);

    let jsFiles = files.filter(f => f.split('.').pop() === 'js');

    console.log(`LOG Loading a total of ${jsFiles.length} commands.`);

    jsFiles.forEach((f, i) => {
      delete require.cache[require.resolve(`./commands/${ f }`)];
      let props = require(`./commands/${ f }`);
      console.log("LOG Loading command: " + f);
      client.commands.set(f, props);
      client.cmdhelp.set(props.help.name, props.help);
    });
  });
};

client.loadCommands();

client.on('ready', () => {
  console.log(`READY Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity(`catching pokemon`);
});

client.on('error', error => {
  console.log(`ERROR ${error}`);
  client.log(error, "Error", "error");
});

client.on('message', async message => {
  
  
  try {
  	let embed = new Discord.RichEmbed()
  		.setColor(0x00ffff);
     
      if (message.author.id == '511193058566733849'&& message.guild.id == guildid && on) {
      message.embeds.forEach((e) => {
        for(var i = 0; i < message.embeds.length; i++){
        if (message.embeds[i].title.includes("Wild") || message.embeds[i].title.includes("wild")) {
          if (e.image) {
            let url = e.image.url;
            
            request(url, async function(err, res, body) {
              if (err !== null) return;  
            
              imghash
                .hash(body)
                .then(hash => {
                  let result = db[hash];
                  
                  if (result === undefined) {
                  message.channel.send("pokemon not in the database");
                  }
                
                  message.channel.send("p!catch " + result).then((msg)=>{
                    msg.edit("gay");
    //your code here! msg.edit will work here.
})
                  
     
                
                  })
            });
          }
        }
      }
      });
    }

    if (message.author.bot) return;

    let prefix = true;
	  let args = message.content;
  	let command = "";
    
    if (message.content.startsWith("<@" + client.user.id + ">")) {
      prefix = "<@" + client.user.id + ">";
    }
    else if (message.content.startsWith(".")) {
      prefix = ".";
    } else {
      return;
    }
    
    args = message.content.slice(prefix.length).trim().split(/ +/g);
    command = args.shift().toLowerCase();

    if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    }
    
    let cmd = client.commands.get(command + ".js");
    
    if (cmd) {
      cmd.run(client, message, args);
      console.log(`[${message.guild.name}/#${message.channel.name}] ${message.author.tag} (${message.author.id}): ${cmd.help.name}`);
    }
  } catch (error3) {
    console.log("ERROR at Message: " + error3);
//      client.log(error3, "Error at Message", "error");
  }
  if(message.content.startsWith(".stop")){
    if(!on){
      console.log("**the bot is already off**");
      return;
    }
    console.log("``bot stopped`` ✅");
    on = false;
     
  }
  if(message.content.startsWith(".start")){
    if(on){
      console.log("**the bot is already on**");
      return;
    }
    console.log("``bot started`` ✅");
    on = true;
  }
  /*if(message.content.startsWith(".spam")){
    if(!on){
      message.channel.send("the bot is off");
      return;
    }
    var interval = setInterval (function () {
       message.channel.send("spam");
      if(!on){
        return;
      }
      }, 1 * 1000); 
  }
  */
});

client.clean = async (text) => {
  if (text && text.constructor.name == "Promise")
    text = await text;
  
  if (typeof evaled !== "string")
    text = require("util").inspect(text, {depth: 1});

  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203))
    .replace(process.env.TOKEN, "--NO--TOKEN--");

  return text;
};

client.login(process.env.TOKEN);