#!/usr/bin/env bash
set -e
echo "Sync server repo..."

BRANCH=${1:-dev}

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