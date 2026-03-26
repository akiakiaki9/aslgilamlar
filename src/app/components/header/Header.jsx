'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaArrowRight, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import './header.css';

const HeroHeader = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Данные из QuickContacts
    const phoneNumber = "+998 (91) 718-33-33";
    const latitude = 39.771648;
    const longitude = 64.420990;
    const address = "Бухара, махаллинский сход граждан Мирзо Улугбек, ул. Ахмада Яссавий, 98";

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleLocationClick = () => {
        const fullAddress = "Asl Gilam, " + address;
        const deeplink = `yandextaxi://route/?end-lat=${latitude}&end-lon=${longitude}&end-address=${encodeURIComponent(fullAddress)}`;
        const fallbackUrl = `https://taxi.yandex.uz/?rto=${latitude},${longitude}&text=${encodeURIComponent(fullAddress)}`;

        window.location.href = deeplink;
        setTimeout(() => {
            window.location.href = fallbackUrl;
        }, 500);
    };

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
                    poster="/images/hero-poster.jpg"
                >
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

                <div className="hero-overlay"></div>
                <div className="hero-gradient"></div>
            </div>

            {/* Контент */}
            <div className="hero-content container">
                <div className="hero-content-wrapper">
                    <div className="hero-decoration-top">
                        <span className="hero-decoration-line"></span>
                        <span className="hero-decoration-text">Asl Gilam</span>
                        <span className="hero-decoration-line"></span>
                    </div>

                    <h1 className="hero-title">
                        <span className="hero-title-line">Искусство</span>
                        <span className="hero-title-line hero-title-gold">Бухарских ковров</span>
                    </h1>

                    <p className="hero-subtitle">
                        Ручная работа, вековые традиции, непревзойденное качество.
                        Подарите своему дому роскошь Востока с Asl Gilam.
                    </p>

                    <div className="hero-buttons">
                        <Link href="/catalog" className="hero-btn hero-btn-primary">
                            Смотреть каталог
                            <FaArrowRight className="hero-btn-icon" />
                        </Link>

                        <Link href="/contacts" className="hero-btn hero-btn-secondary">
                            Связаться с нами
                        </Link>
                    </div>

                    {/* Быстрые контакты */}
                    <div className="hero-quick-contacts">
                        <a href={`tel:${phoneNumber.replace(/\D/g, '')}`} className="hero-quick-contact">
                            <FaPhone className="quick-icon" />
                            <span>{phoneNumber}</span>
                        </a>
                        <button onClick={handleLocationClick} className="hero-quick-contact">
                            <FaMapMarkerAlt className="quick-icon" />
                            <span>Вызвать такси</span>
                        </button>
                    </div>

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

                    <div className="hero-scroll-indicator">
                        <span className="hero-scroll-text">Листайте вниз</span>
                        <div className="hero-scroll-line"></div>
                    </div>
                </div>
            </div>

            <div className="hero-corner hero-corner-tl"></div>
            <div className="hero-corner hero-corner-tr"></div>
            <div className="hero-corner hero-corner-bl"></div>
            <div className="hero-corner hero-corner-br"></div>
        </section>
    );
};

export default HeroHeader;