'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { categories } from '@/app/utils/data';
import {
    FaPhone, FaShieldAlt, FaHands, FaTruck, FaStar,
    FaGem, FaClock, FaRuler, FaCompress, FaHeart,
    FaShare, FaChevronLeft, FaChevronRight, FaCheck,
    FaLeaf, FaRecycle, FaAward, FaMapMarkerAlt
} from 'react-icons/fa';
import { MdDeliveryDining, MdCleaningServices } from 'react-icons/md';
import './catalogdetail.css';

export default function CarpetDetailPage() {
    const params = useParams();
    const id = parseInt(params.id);

    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [isImageZoomed, setIsImageZoomed] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showShareTooltip, setShowShareTooltip] = useState(false);

    // Функция для поиска ковра по ID
    const findCarpetById = (id) => {
        for (const category of categories) {
            const carpet = category.carpets.find(c => c.id === id);
            if (carpet) {
                return { ...carpet, categoryName: category.name, categoryId: category.id };
            }
        }
        return null;
    };

    // Получаем данные ковра
    const carpet = findCarpetById(id);

    // Загрузка избранного из localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites && carpet) {
            const favorites = JSON.parse(savedFavorites);
            setIsFavorite(favorites.includes(carpet.id));
        }
    }, [carpet]);

    // Сохранение избранного
    const toggleFavorite = () => {
        const savedFavorites = localStorage.getItem('favorites');
        let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

        if (isFavorite) {
            favorites = favorites.filter(favId => favId !== carpet.id);
        } else {
            favorites.push(carpet.id);
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: carpet.name,
                    text: 'Посмотрите этот прекрасный ковер!',
                    url: url,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            navigator.clipboard.writeText(url);
            setShowShareTooltip(true);
            setTimeout(() => setShowShareTooltip(false), 2000);
        }
    };

    // Если ковер не найден
    if (!carpet) {
        return (
            <div className="not-found">
                <div className="not-found-content">
                    <FaGem className="not-found-icon" />
                    <h1>Ковер не найден</h1>
                    <p>Извините, запрашиваемый ковер отсутствует в каталоге.</p>
                    <Link href="/catalog" className="btn btn-gold">
                        Вернуться в каталог
                    </Link>
                </div>
            </div>
        );
    }

    // Для демонстрации создаем массив дополнительных изображений
    const images = [
        carpet.image,
        carpet.image.replace('.jpg', '-2.jpg'),
        carpet.image.replace('.jpg', '-3.jpg'),
        carpet.image.replace('.jpg', '-4.jpg'),
    ].filter(img => img);

    // Похожие ковры (из той же категории)
    const getSimilarCarpets = () => {
        const category = categories.find(c => c.id === carpet.categoryId);
        if (!category) return [];

        return category.carpets
            .filter(c => c.id !== carpet.id)
            .slice(0, 4);
    };

    const similarCarpets = getSimilarCarpets();

    const handlePhoneOrder = () => {
        window.location.href = 'tel:+998917183333';
    };

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="carpet-detail-page">
            {/* Hero секция с параллакс эффектом */}
            <div className="detail-hero">
                <div className="detail-hero-overlay"></div>
                <div className="detail-hero-particles">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="hero-particle" style={{ '--i': i, '--delay': `${i * 0.3}s` }}></div>
                    ))}
                </div>
                <div className="container detail-hero-content">
                    <div className="hero-breadcrumbs">
                        <Link href="/">Главная</Link>
                        <FaChevronRight className="breadcrumb-icon" />
                        <Link href="/catalog">Каталог</Link>
                        <FaChevronRight className="breadcrumb-icon" />
                        <Link href={`/catalog?category=${carpet.categoryId}`}>
                            {carpet.categoryName}
                        </Link>
                        <FaChevronRight className="breadcrumb-icon" />
                        <span className="current">{carpet.name}</span>
                    </div>
                    <h1 className="hero-title">{carpet.name}</h1>
                    <div className="hero-badge">
                        <FaStar className="badge-icon" />
                        <span>Шедевр ручной работы</span>
                    </div>
                </div>
                <div className="hero-wave-bottom">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="var(--bg-primary)"></path>
                    </svg>
                </div>
            </div>

            <div className="container">
                {/* Основная информация о ковре */}
                <div className="carpet-main">
                    {/* Галерея изображений */}
                    <div className="carpet-gallery">
                        <div className="gallery-main" onClick={() => setIsImageZoomed(!isImageZoomed)}>
                            <img
                                src={images[selectedImage] || carpet.image}
                                alt={carpet.name}
                                className={`gallery-main-image ${isImageZoomed ? 'zoomed' : ''}`}
                            />
                            {!carpet.inStock && (
                                <div className="gallery-badge out-of-stock">
                                    <span>Нет в наличии</span>
                                </div>
                            )}
                            {carpet.featured && (
                                <div className="gallery-badge featured">
                                    <FaStar />
                                    <span>Эксклюзив</span>
                                </div>
                            )}

                            {images.length > 1 && (
                                <>
                                    <button className="gallery-nav prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                                        <FaChevronLeft />
                                    </button>
                                    <button className="gallery-nav next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                                        <FaChevronRight />
                                    </button>
                                </>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="gallery-thumbnails">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail-btn ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img
                                            src={img}
                                            alt={`${carpet.name} - вид ${index + 1}`}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Информация о ковре */}
                    <div className="carpet-info">
                        <div className="info-actions">
                            <button
                                className={`action-btn favorite ${isFavorite ? 'active' : ''}`}
                                onClick={toggleFavorite}
                            >
                                <FaHeart />
                                <span>{isFavorite ? 'В избранном' : 'В избранное'}</span>
                            </button>
                            <div className="share-wrapper">
                                <button className="action-btn share" onClick={handleShare}>
                                    <FaShare />
                                    <span>Поделиться</span>
                                </button>
                                {showShareTooltip && <div className="share-tooltip">Ссылка скопирована!</div>}
                            </div>
                        </div>

                        <div className="info-header">
                            <span className="info-category">{carpet.categoryName}</span>
                            <h1 className="info-title">{carpet.name}</h1>
                            {carpet.age && (
                                <div className="info-age">
                                    <FaClock />
                                    <span>Возраст: {carpet.age}</span>
                                </div>
                            )}
                        </div>

                        <div className="info-availability">
                            <div className={`availability-status ${carpet.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                <div className="status-dot"></div>
                                {carpet.inStock ? 'В наличии' : 'Нет в наличии'}
                            </div>
                            {carpet.inStock && (
                                <div className="info-delivery">
                                    <FaTruck />
                                    <span>Бесплатная доставка от $500</span>
                                </div>
                            )}
                        </div>

                        <div className="info-characters">
                            <div className="character-card">
                                <FaRuler className="character-icon" />
                                <div className="character-info">
                                    <span className="character-label">Размер</span>
                                    <span className="character-value">{carpet.size}</span>
                                </div>
                            </div>
                            <div className="character-card">
                                <FaCompress className="character-icon" />
                                <div className="character-info">
                                    <span className="character-label">Плотность</span>
                                    <span className="character-value">{carpet.density}</span>
                                </div>
                            </div>
                            {carpet.age && (
                                <div className="character-card">
                                    <FaClock className="character-icon" />
                                    <div className="character-info">
                                        <span className="character-label">Год создания</span>
                                        <span className="character-value">{carpet.age}</span>
                                    </div>
                                </div>
                            )}
                            <div className="character-card">
                                <FaMapMarkerAlt className="character-icon" />
                                <div className="character-info">
                                    <span className="character-label">Происхождение</span>
                                    <span className="character-value">Бухара, Узбекистан</span>
                                </div>
                            </div>
                        </div>

                        {/* Кнопка заказа по телефону */}
                        {carpet.inStock && (
                            <div className="info-order">
                                <button className="btn-order" onClick={handlePhoneOrder}>
                                    <FaPhone className="btn-icon" />
                                    <div className="btn-text">
                                        <span className="btn-title">Заказать по телефону</span>
                                        <span className="btn-phone">+998 (91) 718-33-33</span>
                                    </div>
                                </button>
                                <p className="order-info">
                                    <FaCheck className="order-info-icon" />
                                    Звонок бесплатный. Работаем ежедневно с 9:00 до 21:00
                                </p>
                            </div>
                        )}

                        {/* Преимущества */}
                        <div className="info-benefits">
                            <div className="benefit-item">
                                <FaShieldAlt className="benefit-icon" />
                                <div className="benefit-info">
                                    <h4>Гарантия подлинности</h4>
                                    <p>Сертификат качества</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <FaHands className="benefit-icon" />
                                <div className="benefit-info">
                                    <h4>Ручная работа</h4>
                                    <p>Мастера Бухары</p>
                                </div>
                            </div>
                            <div className="benefit-item">
                                <MdDeliveryDining className="benefit-icon" />
                                <div className="benefit-info">
                                    <h4>Бесплатная доставка</h4>
                                    <p>По всему Узбекистану</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Табы с подробной информацией */}
                <div className="carpet-tabs">
                    <div className="tabs-header">
                        <button
                            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            <FaGem className="tab-icon" />
                            <span>Описание</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'characteristics' ? 'active' : ''}`}
                            onClick={() => setActiveTab('characteristics')}
                        >
                            <FaRuler className="tab-icon" />
                            <span>Характеристики</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'care' ? 'active' : ''}`}
                            onClick={() => setActiveTab('care')}
                        >
                            <MdCleaningServices className="tab-icon" />
                            <span>Уход</span>
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'delivery' ? 'active' : ''}`}
                            onClick={() => setActiveTab('delivery')}
                        >
                            <FaTruck className="tab-icon" />
                            <span>Доставка</span>
                        </button>
                    </div>

                    <div className="tabs-content">
                        {activeTab === 'description' && (
                            <div className="tab-pane fade-in">
                                <div className="description-content">
                                    <p className="description-lead">{carpet.description}</p>
                                    <p>
                                        Этот великолепный ковер ручной работы выполнен мастерами Бухары
                                        с использованием традиционных техник ткачества, передаваемых из
                                        поколения в поколение. Каждый узел завязан вручную, что гарантирует
                                        высочайшее качество и долговечность.
                                    </p>
                                    <p>
                                        Натуральные красители, используемые при создании ковра, не выцветают
                                        со временем и безопасны для здоровья. Ковер станет настоящим
                                        украшением вашего интерьера и прослужит не одно десятилетие.
                                    </p>
                                    <div className="description-features">
                                        <div className="feature">
                                            <FaLeaf />
                                            <span>Натуральные материалы</span>
                                        </div>
                                        <div className="feature">
                                            <FaRecycle />
                                            <span>Экологически чистый</span>
                                        </div>
                                        <div className="feature">
                                            <FaAward />
                                            <span>Премиум качество</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'characteristics' && (
                            <div className="tab-pane fade-in">
                                <h3>Полные характеристики</h3>
                                <div className="characteristics-grid">
                                    <div className="char-group">
                                        <h4>Основные параметры</h4>
                                        <table className="characteristics-table">
                                            <tbody>
                                                <tr>
                                                    <td>Категория</td>
                                                    <td>{carpet.categoryName}</td>
                                                </tr>
                                                <tr>
                                                    <td>Название</td>
                                                    <td>{carpet.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Размер</td>
                                                    <td>{carpet.size}</td>
                                                </tr>
                                                <tr>
                                                    <td>Плотность узлов</td>
                                                    <td>{carpet.density}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="char-group">
                                        <h4>Дополнительная информация</h4>
                                        <table className="characteristics-table">
                                            <tbody>
                                                {carpet.age && (
                                                    <tr>
                                                        <td>Возраст</td>
                                                        <td>{carpet.age}</td>
                                                    </tr>
                                                )}
                                                <tr>
                                                    <td>Материал</td>
                                                    <td>Натуральный шелк / Шерсть</td>
                                                </tr>
                                                <tr>
                                                    <td>Техника</td>
                                                    <td>Ручное ткачество</td>
                                                </tr>
                                                <tr>
                                                    <td>Страна</td>
                                                    <td>Узбекистан, Бухара</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'care' && (
                            <div className="tab-pane fade-in">
                                <h3>Рекомендации по уходу</h3>
                                <div className="care-grid">
                                    <div className="care-card">
                                        <div className="care-icon">🧹</div>
                                        <h4>Регулярная чистка</h4>
                                        <p>Регулярно пылесосьте ковер с обеих сторон для удаления пыли и грязи</p>
                                    </div>
                                    <div className="care-card">
                                        <div className="care-icon">☀️</div>
                                        <h4>Защита от солнца</h4>
                                        <p>Избегайте прямых солнечных лучей для предотвращения выцветания</p>
                                    </div>
                                    <div className="care-card">
                                        <div className="care-icon">🧼</div>
                                        <h4>Удаление пятен</h4>
                                        <p>При пятнах используйте сухую чистку или специальные средства для ковров</p>
                                    </div>
                                    <div className="care-card">
                                        <div className="care-icon">🔄</div>
                                        <h4>Равномерный износ</h4>
                                        <p>Поворачивайте ковер раз в полгода для равномерного износа</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'delivery' && (
                            <div className="tab-pane fade-in">
                                <h3>Условия доставки и оплаты</h3>
                                <div className="delivery-grid">
                                    <div className="delivery-card">
                                        <div className="delivery-icon">🚚</div>
                                        <h4>Доставка по Узбекистану</h4>
                                        <p>Бесплатно от 500 000 сум. Срок доставки: 1-2 дня</p>
                                    </div>
                                    <div className="delivery-card">
                                        <div className="delivery-icon">✈️</div>
                                        <h4>Международная доставка</h4>
                                        <p>Стоимость рассчитывается индивидуально. Срок доставки: 3-7 дней</p>
                                    </div>
                                    <div className="delivery-card">
                                        <div className="delivery-icon">💳</div>
                                        <h4>Способы оплаты</h4>
                                        <p>Наличные, банковский перевод, Visa/Mastercard, PayPal</p>
                                    </div>
                                    <div className="delivery-card">
                                        <div className="delivery-icon">🛡️</div>
                                        <h4>Гарантия</h4>
                                        <p>14 дней на возврат. Гарантия подлинности 100%</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Похожие ковры */}
                {similarCarpets.length > 0 && (
                    <div className="similar-carpets">
                        <div className="section-header">
                            <h2>Вам также может понравиться</h2>
                            <div className="section-line"></div>
                        </div>
                        <div className="similar-grid">
                            {similarCarpets.map((similar, index) => (
                                <Link
                                    href={`/catalog/${similar.id}`}
                                    key={similar.id}
                                    className="similar-card"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="similar-image">
                                        <img
                                            src={similar.image}
                                            alt={similar.name}
                                        />
                                        <div className="similar-overlay">
                                            <span>Смотреть детали</span>
                                        </div>
                                    </div>
                                    <div className="similar-info">
                                        <h3>{similar.name}</h3>
                                        <span className="similar-category">{carpet.categoryName}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};