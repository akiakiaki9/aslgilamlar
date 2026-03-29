'use client';

import Link from 'next/link';
import './quickContacts.css';

const QuickContacts = () => {
    const phoneNumber = "+998 (99) 620-33-33";
    const telegramUsername = "asl_gilam_buxara";
    const instagramUsername = "asl_gilam_buxara";

    const handleCall = () => {
        window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
    };

    const handleTelegram = () => {
        window.open(`https://t.me/${telegramUsername}`, '_blank');
    };

    const handleInstagram = () => {
        window.open(`https://instagram.com/${instagramUsername}`, '_blank');
    };

    const handleLocation = () => {
        const latitude = 39.771648;
const longitude = 64.420990;
const address = "Asl Gilam";

window.open(`https://yandex.uz/maps/?rtext=~${latitude},${longitude}&rtt=auto&ruri=ymapsbm1://geo?ll=${longitude},${latitude}&text=${encodeURIComponent(address)}`, '_blank');
    };

    return (
        <section className="quick-contacts">
            <div className="container">
                <div className="quick-contacts-wrapper">
                    {/* Левая часть с текстом */}
                    <div className="quick-contacts-info">
                        <div className="quick-contacts-decoration">
                            <span className="quick-contacts-line"></span>
                            <span className="quick-contacts-badge">Свяжитесь с нами</span>
                            <span className="quick-contacts-line"></span>
                        </div>
                        <h2 className="quick-contacts-title">
                            Готовы выбрать идеальный ковер?
                        </h2>
                        <p className="quick-contacts-description">
                            Наши эксперты помогут вам подобрать ковер, который идеально впишется в ваш интерьер.
                            Позвоните нам или напишите в мессенджеры — мы всегда на связи!
                        </p>

                        {/* Кнопка позвонить */}
                        <button className="quick-contacts-call-btn" onClick={handleCall}>
                            <svg className="call-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 16.92V19C22.0011 19.7904 21.816 20.5705 21.4617 21.2702C21.1073 21.97 20.5961 22.566 19.9744 23.002C19.3526 23.4381 18.6413 23.6991 17.899 23.7598C17.1567 23.8205 16.4094 23.6789 15.72 23.35C13.6339 22.4532 11.6636 21.2925 9.86002 19.9C8.19198 18.6105 6.73696 17.0653 5.56002 15.33C4.19012 13.5029 3.05193 11.5072 2.17002 9.39C1.85681 8.6939 1.72419 7.93264 1.78354 7.17499C1.84288 6.41733 2.09236 5.68662 2.50655 5.05022C2.92074 4.41381 3.4852 3.89323 4.14876 3.53689C4.81231 3.18055 5.55248 3.00015 6.30002 3.01H8.17002C8.81627 3.00203 9.44554 3.2082 9.96002 3.59C10.3881 3.91807 10.7161 4.36308 10.91 4.87C11.1924 5.64757 11.5259 6.40439 11.91 7.14C12.1422 7.59724 12.2559 8.10594 12.24 8.62C12.233 9.11573 12.0953 9.60006 11.84 10.02C11.707 10.2413 11.574 10.4627 11.44 10.68C11.2643 10.9435 11.1465 11.2428 11.095 11.5571C11.0435 11.8714 11.0597 12.1929 11.1425 12.5003C11.2253 12.8077 11.3727 13.0936 11.5741 13.3383C11.7755 13.5831 12.026 13.7808 12.31 13.92C13.3361 14.5033 14.4495 14.925 15.61 15.17C15.9965 15.2389 16.3943 15.2086 16.7648 15.0827C17.1353 14.9569 17.4641 14.7403 17.72 14.45C18.0238 14.0883 18.3949 13.7885 18.81 13.56C19.5328 13.1684 20.3852 13.1185 21.15 13.42C21.6499 13.6102 22.0909 13.9304 22.425 14.34C22.8052 14.835 23.0272 15.4372 23.06 16.06C23.0731 16.3616 23.0353 16.664 22.9486 16.9512C22.8619 17.2383 22.7283 17.5052 22.555 17.74C22.3618 18.0257 22.1771 18.317 22 18.61V16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Позвонить сейчас</span>
                            <span className="call-number">{phoneNumber}</span>
                        </button>

                        {/* Дополнительные контакты */}
                        <div className="quick-contacts-links">
                            <Link href="/contacts" className="contacts-link">
                                Все контакты
                                <svg className="link-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <button className="contacts-link" onClick={handleLocation}>
                                <svg className="link-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Как добраться</span>
                            </button>
                        </div>
                    </div>

                    {/* Правая часть с мессенджерами */}
                    <div className="quick-contacts-messengers">
                        <h3>Свяжитесь удобным способом</h3>
                        <div className="messengers-grid">

                            <button className="messenger-card telegram" onClick={handleTelegram}>
                                <div className="messenger-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 5L2 12.5L9 15.5L19 8L13 17L20 20L21 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M9 15.5V19.5L12.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="messenger-info">
                                    <span className="messenger-name">Telegram</span>
                                    <span className="messenger-number">@{telegramUsername}</span>
                                </div>
                                <div className="messenger-arrow">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </button>

                            <button className="messenger-card instagram" onClick={handleInstagram}>
                                <div className="messenger-icon">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16 11.37C16.1234 12.2022 15.9812 13.0522 15.5937 13.799C15.2062 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4077 15.9059C10.5771 15.7721 9.80971 15.3801 9.21479 14.7852C8.61987 14.1903 8.22787 13.4229 8.0941 12.5923C7.96033 11.7616 8.09202 10.9099 8.47028 10.1584C8.84854 9.40685 9.45414 8.7938 10.2009 8.4063C10.9477 8.0188 11.7977 7.8766 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8716 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="messenger-info">
                                    <span className="messenger-name">Instagram</span>
                                    <span className="messenger-number">@{instagramUsername}</span>
                                </div>
                                <div className="messenger-arrow">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </button>
                        </div>

                        <div className="quick-contacts-hours">
                            <div className="hours-icon">🕒</div>
                            <div className="hours-info">
                                <span className="hours-title">Режим работы</span>
                                <span className="hours-time">Ежедневно: 9:00 - 19:00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuickContacts;