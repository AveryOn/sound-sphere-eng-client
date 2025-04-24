#!/bin/bash

# Проверка аргумента
if [ -z "$1" ]; then
  echo "❌ commit name is required"
  exit 1
fi

COMMIT_MSG="$1"

# Находимся в папке client или server?
CURRENT_DIR=$(basename "$PWD")

if [[ "$CURRENT_DIR" != "client" && "$CURRENT_DIR" != "server" ]]; then
  echo "❌ Run the script from the client or server folder"
  exit 1
fi

# Коммит и пуш в submodule
git add .
git commit -m "$COMMIT_MSG"
git push

# Возврат в корень
cd ..

# Обновляем ссылку на submodule в основном проекте
git add "$CURRENT_DIR"
git commit -m "auto: updated $CURRENT_DIR ($COMMIT_MSG)"
git push
