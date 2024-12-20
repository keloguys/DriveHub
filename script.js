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

// Функция для переключения на следующую услугу
function nextService() {
    currentServiceIndex = (currentServiceIndex + 1) % serviceCards.length;
    showService(currentServiceIndex);
}

// Функция для переключения на предыдущую услугу
function prevService() {
    currentServiceIndex = (currentServiceIndex - 1 + serviceCards.length) % serviceCards.length;
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

// Автоматическое переключение слайдов в галерее каждые 6 секунд
setInterval(nextGallerySlide, 6000);

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

// Вызываем функцию анимации чисел при загрузке страницы
window.addEventListener('load', () => {
    animateNumbers();
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
