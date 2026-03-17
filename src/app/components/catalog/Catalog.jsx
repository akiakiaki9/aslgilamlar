'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/app/utils/data';
import './catalog.css';

const FeaturedCatalog = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [visibleCount, setVisibleCount] = useState(4);
    const [favorites, setFavorites] = useState([]);
    const [showFavoriteNotification, setShowFavoriteNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    // Загружаем избранное из localStorage при монтировании
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // Сохраняем избранное в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Получаем все ковры из data.js
    const getAllCarpets = () => {
        return categories.flatMap(category =>
            category.carpets.map(carpet => ({
                ...carpet,
                categoryName: category.name,
                categoryId: category.id
            }))
        );
    };

    const allCarpets = getAllCarpets();

    // Фильтрация ковров по категории
    const getFilteredCarpets = () => {
        if (activeCategory === 'all') {
            return allCarpets;
        }
        return allCarpets.filter(carpet => carpet.categoryId === parseInt(activeCategory));
    };

    const filteredCarpets = getFilteredCarpets();
    const visibleCarpets = filteredCarpets.slice(0, visibleCount);
    const hasMore = visibleCount < filteredCarpets.length;

    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
        setVisibleCount(4);
    };

    const loadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    const handlePhoneOrder = (carpetName) => {
        window.location.href = 'tel:+998917183333';
    };

    // Проверка, есть ли ковер в избранном
    const isInFavorites = (carpetId) => {
        return favorites.some(item => item.id === carpetId);
    };

    // Добавление в избранное
    const addToFavorites = (carpet) => {
        if (!isInFavorites(carpet.id)) {
            setFavorites([...favorites, carpet]);
            setNotificationMessage(`${carpet.name} добавлен в избранное`);
            setShowFavoriteNotification(true);
            setTimeout(() => setShowFavoriteNotification(false), 3000);
        }
    };

    // Удаление из избранного
    const removeFromFavorites = (carpetId, carpetName) => {
        setFavorites(favorites.filter(item => item.id !== carpetId));
        setNotificationMessage(`${carpetName} удален из избранного`);
        setShowFavoriteNotification(true);
        setTimeout(() => setShowFavoriteNotification(false), 3000);
    };

    // Переключение избранного
    const toggleFavorite = (carpet) => {
        if (isInFavorites(carpet.id)) {
            removeFromFavorites(carpet.id, carpet.name);
        } else {
            addToFavorites(carpet);
        }
    };

    return (
        <section className="featured-catalog">
            {/* Уведомление о добавлении в избранное */}
            <div className={`favorite-notification ${showFavoriteNotification ? 'show' : ''}`}>
                <svg className="notification-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="currentColor" />
                </svg>
                <span>{notificationMessage}</span>
            </div>

            <div className="container">
                <div className="section-header">
                    <h2>Наши ковры</h2>
                    <p>Изысканные ковры ручной работы из Бухары</p>
                </div>

                {/* Фильтр по категориям */}
                <div className="catalog-filters">
                    <button
                        className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('all')}
                    >
                        Все ковры
                    </button>
                    {categories.slice(0, 5).map(category => (
                        <button
                            key={category.id}
                            className={`filter-btn ${activeCategory === category.id.toString() ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category.id.toString())}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Сетка ковров */}
                <div className="catalog-grid">
                    {visibleCarpets.map(carpet => (
                        <div key={carpet.id} className="catalog-card">
                            <div className="card-image-container">
                                <Link href={`/catalog/${carpet.id}`} className="card-link">
                                    <div className="card-image">
                                        <Image
                                            src={carpet.image}
                                            alt={carpet.name}
                                            width={400}
                                            height={300}
                                            layout="responsive"
                                            className="card-img"
                                        />
                                        {/* Hover эффект - вторая картинка (если есть) */}
                                        <div className="card-image-hover">
                                            <Image
                                                src={carpet.imageHover || carpet.image}
                                                alt={carpet.name}
                                                width={400}
                                                height={300}
                                                layout="responsive"
                                                className="card-img-hover"
                                            />
                                        </div>
                                    </div>
                                </Link>

                                {/* Кнопка избранного */}
                                <button
                                    className={`favorite-btn ${isInFavorites(carpet.id) ? 'active' : ''}`}
                                    onClick={() => toggleFavorite(carpet)}
                                    aria-label={isInFavorites(carpet.id) ? "Удалить из избранного" : "Добавить в избранное"}
                                >
                                    <svg className="favorite-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" stroke="currentColor" strokeWidth="2" fill={isInFavorites(carpet.id) ? "currentColor" : "none"} />
                                    </svg>
                                </button>

                                {carpet.oldPrice && (
                                    <span className="card-discount">-{Math.round((1 - carpet.price / carpet.oldPrice) * 100)}%</span>
                                )}
                                {!carpet.inStock && (
                                    <span className="card-stock out">Нет в наличии</span>
                                )}
                            </div>

                            <div className="card-content">
                                <Link href={`/catalog/${carpet.id}`} className="card-link">
                                    <span className="card-category">{carpet.categoryName}</span>
                                    <h3>{carpet.name}</h3>
                                    <p className="card-description">{carpet.description.substring(0, 60)}...</p>

                                    <div className="card-details">
                                        <span className="card-size">{carpet.size}</span>
                                        <span className="card-density">{carpet.density}</span>
                                    </div>

                                    <div className="card-price">
                                        {carpet.oldPrice ? (
                                            <>
                                                <span className="price-old">{carpet.oldPrice} $</span>
                                                <span className="price-current">{carpet.price} $</span>
                                            </>
                                        ) : (
                                            <span className="price-current">{carpet.price} $</span>
                                        )}
                                    </div>
                                </Link>
                            </div>

                            {/* Кнопка заказа по телефону */}
                            {carpet.inStock && (
                                <button
                                    className="card-order-btn"
                                    onClick={() => handlePhoneOrder(carpet.name)}
                                >
                                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 16.92V19C22.0011 19.7904 21.816 20.5705 21.4617 21.2702C21.1073 21.97 20.5961 22.566 19.9744 23.002C19.3526 23.4381 18.6413 23.6991 17.899 23.7598C17.1567 23.8205 16.4094 23.6789 15.72 23.35C13.6339 22.4532 11.6636 21.2925 9.86002 19.9C8.19198 18.6105 6.73696 17.0653 5.56002 15.33C4.19012 13.5029 3.05193 11.5072 2.17002 9.39C1.85681 8.6939 1.72419 7.93264 1.78354 7.17499C1.84288 6.41733 2.09236 5.68662 2.50655 5.05022C2.92074 4.41381 3.4852 3.89323 4.14876 3.53689C4.81231 3.18055 5.55248 3.00015 6.30002 3.01H8.17002C8.81627 3.00203 9.44554 3.2082 9.96002 3.59C10.3881 3.91807 10.7161 4.36308 10.91 4.87C11.1924 5.64757 11.5259 6.40439 11.91 7.14C12.1422 7.59724 12.2559 8.10594 12.24 8.62C12.233 9.11573 12.0953 9.60006 11.84 10.02C11.707 10.2413 11.574 10.4627 11.44 10.68C11.2643 10.9435 11.1465 11.2428 11.095 11.5571C11.0435 11.8714 11.0597 12.1929 11.1425 12.5003C11.2253 12.8077 11.3727 13.0936 11.5741 13.3383C11.7755 13.5831 12.026 13.7808 12.31 13.92C13.3361 14.5033 14.4495 14.925 15.61 15.17C15.9965 15.2389 16.3943 15.2086 16.7648 15.0827C17.1353 14.9569 17.4641 14.7403 17.72 14.45C18.0238 14.0883 18.3949 13.7885 18.81 13.56C19.5328 13.1684 20.3852 13.1185 21.15 13.42C21.6499 13.6102 22.0909 13.9304 22.425 14.34C22.8052 14.835 23.0272 15.4372 23.06 16.06C23.0731 16.3616 23.0353 16.664 22.9486 16.9512C22.8619 17.2383 22.7283 17.5052 22.555 17.74C22.3618 18.0257 22.1771 18.317 22 18.61V16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Заказать
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Кнопки */}
                <div className="catalog-actions">
                    {hasMore && (
                        <button onClick={loadMore} className="btn btn-outline-gold">
                            Показать еще
                        </button>
                    )}

                    <Link href="/catalog" className="btn btn-gold">
                        Перейти в каталог
                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCatalog;