#!/bin/bash

echo "=========================================="
echo "Автоматическое обновление галереи"
echo "=========================================="
echo ""

# Переходим в директорию скрипта
cd "$(dirname "$0")"

# Создаем папки если их нет
mkdir -p images/sports images/classic images/luxury images/action

# Создаем JSON файл со списком всех изображений по категориям
echo "{" > images/gallery.json

categories=("sports" "classic" "luxury" "action")
first_category=true

for category in "${categories[@]}"; do
    if [ "$first_category" = true ]; then
        first_category=false
    else
        echo "," >> images/gallery.json
    fi

    echo "  \"$category\": [" >> images/gallery.json

    first_image=true
    for img in images/$category/*.jpg images/$category/*.jpeg images/$category/*.png images/$category/*.JPG images/$category/*.JPEG images/$category/*.PNG; do
        if [ -f "$img" ]; then
            filename=$(basename "$img")
            if [ "$first_image" = true ]; then
                first_image=false
            else
                echo "," >> images/gallery.json
            fi
            echo "    \"$category/$filename\"" >> images/gallery.json
        fi
    done

    echo "  ]" >> images/gallery.json
done

echo "}" >> images/gallery.json

echo "✅ Галерея обновлена!"
echo ""
echo "Статистика по категориям:"
echo "  🏎️  Спорткары (sports):   $(ls images/sports/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null | wc -l | tr -d ' ')"
echo "  🚗 Классика (classic):   $(ls images/classic/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null | wc -l | tr -d ' ')"
echo "  💎 Премиум (luxury):     $(ls images/luxury/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null | wc -l | tr -d ' ')"
echo "  💨 В движении (action):  $(ls images/action/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null | wc -l | tr -d ' ')"
echo ""
echo "Откройте index.html в браузере, чтобы увидеть изменения"
echo "=========================================="
