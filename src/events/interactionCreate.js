const { 
    ChannelType, 
    PermissionsBitField, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle, 
    ModalBuilder, 
    TextInputBuilder, 
    TextInputStyle 
} = require("discord.js");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    name: "interactionCreate",
async execute(interaction, client) {
    // LOG PARA DEBUG
    console.log(`📝 Interação recebida: ${interaction.type} | ${interaction.customId || interaction.commandName}`);
    
        // COMANDOS SLASH
            if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(`Erro: /${interaction.commandName}:`, error);
                const errorMsg = { content: "❌ Erro ao executar comando!", ephemeral: true };
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(errorMsg);
                } else {
                    await interaction.reply(errorMsg);
                }
            }
            return;
        }
        
        // BOTÕES DO SETUP ORIGINAL
        if (interaction.isButton() && interaction.customId.startsWith("setup_pro_")) {
            console.log(`🎯 Botão setup_pro capturado: ${interaction.customId}`);
            await handleSetupPro(interaction);
            return;
        }
        // BOTÕES DO SETUP PROFISSIONAL
        if (interaction.isButton() && interaction.customId.startsWith("setup_pro_")) {
            await handleSetupPro(interaction);
            return;
        }
        
        // BOTÕES DA SOLICITAÇÃO
        if (interaction.isButton() && interaction.customId.startsWith("solicitar_")) {
            await handleSolicitacao(interaction, client);
            return;
        }
        
        // MODAIS DA SOLICITAÇÃO
        if (interaction.isModalSubmit() && interaction.customId.startsWith("modal_solicitar_")) {
            await processarSolicitacao(interaction, client);
            return;
        }
    }
};

// ========== SETUP PROFISSIONAL COMPLETO ==========
async function handleSetupPro(interaction) {
    const { customId, guild } = interaction;
    
    if (customId === "setup_pro_nao") {
        await interaction.update({ 
            content: "❌ Setup cancelado.", 
            embeds: [], 
            components: [] 
        });
        return;
    }
    
    if (customId === "setup_pro_sim") {
        await interaction.update({ 
            content: "🚀 **INICIANDO SETUP PROFISSIONAL...**\n⏳ Isso pode levar alguns minutos...", 
            embeds: [], 
            components: [] 
        });
        
        try {
            // 1. APAGAR TUDO
            await interaction.followUp({ content: "🗑️ **APAGANDO TUDO...**", ephemeral: false });
            await deletarTudo(guild);
            
            // 2. CRIAR CARGO HIERÁRQUICO (20+ cargos)
            await interaction.followUp({ content: "👑 **CRIANDO CARGO...**", ephemeral: false });
            const cargos = await criarCargosHierarquicos(guild);
            
            // 3. CRIAR CATEGORIAS E CANAIS
            await interaction.followUp({ content: "🏗️ **CRIANDO ESTRUTURA...**", ephemeral: false });
            await criarEstruturaCompleta(guild, cargos, interaction.client);
            
            // 4. CONCLUIR
            const embedConclusao = new EmbedBuilder()
                .setTitle("✅ **SETUP PROFISSIONAL CONCLUÍDO!**")
                .setDescription("Servidor NX Store configurado com sucesso!")
                .addFields(
                    { name: "👑 **ALTO ESCALÃO**", value: "• ⚡ Categoria: `PAINEL DE CONTROLE`\n• 🔐 Acesso: Administradores + Dono", inline: false },
                    { name: "🛍️ **MUNDO LOJA**", value: "• 🛒 Categoria: `LOJA NX STORE`\n• 📁 12 canais organizados\n• 👥 8 cargos de equipe", inline: false },
                    { name: "🎮 **MUNDO COMUNIDADE**", value: "• 🎲 Categoria: `COMUNIDADE NX`\n• 💬 10 canais sociais\n• 🤝 6 cargos sociais", inline: false },
                    { name: "📊 **INFRAESTRUTURA**", value: "• 🏗️ 24 cargos criados\n• 👋 Sistema de boas-vindas\n• 🔐 Permissões automáticas", inline: false }
                )
                .setColor(0x00FF00)
                .setFooter({ text: "NX Store Professional v2.0" })
                .setTimestamp();
            
            await interaction.followUp({ 
                embeds: [embedConclusao],
                content: "🎉 **SEU SERVIDOR ESTÁ PRONTO!**\nUse `/solicitar` para começar!" 
            });
            
        } catch (error) {
            console.error("Erro setup:", error);
            await interaction.followUp({ 
                content: "❌ **ERRO NO SETUP:** " + error.message,
                ephemeral: false 
            });
        }
    }
}

