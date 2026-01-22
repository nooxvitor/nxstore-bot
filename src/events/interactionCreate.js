// No handleSolicitacao function:
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
        .setImage("https://cdn.discordapp.com/attachments/1101198767260979331/1216328034722574417/banner_welcome.png")
        .setFooter({ text: "❓ Dúvidas? Abra um ticket ou fale com nossa equipe! ❓" });
    
    await interaction.reply({ embeds: [embedInfo], ephemeral: true });
    break;
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
            .setImage("https://cdn.discordapp.com/attachments/1101198767260979331/1216328034722574417/banner_welcome.png")
            .setFooter({ 
                text: "✨ NX Store • Obrigado por confiar em nós! ✨",
                iconURL: "https://cdn.discordapp.com/emojis/1101201530153332856.png"
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
                    .setURL("https://discord.gg/nxstore"),
                new ButtonBuilder()
                    .setLabel("📱 NOSSO APP")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://nxstore.com/app")
            );
        
        await user.send({ 
            embeds: [embedDM], 
            components: [rowDM],
            content: "**🎉 PARABÉNS! VOCÊ AGORA FAZ PARTE DA FAMÍLIA NX STORE! 🎉**"
        });
        
        console.log(`📧 DM enviada para ${user.tag} | Código: ${codigoDesconto}`);
    } catch (err) {
        console.log("❌ Não foi possível enviar DM:", err);
    }
}