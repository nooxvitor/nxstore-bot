async function enviarDM(user, codigoDesconto, tipo) {
    try {
        const tipoNome = tipo === 'cliente' ? 'Ì±ë Cliente' : tipo === 'amigo' ? 'ÌæÆ Amigo' : 'Ìºü Ambos';
        
        const embedDM = new EmbedBuilder()
            .setTitle("Ìæâ **BEM-VINDO √Ä NX STORE!**")
            .setDescription(`Ol√° **${user.username}**!\n\nSua solicita√ß√£o como **${tipoNome}** foi registrada com sucesso!`)
            .addFields(
                { 
                    name: "Ì¥ë **SEU C√ìDIGO EXCLUSIVO**", 
                    value: `\`\`\`${codigoDesconto}\`\`\`\n**Use para receber 20% de desconto em qualquer produto!**` 
                },
                { 
                    name: "Ì≥ù **COMO USAR**", 
                    value: "```1. Acesse nossa loja\n2. Escolha seu produto\n3. Cole o c√≥digo no checkout\n4. Aproveite seu desconto!```" 
                },
                { 
                    name: "ÌæÅ **SEUS BENEF√çCIOS**", 
                    value: tipo === 'cliente' ? 
                        "‚Ä¢ Ì±ë Cargo Future Client\n‚Ä¢ ÌªçÔ∏è Acesso √† √°rea de loja\n‚Ä¢ Ìæ´ Sistema de tickets\n‚Ä¢ Ì≤∞ 20% desconto permanente\n‚Ä¢ ‚ö° Suporte priorit√°rio" :
                        tipo === 'amigo' ?
                        "‚Ä¢ ÌæÆ Cargo Amigo NX\n‚Ä¢ Ì≤¨ Acesso √† comunidade\n‚Ä¢ Ìæ≤ Salas de jogos\n‚Ä¢ Ìæ™ Eventos exclusivos\n‚Ä¢ Ì¥ù Networking com equipe" :
                        "‚Ä¢ Ì±ë + ÌæÆ Ambos os cargos\n‚Ä¢ ÌªçÔ∏è + Ì≤¨ Acesso completo\n‚Ä¢ Ìæ´ + Ìæ≤ Todos sistemas\n‚Ä¢ Ì≤∞ 20% desconto\n‚Ä¢ ‚ö° Configura√ß√£o priorit√°ria"
                },
                { 
                    name: "‚è≥ **PR√ìXIMOS PASSOS**", 
                    value: "```1. Sua mensagem apareceu em #Ì±ã„Éªboas-vindas\n2. Nossa equipe entrar√° em contato\n3. Configure seu servidor personalizado\n4. Aproveite recursos exclusivos!```" 
                }
            )
            .setColor(0x9B59B6)
            .setImage("https://cdn.discordapp.com/attachments/1101198767260979331/1216328034722574417/banner_welcome.png?ex=660047b0&is=65edb2b0&hm=63b7e9c4e8f0f3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b&")
            .setFooter({ text: "NX Store ‚Ä¢ Obrigado por confiar em n√≥s!" })
            .setTimestamp();
        
        const rowDM = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("Ìªí Ver Produtos")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://nxstore.com/produtos"),
                new ButtonBuilder()
                    .setLabel("Ì≥ã Meu Setup")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://nxstore.com/meu-setup"),
                new ButtonBuilder()
                    .setLabel("Ì≤¨ Suporte")
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://discord.gg/nxstore")
            );
        
        await user.send({ embeds: [embedDM], components: [rowDM] });
    } catch (err) {
        console.log("N√£o foi poss√≠vel enviar DM:", err);
    }
}
