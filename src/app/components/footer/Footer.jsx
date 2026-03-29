'use client'
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/app/utils/data';
import { useState, useEffect } from 'react';
import './footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Данные из QuickContacts
    const phoneNumber = "+998 (99) 620-33-33";
    const telegramUsername = "asl_gilam_buxara";
    const instagramUsername = "asl_gilam_buxara";
    const address = "Бухара, махаллинский сход граждан Мирзо Улугбек, ул. Ахмада Яссавий, 98";
    const workHours = "Ежедневно: 9:00 - 19:00";

    // Основные категории для футера
    const mainCategories = categories.slice(0, 6);

    // Отслеживаем скролл для кнопки "Наверх"
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLocationClick = () => {
        const latitude = 39.771648;
        const longitude = 64.420990;
        const fullAddress = "Asl Gilam, " + address;

        // Deeplink для Яндекс Go приложения
        const deeplink = `yandextaxi://route/?end-lat=${latitude}&end-lon=${longitude}&end-address=${encodeURIComponent(fullAddress)}`;
        // Fallback на случай, если приложение не установлено
        const fallbackUrl = `https://taxi.yandex.uz/?rto=${latitude},${longitude}&text=${encodeURIComponent(fullAddress)}`;

        // Пробуем открыть приложение
        window.location.href = deeplink;

        // Таймаут для fallback (если приложение не открылось)
        setTimeout(() => {
            window.location.href = fallbackUrl;
        }, 500);
    };

    return (
        <footer className="footer">
            {/* Золотая декоративная полоса сверху */}
            <div className="footer-gold-bar">
                <div className="container">
                    <div className="footer-gold-bar-content">
                        <span className="footer-gold-text">✦ Ручная работа</span>
                        <span className="footer-gold-text">✦ Натуральные материалы</span>
                        <span className="footer-gold-text">✦ Доставка по всему миру</span>
                        <span className="footer-gold-text">✦ Гарантия качества</span>
                        <span className="footer-gold-text">✦ Лучшие цены</span>
                        <span className="footer-gold-text">✦ 100% хлопок</span>
                    </div>
                </div>
            </div>

            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* Колонка 1: Логотип и информация */}
                        <div className="footer-col footer-about">
                            <div className="footer-logo">
                                <Image
                                    src="/images/logo.png"
                                    alt="Asl Gilam"
                                    width={150}
                                    height={60}
                                    className="footer-logo-img"
                                />
                                <div className="footer-logo-text">
                                    ASL<span className="text-gold">GILAM</span>
                                </div>
                            </div>
                            <p className="footer-description">
                                Asl Gilam — бухарские ковры ручной работы. Натуральные материалы,
                                вековые традиции восточных мастеров и непревзойденное качество.
                                Каждый ковер — это уникальное произведение искусства.
                            </p>
                            <div className="footer-social">
                                <h4>Мы в соцсетях</h4>
                                <div className="social-links">
                                    <a href={`https://instagram.com/${instagramUsername}`} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16 11.37C16.1234 12.2022 15.9812 13.0522 15.5937 13.799C15.2062 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4077 15.9059C10.5771 15.7721 9.80971 15.3801 9.21479 14.7852C8.61987 14.1903 8.22787 13.4229 8.0941 12.5923C7.96033 11.7616 8.09202 10.9099 8.47028 10.1584C8.84854 9.40685 9.45414 8.7938 10.2009 8.4063C10.9477 8.0188 11.7977 7.8766 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8716 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                    <a href={`https://t.me/${telegramUsername}`} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Telegram">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 5L2 12.5L9 15.5L19 8L13 17L20 20L21 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M9 15.5V19.5L12.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Колонка 2: Категории */}
                        <div className="footer-col">
                            <h4>Категории</h4>
                            <ul className="footer-links">
                                {mainCategories.map(category => (
                                    <li key={category.id}>
                                        <Link href={`/catalog/category/${category.id}`}>
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                                <li>
                                    <Link href="/catalog" className="footer-link-all">
                                        Все категории
                                        <svg className="footer-link-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Колонка 3: Контакты */}
                        <div className="footer-col">
                            <h4>Контакты</h4>
                            <ul className="footer-contact">
                                <li>
                                    <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 6 11 6 11s6-5.75 6-11c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
                                    </svg>
                                    <div>
                                        <strong>Адрес:</strong>
                                        <p>{address}</p>
                                        <button onClick={handleLocationClick} className="footer-address-link">
                                            Построить маршрут →
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 16.92V19C22.0011 19.7904 21.816 20.5705 21.4617 21.2702C21.1073 21.97 20.5961 22.566 19.9744 23.002C19.3526 23.4381 18.6413 23.6991 17.899 23.7598C17.1567 23.8205 16.4094 23.6789 15.72 23.35C13.6339 22.4532 11.6636 21.2925 9.86002 19.9C8.19198 18.6105 6.73696 17.0653 5.56002 15.33C4.19012 13.5029 3.05193 11.5072 2.17002 9.39C1.85681 8.6939 1.72419 7.93264 1.78354 7.17499C1.84288 6.41733 2.09236 5.68662 2.50655 5.05022C2.92074 4.41381 3.4852 3.89323 4.14876 3.53689C4.81231 3.18055 5.55248 3.00015 6.30002 3.01H8.17002C8.81627 3.00203 9.44554 3.2082 9.96002 3.59C10.3881 3.91807 10.7161 4.36308 10.91 4.87C11.1924 5.64757 11.5259 6.40439 11.91 7.14C12.1422 7.59724 12.2559 8.10594 12.24 8.62C12.233 9.11573 12.0953 9.60006 11.84 10.02C11.707 10.2413 11.574 10.4627 11.44 10.68C11.2643 10.9435 11.1465 11.2428 11.095 11.5571C11.0435 11.8714 11.0597 12.1929 11.1425 12.5003C11.2253 12.8077 11.3727 13.0936 11.5741 13.3383C11.7755 13.5831 12.026 13.7808 12.31 13.92C13.3361 14.5033 14.4495 14.925 15.61 15.17C15.9965 15.2389 16.3943 15.2086 16.7648 15.0827C17.1353 14.9569 17.4641 14.7403 17.72 14.45C18.0238 14.0883 18.3949 13.7885 18.81 13.56C19.5328 13.1684 20.3852 13.1185 21.15 13.42C21.6499 13.6102 22.0909 13.9304 22.425 14.34C22.8052 14.835 23.0272 15.4372 23.06 16.06C23.0731 16.3616 23.0353 16.664 22.9486 16.9512C22.8619 17.2383 22.7283 17.5052 22.555 17.74C22.3618 18.0257 22.1771 18.317 22 18.61V16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div>
                                        <strong>Телефон:</strong>
                                        <a href={`tel:${phoneNumber.replace(/\D/g, '')}`}>{phoneNumber}</a>
                                        <span className="footer-contact-note">WhatsApp / Telegram</span>
                                    </div>
                                </li>
                                <li>
                                    <svg className="footer-contact-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div>
                                        <strong>Часы работы:</strong>
                                        <p>{workHours}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Нижняя часть с копирайтом */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p>&copy; {currentYear} ASL GILAM. Все права защищены.</p>
                    </div>
                    <div className="footer-developer">
                        <p>Разработано в <a href="https://akbarsoft.uz" target="_blank" rel="noopener noreferrer" className="developer-link">Akbar Soft</a></p>
                    </div>
                </div>
            </div>

            {/* Кнопка "Наверх" */}
            <button
                className={`footer-back-to-top ${showBackToTop ? 'visible' : ''}`}
                onClick={handleBackToTop}
                aria-label="Наверх"
            >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </footer>
    );
};

export default Footer;