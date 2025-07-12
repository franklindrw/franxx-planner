#!/bin/sh

# O comando 'set -e' garante que o script irá parar se algum comando falhar.
set -e

# Executa as migrações do Prisma.
# 'migrate deploy' é o comando recomendado para ambientes de produção/CI,
# pois ele não gera novos arquivos de migração, apenas aplica os existentes.
echo "Running database migrations..."
npx prisma migrate deploy

# Depois que as migrações forem bem-sucedidas, executa o comando principal da aplicação.
# 'exec "$@"' passa o controle para o comando definido no CMD do Dockerfile.
echo "Starting the application..."
exec "$@"