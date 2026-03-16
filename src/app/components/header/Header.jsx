'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './header.css';

const HeroHeader = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Проверяем мобильное устройство
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="hero">
            {/* Видео фон */}
            <div className="hero-video-container">
                {!isVideoLoaded && <div className="hero-video-placeholder"></div>}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`hero-video ${isVideoLoaded ? 'loaded' : ''}`}
                    onLoadedData={() => setIsVideoLoaded(true)}
                    poster="/images/hero-poster.jpg" // Запасной кадр на случай если видео не загрузится
                >
                    {/* Для мобильных можно использовать другое видео или WebM для лучшей компрессии */}
                    <source
                        src={isMobile ? "https://player.vimeo.com/external/370331493.sd.mp4?s=90f2c344d7bcc5d9c0c9f7f2e8a7a7b7f2e8a7a7&profile_id=139&oauth2_token_id=57447761" : "https://player.vimeo.com/external/370331493.sd.mp4?s=90f2c344d7bcc5d9c0c9f7f2e8a7a7b7f2e8a7a7&profile_id=139&oauth2_token_id=57447761"}
                        type="video/mp4"
                    />
                    <source
                        src={isMobile ? "/videos/hero-mobile.webm" : "/videos/hero.webm"}
                        type="video/webm"
                    />
                    Ваш браузер не поддерживает видео.
                </video>

                {/* Затемнение для лучшей читаемости текста */}
                <div className="hero-overlay"></div>

                {/* Декоративный золотой градиент */}
                <div className="hero-gradient"></div>
            </div>

            {/* Контент */}
            <div className="hero-content container">
                <div className="hero-content-wrapper">
                    {/* Верхний декор */}
                    <div className="hero-decoration-top">
                        <span className="hero-decoration-line"></span>
                        <span className="hero-decoration-text">Bukhara</span>
                        <span className="hero-decoration-line"></span>
                    </div>

                    {/* Главный заголовок */}
                    <h1 className="hero-title">
                        <span className="hero-title-line">Искусство</span>
                        <span className="hero-title-line hero-title-gold">Восточных ковров</span>
                    </h1>

                    {/* Подзаголовок */}
                    <p className="hero-subtitle">
                        Бухара — сердце ковроткачества. Ручная работа, вековые традиции,
                        непревзойденное качество. Подарите своему дому роскошь Востока.
                    </p>

                    {/* Кнопки действий */}
                    <div className="hero-buttons">
                        <Link href="/catalog" className="hero-btn hero-btn-primary">
                            Смотреть каталог
                            <svg className="hero-btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>

                        <Link href="/contacts" className="hero-btn hero-btn-secondary">
                            Связаться с нами
                        </Link>
                    </div>

                    {/* Статистика */}
                    <div className="hero-stats">
                        <div className="hero-stat-item">
                            <span className="hero-stat-number">50+</span>
                            <span className="hero-stat-label">лет опыта</span>
                        </div>
                        <div className="hero-stat-item">
                            <span className="hero-stat-number">1000+</span>
                            <span className="hero-stat-label">ковров</span>
                        </div>
                        <div className="hero-stat-item">
                            <span className="hero-stat-number">500+</span>
                            <span className="hero-stat-label">клиентов</span>
                        </div>
                    </div>

                    {/* Индикатор скролла */}
                    <div className="hero-scroll-indicator">
                        <span className="hero-scroll-text">Листайте вниз</span>
                        <div className="hero-scroll-line"></div>
                    </div>
                </div>
            </div>

            {/* Золотые акценты по углам */}
            <div className="hero-corner hero-corner-tl"></div>
            <div className="hero-corner hero-corner-tr"></div>
            <div className="hero-corner hero-corner-bl"></div>
            <div className="hero-corner hero-corner-br"></div>
        </section>
    );
};

export default HeroHeader;