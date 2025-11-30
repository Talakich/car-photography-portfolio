#!/bin/bash

echo "=========================================="
echo "Автоматическое обновление галереи"
echo "=========================================="
echo ""

# Переходим в директорию скрипта
cd "$(dirname "$0")"

# Создаем JSON файл со списком всех изображений
echo "[" > images/gallery.json

first=true
for img in images/*.jpg images/*.jpeg images/*.png images/*.JPG images/*.JPEG images/*.PNG; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        # Пропускаем gallery.json
        if [ "$filename" != "gallery.json" ]; then
            if [ "$first" = true ]; then
                first=false
            else
                echo "," >> images/gallery.json
            fi
            echo "  \"$filename\"" >> images/gallery.json
        fi
    fi
done

echo "" >> images/gallery.json
echo "]" >> images/gallery.json

echo "✅ Галерея обновлена!"
echo ""
echo "Найдено фотографий:"
cat images/gallery.json | grep -c "\.jpg\|\.jpeg\|\.png" || echo "0"
echo ""
echo "Откройте index.html в браузере, чтобы увидеть изменения"
echo "=========================================="
