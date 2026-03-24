'use client';

import './contacts.css';

export default function ContactsClient() {
    // Данные из QuickContacts
    const phoneNumber = "+998 (91) 718-33-33";
    const phoneRaw = "+99891718333";
    const telegramUsername = "asl_gilam_buxara";
    const instagramUsername = "asl_gilam_buxara";

    // Координаты магазина
    const latitude = 39.771648;
    const longitude = 64.420990;
    const address = "Asl Gilam, Бухара, махаллинский сход граждан Мирзо Улугбек, ул. Ахмада Яссавий, 98";
    const shortAddress = "ул. Ахмада Яссавий, 98, Бухара";

    const handleLocationClick = () => {
        const deeplink = `yandextaxi://route/?end-lat=${latitude}&end-lon=${longitude}&end-address=${encodeURIComponent(address)}`;
        const fallbackUrl = `https://taxi.yandex.uz/?rto=${latitude},${longitude}&text=${encodeURIComponent(address)}`;

        window.location.href = deeplink;
        setTimeout(() => {
            window.location.href = fallbackUrl;
        }, 500);
    };

    const handleMapClick = () => {
        window.open(`https://maps.google.com/?q=${latitude},${longitude}`, '_blank');
    };

    return (
        <>
            {/* Schema.org разметка для SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Asl Gilam",
                        "image": "https://aslgilamlarbukhara.uz/images/logo.png",
                        "description": "Магазин фабричных ковров в Бухаре. Широкий выбор ковров от производителей.",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "ул. Ахмада Яссавий, 98",
                            "addressLocality": "Бухара",
                            "addressCountry": "UZ"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": latitude,
                            "longitude": longitude
                        },
                        "telephone": phoneRaw,
                        "openingHours": ["Mo-Su 09:00-19:00"],
                        "sameAs": [
                            `https://t.me/${telegramUsername}`,
                            `https://instagram.com/${instagramUsername}`
                        ]
                    })
                }}
            />

            <div className="contacts-page">
                {/* Hero секция */}
                <section className="contacts-hero" aria-label="Hero секция контактов">
                    <div className="contacts-hero-overlay" aria-hidden="true"></div>
                    <div className="container contacts-hero-content">
                        <h1 className="contacts-hero-title">Контакты</h1>
                        <p className="contacts-hero-subtitle">
                            Всегда рады помочь вам с выбором идеального ковра
                        </p>
                    </div>
                </section>

                <div className="container">
                    {/* Быстрые контакты */}
                    <div className="quick-contacts" role="list">
                        <div className="quick-contact-card" role="listitem">
                            <div className="quick-contact-icon" aria-hidden="true">📞</div>
                            <h2 className="quick-contact-title">Позвоните нам</h2>
                            <a 
                                href={`tel:${phoneRaw}`} 
                                className="quick-contact-value"
                                aria-label={`Позвонить по номеру ${phoneNumber}`}
                            >
                                {phoneNumber}
                            </a>
                            <p className="quick-contact-note">Ежедневно с 9:00 до 19:00</p>
                        </div>

                        <div className="quick-contact-card" role="listitem">
                            <div className="quick-contact-icon" aria-hidden="true">✉️</div>
                            <h2 className="quick-contact-title">Напишите нам</h2>
                            <a 
                                href={`https://t.me/${telegramUsername}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="quick-contact-value"
                                aria-label={`Написать в Telegram: ${telegramUsername}`}
                            >
                                @{telegramUsername}
                            </a>
                            <p className="quick-contact-note">Telegram — быстрый ответ</p>
                        </div>

                        <div className="quick-contact-card" role="listitem">
                            <div className="quick-contact-icon" aria-hidden="true">📍</div>
                            <h2 className="quick-contact-title">Приезжайте</h2>
                            <address className="quick-contact-value address">
                                {shortAddress}
                            </address>
                            <p className="quick-contact-note">Шоурум в махалле Мирзо Улугбек</p>
                        </div>
                    </div>

                    {/* Детальная информация */}
                    <div className="contacts-grid">
                        {/* Левая колонка - контактная информация */}
                        <div className="contacts-info-section">
                            <div className="info-card">
                                <h2 className="info-card-title">Как нас найти</h2>

                                <div className="info-block">
                                    <h3 className="info-block-title">📍 Адрес шоурума</h3>
                                    <address className="info-block-address">
                                        {address}
                                    </address>
                                </div>

                                <div className="info-block">
                                    <h3 className="info-block-title">🕒 Часы работы</h3>
                                    <ul className="work-hours">
                                        <li className="work-hours-item">
                                            <span className="work-hours-day">Понедельник - Воскресенье:</span>
                                            <span className="work-hours-time">9:00 - 19:00</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="info-block">
                                    <h3 className="info-block-title">📞 Контакты</h3>
                                    <div className="info-contacts-list">
                                        <a href={`tel:${phoneRaw}`} className="info-contact-link">
                                            <span className="info-contact-icon" aria-hidden="true">📞</span>
                                            <span>{phoneNumber} - Отдел продаж</span>
                                        </a>
                                        <a 
                                            href={`https://t.me/${telegramUsername}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="info-contact-link"
                                        >
                                            <span className="info-contact-icon" aria-hidden="true">💬</span>
                                            <span>@{telegramUsername} - Telegram</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="info-block">
                                    <h3 className="info-block-title">🌐 Социальные сети</h3>
                                    <div className="info-social">
                                        <a 
                                            href={`https://instagram.com/${instagramUsername}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="social-link"
                                            aria-label="Instagram"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M16 11.37C16.1234 12.2022 15.9812 13.0522 15.5937 13.799C15.2062 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4077 15.9059C10.5771 15.7721 9.80971 15.3801 9.21479 14.7852C8.61987 14.1903 8.22787 13.4229 8.0941 12.5923C7.96033 11.7616 8.09202 10.9099 8.47028 10.1584C8.84854 9.40685 9.45414 8.7938 10.2009 8.4063C10.9477 8.0188 11.7977 7.8766 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8716 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>Instagram</span>
                                        </a>
                                        <a 
                                            href={`https://t.me/${telegramUsername}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="social-link"
                                            aria-label="Telegram"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                <path d="M21 5L2 12.5L9 15.5L19 8L13 17L20 20L21 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M9 15.5V19.5L12.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <span>Telegram</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="info-buttons">
                                    <button className="btn btn-gold" onClick={handleLocationClick}>
                                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        Построить маршрут
                                    </button>
                                    <button className="btn btn-outline-gold" onClick={handleMapClick}>
                                        Открыть карту
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Правая колонка - карта */}
                        <div className="contacts-map-section">
                            <div className="map-container">
                                <iframe
                                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQ2JzE3LjkiTiA2NMKwMjUnMTUuNiJF!5e0!3m2!1sru!2s!4v1234567890`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    title="Карта расположения магазина ковров Asl Gilam в Бухаре"
                                    aria-label="Интерактивная карта с расположением магазина"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}