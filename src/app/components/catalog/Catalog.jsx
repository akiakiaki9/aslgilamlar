'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaPhone, FaArrowRight, FaRuler, FaHands } from 'react-icons/fa';
import { categories } from '@/app/utils/data';
import './catalog.css';

const FeaturedCatalog = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [visibleCount, setVisibleCount] = useState(4);
    const [favorites, setFavorites] = useState([]);

    // Данные из QuickContacts
    const phoneNumber = "+998 (91) 718-33-33";

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
        window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
    };

    // Проверка, есть ли ковер в избранном
    const isInFavorites = (carpetId) => {
        return favorites.some(item => item.id === carpetId);
    };

    // Добавление в избранное
    const addToFavorites = (carpet) => {
        if (!isInFavorites(carpet.id)) {
            setFavorites([...favorites, carpet]);
        }
    };

    // Удаление из избранного
    const removeFromFavorites = (carpetId) => {
        setFavorites(favorites.filter(item => item.id !== carpetId));
    };

    // Переключение избранного
    const toggleFavorite = (carpet) => {
        if (isInFavorites(carpet.id)) {
            removeFromFavorites(carpet.id);
        } else {
            addToFavorites(carpet);
        }
    };

    return (
        <section className="featured-catalog">
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
                                    {isInFavorites(carpet.id) ? <FaHeart /> : <FaRegHeart />}
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
                                        <span className="card-size">
                                            <FaRuler className="detail-icon" />
                                            {carpet.size}
                                        </span>
                                        <span className="card-density">
                                            <FaHands className="detail-icon" />
                                            {carpet.density}
                                        </span>
                                    </div>

                                    {/* <div className="card-price">
                                        {carpet.oldPrice ? (
                                            <>
                                                <span className="price-old">{carpet.oldPrice} $</span>
                                                <span className="price-current">{carpet.price} $</span>
                                            </>
                                        ) : (
                                            <span className="price-current">{carpet.price} $</span>
                                        )}
                                    </div> */}
                                </Link>
                            </div>

                            {/* Кнопка заказа по телефону */}
                            {carpet.inStock && (
                                <button
                                    className="card-order-btn"
                                    onClick={() => handlePhoneOrder(carpet.name)}
                                >
                                    <FaPhone className="btn-icon" />
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
                        <FaArrowRight className="btn-icon" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCatalog;