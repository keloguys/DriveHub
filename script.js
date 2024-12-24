// Получаем элемент меню
const header = document.querySelector('header');

// Переменные для отслеживания прокрутки
let prevScrollPos = window.pageYOffset;

// Функция для обработки прокрутки
window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;

    // Если прокрутка вниз, скрываем меню
    if (prevScrollPos < currentScrollPos) {
        header.classList.add('hidden');
    } else {
        // Если прокрутка вверх, показываем меню
        header.classList.remove('hidden');
    }

    // Обновляем предыдущее положение прокрутки
    prevScrollPos = currentScrollPos;
};

// Получаем элементы для паралакса и анимации
const parallax = document.getElementById('parallax');
const galleryImages = document.querySelectorAll('.gallery-images img');
const serviceCards = document.querySelectorAll('.service-card');
const gallerySlides = document.querySelectorAll('.gallery-slide'); // Добавлено для галереи
let currentIndex = 0;
let currentServiceIndex = 0;
let currentGalleryIndex = 0; // Добавлено для галереи

// Обработчик события scroll
function handleScroll() {
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * 0.6 + 'px';

    // Сохраняем текущее положение прокрутки в localStorage
    localStorage.setItem('scrollPosition', offset);
}

// Функция для проверки, виден ли элемент в области просмотра
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Функция для добавления класса visible элементам, которые находятся в области просмотра
function handleScrollAnimations() {
    const sections = document.querySelectorAll('.about, .services, .gallery, .contact');
    sections.forEach(section => {
        if (isElementInViewport(section)) {
            section.classList.add('visible');
        }
    });
}

// Функция для отображения изображения в галерее
function showImage(index) {
    galleryImages.forEach((img, i) => {
        if (i === index) {
            img.classList.add('visible');
            img.classList.remove('prev', 'next');
        } else if (i === index - 1 || (index === 0 && i === galleryImages.length - 1)) {
            img.classList.add('prev');
            img.classList.remove('visible', 'next');
        } else if (i === index + 1 || (index === galleryImages.length - 1 && i === 0)) {
            img.classList.add('next');
            img.classList.remove('visible', 'prev');
        } else {
            img.classList.remove('visible', 'prev', 'next');
        }
    });
}

// Функция для переключения на следующее изображение
function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage(currentIndex);
}

// Функция для переключения на предыдущее изображение
function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentIndex);
}

// Функция для отображения карточки услуги
function showService(index) {
    serviceCards.forEach((card, i) => {
        if (i === index) {
            card.classList.add('visible');
        } else {
            card.classList.remove('visible');
        }
    });
}

// Функция для переключения на предыдущую услугу
function prevService() {
    currentServiceIndex = (currentServiceIndex - 1 + serviceCards.length) % serviceCards.length;
    showService(currentServiceIndex);
}
// Функция для переключения на следующую услугу
function nextService() {
    currentServiceIndex = (currentServiceIndex + 1) % serviceCards.length;
    showService(currentServiceIndex);
}

// Функция для отображения слайда в галерее
function showGallerySlide(index) {
    gallerySlides.forEach((slide, i) => {
        if (i === index) {
            slide.classList.add('visible');
        } else {
            slide.classList.remove('visible');
        }
    });
}

// Функция для переключения на следующий слайд в галерее
function nextGallerySlide() {
    currentGalleryIndex = (currentGalleryIndex + 1) % gallerySlides.length;
    showGallerySlide(currentGalleryIndex);
}

// Функция для переключения на предыдущий слайд в галерее
function prevGallerySlide() {
    currentGalleryIndex = (currentGalleryIndex - 1 + gallerySlides.length) % gallerySlides.length;
    showGallerySlide(currentGalleryIndex);
}

// Автоматическое переключение изображений каждые 3 секунды
setInterval(nextImage, 6000);


// Инициализация отображения первого изображения
showImage(currentIndex);

// Восстановление положения прокрутки при загрузке страницы
window.addEventListener('load', () => {
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
        window.scrollTo(0, parseInt(savedScrollPosition));
    }

    // Применяем паралакс-эффект сразу после восстановления положения прокрутки
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Применяем паралакс-эффект сразу после загрузки

    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations(); // Вызываем функцию сразу после загрузки, чтобы анимации сработали для элементов, которые уже в области просмотра
    showService(currentServiceIndex); // Инициализация отображения первой услуги
    showGallerySlide(currentGalleryIndex); // Инициализация отображения первого слайда в галерее
});

function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(statNumber => {
        const target = parseInt(statNumber.getAttribute('data-target'));
        let start = 0;
        const duration = 2000; // 2 секунды
        const step = target / (duration / 16); // 16ms - примерно 60fps

        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                clearInterval(timer);
                start = target;
            }
            statNumber.textContent = Math.round(start);
        }, 16);
    });
}

function animateNumbersInViewport() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(statNumber => {
        // Проверяем, была ли уже запущена анимация для этого элемента
        if (!statNumber.classList.contains('animated') && isElementInViewport(statNumber)) {
            const target = parseInt(statNumber.getAttribute('data-target'));
            let start = 0;
            const duration = 2000; // 2 секунды
            const step = target / (duration / 16); // 16ms - примерно 60fps

            const timer = setInterval(() => {
                start += step;
                if (start >= target) {
                    clearInterval(timer);
                    start = target;
                }
                statNumber.textContent = Math.round(start);
            }, 16);

            // Добавляем класс, чтобы отметить, что анимация завершена
            statNumber.classList.add('animated');
        }
    });
}

// Вызываем функцию анимации чисел при прокрутке страницы
window.addEventListener('scroll', () => {
    animateNumbersInViewport();
});

// Вызываем функцию анимации чисел при загрузке страницы, если элементы уже в области просмотра
window.addEventListener('load', () => {
    animateNumbersInViewport();
});

    // Анимация для текста в разделе "Перейти к оформлению"
    window.addEventListener('load', () => {
        const orderContent = document.querySelector('.order-content');
        orderContent.classList.add('animated'); // Добавляем класс для анимации
    });

    // Добавляем обработчик события для карточек услуг
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.service-text').classList.add('hovered');
        });

        card.addEventListener('mouseleave', () => {
            card.querySelector('.service-text').classList.remove('hovered');
        });
    });

    function toggleMenu() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    }

    // Функция для анимации появления элементов при прокрутке
    // Функция для анимации слайдов в галерее
function animateGallerySlides() {
    const gallerySlides = document.querySelectorAll('.gallery-slide');

    // Опции для Intersection Observer
    const options = {
        root: null, // Используем viewport
        rootMargin: '0px',
        threshold: 0.1 // Активируем, когда 10% элемента видно
    };

    // Callback для Intersection Observer
    const callback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Если элемент в области просмотра, добавляем класс visible
                entry.target.classList.add('visible');
            }
        });
    };

    // Создаем Intersection Observer
    const observer = new IntersectionObserver(callback, options);

    // Наблюдаем за каждым слайдом
    gallerySlides.forEach(slide => {
        observer.observe(slide);
    });
}

// Вызываем функцию анимации при загрузке страницы
window.addEventListener('load', animateGallerySlides);