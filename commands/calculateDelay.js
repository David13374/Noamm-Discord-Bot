const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('calculatedelay')
        .setDescription('Calculates the recommended delay for the inserted ping')
        .addNumberOption((option) => option.setName('ping').setDescription('Insert your ping here').setRequired(true)),
    async execute(interaction) {
        const ping = interaction.options.getNumber('ping')
        const medianPing = 150 - ping

        if (medianPing <= 0) await interaction.reply(`min: 0ms, max: 0ms`)
        else await interaction.reply(`min: ${ 0.8 * medianPing }ms, max: ${ 1.2 * medianPing }ms`)
    }
}