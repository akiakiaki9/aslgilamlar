'use client';
import './contacts.css';
import { useState } from 'react';
import { 
  FaPhone, FaTelegramPlane, FaInstagram, FaMapMarkerAlt, 
  FaClock, FaStore, FaTaxi, FaMap, FaChevronDown,
  FaWhatsapp, FaEnvelope, FaBuilding, FaStar
} from 'react-icons/fa';
import { MdLocationOn, MdAccessTime, MdPhone, MdEmail } from 'react-icons/md';
import { BiBuildings } from 'react-icons/bi';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { TbMessageCircle } from 'react-icons/tb';

export default function ContactsClient() {
    const [showBranches, setShowBranches] = useState(true);

    // Данные из QuickContacts
    const phoneNumber = "+998 (99) 620-33-33";
    const phoneRaw = "+998996203333";
    const telegramUsername = "asl_gilam_buxara";
    const instagramUsername = "asl_gilam_buxara";

    // Координаты головного офиса
    const latitude = 39.783096;
    const longitude = 64.416101;
    const address = "Asl Gilam, Бухара, махаллинский сход граждан Мирзо Улугбек, ул. Ахмада Яссавий, 98";
    const shortAddress = "ул. Ахмада Яссавий, 98, Бухара";

    // Данные филиалов
    const branches = [
        {
            id: 'gijduvon',
            name: 'Gijduvon Gilam Baza',
            address: 'г. Гиждуван, Бухарская область',
            latitude: 40.091499,
            longitude: 64.707269,
            hours: '9:00 - 19:00',
            phone: '+998 70 165 44 44',
            phoneRaw: '+998701654444',
            telegram: 'https://t.me/gijduvon_gilam_baza',
            instagram: 'https://www.instagram.com/gijduvon_gilam_baza/',
            mapUrl: 'https://maps.google.com/maps?q=40.091499,64.707269&ll=40.091499,64.707269&z=16',
            featured: true
        },
        {
            id: 'jondor',
            name: 'Jondor Gilam Baza',
            address: 'г. Жондор, Бухарская область',
            latitude: 39.739061,
            longitude: 64.165663,
            hours: '9:00 - 18:00',
            phone: '+998 91 718 33 33',
            phoneRaw: '+998917183333',
            telegram: null,
            instagram: 'https://www.instagram.com/jondor_gilam_baza/',
            mapUrl: 'https://maps.google.com/maps?q=39.739061,64.165663&ll=39.739061,64.165663&z=16',
            featured: false
        },
        {
            id: 'peshku',
            name: 'Peshku Gilam Baza',
            address: 'г. Пешку, Бухарская область',
            latitude: 40.036931,
            longitude: 64.386269,
            hours: '9:00 - 19:00',
            phone: '+998 94 127 43 83',
            phoneRaw: '+998941274383',
            telegram: 'https://t.me/Peshku_urgazgilamlari',
            instagram: 'https://www.instagram.com/peshku_gilam.baza/',
            mapUrl: 'https://maps.google.com/maps?q=40.036931,64.386269&ll=40.036931,64.386269&z=16',
            featured: false
        }
    ];

    const handleLocationClick = (lat = latitude, lon = longitude, addr = address) => {
        const deeplink = `yandextaxi://route/?end-lat=${lat}&end-lon=${lon}&end-address=${encodeURIComponent(addr)}`;
        const fallbackUrl = `https://taxi.yandex.uz/?rto=${lat},${lon}&text=${encodeURIComponent(addr)}`;

        window.location.href = deeplink;
        setTimeout(() => {
            window.location.href = fallbackUrl;
        }, 500);
    };

    const handleMapClick = () => {
        window.open(`https://yandex.uz/maps/?rtext=~${latitude},${longitude}&z=17`, '_blank');
    };

    const handleBranchTaxi = (branch) => {
        handleLocationClick(branch.latitude, branch.longitude, `${branch.name}, ${branch.address}`);
    };

    return (
        <>
            <div className="contacts-page">
                <section className="contacts-hero" aria-label="Hero секция контактов">
                    <div className="contacts-hero-overlay" aria-hidden="true"></div>
                    <div className="container contacts-hero-content">
                        <div className="hero-badge">
                            <FaStar className="hero-star" />
                            <span>Свяжитесь с нами</span>
                        </div>
                        <h1 className="contacts-hero-title">Контакты</h1>
                        <p className="contacts-hero-subtitle">
                            Всегда рады помочь вам с выбором идеального ковра
                        </p>
                    </div>
                </section>

                <div className="container">
                    <div className="quick-contacts" role="list">
                        <div className="quick-contact-card" role="listitem">
                            <div className="quick-contact-icon">
                                <FaPhone />
                            </div>
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
                            <div className="quick-contact-icon">
                                <TbMessageCircle />
                            </div>
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
                            <div className="quick-contact-icon">
                                <MdLocationOn />
                            </div>
                            <h2 className="quick-contact-title">Приезжайте</h2>
                            <address className="quick-contact-value address">
                                {shortAddress}
                            </address>
                            <p className="quick-contact-note">Шоурум в махалле Мирзо Улугбек</p>
                        </div>
                    </div>

                    {/* Филиалы */}
                    <div className="branches-section">
                        <button
                            className="branches-toggle"
                            onClick={() => setShowBranches(!showBranches)}
                        >
                            <div className="branches-toggle-left">
                                <BiBuildings className="branches-toggle-icon" />
                                <span>Наши филиалы в Бухарской области</span>
                            </div>
                            <FaChevronDown className={`branches-toggle-arrow ${showBranches ? 'open' : ''}`} />
                        </button>

                        <div className={`branches-grid ${showBranches ? 'show' : ''}`}>
                            {branches.map((branch) => (
                                <div key={branch.id} className={`branch-card ${branch.featured ? 'featured' : ''}`}>
                                    {branch.featured && <div className="branch-featured-badge">Главный</div>}
                                    <div className="branch-header">
                                        <h3 className="branch-name">{branch.name}</h3>
                                        <span className="branch-badge">Филиал</span>
                                    </div>

                                    <div className="branch-info">
                                        <div className="branch-info-item">
                                            <MdLocationOn className="branch-info-icon" />
                                            <span className="branch-info-text">{branch.address}</span>
                                        </div>
                                        <div className="branch-info-item">
                                            <MdAccessTime className="branch-info-icon" />
                                            <span className="branch-info-text">{branch.hours}</span>
                                        </div>
                                        <div className="branch-info-item">
                                            <MdPhone className="branch-info-icon" />
                                            <a href={`tel:${branch.phoneRaw}`} className="branch-info-link">
                                                {branch.phone}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="branch-social">
                                        {branch.telegram && (
                                            <a href={branch.telegram} target="_blank" rel="noopener noreferrer" className="branch-social-link telegram">
                                                <FaTelegramPlane />
                                                <span>Telegram</span>
                                            </a>
                                        )}
                                        {branch.instagram && (
                                            <a href={branch.instagram} target="_blank" rel="noopener noreferrer" className="branch-social-link instagram">
                                                <FaInstagram />
                                                <span>Instagram</span>
                                            </a>
                                        )}
                                    </div>

                                    <div className="branch-buttons">
                                        <button
                                            className="branch-btn-taxi"
                                            onClick={() => handleBranchTaxi(branch)}
                                        >
                                            <FaTaxi />
                                            <span>Вызвать такси</span>
                                        </button>
                                        <a
                                            href={branch.mapUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="branch-btn-map"
                                        >
                                            <FaMap />
                                            <span>Google Maps</span>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="contacts-grid">
                        <div className="contacts-info-section">
                            <div className="info-card">
                                <h2 className="info-card-title">Как нас найти</h2>

                                <div className="info-block">
                                    <h3 className="info-block-title">
                                        <MdLocationOn className="info-block-icon" />
                                        Адрес шоурума
                                    </h3>
                                    <address className="info-block-address">
                                        {address}
                                    </address>
                                </div>

                                <div className="info-block">
                                    <h3 className="info-block-title">
                                        <MdAccessTime className="info-block-icon" />
                                        Часы работы
                                    </h3>
                                    <ul className="work-hours">
                                        <li className="work-hours-item">
                                            <span className="work-hours-day">Понедельник - Воскресенье:</span>
                                            <span className="work-hours-time">9:00 - 19:00</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="info-block">
                                    <h3 className="info-block-title">
                                        <MdPhone className="info-block-icon" />
                                        Контакты
                                    </h3>
                                    <div className="info-contacts-list">
                                        <a href={`tel:${phoneRaw}`} className="info-contact-link">
                                            <FaPhone className="info-contact-icon" />
                                            <span>{phoneNumber} - Отдел продаж</span>
                                        </a>
                                        <a
                                            href={`https://t.me/${telegramUsername}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="info-contact-link"
                                        >
                                            <FaTelegramPlane className="info-contact-icon" />
                                            <span>@{telegramUsername} - Telegram</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="info-block">
                                    <h3 className="info-block-title">
                                        <FaInstagram className="info-block-icon" />
                                        Социальные сети
                                    </h3>
                                    <div className="info-social">
                                        <a
                                            href={`https://instagram.com/${instagramUsername}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-link"
                                            aria-label="Instagram"
                                        >
                                            <FaInstagram />
                                            <span>Instagram</span>
                                            <HiOutlineExternalLink className="social-external" />
                                        </a>
                                        <a
                                            href={`https://t.me/${telegramUsername}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="social-link"
                                            aria-label="Telegram"
                                        >
                                            <FaTelegramPlane />
                                            <span>Telegram</span>
                                            <HiOutlineExternalLink className="social-external" />
                                        </a>
                                    </div>
                                </div>

                                <div className="info-buttons">
                                    <button className="btn btn-gold" onClick={handleLocationClick}>
                                        <FaTaxi className="btn-icon" />
                                        Вызвать такси
                                    </button>
                                    <button className="btn btn-outline-gold" onClick={handleMapClick}>
                                        <FaMap className="btn-icon" />
                                        Открыть карту
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="contacts-map-section">
                            <div className="map-container">
                                <iframe
                                    src={`https://yandex.uz/map-widget/v1/?ll=${longitude},${latitude}&z=17&l=map`}
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
};