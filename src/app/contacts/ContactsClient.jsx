'use client';

import './contacts.css';

export default function ContactsClient() {

    const handleLocationClick = () => {
        // Координаты магазина ковров в Бухаре
        const latitude = 39.7747;
        const longitude = 64.4286;
        const address = "Улица Навои, 45, Бухара, Узбекистан";

        window.open(`https://taxi.yandex.uz/ru/ru/?rfrom=${latitude},${longitude}&rto=${latitude},${longitude}&address=${encodeURIComponent(address)}`, '_blank');
    };

    const handleMapClick = () => {
        window.open('https://maps.google.com/?q=39.7747,64.4286', '_blank');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь будет логика отправки формы
        alert('Спасибо за обращение! Мы свяжемся с вами в ближайшее время.');
    };

    return (
        <>
            {/* Хлебные крошки для SEO */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    "name": "Контакты магазина ковров Bukhara Carpets",
                    "description": "Контактная информация магазина ковров ручной работы в Бухаре",
                    "url": "https://bukharacarpets.uz/contacts",
                    "mainEntity": {
                        "@type": "Store",
                        "name": "Bukhara Carpets",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Улица Навои, 45",
                            "addressLocality": "Бухара",
                            "addressCountry": "UZ"
                        },
                        "telephone": "+998911234567",
                        "email": "info@bukharacarpets.uz",
                        "openingHours": "Mo-Su 09:00-20:00"
                    }
                })}
            </script>

            <div className="contacts-page">
                {/* Hero секция */}
                <section className="contacts-hero">
                    <div className="contacts-hero-overlay"></div>
                    <div className="container contacts-hero-content">
                        <h1>Контакты</h1>
                        <p>Всегда рады помочь вам с выбором идеального ковра</p>
                    </div>
                </section>

                <div className="container">
                    {/* Быстрые контакты */}
                    <div className="quick-contacts">
                        <div className="quick-contact-card">
                            <div className="quick-contact-icon">📞</div>
                            <h3>Позвоните нам</h3>
                            <a href="tel:+998911234567" className="quick-contact-value">+998 (91) 123-45-67</a>
                            <p className="quick-contact-note">Ежедневно с 9:00 до 20:00</p>
                        </div>

                        <div className="quick-contact-card">
                            <div className="quick-contact-icon">✉️</div>
                            <h3>Напишите нам</h3>
                            <a href="mailto:info@bukharacarpets.uz" className="quick-contact-value">info@bukharacarpets.uz</a>
                            <p className="quick-contact-note">Ответим в течение 2 часов</p>
                        </div>

                        <div className="quick-contact-card">
                            <div className="quick-contact-icon">📍</div>
                            <h3>Приезжайте</h3>
                            <p className="quick-contact-value">Улица Навои, 45, Бухара</p>
                            <p className="quick-contact-note">Шоурум в историческом центре</p>
                        </div>
                    </div>

                    {/* Детальная информация */}
                    <div className="contacts-grid">
                        {/* Левая колонка - форма обратной связи */}
                        <div className="contacts-form-section">
                            <h2>Напишите нам</h2>
                            <p className="section-subtitle">
                                Оставьте свои контактные данные, и мы свяжемся с вами в ближайшее время
                            </p>

                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Ваше имя *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            placeholder="Введите ваше имя"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Телефон *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            required
                                            placeholder="+998 (__) ___-__-__"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="example@mail.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Тема обращения</label>
                                    <select id="subject" name="subject">
                                        <option value="consultation">Хочу проконсультироваться</option>
                                        <option value="purchase">Хочу купить ковер</option>
                                        <option value="visit">Хочу посетить шоурум</option>
                                        <option value="partnership">Сотрудничество</option>
                                        <option value="other">Другое</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Сообщение</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        placeholder="Напишите ваш вопрос или пожелание..."
                                    ></textarea>
                                </div>

                                <div className="form-group checkbox-group">
                                    <input type="checkbox" id="privacy" required />
                                    <label htmlFor="privacy">
                                        Я согласен на обработку персональных данных
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-gold btn-large">
                                    Отправить сообщение
                                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </form>
                        </div>

                        {/* Правая колонка - карта и контакты */}
                        <div className="contacts-info-section">
                            <div className="info-card">
                                <h2>Как нас найти</h2>

                                <div className="info-block">
                                    <h3>📍 Адрес шоурума</h3>
                                    <p>Улица Навои, 45, Бухара, Узбекистан</p>
                                    <p className="info-note">Вход с торца здания, 2 этаж</p>
                                </div>

                                <div className="info-block">
                                    <h3>🕒 Часы работы</h3>
                                    <ul className="work-hours">
                                        <li>
                                            <span>Понедельник - Пятница:</span>
                                            <span className="hours">9:00 - 20:00</span>
                                        </li>
                                        <li>
                                            <span>Суббота:</span>
                                            <span className="hours">10:00 - 18:00</span>
                                        </li>
                                        <li>
                                            <span>Воскресенье:</span>
                                            <span className="hours">10:00 - 16:00</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="info-block">
                                    <h3>📞 Телефоны</h3>
                                    <p><a href="tel:+998911234567">+998 (91) 123-45-67</a> - Отдел продаж</p>
                                    <p><a href="tel:+998911234568">+998 (91) 123-45-68</a> - WhatsApp</p>
                                </div>

                                <div className="info-block">
                                    <h3>✉️ Email</h3>
                                    <p><a href="mailto:info@bukharacarpets.uz">info@bukharacarpets.uz</a></p>
                                    <p><a href="mailto:sales@bukharacarpets.uz">sales@bukharacarpets.uz</a></p>
                                </div>

                                <div className="info-block">
                                    <h3>🌐 Социальные сети</h3>
                                    <div className="info-social">
                                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M16 11.37C16.1234 12.2022 15.9812 13.0522 15.5937 13.799C15.2062 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4077 15.9059C10.5771 15.7721 9.80971 15.3801 9.21479 14.7852C8.61987 14.1903 8.22787 13.4229 8.0941 12.5923C7.96033 11.7616 8.09202 10.9099 8.47028 10.1584C8.84854 9.40685 9.45414 8.7938 10.2009 8.4063C10.9477 8.0188 11.7977 7.8766 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8716 9.1283C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Instagram</span>
                                        </a>
                                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Facebook</span>
                                        </a>
                                        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="social-link">
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 5L2 12.5L9 15.5L19 8L13 17L20 20L21 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M9 15.5V19.5L12.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span>Telegram</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="info-buttons">
                                    <button className="btn btn-gold" onClick={handleLocationClick}>
                                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Построить маршрут
                                    </button>
                                    <button className="btn btn-outline-gold" onClick={handleMapClick}>
                                        Открыть карту
                                    </button>
                                </div>
                            </div>

                            {/* Карта */}
                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194.56172966666668!2d64.4286!3d39.7747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDQ2JzI4LjkiTiA2NMKwMjUnNDMuMCJF!5e0!3m2!1sru!2s!4v1234567890"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Карта расположения магазина ковров в Бухаре"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}