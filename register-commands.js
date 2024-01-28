require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType, PermissionFlagsBits} = require('discord.js');

const commands = [
  {
    name: 'verify',
    description: 'Verifies your Roblox account.',
  },
  {
    name: 'getroles',
    description: 'Syncs your roles with the Roblox Group.',
  },
  {
    name: 'ping',
    description: 'Grabs your ping latency.',
  },
  {
    name: 'shiftstart',
    description: "Manually starts your shift up.",
    options: [
      {
        name: 'host',
        description: 'Host Username + Rank',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'co-host',
        description: 'Co-Host Username + Rank',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'supervisor',
        description: 'Supervisor Username + Rank',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'username',
        description: 'Your Username',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: 'user',
    description: "Retrieve information about someone's Roblox account.",
    options: [
      {
        name: 'username',
        description: 'Their Roblox Username',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: 'organisation',
    description: 'Shows the linked RoboSync organisation.',
  },
  {
    name: 'update',
    description: "Force update a user's roles.",
    options: [
        {
            name: 'username',
            description: 'Their Username',
            type: ApplicationCommandOptionType.User,
            required: true
        },
    ],
  },
  {
    name: 'setrank',
    description: "Sets a user rank.",
    options: [
        {
            name: 'username',
            description: 'Their Username',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
          name: 'rank',
          description: 'Rank',
          type: ApplicationCommandOptionType.Role,
          required: true
      },
    ],
  },
  {
    name: 'help',
    description: 'Shows all available commands and their functions.',
  }
];

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering global slash commands...');

    // Register global commands
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('Global slash commands were registered successfully!');

    console.log('Registering guild slash commands...');

    // Register guild-specific commands (replace GUILD_ID with the actual guild ID)
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('Guild slash commands were registered successfully!');
  } catch (error) {
    console.error(`Error registering slash commands: ${error.message}`);
  }
})();
