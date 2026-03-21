'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import './carousel.css';

const Carousel = () => {
    // Данные карусели с реальными фото
    const slides = [
        {
            id: 1,
            title: "Шелковые ковры",
            description: "Изысканные шелковые ковры ручной работы с традиционными бухарскими узорами. Каждый ковер — уникальное произведение искусства, созданное мастерами с вековым опытом.",
            image: "https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=2070&auto=format&fit=crop",
            link: "/catalog?category=1",
            buttonText: "Смотреть коллекцию",
            badge: "Премиум качество"
        },
        {
            id: 2,
            title: "Шерстяные ковры",
            description: "Теплые и уютные шерстяные ковры премиум-класса. Натуральные материалы и традиционные техники ткачества для вашего комфорта.",
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
            link: "/catalog?category=2",
            buttonText: "Выбрать ковер",
            badge: "Натуральные материалы"
        },
        {
            id: 3,
            title: "Антикварные ковры",
            description: "Уникальные антикварные ковры с богатой историей. Подлинные произведения искусства, сохранившие вековые традиции восточного ковроткачества.",
            image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1965&auto=format&fit=crop",
            link: "/catalog?category=4",
            buttonText: "Узнать историю",
            badge: "Редкие экземпляры"
        },
        {
            id: 4,
            title: "Современные ковры",
            description: "Модные ковры в современном стиле. Идеальное сочетание традиций Востока и актуальных дизайнерских решений.",
            image: "https://images.unsplash.com/photo-1581852307711-52ed829c8d2a?q=80&w=1974&auto=format&fit=crop",
            link: "/catalog?category=10",
            buttonText: "Смотреть новинки",
            badge: "Актуальный дизайн"
        },
        {
            id: 5,
            title: "Эксклюзивная коллекция",
            description: "Дизайнерские ковры в единственном экземпляре. Уникальные произведения искусства, созданные специально для ценителей прекрасного.",
            image: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1932&auto=format&fit=crop",
            link: "/catalog?category=9",
            buttonText: "Смотреть эксклюзивы",
            badge: "Limited Edition"
        },
        {
            id: 6,
            title: "Молитвенные коврики",
            description: "Традиционные молитвенные коврики ручной работы. Созданы с особым вниманием к деталям и духовному значению.",
            image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop",
            link: "/catalog?category=5",
            buttonText: "Выбрать коврик",
            badge: "Ручная работа"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    
    const autoPlayRef = useRef(null);
    const slidesLength = slides.length;

    // Остановка автоплея
    const stopAutoPlay = () => {
        if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
            autoPlayRef.current = null;
        }
    };

    // Запуск автоплея
    const startAutoPlay = () => {
        if (!isAutoPlaying) return;
        stopAutoPlay();
        autoPlayRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slidesLength);
        }, 5000);
    };

    // Управление автоплеем при изменении isAutoPlaying
    useEffect(() => {
        if (isAutoPlaying) {
            startAutoPlay();
        } else {
            stopAutoPlay();
        }
        
        return () => stopAutoPlay();
    }, [isAutoPlaying, slidesLength]);

    // Пауза при наведении
    const handleMouseEnter = () => {
        setIsAutoPlaying(false);
        stopAutoPlay();
    };
    
    const handleMouseLeave = () => {
        setIsAutoPlaying(true);
        startAutoPlay();
    };

    // Переключение слайдов
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slidesLength);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slidesLength) % slidesLength);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    // Обработка свайпов для мобильных
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;
        
        if (isLeftSwipe) {
            nextSlide();
        }
        if (isRightSwipe) {
            prevSlide();
        }
        
        setTouchStart(0);
        setTouchEnd(0);
    };

    return (
        <div 
            className="carousel"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Слайды */}
            <div className="carousel-container">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
                    >
                        {/* Фоновое изображение */}
                        <div className="carousel-bg">
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="carousel-image"
                            />
                            <div className="carousel-overlay"></div>
                            <div className="carousel-gradient"></div>
                        </div>

                        {/* Контент слайда */}
                        <div className="carousel-content">
                            <div className="carousel-content-wrapper">
                                <div className="carousel-decoration">
                                    <span className="carousel-decoration-line"></span>
                                    <span className="carousel-decoration-text">
                                        {slide.badge}
                                    </span>
                                    <span className="carousel-decoration-line"></span>
                                </div>

                                <h2 className="carousel-title">
                                    {slide.title}
                                </h2>

                                <p className="carousel-description">
                                    {slide.description}
                                </p>

                                <Link href={slide.link} className="carousel-btn">
                                    {slide.buttonText}
                                    <svg className="carousel-btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Кнопки навигации */}
            {slides.length > 1 && (
                <>
                    <button 
                        className="carousel-nav carousel-nav-prev"
                        onClick={prevSlide}
                        aria-label="Предыдущий слайд"
                    >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>

                    <button 
                        className="carousel-nav carousel-nav-next"
                        onClick={nextSlide}
                        aria-label="Следующий слайд"
                    >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </>
            )}

            {/* Индикаторы */}
            {slides.length > 1 && (
                <div className="carousel-indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Перейти к слайду ${index + 1}`}
                        >
                            <span className="carousel-indicator-bar"></span>
                        </button>
                    ))}
                </div>
            )}

            {/* Золотые углы */}
            <div className="carousel-corner carousel-corner-tl"></div>
            <div className="carousel-corner carousel-corner-tr"></div>
            <div className="carousel-corner carousel-corner-bl"></div>
            <div className="carousel-corner carousel-corner-br"></div>
        </div>
    );
};

export default Carousel;