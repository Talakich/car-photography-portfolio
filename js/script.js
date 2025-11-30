// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Анимация гамбургера
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active')
        ? 'rotate(45deg) translate(5px, 5px)'
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active')
        ? 'rotate(-45deg) translate(7px, -6px)'
        : 'none';
});

// Закрытие меню при клике на ссылку
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Фильтрация галереи
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Удаление активного класса у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all') {
                item.classList.remove('hide');
                setTimeout(() => {
                    item.style.display = 'block';
                }, 300);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        if (item.classList.contains('hide')) {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            }
        });
    });
});

// Lightbox для просмотра изображений
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');

document.querySelectorAll('.gallery-image').forEach(image => {
    image.addEventListener('click', function() {
        lightbox.classList.add('active');
        const img = this.querySelector('img');
        const overlay = this.querySelector('.gallery-overlay');

        lightboxImg.src = img.src;
        if (overlay) {
            const title = overlay.querySelector('h3').textContent;
            const description = overlay.querySelector('p').textContent;
            lightboxCaption.textContent = `${title} - ${description}`;
        }
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

// Закрытие lightbox по нажатию ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
    }
});

// Анимация при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдение за элементами галереи
galleryItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// Изменение навбара при скролле
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        // Скролл вниз
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Скролл вверх
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    }

    lastScroll = currentScroll;
});

navbar.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

// Обработка отправки формы
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Здесь можно добавить отправку данных на сервер
    // Например, используя fetch API

    alert('Спасибо за сообщение! Я свяжусь с вами в ближайшее время.');
    contactForm.reset();
});

// Создание placeholder изображений (временное решение)
// Эта функция создает цветные заглушки для демонстрации
function createPlaceholderImages() {
    const images = document.querySelectorAll('.gallery-image img, .about-image img');
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

    images.forEach((img, index) => {
        if (img.src.includes('placeholder') || img.src.includes('photographer')) {
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 600;
            const ctx = canvas.getContext('2d');

            // Градиент
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, colors[index % colors.length]);
            gradient.addColorStop(1, colors[(index + 1) % colors.length]);

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Текст
            ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.font = 'bold 48px Montserrat, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Ваше фото', canvas.width / 2, canvas.height / 2);

            img.src = canvas.toDataURL();
        }
    });
}

// Вызов функции при загрузке страницы
window.addEventListener('load', createPlaceholderImages);

// Счетчик для статистики (анимация чисел)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Запуск анимации счетчиков при появлении в видимости
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                stat.textContent = '0+';
                animateCounter(stat, number);
            });
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) {
    statsObserver.observe(aboutStats);
}

// Автоматическая загрузка галереи из папки images
async function loadGallery() {
    console.log('🔄 Начинаем загрузку галереи...');

    try {
        console.log('📡 Загружаем gallery.json...');
        const response = await fetch('images/gallery.json');

        if (!response.ok) {
            throw new Error(`HTTP ошибка! статус: ${response.status}`);
        }

        const galleryData = await response.json();
        console.log('✅ gallery.json загружен:', galleryData);

        const galleryGrid = document.querySelector('.gallery-grid');

        if (!galleryGrid) {
            console.error('❌ Элемент .gallery-grid не найден!');
            return;
        }

        // Названия для каждой категории
        const categoryTitles = {
            'sports': ['Спортивный автомобиль', 'Мощь и скорость', 'Гоночный болид', 'Суперкар'],
            'classic': ['Классический стиль', 'Ретро автомобиль', 'Винтажная классика', 'Легенда дорог'],
            'luxury': ['Премиум класс', 'Роскошный автомобиль', 'Элитное авто', 'Статус и стиль'],
            'action': ['Динамичная съемка', 'Автомобиль в движении', 'Скорость и драйв', 'Экшн фото']
        };

        let totalPhotos = 0;

        // Проходим по каждой категории
        for (const [category, images] of Object.entries(galleryData)) {
            console.log(`📁 Обрабатываем категорию ${category}: ${images.length} фото`);

            images.forEach((imagePath, index) => {
                const titles = categoryTitles[category] || ['Автомобильное фото'];
                const title = titles[index % titles.length];

                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.setAttribute('data-category', category);

                galleryItem.innerHTML = `
                    <div class="gallery-image">
                        <img src="images/${imagePath}" alt="${title}">
                        <div class="gallery-overlay">
                            <h3>${title}</h3>
                            <p>Автомобильная фотография</p>
                        </div>
                    </div>
                `;

                galleryGrid.appendChild(galleryItem);
                totalPhotos++;
            });
        }

        console.log(`🎉 Добавлено ${totalPhotos} элементов в DOM`);

        // Переинициализируем lightbox для новых изображений
        initLightbox();

        console.log(`✅ Загружено ${totalPhotos} фотографий из папки images/`);

    } catch (error) {
        console.error('❌ Ошибка загрузки галереи:', error);
        console.error('Детали:', error.message);
    }
}

// Инициализация lightbox для динамически загруженных изображений
function initLightbox() {
    document.querySelectorAll('.gallery-image').forEach(image => {
        // Удаляем старые обработчики клонированием
        const newImage = image.cloneNode(true);
        image.parentNode.replaceChild(newImage, image);

        newImage.addEventListener('click', function() {
            lightbox.classList.add('active');
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay');

            lightboxImg.src = img.src;
            if (overlay) {
                const title = overlay.querySelector('h3').textContent;
                const description = overlay.querySelector('p').textContent;
                lightboxCaption.textContent = `${title} - ${description}`;
            }
        });
    });
}

// Загружаем галерею при загрузке страницы
window.addEventListener('DOMContentLoaded', loadGallery);

console.log('Сайт портфолио загружен! Добавьте свои фотографии в папку images/');
