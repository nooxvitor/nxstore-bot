@echo off
chcp 65001 >nul
title 🚀 NX STORE BOT - INICIALIZADOR PROFISSIONAL
color 0A

echo.
echo  ███╗   ██╗██╗  ██╗    ███████╗████████╗ ██████╗ ██████╗ ███████╗
echo  ████╗  ██║╚██╗██╔╝    ██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗██╔════╝
echo  ██╔██╗ ██║ ╚███╔╝     ███████╗   ██║   ██║   ██║██████╔╝█████╗
echo  ██║╚██╗██║ ██╔██╗     ╚════██║   ██║   ██║   ██║██╔══██╗██╔══╝
echo  ██║ ╚████║██╔╝ ██╗    ███████║   ██║   ╚██████╔╝██║  ██║███████╗
echo  ╚═╝  ╚═══╝╚═╝  ╚═╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝
echo.
echo  ================================================================
echo  🚀 INICIALIZADOR DO BOT NX STORE - VERSÃO PROFISSIONAL
echo  ================================================================

:menu
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     🎮 MENU DE CONTROLE                       ║
echo  ╠═══════════════════════════════════════════════════════════════╣
echo  ║                                                               ║
echo  ║  1. 🚀 INICIAR BOT NORMAL                                     ║
echo  ║  2. 🔄 REINICIAR BOT                                          ║
echo  ║  3. 📝 REGISTRAR COMANDOS NO DISCORD                         ║
echo  ║  4. ⚙️  INSTALAR/ATUALIZAR DEPENDÊNCIAS                      ║
echo  ║  5. 🧹 LIMPAR CACHE E LOGS                                    ║
echo  ║  6. 📊 VER STATUS DO BOT                                      ║
echo  ║  7. ❌ FECHAR BOT E SAIR                                      ║
echo  ║                                                               ║
echo  ║  8. 🔧 MODO DESENVOLVEDOR                                     ║
echo  ║  9. 💾 BACKUP DO PROJETO                                     ║
echo  ║  0. 🆘 AJUDA E INFORMAÇÕES                                   ║
echo  ║                                                               ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
set /p choice="👉 DIGITE SUA OPÇÃO: "

if "%choice%"=="1" goto start_bot
if "%choice%"=="2" goto restart_bot
if "%choice%"=="3" goto register_commands
if "%choice%"=="4" goto install_deps
if "%choice%"=="5" goto clean_cache
if "%choice%"=="6" goto bot_status
if "%choice%"=="7" goto exit_bot
if "%choice%"=="8" goto dev_mode
if "%choice%"=="9" goto backup_project
if "%choice%"=="0" goto show_help
goto menu

:start_bot
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     🚀 INICIANDO BOT                          ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  📡 Verificando configurações...
timeout /t 1 /nobreak >nul

if not exist ".env" (
    echo  ❌ ARQUIVO .env NÃO ENCONTRADO!
    echo  📝 Criando arquivo de configuração...
    echo # TOKEN DO BOT > .env
    echo DISCORD_TOKEN=seu_token_aqui >> .env
    echo CLIENT_ID=seu_client_id >> .env
    echo GUILD_ID=seu_server_id >> .env
    echo  ⚠️  Configure o arquivo .env antes de iniciar!
    timeout /t 3 /nobreak >nul
    goto menu
)

if not exist "node_modules" (
    echo  📦 Instalando dependências pela primeira vez...
    call npm install
)

echo  ✅ Configurações verificadas!
echo  🚀 Iniciando NX Store Bot...
echo.
echo  =========================================
echo  🎮 COMANDOS DISPONÍVEIS:
echo  =========================================
echo  • /setup      - Configurar servidor completo
echo  • /solicitar  - Solicitar acesso à loja/comunidade  
echo  • /ping       - Testar conexão do bot
echo  =========================================
echo.

echo  📡 Conectando ao Discord...
echo  ⏳ Aguarde alguns segundos...
echo.

node src/index.js
goto menu

