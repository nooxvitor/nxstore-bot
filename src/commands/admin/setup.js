const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("🔧 Cria servidor profissional completo (APAGA TUDO)")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        try {
            await interaction.deferReply({ ephemeral: true });

            const embed = new EmbedBuilder()
                .setTitle("🚀 SETUP PROFISSIONAL - NX STORE")
                .setDescription("**⚠️ ATENÇÃO: ISSO VAI APAGAR TUDO NO SERVIDOR!**\n\n**O que será criado:**")
                .addFields(
                    { name: "👑 **ALTO ESCALÃO**", value: "• Painel de Controle privado\n• Cargos administrativos\n• Sistema de monitoramento" },
                    { name: "🛍️ **MUNDO LOJA**", value: "• Categoria Vendas/Produtos\n• Sistema de tickets\n• Área de atendimento\n• Cargos de equipe" },
                    { name: "🎮 **MUNDO COMUNIDADE**", value: "• Categoria Jogos/Diversão\n• Salas de voz temáticas\n• Eventos e mídia\n• Cargos sociais" },
                    { name: "📊 **INFRAESTRUTURA**", value: "• 20+ cargos organizados\n• Permissões automáticas\n• Canais categorizados\n• Sistema de boas-vindas" }
                )
                .setColor(0xFF0000)
                .setFooter({ text: "Esta ação é irreversível! Crie backup se necessário." });

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("setup_pro_sim")
                        .setLabel("✅ SIM, APAGAR TUDO E CRIAR")
                        .setStyle(ButtonStyle.Danger),
                    new ButtonBuilder()
                        .setCustomId("setup_pro_nao")
                        .setLabel("❌ NÃO, CANCELAR")
                        .setStyle(ButtonStyle.Secondary)
                );

            await interaction.editReply({ 
                embeds: [embed], 
                components: [row],
                content: "**⚠️ CONFIRMAÇÃO REQUERIDA ⚠️**" 
            });
            
        } catch (error) {
            console.error('Erro setup:', error);
            await interaction.editReply({ content: '❌ Erro no setup.', ephemeral: true });
        }
    }
};
