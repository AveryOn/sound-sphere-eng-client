#!/usr/bin/env bash
set -e
echo "Sync server repo..."

# Получаем ветку из второго аргумента, по умолчанию dev
BRANCH=${1:-dev}

# Переходим на один уровень выше — в родительский репозиторий
cd ..

# Обновляем сабмодуль server
git submodule update --remote --init --recursive server

# Переключаем server на указанную ветку
cd server
git fetch origin $BRANCH
git checkout $BRANCH
git reset --hard origin/$BRANCH

# Показываем коммит
git log --oneline -n 1