// Na função handleSolicitacao, atualizar o caso "solicitar_info":
case "solicitar_info":
    const embedInfo = new EmbedBuilder()
        .setTitle("��� **INFORMAÇÕES COMPLETAS**")
        .setDescription("**Como funciona nosso sistema de setup?**")
        .addFields(
            { 
                name: "��� **PASSO A PASSO**", 
                value: "```1. Escolha Cliente, Amigo ou Ambos\n2. Informe quem te indicou (opcional)\n3. Receba cargos automáticos\n4. Sua mensagem aparece em #���・boas-vindas\n5. Receba código de 20% desconto\n6. Aguarde nosso contato para setup completo!```" 
            },
            { 
                name: "��� **CLIENTE - VANTAGENS**", 
                value: "• Cargo: Future Client\n• Acesso à área de loja\n• Sistema de produtos/tickets\n• Suporte prioritário\n• 20% desconto em compras" 
            },
            { 
                name: "��� **AMIGO - VANTAGENS**", 
                value: "• Cargo: Amigo NX\n• Acesso à comunidade\n• Participação em eventos\n• Salas de jogos\n• Networking com a equipe" 
            },
            { 
                name: "��� **AMBOS - VANTAGENS**", 
                value: "• Ambos os cargos\n• Acesso completo\n• Todos os benefícios\n• Setup personalizado\n• Configuração prioritária" 
            },
            { 
                name: "⏱️ **TEMPO DE SETUP**", 
                value: "• Básico: 1-2 horas\n• Completo: 3-6 horas\n• Premium: 12-24 horas\n\n**Setup começa após confirmação da equipe!**" 
            }
        )
        .setColor(0x3498DB)
        .setFooter({ text: "Dúvidas? Abra um ticket ou fale com nossa equipe!" });
    
    await interaction.reply({ embeds: [embedInfo], ephemeral: true });
    break;
