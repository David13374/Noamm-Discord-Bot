require('dotenv').config();

const { Client, Events, GatewayIntentBits } = require('discord.js');

let token = process.env.DISCORD_TOKEN

const client = new Client({ intents: [GatewayIntentBits.Guilds]})

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Sucessfully logged in as ${readyClient.user.tag}`)
})

client.on(Events.MessageCreate, (message) => {
    //console.log(`message: ${message.content}`)
    let content = message.content

    
})

client.login(token)