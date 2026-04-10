const { Events } = require('discord.js')

const matchDelayMessage = content => delayMessages.some(keyword => content.includes(keyword))
const matchAutotermMessage = content => autotermMessages.some(keyword => content.includes(keyword))

const autotermMessages = ["autoterm", "autoterminal", "auto term", "auto terminal"]
const delayMessages = ["delay", "settings"]
const delay = 3000

let lastSent = 0

const replyMessage = [
    "The delay is ping based so the median value should be around 150 - ping. If this result is negative then you probably can use 0 delay!",
    "Random delay is based on a Gaussian Distribution so your min and max should usually be around 80% - 120% of the calculated median respectively.",
    "",
    "For example: if you have 100 ping it will be 150 - 100 = 50. so your delay range should be 40 - 60ms"
]

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(message) {
        if (message.author.bot) return

        const content = message.content.toLowerCase()
        const channel = message.channel
        const time = Date.now()
        const timeElapsed = time - lastSent

        if (timeElapsed < delay) return
        if (!channel) return

        lastSent = time

        if (matchDelayMessage(content) && matchAutotermMessage(content)) {
            try {
                await message.reply(replyMessage.join('\n'))
            }
            catch (err) {
                console.error("Failed to send message:", err)
            }
        }
    }
}