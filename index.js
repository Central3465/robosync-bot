require("dotenv").config();
const {
  Client,
  Intents,
  GatewayIntentBits,
  EmbedBuilder,
  IntentsBitField,
  Options,
  userMention,
  ApplicationCommandOptionType,
  ActivityType,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Assuming you have a Map or other data structure to store user ranks
const userRanks = new Map();

const status = [
  { name: "RoboSync", type: ActivityType.Playing },
  // Add other status options as needed
];

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  client.user.setActivity({
    name: `${status[0].name}, for help use /help.`,
    type: ActivityType.Playing,
  });
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === "hello") {
    message.reply("hello");
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "session") {
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Shift Result")
      .setURL("https://app.robosync.net/sessions/shiftlogs/")
      .setAuthor({ name: "xCentral" })
      .setDescription("xCentral's shift has ended.")
      //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
      .addFields(
        {
          name: "Session Details:",
          value: "If there is an error, please message your supervisor.",
        },
        //{ name: '\u200B', value: '\u200B' },
        { name: "Host:", value: "xCentral [CFL]", inline: true },
        { name: "Co-Host:", value: "xba_ii [BoG]", inline: true },
        { name: "Supervisor:", value: "N/A", inline: true },
        { name: "Ranker:", value: "N/A", inline: true },
        { name: "Total Attendees:", value: "12", inline: true },
        {
          name: "Hardest Workers:",
          value: "iluvprison [PI] , woohoooo [CP] , prisongamesisbest [CD]",
          inline: true,
        },
        { name: "Drill Hosted:", value: "Evacuation", inline: true }
      )
      .addFields({
        name: "Shift Log",
        value: "https://app.robosync.net/sessions/shiftlogs/",
        inline: true,
      })
      //.setImage('https://i.imgur.com/AfFp7pu.png')
      //.setTimestamp()
      .setFooter({ text: "RoboSync Session System" });

    message.channel.send({ embeds: [embed] });
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { guild, user, commandName, options } = interaction;
  const { MessageEmbed } = require("discord.js");

  if (commandName === "verify") {
    return interaction.reply(`You are currently verified as ${user.username}.`);
  }

  if (commandName === "organisation") {
    return interaction.reply(`This guild is linked to ${guild.name}.`);
  }

  if (commandName === "getroles") {
    const embed = new EmbedBuilder()
      .setTitle(`Welcome to ${guild.name}, ${user.username}!`)
      .setColor("Red")
      .addFields(
        {
          name: "✅ Added Roles:",
          value: "None",
          inline: true,
        },
        {
          name: "❌ Removed Roles:",
          value: "None",
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
  }

  if (commandName === "ping") {
    return interaction.reply(`🏓 Pong!`);
  }

  if (commandName === "user") {
    return interaction.reply(
      "There was an error while retrieving a Roblox account!"
    );
  }

  if (commandName === "setrank") {
    const username = options.getUser("username");
    const rank = options.getRole("rank");
    const executor = interaction.member;
    if (!executor.permissions.has("1184560195087630396")) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
    return interaction.reply(`${username} has been ranked to ${rank}.`);
  }

  if (commandName === "update") {
    const username = options.getUser("username");
    const executor = interaction.member;
    // Create an embed
    const embed = new EmbedBuilder().setColor("Red").addFields(
      {
        name: "✅ Added Roles:",
        value: "None",
        inline: true,
      },
      {
        name: "❌ Removed Roles:",
        value: "None",
        inline: true,
      }
    );

    if (!executor.permissions.has("1184560195087630396")) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }

    // Reply with both text and embed
    interaction.reply({
      content: `${username} has been updated!`,
      embeds: [embed],
    });
  }
  if (commandName === "shiftstart") {
    const host = options.getString("host");
    const cohost = options.getString("co-host");
    const supervisor = options.getString("supervisor");
    const name = options.getString("username");
    const executor = interaction.member;

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Starting Shift")
      .setURL("https://app.robosync.net/sessions/shifts/")
      .setAuthor({ name: name })
      .setDescription(`${name} is starting a shift!`)
      .addFields(
        {
          name: "Session Details",
          value: "Come along for a chance to get promoted!",
        },
        { name: "Host:", value: `${host}`, inline: true },
        { name: "Co-Host:", value: `${cohost}`, inline: true },
        { name: "Supervisor:", value: `${supervisor}`, inline: true }
      )
      .addFields({
        name: "Session Status",
        value: "Open | Waiting for attendees",
        inline: true,
      })
      .addFields({
        name: "Warp Link",
        value: `https://app.robosync.net/sessions/shifts/${name}`,
        inline: true,
      })
      .setFooter({ text: "RoboSync Session System" });

    interaction.reply({ embeds: [embed] });

    if (!executor.permissions.has("1199799973592711208")) {
      return interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
  }

  if (interaction.commandName === "help") {
    const helpEmbed = new EmbedBuilder()
      .setTitle("RoboSync Commands")
      .setDescription("All the available commands and their functions.")
      .setColor("Red")
      .addFields(
        { name: "Ping", value: "Shows your current ping latency." },
        {
          name: "Verify",
          value: "Verifies your Roblox account.",
          inline: true,
        },
        {
          name: "GetRoles",
          value: "Syncs your roles with the Roblox group.",
          inline: true,
        },
        {
          name: "Organisation",
          value: "Shows the linked RoboSync organisation.",
          inline: true,
        },
        { name: "User", value: "Grabs a user's Roblox account.", inline: true },
        {
          name: "Help",
          value: "Shows all the available commands.",
          inline: true,
        }
      );

    interaction.reply({ embeds: [helpEmbed] });
  }
}),
  client.on("error", (error) => {
    console.error("Error:", error);
  });

client.on("interactionCreate", (interaction) => {
  console.log("Interaction received:", interaction);
  // Your interaction handling logic here
});

client.login(process.env.TOKEN);
