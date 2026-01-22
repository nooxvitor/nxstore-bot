const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("solicitar")
        .setDescription("🎯 Solicite um setup personalizado para seu servidor"),

    async execute(interaction) {
        const embedPrincipal = new EmbedBuilder()
            .setTitle("🎯 SOLICITAÇÃO DE SETUP")
            .setDescription("**NX STORE - SETUP PROFISSIONAL**\n\nEscolha o tipo de setup:")
            .setColor(0x5865F2)
            .setFooter({ text: "NX Store" })
            .setTimestamp();

        const embedCliente = new EmbedBuilder()
            .setTitle("👑 SETUP CLIENTE")
            .setDescription("**Para:** Lojas, Vendas\n**Inclui:** Produtos, Tickets, Painel")
            .setColor(0xFFD700);

        const embedAmigo = new EmbedBuilder()
            .setTitle("🎮 SETUP AMIGO")
            .setDescription("**Para:** Comunidades, Amigos\n**Inclui:** Jogos, Eventos, Mídia")
            .setColor(0x5865F2);

        const embedAmbos = new EmbedBuilder()
            .setTitle("🌟 SETUP COMPLETO")
            .setDescription("**CLIENTE + AMIGO**\nSeparação automática de áreas")
            .setColor(0x9B59B6);

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("solicitar_cliente")
                    .setLabel("👑 Cliente")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("solicitar_amigo")
                    .setLabel("🎮 Amigo")
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("solicitar_ambos")
                    .setLabel("🌟 Ambos")
                    .setStyle(ButtonStyle.Danger)
            );

        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("solicitar_info")
                    .setLabel("ℹ️ Info")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("solicitar_cancelar")
                    .setLabel("❌ Cancelar")
                    .setStyle(ButtonStyle.Secondary)
            );

        await interaction.reply({ 
            embeds: [embedPrincipal, embedCliente, embedAmigo, embedAmbos], 
            components: [row1, row2]
        });
    }
};