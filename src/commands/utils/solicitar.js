const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("solicitar")
        .setDescription("🎯 Solicite um setup personalizado para seu servidor"),

    async execute(interaction) {
        // 🎨 Embed principal
        const embedPrincipal = new EmbedBuilder()
            .setTitle("🎯 **SOLICITAÇÃO DE SETUP**")
            .setDescription("```diff\n+ NX STORE - SETUP PROFISSIONAL +\n```\n\n**Escolha o tipo de setup que melhor se encaixa:**")
            .setColor(0x5865F2)
            .setFooter({ text: "✨ NX Store • Setup Profissional ✨" })
            .setTimestamp();

        // 👑 Embed para CLIENTE
        const embedCliente = new EmbedBuilder()
            .setTitle("👑 **SETUP CLIENTE**")
            .setDescription("**🏪 Ideal para:** Lojas • Vendas • Negócios\n**🎯 Foco:** Produtividade e Organização")
            .addFields(
                { name: "📦 **SISTEMA DE PRODUTOS**", value: "```diff\n+ Catálogo organizado\n+ Controle de estoque\n+ Sistema de vendas\n+ Fotos dos produtos\n```", inline: true },
                { name: "🛠️ **PAINEL ADMINISTRATIVO**", value: "```diff\n+ Controle total\n+ Estatísticas\n+ Logs detalhados\n+ Dashboard em tempo real\n```", inline: true },
                { name: "🎫 **ATENDIMENTO**", value: "```diff\n+ Tickets privados\n+ Suporte 24/7\n+ Histórico completo\n+ Atendentes dedicados\n```", inline: true },
                { name: "📊 **ORGANIZAÇÃO**", value: "```diff\n+ Canais categorizados\n+ Permissões personalizadas\n+ Fluxo otimizado\n+ Área privada para equipe\n```", inline: false }
            )
            .setColor(0xFFD700)
            .setFooter({ text: "💼 Perfeito para empreendedores digitais" });

        // 🎮 Embed para AMIGO
        const embedAmigo = new EmbedBuilder()
            .setTitle("🎮 **SETUP AMIGO**")
            .setDescription("**👥 Ideal para:** Comunidades • Amigos • Grupos\n**🎯 Foco:** Diversão e Conexão")
            .addFields(
                { name: "🎲 **CANAIS DE JOGOS**", value: "```diff\n+ Voice chats temáticos\n+ Salas para diferentes jogos\n+ Eventos especiais semanais\n+ Torneios organizados\n```", inline: true },
                { name: "💬 **COMUNIDADE**", value: "```diff\n+ Chat organizado por temas\n+ Área de mídia e memes\n+ Compartilhamento de conteúdo\n+ Enquetes e votações\n```", inline: true },
                { name: "🎪 **EVENTOS**", value: "```diff\n+ Agendamentos automáticos\n+ Notificações push\n+ Sistema de participação\n+ Recompensas por atividade\n```", inline: true },
                { name: "✨ **EXPERIÊNCIA**", value: "```diff\n+ Ambiente acolhedor\n+ Integração fácil\n+ Diversão garantida\n+ Networking com equipe\n```", inline: false }
            )
            .setColor(0x5865F2)
            .setFooter({ text: "🤝 Perfeito para comunidades e grupos" });

        // 🌟 Embed para AMBOS
        const embedAmbos = new EmbedBuilder()
            .setTitle("🌟 **SETUP COMPLETO**")
            .setDescription("**🔥 O MELHOR DOS DOIS MUNDOS 🔥**\n\nCombine produtividade com diversão em um único servidor!")
            .addFields(
                { name: "✅ **VANTAGENS**", value: "```diff\n+ Todos recursos CLIENTE\n+ Todos recursos AMIGO\n+ Separação automática\n+ Cargos diferenciados\n+ Dashboard unificado\n```", inline: false },
                { name: "🎯 **INDICADO PARA**", value: "```diff\n+ Criadores de conteúdo\n+ Servidores grandes\n+ Empresas com equipe\n+ Streamers e influenciadores\n+ Quem quer tudo organizado\n```", inline: false },
                { name: "💎 **BÔNUS EXCLUSIVO**", value: "```diff\n+ Configuração prioritária\n+ Suporte premium 24/7\n+ Personalização extra\n+ Acesso antecipado\n+ Consultoria gratuita\n```", inline: false }
            )
            .setColor(0x9B59B6)
            .setFooter({ text: "🚀 Recomendação da equipe NX Store" });

        // 🔘 Botões
        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("solicitar_cliente")
                    .setLabel("CLIENTE")
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId("solicitar_amigo")
                    .setLabel("AMIGO")
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId("solicitar_ambos")
                    .setLabel("AMBOS")
                    .setStyle(ButtonStyle.Danger)
            );

        const row2 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("solicitar_info")
                    .setLabel("MAIS INFORMAÇÕES")
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId("solicitar_cancelar")
                    .setLabel("CANCELAR")
                    .setStyle(ButtonStyle.Secondary)
            );

        // 🚀 Enviar
        await interaction.reply({ 
            embeds: [embedPrincipal, embedCliente, embedAmigo, embedAmbos], 
            components: [row1, row2]
        });
    }
};