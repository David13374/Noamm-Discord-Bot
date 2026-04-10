const { REST, Routes } = require('discord.js')
require('dotenv').config()

const token = process.env.DISCORD_BOT_TOKEN
const appId = process.env.CLIENT_ID
const testServer = process.env.TEST_SERVER

const fs = require('node:fs')
const path = require('node:path')
const commands = []

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(Routes.applicationGuildCommands(appId, testServer), { body: commands });
        //const data = await rest.put(Routes.applicationCommands(appId), { body: commands});
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();