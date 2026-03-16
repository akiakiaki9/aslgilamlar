'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '../utils/data';
import './favorites.css';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Загрузка избранного из localStorage
    useEffect(() => {
        const loadFavorites = () => {
            try {
                const savedFavorites = localStorage.getItem('favorites');
                if (savedFavorites) {
                    const favoriteIds = JSON.parse(savedFavorites);

                    // Получаем все ковры
                    const allCarpets = categories.flatMap(category =>
                        category.carpets.map(carpet => ({
                            ...carpet,
                            categoryName: category.name,
                            categoryId: category.id
                        }))
                    );

                    // Фильтруем избранные
                    const favoriteCarpets = allCarpets.filter(carpet =>
                        favoriteIds.includes(carpet.id)
                    );

                    setFavorites(favoriteCarpets);
                }
            } catch (error) {
                console.error('Ошибка загрузки избранного:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFavorites();
    }, []);

    // Удаление из избранного
    const removeFromFavorites = (carpetId) => {
        try {
            const savedFavorites = localStorage.getItem('favorites');
            if (savedFavorites) {
                const favoriteIds = JSON.parse(savedFavorites);
                const updatedFavorites = favoriteIds.filter(id => id !== carpetId);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

                setFavorites(prev => prev.filter(carpet => carpet.id !== carpetId));
            }
        } catch (error) {
            console.error('Ошибка удаления из избранного:', error);
        }
    };

    // Добавление всех в корзину
    const addAllToCart = () => {
        if (favorites.length > 0) {
            alert(`Добавлено в корзину: ${favorites.length} ковров`);
            // Здесь будет логика добавления всех в корзину
        }
    };

    if (isLoading) {
        return (
            <div className="favorites-loading">
                <div className="loading-spinner"></div>
                <p>Загрузка избранного...</p>
            </div>
        );
    }

    return (
        <div className="favorites-page">
            <div className="container">
                {/* Заголовок */}
                <div className="favorites-header">
                    <h1>Избранное</h1>
                    <p className="favorites-count">
                        {favorites.length} {getWordForm(favorites.length, ['товар', 'товара', 'товаров'])}
                    </p>
                </div>

                {favorites.length === 0 ? (
                    // Пустое избранное
                    <div className="favorites-empty">
                        <div className="empty-icon">🤍</div>
                        <h2>В избранном пока пусто</h2>
                        <p>Добавляйте понравившиеся ковры в избранное, чтобы вернуться к ним позже</p>
                        <Link href="/catalog" className="btn btn-gold">
                            Перейти в каталог
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Действия с избранным */}
                        <div className="favorites-actions">
                            <button className="btn btn-outline-gold" onClick={() => {
                                if (confirm('Очистить список избранного?')) {
                                    localStorage.removeItem('favorites');
                                    setFavorites([]);
                                }
                            }}>
                                Очистить список
                            </button>
                            <button className="btn btn-gold" onClick={addAllToCart}>
                                Добавить все в корзину
                            </button>
                        </div>

                        {/* Сетка избранного */}
                        <div className="favorites-grid">
                            {favorites.map(carpet => (
                                <div key={carpet.id} className="favorite-card">
                                    <div className="favorite-image">
                                        <Link href={`/catalog/${carpet.id}`}>
                                            <Image
                                                src={carpet.image}
                                                alt={carpet.name}
                                                width={400}
                                                height={300}
                                                layout="responsive"
                                            />
                                        </Link>

                                        {carpet.oldPrice && (
                                            <span className="favorite-discount">
                                                -{Math.round((1 - carpet.price / carpet.oldPrice) * 100)}%
                                            </span>
                                        )}

                                        {!carpet.inStock && (
                                            <span className="favorite-stock out">Нет в наличии</span>
                                        )}

                                        <button
                                            className="favorite-remove"
                                            onClick={() => removeFromFavorites(carpet.id)}
                                            aria-label="Удалить из избранного"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="favorite-content">
                                        <span className="favorite-category">{carpet.categoryName}</span>
                                        <Link href={`/catalog/${carpet.id}`} className="favorite-title">
                                            <h3>{carpet.name}</h3>
                                        </Link>

                                        <div className="favorite-details">
                                            <span className="favorite-size">{carpet.size}</span>
                                            <span className="favorite-density">{carpet.density}</span>
                                        </div>

                                        <div className="favorite-price">
                                            {carpet.oldPrice ? (
                                                <>
                                                    <span className="price-old">{carpet.oldPrice} $</span>
                                                    <span className="price-current">{carpet.price} $</span>
                                                </>
                                            ) : (
                                                <span className="price-current">{carpet.price} $</span>
                                            )}
                                        </div>

                                        <div className="favorite-buttons">
                                            {carpet.inStock ? (
                                                <button
                                                    className="btn btn-gold btn-small"
                                                    onClick={() => alert(`Добавлено в корзину: ${carpet.name}`)}
                                                >
                                                    В корзину
                                                </button>
                                            ) : (
                                                <button className="btn btn-small" disabled>
                                                    Нет в наличии
                                                </button>
                                            )}
                                            <Link
                                                href={`/catalog/${carpet.id}`}
                                                className="btn btn-outline-gold btn-small"
                                            >
                                                Подробнее
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

// Вспомогательная функция для склонения слов
function getWordForm(number, forms) {
    const cases = [2, 0, 1, 1, 1, 2];
    return forms[
        (number % 100 > 4 && number % 100 < 20)
            ? 2
            : cases[(number % 10 < 5) ? number % 10 : 5]
    ];
}