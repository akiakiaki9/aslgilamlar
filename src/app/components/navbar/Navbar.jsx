'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    FaPhone,
    FaInstagram,
    FaTelegram,
    FaBars,
    FaTimes
} from 'react-icons/fa';
import './navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Данные из QuickContacts
    const phoneNumber = "+998 (91) 718-33-33";
    const telegramUsername = "asl_gilam_buxara";
    const instagramUsername = "asl_gilam_buxara";
    const latitude = 39.771648;
    const longitude = 64.420990;
    const address = "Бухара, махаллинский сход граждан Мирзо Улугбек, ул. Ахмада Яссавий, 98";
    const workHours = "Ежедневно: 9:00 - 19:00";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
    };

    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
    };

    const handleCallTaxi = () => {
        const fullAddress = "Asl Gilam, " + address;
        const deeplink = `yandextaxi://route/?end-lat=${latitude}&end-lon=${longitude}&end-address=${encodeURIComponent(fullAddress)}`;
        const fallbackUrl = `https://taxi.yandex.uz/?rto=${latitude},${longitude}&text=${encodeURIComponent(fullAddress)}`;

        window.location.href = deeplink;
        setTimeout(() => {
            window.location.href = fallbackUrl;
        }, 500);
    };

    const navLinks = [
        { href: "/", label: "Главная" },
        { href: "/catalog", label: "Каталог" },
        { href: "/contacts", label: "Контакты" },
        { href: "/favorites", label: "Избранное" }
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container container">
                {/* Логотип - только для ПК версии, в мобильном меню скрывается */}
                <Link href="/" className="navbar-logo" onClick={closeMenu}>
                    <Image
                        src="/images/logo.png"
                        alt="Asl Gilam"
                        width={120}
                        height={50}
                        className="navbar-logo-img"
                        priority
                    />
                    <span className="navbar-logo-text">
                        ASL<span className="text-gold">GILAM</span>
                    </span>
                </Link>

                {/* Десктопное меню */}
                <div className="navbar-menu">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="navbar-link">
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Десктопные действия */}
                <div className="navbar-actions">
                    <a href={`tel:${phoneNumber.replace(/\D/g, '')}`} className="navbar-phone">
                        <FaPhone className="navbar-icon" />
                        <span>{phoneNumber}</span>
                    </a>

                    <button className="navbar-taxi-btn" onClick={handleCallTaxi}>
                        <img
                            src="/images/yandex.png"
                            alt="Yandex Go"
                            className="yandex-taxi-logo"
                        />
                        <span>Вызвать такси</span>
                    </button>
                </div>

                {/* Мобильные действия */}
                <div className="navbar-mobile-actions">
                    <a
                        href={`tel:${phoneNumber.replace(/\D/g, '')}`}
                        className="navbar-mobile-icon-btn"
                        aria-label="Позвонить"
                    >
                        <FaPhone />
                    </a>

                    <button
                        className="navbar-mobile-icon-btn yandex-taxi-mobile"
                        onClick={handleCallTaxi}
                        aria-label="Вызвать такси"
                    >
                        <img
                            src="/images/yandex.png"
                            alt="Yandex Go"
                            className="yandex-taxi-logo-small"
                        />
                    </button>

                    <button
                        className={`navbar-burger ${isOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Меню"
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Мобильное меню */}
                <div className={`navbar-mobile-menu ${isOpen ? 'active' : ''}`}>
                    <div className="navbar-mobile-menu-header">
                        <div className="navbar-mobile-logo">
                            <Image
                                src="/images/logo.png"
                                alt="Asl Gilam"
                                width={80}
                                height={35}
                                className="navbar-mobile-logo-img"
                            />
                            <span>ASL<span className="text-gold">GILAM</span></span>
                        </div>
                        <button className="navbar-mobile-close" onClick={closeMenu}>
                            <FaTimes />
                        </button>
                    </div>

                    <div className="navbar-mobile-menu-content">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="navbar-mobile-link"
                                onClick={closeMenu}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="navbar-mobile-divider"></div>

                        <div className="navbar-mobile-contact-section">
                            <div className="navbar-mobile-contact-item">
                                <FaPhone className="contact-icon" />
                                <a href={`tel:${phoneNumber.replace(/\D/g, '')}`}>
                                    {phoneNumber}
                                </a>
                            </div>

                            <button className="navbar-taxi-btn" onClick={handleCallTaxi}>
                                <img
                                    src="/images/yandex.png"
                                    alt="Yandex Go"
                                    className="yandex-taxi-logo"
                                />
                                <span>Яндекс Go</span>
                            </button>
                        </div>

                        <div className="navbar-mobile-social">
                            <p className="social-title">Мы в соцсетях</p>
                            <div className="social-links">
                                <a
                                    href={`https://instagram.com/${instagramUsername}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram />
                                </a>
                                <a
                                    href={`https://t.me/${telegramUsername}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label="Telegram"
                                >
                                    <FaTelegram />
                                </a>
                            </div>
                        </div>

                        <div className="navbar-mobile-info">
                            <p className="info-text">
                                🕒 {workHours}
                            </p>
                            <p className="info-text">
                                📍 {address}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Оверлей */}
                {isOpen && <div className="navbar-overlay" onClick={closeMenu}></div>}
            </div>
        </nav>
    );
};

export default Navbar;