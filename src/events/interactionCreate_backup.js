const { ChannelType, PermissionsBitField } = require("discord.js");

module.exports = {
    async execute(interaction, client) {
        const { customId, guild } = interaction;
        
        await interaction.deferUpdate();
        
        switch (customId) {
            case "setup_bot":
                try {
                    await interaction.followUp({ 
                        content: "��� **INICIANDO SETUP BOT**\n⚠️ Apagando TODOS os canais e categorias...", 
                        ephemeral: true 
                    });
                    
                    // ... (código original do setup bot)
                    
                } catch (error) {
                    console.error("Erro no setup_bot:", error);
                    await interaction.followUp({ 
                        content: "❌ Erro ao executar Setup Bot.", 
                        ephemeral: true 
                    });
                }
                break;
                
            case "setup_casual":
                try {
                    // ... (código original do setup casual)
                } catch (error) {
                    console.error("Erro no setup_casual:", error);
                    await interaction.followUp({ 
                        content: "❌ Erro ao executar Setup Casual.", 
                        ephemeral: true 
                    });
                }
                break;
                
            case "setup_cancel":
                await interaction.followUp({ 
                    content: "❌ Setup cancelado.", 
                    ephemeral: true 
                });
                break;
        }
    }
};