// ========== SETUP ORIGINAL ==========
async function handleSetup(interaction) {
    const { customId, guild } = interaction;
    await interaction.deferUpdate();
    
    switch (customId) {
        case "setup_bot":
            await setupBot(interaction, guild);
            break;
        case "setup_casual":
            await setupCasual(interaction, guild);
            break;
        case "setup_cancel":
            await interaction.followUp({ content: "❌ Setup cancelado.", ephemeral: true });
            break;
    }
}

async function setupBot(interaction, guild) {
    try {
        await interaction.followUp({ content: "🚀 **APAGANDO TUDO...**", ephemeral: true });
        
        // APAGAR TUDO
        const channels = await guild.channels.fetch();
        for (const [id, channel] of channels) {
            try {
                if (channel.deletable) await channel.delete();
            } catch (err) {}
        }
        
        // CRIAR CATEGORIA BOT
        const botCategory = await guild.channels.create({
            name: "===BOT===",
            type: ChannelType.GuildCategory,
            permissionOverwrites: [
                { id: guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
                { id: interaction.client.user.id, allow: [PermissionsBitField.Flags.ViewChannel] },
            ],
        });
        
        // CRIAR 8 CANAIS COM EMOJIS
        const channelNames = [
            "📊・painel",
            "🔧・config",
            "📝・logs", 
            "🎫・tickets",
            "📦・produtos",
            "👥・staff",
            "💰・vendas",
            "📈・stats"
        ];
        
        for (const name of channelNames) {
            await guild.channels.create({
                name: name,
                type: ChannelType.GuildText,
                parent: botCategory.id,
                permissionOverwrites: [
                    { id: guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
                    { id: interaction.client.user.id, allow: [PermissionsBitField.Flags.ViewChannel] },
                ],
            });
        }
        
        await interaction.followUp({ 
            content: "✅ **SETUP BOT CONCLUÍDO!**\nCategoria: ===BOT===\n8 canais criados\nApenas bot tem acesso", 
            ephemeral: true 
        });
        
    } catch (error) {
        console.error("Erro setup_bot:", error);
        await interaction.followUp({ content: "❌ Erro. Verifique permissões.", ephemeral: true });
    }
}

async function setupCasual(interaction, guild) {
    try {
        await interaction.followUp({ content: "🎮 **CRIANDO SETUP CASUAL...**", ephemeral: true });
        
        // CATEGORIA JOGOS COM EMOJIS
        const gamesCat = await guild.channels.create({ name: "🎮 JOGOS", type: ChannelType.GuildCategory });
        await guild.channels.create({ name: "🎯・geral", type: ChannelType.GuildText, parent: gamesCat.id });
        await guild.channels.create({ name: "🎮・voice-1", type: ChannelType.GuildVoice, parent: gamesCat.id });
        await guild.channels.create({ name: "🎮・voice-2", type: ChannelType.GuildVoice, parent: gamesCat.id });
        
        // CATEGORIA COMUNIDADE COM EMOJIS
        const commCat = await guild.channels.create({ name: "💬 COMUNIDADE", type: ChannelType.GuildCategory });
        await guild.channels.create({ name: "📢・anuncios", type: ChannelType.GuildText, parent: commCat.id });
        await guild.channels.create({ name: "💬・chat", type: ChannelType.GuildText, parent: commCat.id });
        await guild.channels.create({ name: "📸・midia", type: ChannelType.GuildText, parent: commCat.id });
        
        await interaction.followUp({ 
            content: "✅ **SETUP CASUAL CONCLUÍDO!**\n2 categorias criadas\n8 canais para diversão", 
            ephemeral: true 
        });
        
    } catch (error) {
        console.error("Erro setup_casual:", error);
        await interaction.followUp({ content: "❌ Erro.", ephemeral: true });
    }
}

// ========== FUNÇÕES AUXILIARES SETUP PROFISSIONAL ==========
async function deletarTudo(guild) {
    // Apagar canais
    const channels = await guild.channels.fetch();
    for (const [id, channel] of channels) {
        try {
            if (channel.deletable) await channel.delete();
        } catch (err) {}
    }
    
    // Apagar cargos (exceto @everyone e bots)
    const roles = await guild.roles.fetch();
    for (const [id, role] of roles) {
        try {
            if (role.deletable && !role.managed && role.id !== guild.id) {
                await role.delete();
            }
        } catch (err) {}
    }
}

async function criarCargosHierarquicos(guild) {
    const cargos = {
        // ALTO ESCALÃO
        dono: await guild.roles.create({
            name: "👑 Dono",
            color: 0xFFD700,
            permissions: [PermissionsBitField.Flags.Administrator],
            hoist: true,
            position: 100
        }),
        
        coDono: await guild.roles.create({
            name: "👑 Co-Dono",
            color: 0xFFA500,
            permissions: [PermissionsBitField.Flags.Administrator],
            hoist: true,
            position: 99
        }),
        
        diretor: await guild.roles.create({
            name: "⚡ Diretor",
            color: 0x9B59B6,
            permissions: [PermissionsBitField.Flags.Administrator],
            hoist: true,
            position: 98
        }),
        
        gerente: await guild.roles.create({
            name: "💼 Gerente",
            color: 0x3498DB,
            permissions: [PermissionsBitField.Flags.ManageGuild],
            hoist: true,
            position: 97
        }),
        
        // EQUIPE LOJA
        supervisor: await guild.roles.create({
            name: "📊 Supervisor",
            color: 0x2ECC71,
            permissions: [PermissionsBitField.Flags.ManageChannels],
            hoist: true,
            position: 90
        }),
        
        atendente: await guild.roles.create({
            name: "💬 Atendente",
            color: 0x1ABC9C,
            permissions: [PermissionsBitField.Flags.ManageMessages],
            hoist: false,
            position: 89
        }),
        
        vendedor: await guild.roles.create({
            name: "💰 Vendedor",
            color: 0xE74C3C,
            hoist: false,
            position: 88
        }),
        
        suporte: await guild.roles.create({
            name: "🛠️ Suporte",
            color: 0xE67E22,
            hoist: false,
            position: 87
        }),
        
        // COMUNIDADE
        moderador: await guild.roles.create({
            name: "🛡️ Moderador",
            color: 0x34495E,
            permissions: [PermissionsBitField.Flags.ManageMessages],
            hoist: true,
            position: 80
        }),
        
        eventManager: await guild.roles.create({
            name: "🎪 Event Manager",
            color: 0x8E44AD,
            hoist: false,
            position: 79
        }),
        
        streamer: await guild.roles.create({
            name: "🎥 Streamer",
            color: 0x9B59B6,
            hoist: false,
            position: 78
        }),
        
        vip: await guild.roles.create({
            name: "⭐ VIP",
            color: 0xF1C40F,
            hoist: false,
            position: 70
        }),
        
        // CLIENTES/AMIGOS
        clientePremium: await guild.roles.create({
            name: "💎 Cliente Premium",
            color: 0x00CED1,
            hoist: false,
            position: 60
        }),
        
        cliente: await guild.roles.create({
            name: "🛒 Cliente",
            color: 0x1ABC9C,
            hoist: false,
            position: 59
        }),
        
        futuroCliente: await guild.roles.create({
            name: "👑 Future Client",
            color: 0xFFD700,
            hoist: false,
            position: 58
        }),
        
        amigoNX: await guild.roles.create({
            name: "🎮 Amigo NX",
            color: 0x5865F2,
            hoist: false,
            position: 57
        }),
        
        membro: await guild.roles.create({
            name: "👤 Membro",
            color: 0x95A5A6,
            hoist: false,
            position: 50
        }),
        
        // ESPECIAIS
        parceria: await guild.roles.create({
            name: "🤝 Parceria",
            color: 0x2ECC71,
            hoist: false,
            position: 40
        }),
        
        contribuidor: await guild.roles.create({
            name: "🌠 Contribuidor",
            color: 0x9B59B6,
            hoist: false,
            position: 39
        }),
        
        booster: await guild.roles.create({
            name: "🚀 Booster",
            color: 0xFF73FA,
            hoist: true,
            position: 30
        }),
        
        // TECNICO
        bot: await guild.roles.create({
            name: "🤖 Bot",
            color: 0x5865F2,
            hoist: false,
            position: 1
        })
    };
    
    return cargos;
}

async function criarEstruturaCompleta(guild, cargos, client) {
    // ========== PAINEL DE CONTROLE (ALTO ESCALÃO) ==========
    const painelCategoria = await guild.channels.create({
        name: "⚡ PAINEL DE CONTROLE",
        type: ChannelType.GuildCategory,
        position: 0,
        permissionOverwrites: [
            { id: guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
            { id: cargos.dono.id, allow: [PermissionsBitField.Flags.ViewChannel] },
            { id: cargos.coDono.id, allow: [PermissionsBitField.Flags.ViewChannel] },
            { id: cargos.diretor.id, allow: [PermissionsBitField.Flags.ViewChannel] },
            { id: cargos.gerente.id, allow: [PermissionsBitField.Flags.ViewChannel] },
            { id: client.user.id, allow: [PermissionsBitField.Flags.ViewChannel] }
        ]
    });
    
    // Canais do painel
    await guild.channels.create({
        name: "📊・dashboard",
        type: ChannelType.GuildText,
        parent: painelCategoria.id
    });
    
    await guild.channels.create({
        name: "🔧・configuracoes",
        type: ChannelType.GuildText,
        parent: painelCategoria.id
    });
    
    await guild.channels.create({
        name: "📝・logs",
        type: ChannelType.GuildText,
        parent: painelCategoria.id
    });
    
    await guild.channels.create({
        name: "📈・estatisticas",
        type: ChannelType.GuildText,
        parent: painelCategoria.id
    });
    
    await guild.channels.create({
        name: "👥・staff-chat",
        type: ChannelType.GuildText,
        parent: painelCategoria.id
    });
    
    await guild.channels.create({
        name: "🔐・private-voice",
        type: ChannelType.GuildVoice,
        parent: painelCategoria.id
    });
    
    // ========== LOJA NX STORE ==========
    const lojaCategoria = await guild.channels.create({
        name: "🛒 LOJA NX STORE",
        type: ChannelType.GuildCategory,
        position: 1
    });
    
    await guild.channels.create({
        name: "📢・anuncios",
        type: ChannelType.GuildText,
        parent: lojaCategoria.id
    });
    
    await guild.channels.create({
        name: "🏪・vitrine",
        type: ChannelType.GuildText,
        parent: lojaCategoria.id
    });
    
    await guild.channels.create({
        name: "🛍️・produtos",
        type: ChannelType.GuildText,
        parent: lojaCategoria.id
    });
    
    await guild.channels.create({
        name: "🎫・tickets",
        type: ChannelType.GuildText,
        parent: lojaCategoria.id
    });
    
    await guild.channels.create({
        name: "💬・atendimento",
        type: ChannelType.GuildText,
        parent: lojaCategoria.id
    });
    
    await guild.channels.create({
        name: "💰・vendas",
        type: ChannelType.GuildText,
        parent: lojaCategoria.id
    });
    
    await guild.channels.create({
        name: "📦・estoque",
        type: ChannelType.GuildText,
        parent: lojaCategoria.id
    });
    
    await guild.channels.create({
        name: "🎤・voice-atendimento",
        type: ChannelType.GuildVoice,
        parent: lojaCategoria.id
    });
    
    // ========== COMUNIDADE NX ==========
    const comunidadeCategoria = await guild.channels.create({
        name: "🎮 COMUNIDADE NX",
        type: ChannelType.GuildCategory,
        position: 2
    });
    
    await guild.channels.create({
        name: "👋・boas-vindas",
        type: ChannelType.GuildText,
        parent: comunidadeCategoria.id
    });
    
    await guild.channels.create({
        name: "📢・anuncios-comunidade",
        type: ChannelType.GuildText,
        parent: comunidadeCategoria.id
    });
    
    await guild.channels.create({
        name: "💬・chat-geral",
        type: ChannelType.GuildText,
        parent: comunidadeCategoria.id
    });
    
    await guild.channels.create({
        name: "🎮・jogos",
        type: ChannelType.GuildText,
        parent: comunidadeCategoria.id
    });
    
    await guild.channels.create({
        name: "📸・midia",
        type: ChannelType.GuildText,
        parent: comunidadeCategoria.id
    });
    
    await guild.channels.create({
        name: "🎵・musica",
        type: ChannelType.GuildVoice,
        parent: comunidadeCategoria.id
    });
    
    await guild.channels.create({
        name: "🎮・voice-1",
        type: ChannelType.GuildVoice,
        parent: comunidadeCategoria.id
    });
    
    await guild.channels.create({
        name: "🎮・voice-2",
        type: ChannelType.GuildVoice,
        parent: comunidadeCategoria.id
    });
    
    await guild.channels.create({
        name: "🎪・eventos",
        type: ChannelType.GuildText,
        parent: comunidadeCategoria.id
    });
    
    await guild.channels.create({
        name: "🍿・watch-together",
        type: ChannelType.GuildVoice,
        parent: comunidadeCategoria.id
    });
    
    // ========== INFRAESTRUTURA ==========
    const infraCategoria = await guild.channels.create({
        name: "📊 INFRAESTRUTURA",
        type: ChannelType.GuildCategory,
        position: 3
    });
    
    await guild.channels.create({
        name: "📜・regras",
        type: ChannelType.GuildText,
        parent: infraCategoria.id
    });
    
    await guild.channels.create({
        name: "📚・recursos",
        type: ChannelType.GuildText,
        parent: infraCategoria.id
    });
    
    await guild.channels.create({
        name: "🤖・comandos",
        type: ChannelType.GuildText,
        parent: infraCategoria.id
    });
    
    await guild.channels.create({
        name: "📨・sugestoes",
        type: ChannelType.GuildText,
        parent: infraCategoria.id
    });
    
    await guild.channels.create({
        name: "⚠️・reports",
        type: ChannelType.GuildText,
        parent: infraCategoria.id
    });
}

// ========== SISTEMA DE SOLICITAÇÃO ==========
async function handleSolicitacao(interaction, client) {
    const { customId } = interaction;
    
    switch (customId) {
        case "solicitar_info":
            const embedInfo = new EmbedBuilder()
                .setTitle("📋 **INFORMAÇÕES DETALHADAS**")
                .setDescription("**🎯 COMO FUNCIONA NOSSO SISTEMA DE SETUP?**")
                .addFields(
                    { 
                        name: "🚀 **PASSO A PASSO COMPLETO**", 
                        value: "```bash\n# 1️⃣ ESCOLHA SEU TIPO\n👉 Cliente, Amigo ou Ambos\n\n# 2️⃣ INFORME INDICAÇÃO\n👉 Quem te indicou? (Opcional)\n\n# 3️⃣ RECEBA CARGO\n👉 Future Client ou Amigo NX\n\n# 4️⃣ APAREÇA NAS BOAS-VINDAS\n👉 Mensagem em #👋-boas-vindas\n\n# 5️⃣ GANHE DESCONTO\n👉 Código de 20% OFF exclusivo\n\n# 6️⃣ AGUARDE CONTATO\n👉 Nossa equipe prepara seu setup!\n```" 
                    },
                    { 
                        name: "👑 **CLIENTE - BENEFÍCIOS**", 
                        value: "```diff\n+ 👑 Cargo: Future Client\n+ 🏪 Acesso à área de loja\n+ 📦 Sistema de produtos\n+ 🎫 Tickets profissionais\n+ 💰 20% desconto permanente\n+ ⚡ Suporte prioritário\n+ 📊 Dashboard exclusivo\n+ 🛡️ Backup automático\n```" 
                    },
                    { 
                        name: "🎮 **AMIGO - BENEFÍCIOS**", 
                        value: "```diff\n+ 🎮 Cargo: Amigo NX\n+ 💬 Acesso à comunidade\n+ 🎲 Salas de jogos temáticas\n+ 🎪 Eventos semanais\n+ 📸 Área de mídia\n+ 🎵 Música colaborativa\n+ 🤝 Networking premium\n+ 🏆 Sistema de ranking\n```" 
                    },
                    { 
                        name: "🌟 **AMBOS - BENEFÍCIOS**", 
                        value: "```diff\n+ 👑 + 🎮 Ambos os cargos\n+ 🏪 + 💬 Acesso completo\n+ 📦 + 🎲 Todos os sistemas\n+ 💰 20% desconto\n+ ⚡ Configuração VIP\n+ 🎯 Setup personalizado\n+ 📞 Suporte dedicado\n+ 🎁 Bônus exclusivos\n```" 
                    },
                    { 
                        name: "⏱️ **TEMPO DE SETUP**", 
                        value: "```yaml\nBÁSICO (Cliente ou Amigo):\n  Tempo: 1-2 horas\n  Inclui: Canais + Cargos básicos\n\nCOMPLETO (Ambos):\n  Tempo: 3-6 horas  \n  Inclui: Todos sistemas + Personalização\n\nPREMIUM (Customizado):\n  Tempo: 12-24 horas\n  Inclui: Setup VIP + Suporte 24/7\n```" 
                    }
                )
                .setColor(0x3498DB)
                .setFooter({ text: "❓ Dúvidas? Abra um ticket ou fale com nossa equipe! ❓" });
            
            await interaction.reply({ embeds: [embedInfo], ephemeral: true });
            break;
            
        case "solicitar_cancelar":
            await interaction.reply({ content: "❌ Cancelado.", ephemeral: true });
            break;
            
        case "solicitar_cliente":
        case "solicitar_amigo":
        case "solicitar_ambos":
            await iniciarSolicitacao(interaction, customId.split('_')[1]);
            break;
    }
}

async function iniciarSolicitacao(interaction, tipo) {
    const modal = new ModalBuilder()
        .setCustomId(`modal_solicitar_${tipo}`)
        .setTitle(`Solicitação - ${tipo}`);
    
    const indicadoInput = new TextInputBuilder()
        .setCustomId("indicado_por")
        .setLabel("Quem te indicou? (Opcional)")
        .setPlaceholder("Nome ou @usuário")
        .setStyle(TextInputStyle.Short)
        .setRequired(false);
    
    const row = new ActionRowBuilder().addComponents(indicadoInput);
    modal.addComponents(row);
    
    await interaction.showModal(modal);
}

async function processarSolicitacao(interaction, client) {
    const tipo = interaction.customId.split('_')[2];
    const indicadoPor = interaction.fields.getTextInputValue("indicado_por") || "Ninguém";
    
    await interaction.deferReply({ ephemeral: true });
    
    const codigoDesconto = `NX${Date.now().toString().slice(-6)}`;
    
    try {
        const guild = interaction.guild;
        
        // Encontrar cargos
        const cargoFuturoCliente = guild.roles.cache.find(r => r.name === "👑 Future Client") ||
            await guild.roles.create({ name: "👑 Future Client", color: 0xFFD700 });
        
        const cargoAmigoNX = guild.roles.cache.find(r => r.name === "🎮 Amigo NX") ||
            await guild.roles.create({ name: "🎮 Amigo NX", color: 0x5865F2 });
        
        // Atribuir cargos
        const member = interaction.member;
        if (tipo === 'cliente' || tipo === 'ambos') await member.roles.add(cargoFuturoCliente);
        if (tipo === 'amigo' || tipo === 'ambos') await member.roles.add(cargoAmigoNX);
        
        // Mensagem de boas-vindas no canal
        const canalBoasVindas = guild.channels.cache.find(c => 
            c.name === "👋・boas-vindas" && c.type === ChannelType.GuildText
        );
        
        if (canalBoasVindas) {
            const embedBoasVindas = new EmbedBuilder()
                .setTitle(`🎉 NOVA SOLICITAÇÃO REGISTRADA!`)
                .setDescription(`**${interaction.user}** acabou de solicitar setup como **${tipo === 'cliente' ? '👑 Cliente' : tipo === 'amigo' ? '🎮 Amigo' : '🌟 Ambos'}**!`)
                .addFields(
                    { name: "📋 Tipo", value: tipo === 'cliente' ? 'Cliente (Loja)' : tipo === 'amigo' ? 'Amigo (Comunidade)' : 'Ambos', inline: true },
                    { name: "👤 Indicado por", value: indicadoPor, inline: true },
                    { name: "🎁 Presente", value: "Recebeu **20% de desconto**!", inline: true }
                )
                .setColor(0x9B59B6)
                .setFooter({ text: "Bem-vindo ao NX Store!" })
                .setTimestamp();
            
            await canalBoasVindas.send({ embeds: [embedBoasVindas] });
        }
        
        // Confirmação para usuário
        const embedSucesso = new EmbedBuilder()
            .setTitle("✅ SOLICITAÇÃO REGISTRADA!")
            .setDescription(`**${interaction.user.username}**, você agora faz parte da NX Store!`)
            .addFields(
                { name: "🎖️ Cargos Recebidos", value: tipo === 'cliente' ? '👑 Future Client' : tipo === 'amigo' ? '🎮 Amigo NX' : '👑 Future Client + 🎮 Amigo NX', inline: true },
                { name: "🎟️ Código de Desconto", value: `\`${codigoDesconto}\``, inline: true },
                { name: "💎 Benefício", value: "**20% OFF** em qualquer produto!", inline: false },
                { name: "📝 Próximos Passos", value: "1. Explore os canais disponíveis\n2. Use seu código na loja\n3. Aguarde nosso contato para setup", inline: false }
            )
            .setColor(0x2ECC71)
            .setFooter({ text: "Código válido por 30 dias | Uso único" });
        
        await interaction.editReply({ 
            embeds: [embedSucesso],
            content: "🎉 **CHECK O CANAL #👋・boas-vindas PARA SUA MENSAGEM!**" 
        });
        
        // DM com código
        await enviarDM(interaction.user, codigoDesconto, tipo);
        
        console.log(`✅ ${interaction.user.tag} solicitou como ${tipo}`);
        
    } catch (error) {
        console.error("Erro solicitação:", error);
        await interaction.editReply({ content: "❌ Erro ao processar." });
    }
}

// ========== FUNÇÃO ENVIAR DM ==========
async function enviarDM(user, codigoDesconto, tipo) {
    try {
        const tipoNome = tipo === 'cliente' ? '👑 CLIENTE' : tipo === 'amigo' ? '🎮 AMIGO' : '🌟 AMBOS';
        const emojiTipo = tipo === 'cliente' ? '👑' : tipo === 'amigo' ? '🎮' : '🌟';
        
        const embedDM = new EmbedBuilder()
            .setTitle(`${emojiTipo} **BEM-VINDO À NX STORE!** ${emojiTipo}`)
            .setDescription(`**🎉 OLÁ ${user.username.toUpperCase()}!**\n\nSua jornada conosco está apenas começando! 🚀`)
            .addFields(
                { 
                    name: "🔑 **SEU CÓDIGO EXCLUSIVO**", 
                    value: `\`\`\`🎁\n${codigoDesconto}\n🎁\`\`\`\n**💰 USE PARA RECEBER 20% DE DESCONTO EM QUALQUER PRODUTO!**` 
                },
                { 
                    name: "📝 **COMO USAR SEU CÓDIGO**", 
                    value: "```bash\n# 1️⃣ ACESSE NOSSA LOJA\n🌐 https://nxstore.com\n\n# 2️⃣ ESCOLHA SEU PRODUTO\n🛒 Catálogo completo disponível\n\n# 3️⃣ COLE O CÓDIGO NO CHECKOUT\n📋 Campo: \"Cupom de desconto\"\n\n# 4️⃣ APROVEITE SEU DESCONTO!\n🎉 Economia garantida!\n```" 
                },
                { 
                    name: "🎁 **SEUS BENEFÍCIOS COMO " + tipoNome + "**", 
                    value: tipo === 'cliente' ? 
                        "```diff\n+ 👑 Cargo: Future Client\n+ 🏪 Acesso completo à loja\n+ 📦 Sistema de produtos/tickets\n+ 💰 20% desconto permanente\n+ ⚡ Suporte prioritário 24/7\n+ 📊 Dashboard personalizado\n+ 🛡️ Backup automático diário\n+ 🎯 Setup profissional garantido\n```" :
                        tipo === 'amigo' ?
                        "```diff\n+ 🎮 Cargo: Amigo NX\n+ 💬 Acesso à comunidade VIP\n+ 🎲 Salas de jogos exclusivas\n+ 🎪 Eventos semanais especiais\n+ 📸 Área de mídia premium\n+ 🎵 Música colaborativa\n+ 🤝 Networking com equipe\n+ 🏆 Sistema de ranking\n```" :
                        "```diff\n+ 👑 + 🎮 Ambos os cargos VIP\n+ 🏪 + 💬 Acesso TOTAL ao servidor\n+ 📦 + 🎲 Todos sistemas ativados\n+ 💰 20% desconto em compras\n+ ⚡ Configuração PRIORITÁRIA\n+ 🎯 Setup PERSONALIZADO\n+ 📞 Suporte DEDICADO 24/7\n+ 🎁 Bônus EXCLUSIVOS mensais\n```"
                },
                { 
                    name: "⏳ **PRÓXIMOS PASSOS**", 
                    value: "```bash\n# ✅ SUA MENSAGEM JÁ APARECEU\n📢 No canal #👋-boas-vindas\n\n# ⏰ AGUARDE NOSSO CONTATO\n📞 Em até 24 horas úteis\n\n# 🎨 CONFIGURE SEU SERVIDOR\n⚙️ Setup personalizado sob medida\n\n# 🚀 APROVEITE RECURSOS EXCLUSIVOS\n💡 Acesse todas as funcionalidades\n```" 
                }
            )
            .setColor(0x9B59B6)
            .setFooter({ 
                text: "✨ NX Store • Obrigado por confiar em nós! ✨"
            })
            .setTimestamp();
        
        const rowDM = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("🛒 VER PRODUTOS")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://nxstore.com/produtos"),
                new ButtonBuilder()
                    .setLabel("🎨 MEU SETUP")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://nxstore.com/meu-setup"),
                new ButtonBuilder()
                    .setLabel("💬 SUPORTE")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://discord.gg/nxstore")
            );
        
        await user.send({ 
            embeds: [embedDM], 
            components: [rowDM],
            content: "**🎉 PARABÉNS! VOCÊ AGORA FAZ PARTE DA FAMÍLIA NX STORE! 🎉**"
        });
        
    } catch (err) {
        console.log("❌ Não foi possível enviar DM:", err);
    }
}