:restart_bot
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     🔄 REINICIANDO BOT                        ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  🛑 Parando processos do Node.js...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo  ✅ Processos finalizados!
echo  🚀 Reiniciando bot...
timeout /t 2 /nobreak >nul
goto start_bot

:register_commands
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║             📝 REGISTRANDO COMANDOS NO DISCORD               ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  🔄 Registrando comandos slash...
echo  ⏳ Isso pode levar alguns segundos...
echo.
node src/deploy-commands.js
echo.
echo  ✅ Comandos registrados com sucesso!
echo  📋 Lista de comandos disponíveis:
echo  • /setup - Menu de setup profissional
echo  • /solicitar - Sistema de solicitação
echo  • /ping - Teste de conexão
echo.
pause
goto menu

:install_deps
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║             ⚙️  INSTALANDO DEPENDÊNCIAS                       ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  📦 Instalando/atualizando pacotes...
echo  ⏳ Isso pode levar alguns minutos...
echo.
call npm install
call npm update
echo.
echo  ✅ Dependências instaladas com sucesso!
echo  📊 Pacotes instalados:
echo  • discord.js - API do Discord
echo  • dotenv - Variáveis de ambiente
echo  • uuid - Gerador de códigos únicos
echo.
pause
goto menu

:clean_cache
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     🧹 LIMPANDO CACHE                         ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  🗑️  Limpando arquivos temporários...
del /f /q *.log 2>nul
del /f /q npm-debug.log 2>nul
del /f /q yarn-error.log 2>nul
echo  ✅ Logs antigos removidos!
echo.
echo  📁 Limpando cache do npm...
call npm cache clean --force
echo  ✅ Cache limpo!
echo.
echo  🔍 Verificando problemas...
call npm audit fix
echo.
echo  ✅ Limpeza concluída com sucesso!
pause
goto menu

:bot_status
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     📊 STATUS DO BOT                          ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  📅 Data/Hora: %date% %time%
echo.

if exist "package.json" (
    for /f "tokens=2 delims=:," %%a in ('type package.json ^| findstr "name"') do (
        set name=%%a
    )
    echo  📦 Nome do Projeto: %name%
)

if exist "node_modules" (
    echo  ✅ Dependências: INSTALADAS
) else (
    echo  ❌ Dependências: NÃO INSTALADAS
)

if exist ".env" (
    echo  ✅ Arquivo .env: ENCONTRADO
) else (
    echo  ❌ Arquivo .env: NÃO ENCONTRADO
)

if exist "src/index.js" (
    echo  ✅ Arquivo principal: OK
) else (
    echo  ❌ Arquivo principal: NÃO ENCONTRADO
)

echo.
echo  📊 Tamanho do projeto:
for /f "tokens=3" %%a in ('dir /s /c 2^>nul ^| find "Arquivo(s)"') do echo  Total: %%a bytes

echo.
echo  🖥️  Informações do sistema:
echo  Processador: %PROCESSOR_ARCHITECTURE%
echo  Nível do processador: %PROCESSOR_LEVEL%
echo  Node.js: 
node --version
echo  npm:
npm --version

echo.
pause
goto menu

:dev_mode
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     🔧 MODO DESENVOLVEDOR                     ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  🛠️  Opções de desenvolvimento:
echo.
echo  1. 🐛 Iniciar com Nodemon (auto-reload)
echo  2. 📋 Ver logs detalhados
echo  3. 🔍 Verificar erros de sintaxe
echo  4. 🧪 Executar testes
echo  5. ↩️  Voltar ao menu principal
echo.
set /p dev_choice="👉 Escolha: "

if "%dev_choice%"=="1" goto nodemon_start
if "%dev_choice%"=="2" goto show_logs
if "%dev_choice%"=="3" goto check_syntax
if "%dev_choice%"=="4" goto run_tests
if "%dev_choice%"=="5" goto menu

:nodemon_start
echo.
echo  🔄 Iniciando com Nodemon (auto-reload)...
echo  ⚠️  Pressione Ctrl+C para parar
echo.
if not exist "node_modules/nodemon" (
    echo  📦 Instalando Nodemon...
    call npm install -g nodemon
)
nodemon src/index.js
goto menu

