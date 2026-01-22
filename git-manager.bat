@echo off
chcp 65001 >nul
title 🚀 NX STORE - GIT MANAGER PROFISSIONAL
color 0A

echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     🐙 GIT MANAGER - NX STORE                 ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.

:menu
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     🎯 MENU GIT PROFISSIONAL                  ║
echo  ╠═══════════════════════════════════════════════════════════════╣
echo  ║                                                               ║
echo  ║  1. 📤 ENVIAR CÓDIGO PARA O GITHUB (Push)                     ║
echo  ║  2. 📥 ATUALIZAR DO GITHUB (Pull)                             ║
echo  ║  3. 📊 VER STATUS DO REPOSITÓRIO                              ║
echo  ║  4. 📝 VER HISTÓRICO DE COMMITS                               ║
echo  ║  5. 🔄 SINCRONIZAR TUDO (Pull + Push)                         ║
echo  ║  6. 🧹 LIMPAR ARQUIVOS TEMPORÁRIOS                            ║
echo  ║  7. 🆕 CRIAR NOVA VERSÃO (Tag)                                ║
echo  ║  8. 🗑️  REMOVER ARQUIVOS NÃO RASTREADOS                       ║
echo  ║  9. 🔍 VER DIFERENÇAS (Diff)                                  ║
echo  ║  0. ↩️  VOLTAR AO MENU PRINCIPAL                              ║
echo  ║                                                               ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
set /p git_choice="👉 DIGITE SUA OPÇÃO: "

if "%git_choice%"=="1" goto git_push
if "%git_choice%"=="2" goto git_pull
if "%git_choice%"=="3" goto git_status
if "%git_choice%"=="4" goto git_log
if "%git_choice%"=="5" goto git_sync
if "%git_choice%"=="6" goto git_clean
if "%git_choice%"=="7" goto git_tag
if "%git_choice%"=="8" goto git_clean_untracked
if "%git_choice%"=="9" goto git_diff
if "%git_choice%"=="0" exit
goto menu

:git_push
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     📤 ENVIANDO PARA GITHUB                   ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  🔍 Verificando alterações...
git status
echo.
echo  📦 Preparando arquivos para commit...
set /p commit_msg="📝 Digite a mensagem do commit: "
echo.
echo  ⚙️  Executando comandos...
echo.
echo  📁 Adicionando todos os arquivos...
git add .
echo.
echo  💾 Criando commit...
git commit -m "%commit_msg%"
echo.
echo  🚀 Enviando para o GitHub...
git push origin main
echo.
echo  ✅ Código enviado com sucesso!
echo  🌐 Link: https://github.com/nooxvitor/nxstore-bot
echo.
pause
goto menu

:git_pull
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     📥 ATUALIZANDO DO GITHUB                  ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  🔄 Atualizando código local...
echo.
git pull origin main
echo.
echo  ✅ Atualização concluída!
echo.
pause
goto menu

:git_status
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     📊 STATUS DO REPOSITÓRIO                  ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  📅 Data/Hora: %date% %time%
echo  📁 Repositório: nxstore-bot
echo  🌐 Remoto: https://github.com/nooxvitor/nxstore-bot
echo.
echo  =========================================
echo  📋 STATUS DAS ALTERAÇÕES:
echo  =========================================
git status
echo.
echo  =========================================
echo  🌿 BRANCH ATUAL:
git branch --show-current
echo.
pause
goto menu

:git_log
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     📝 HISTÓRICO DE COMMITS                   ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  Últimos 10 commits:
echo  =========================================
git log --oneline -10 --graph --all
echo  =========================================
echo.
echo  📊 Estatísticas:
git shortlog -sn --all
echo.
pause
goto menu

:git_sync
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     🔄 SINCRONIZANDO TUDO                     ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  📥 Baixando atualizações...
git pull origin main
echo.
echo  📤 Enviando alterações locais...
git push origin main
echo.
echo  ✅ Sincronização completa!
echo  📊 Status final:
git status --short
echo.
pause
goto menu

:git_clean
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     🧹 LIMPANDO TEMPORÁRIOS                   ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  🗑️  Removendo arquivos temporários...
del /f /q *.log 2>nul
del /f /q *.tmp 2>nul
del /f /q *.backup 2>nul
del /f /q temp_*.js 2>nul
echo  ✅ Arquivos temporários removidos!
echo.
echo  📦 Limpando cache do Git...
git gc --prune=now
echo  ✅ Cache limpo!
echo.
pause
goto menu

:git_tag
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     🆕 CRIANDO NOVA VERSÃO                    ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  📊 Versão atual do projeto:
type package.json | findstr "version"
echo.
set /p tag_name="🎯 Digite o nome da versão (ex: v1.2.0): "
set /p tag_msg="📝 Digite a mensagem da versão: "
echo.
echo  🏷️  Criando tag %tag_name%...
git tag -a %tag_name% -m "%tag_msg%"
echo.
echo  🚀 Enviando tag para o GitHub...
git push origin %tag_name%
echo.
echo  ✅ Versão %tag_name% criada com sucesso!
echo  📌 Tags disponíveis:
git tag -l
echo.
pause
goto menu

:git_clean_untracked
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     🗑️  LIMPANDO NÃO RASTREADOS               ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  ⚠️  ATENÇÃO: Isso removerá arquivos não rastreados pelo Git!
echo.
echo  📋 Arquivos que serão removidos:
git clean -dn
echo.
set /p confirm="❓ Deseja realmente remover? (S/N): "
if /i "%confirm%"=="S" (
    echo  🗑️  Removendo arquivos...
    git clean -df
    echo  ✅ Arquivos não rastreados removidos!
) else (
    echo  ❌ Operação cancelada.
)
echo.
pause
goto menu

:git_diff
cls
echo.
echo  ╔═══════════════════════════════════════════════════════════════╗
echo  ║                     🔍 VER DIFERENÇAS                         ║
echo  ╚═══════════════════════════════════════════════════════════════╝
echo.
echo  📋 Escolha o tipo de diff:
echo.
echo  1. 📁 Diff geral (todos os arquivos)
echo  2. 📄 Diff de arquivo específico
echo  3. 🔄 Diff com a branch main
echo.
set /p diff_choice="👉 Opção: "

if "%diff_choice%"=="1" (
    echo.
    echo  📊 Mostrando diferenças gerais...
    git diff --stat
    echo.
    git diff
)

if "%diff_choice%"=="2" (
    echo.
    set /p file_name="📄 Digite o nome do arquivo: "
    echo.
    git diff %file_name%
)

if "%diff_choice%"=="3" (
    echo.
    echo  🔄 Comparando com main...
    git diff main
)

echo.
pause
goto menu