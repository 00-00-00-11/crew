const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {   
  const embed = new Discord.RichEmbed()
        .setTitle("Reboot")
        .setDescription("rebooting")
        .setColor(0xFF4500);
  
  let owners = process.env.OWNER.split(',');
  
  if (!owners.includes(message.author.id))  {
    embed
      .setTitle("Reboot")
      .setDescription("ur not an owner");
    
    return message.channel.send(embed);
  }

  await message.channel.send(embed);
  
  process.exit(1);
};

exports.help = {
  name: "reboot",
  category: "Staff",
  description: "Reboot the bot.",
  usage: "~reboot"
};