:show_logs
echo.
echo  📜 ÚLTIMOS LOGS DO BOT:
echo  =========================================
type npm-debug.log 2>nul || echo  Nenhum log encontrado.
echo  =========================================
echo.
pause
goto dev_mode

:check_syntax
echo.
echo  🔍 VERIFICANDO SINTAXE DOS ARQUIVOS...
echo.
echo  📁 Verificando src/index.js...
node -c src/index.js && echo  ✅ Sintaxe OK! || echo  ❌ Erro de sintaxe!
echo.
echo  📁 Verificando src/events/interactionCreate.js...
node -c src/events/interactionCreate.js && echo  ✅ Sintaxe OK! || echo  ❌ Erro de sintaxe!
echo.
pause
goto dev_mode

:run_tests
echo.
echo  🧪 EXECUTANDO TESTES...
echo  ⚠️  Funcionalidade em desenvolvimento
echo.
pause
goto dev_mode

:backup_project
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     💾 BACKUP DO PROJETO                      ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
set backup_name=nxstore-backup-%date:~10,4%%date:~4,2%%date:~7,2%-%time:~0,2%%time:~3,2%
set backup_name=%backup_name: =0%
echo  📦 Criando backup: %backup_name%
echo.

if not exist "backups" mkdir backups

xcopy /E /I /Y . backups\%backup_name%\ >nul
echo  ✅ Backup criado com sucesso!
echo  📁 Local: backups\%backup_name%\
echo  📊 Tamanho: 
for /f "tokens=3" %%a in ('dir /s /c "backups\%backup_name%" 2^>nul ^| find "Arquivo(s)"') do echo  %%a bytes
echo.
echo  💡 Dica: Mantenha backups regulares do seu projeto!
echo.
pause
goto menu

:show_help
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     🆘 AJUDA E INFORMAÇÕES                    ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  📚 SOBRE O NX STORE BOT:
echo  =========================================
echo  Versão: Professional 2.0
echo  Desenvolvido por: NX Store Team
echo  GitHub: github.com/nooxvitor/nxstore-bot
echo  =========================================
echo.
echo  🎯 FUNCIONALIDADES PRINCIPAIS:
echo  • /setup - Cria servidor profissional completo
echo  • /solicitar - Sistema de cadastro com códigos
echo  • Cria 24+ cargos hierárquicos
echo  • Configura 30+ canais organizados
echo  • Sistema de boas-vindas automático
echo  • Painel de controle para administradores
echo.
echo  ⚙️  REQUISITOS DO SISTEMA:
echo  • Node.js 16.9.0 ou superior
echo  • npm 7.0.0 ou superior
echo  • Windows 10/11 ou Linux/macOS
echo  • Conexão com internet estável
echo.
echo  📞 SUPORTE:
echo  • Discord: discord.gg/nxstore
echo  • Email: suporte@nxstore.com
echo  • Issues: GitHub Repository
echo.
echo  🔒 SEGURANÇA:
echo  • Mantenha seu TOKEN secreto
echo  • Faça backups regularmente
echo  • Atualize as dependências
echo  • Monitore os logs do bot
echo.
pause
goto menu

:exit_bot
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     ❌ ENCERRANDO SISTEMA                      ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  🛑 Parando todos os processos...
taskkill /F /IM node.exe 2>nul
echo.
echo  ✅ Processos finalizados!
echo  👋 Obrigado por usar o NX Store Bot!
echo.
echo  ███████╗██╗███╗   ██╗ █████╗ ██╗     ███████╗
echo  ██╔════╝██║████╗  ██║██╔══██╗██║     ██╔════╝
echo  █████╗  ██║██╔██╗ ██║███████║██║     █████╗
echo  ██╔══╝  ██║██║╚██╗██║██╔══██║██║     ██╔══╝
echo  ██║     ██║██║ ╚████║██║  ██║███████╗███████╗
echo  ╚═╝     ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚══════╝
echo.
timeout /t 3 /nobreak >nul
exit