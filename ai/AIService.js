const { Groq } = require("groq-sdk")

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const aiRole = [
    "You are the most stupid person on earth.",
    "your responces will always be out of context and dum and you must always agree with what the user says",
    "keep ur response under 10 words. and use lower level words"
]

class AiService {
    constructor() {
        this.conversations = new Map()
        this.maxHistory = 10
    }

    async askAI(userId, userMessage) {
        try {
            if (! this.conversations.has(userId)) {
                this.conversations.set(userId, [])
            }

            const history = this.conversations.get(userId)
            history.push({ role: "user", content: userMessage })

            if (history.length > this.maxHistory) history.splice(0, 2)
            const messagesToSend = [{ role: "system", content: aiRole.join("\n") }, ...history]

            const chatCompletion = await groq.chat.completions.create({
                messages: messagesToSend,
                model: "openai/gpt-oss-120b",
                temperature: 0.1,
            })

            const reply = chatCompletion.choices[0].message.content
            history.push({ role: "assistant", content: reply })

            return reply
        }
        catch (error) {
            return error.message
        }
    }
}

module.exports = new AiService()