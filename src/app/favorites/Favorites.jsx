'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '../utils/data';
import './favorites.css';

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);
    const [sortBy, setSortBy] = useState('default');
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

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
                showNotification('Ошибка при загрузке избранного', 'error');
            } finally {
                setIsLoading(false);
            }
        };

        loadFavorites();
    }, []);

    // Показ уведомлений
    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    // Удаление из избранного
    const removeFromFavorites = (carpetId, carpetName = '') => {
        try {
            const savedFavorites = localStorage.getItem('favorites');
            if (savedFavorites) {
                const favoriteIds = JSON.parse(savedFavorites);
                const updatedFavorites = favoriteIds.filter(id => id !== carpetId);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

                setFavorites(prev => prev.filter(carpet => carpet.id !== carpetId));
                setSelectedItems(prev => prev.filter(id => id !== carpetId));

                showNotification(`"${carpetName || 'Ковер'}" удален из избранного`, 'info');
            }
        } catch (error) {
            console.error('Ошибка удаления из избранного:', error);
            showNotification('Ошибка при удалении', 'error');
        }
    };

    // Удаление выбранных
    const removeSelected = () => {
        if (selectedItems.length === 0) {
            showNotification('Выберите товары для удаления', 'warning');
            return;
        }

        if (confirm(`Удалить ${selectedItems.length} ${getWordForm(selectedItems.length, ['товар', 'товара', 'товаров'])} из избранного?`)) {
            try {
                const savedFavorites = localStorage.getItem('favorites');
                if (savedFavorites) {
                    const favoriteIds = JSON.parse(savedFavorites);
                    const updatedFavorites = favoriteIds.filter(id => !selectedItems.includes(id));
                    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

                    setFavorites(prev => prev.filter(carpet => !selectedItems.includes(carpet.id)));
                    setSelectedItems([]);

                    showNotification('Выбранные товары удалены', 'success');
                }
            } catch (error) {
                console.error('Ошибка удаления выбранных:', error);
                showNotification('Ошибка при удалении', 'error');
            }
        }
    };

    // Очистить всё
    const clearAll = () => {
        if (favorites.length === 0) return;

        if (confirm('Очистить весь список избранного?')) {
            localStorage.removeItem('favorites');
            setFavorites([]);
            setSelectedItems([]);
            showNotification('Список избранного очищен', 'info');
        }
    };

    // Выбор всех товаров
    const selectAll = () => {
        if (selectedItems.length === favorites.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(favorites.map(c => c.id));
        }
    };

    // Выбор отдельного товара
    const toggleSelect = (carpetId) => {
        setSelectedItems(prev =>
            prev.includes(carpetId)
                ? prev.filter(id => id !== carpetId)
                : [...prev, carpetId]
        );
    };

    // Сортировка
    const getSortedFavorites = () => {
        const sorted = [...favorites];
        switch (sortBy) {
            case 'price-asc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return sorted.sort((a, b) => b.price - a.price);
            case 'name-asc':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            default:
                return sorted;
        }
    };

    // Подсчет общей суммы
    const totalSum = favorites.reduce((sum, carpet) => {
        const currentPrice = carpet.price;
        return sum + currentPrice;
    }, 0);

    if (isLoading) {
        return (
            <div className="favorites-loading">
                <div className="loading-spinner"></div>
                <p>Загрузка избранного...</p>
            </div>
        );
    }

    const sortedFavorites = getSortedFavorites();

    return (
        <div className="favorites-page">
            {/* Уведомления */}
            {notification.show && (
                <div className={`favorites-notification ${notification.type}`}>
                    {notification.type === 'success' && '✓'}
                    {notification.type === 'error' && '✕'}
                    {notification.type === 'warning' && '⚠'}
                    {notification.type === 'info' && 'ℹ'}
                    <span>{notification.message}</span>
                </div>
            )}

            {/* Header в стиле детальной страницы */}
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">
                        Избранное
                        {favorites.length > 0 && (
                            <span className="page-title-badge">{favorites.length}</span>
                        )}
                    </h1>
                    <div className="breadcrumbs">
                        <Link href="/">Главная</Link>
                        <span className="breadcrumbs-separator">/</span>
                        <span className="breadcrumbs-current">Избранное</span>
                    </div>
                </div>
            </div>

            <div className="container">
                {favorites.length === 0 ? (
                    // Пустое избранное
                    <div className="favorites-empty">
                        <div className="empty-animation">
                            <div className="empty-heart">❤️</div>
                            <div className="empty-carpet">🧶</div>
                        </div>
                        <h2>В избранном пока пусто</h2>
                        <p>Добавляйте понравившиеся ковры в избранное, нажимая на сердечко в каталоге</p>
                        <div className="empty-actions">
                            <Link href="/catalog" className="btn btn-gold">
                                Перейти в каталог
                            </Link>
                            <Link href="/" className="btn btn-outline-gold">
                                На главную
                            </Link>
                        </div>
                        <div className="empty-features">
                            <div className="empty-feature">
                                <span className="empty-feature-icon">✨</span>
                                <span>Быстрый поиск</span>
                            </div>
                            <div className="empty-feature">
                                <span className="empty-feature-icon">🎯</span>
                                <span>Удобные фильтры</span>
                            </div>
                            <div className="empty-feature">
                                <span className="empty-feature-icon">❤️</span>
                                <span>Мгновенное сохранение</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Панель действий */}
                        <div className="favorites-toolbar">
                            <div className="favorites-toolbar-left">
                                <label className="favorites-select-all">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.length === favorites.length && favorites.length > 0}
                                        onChange={selectAll}
                                        className="favorites-checkbox"
                                    />
                                    <span>Выбрать все</span>
                                </label>
                                {selectedItems.length > 0 && (
                                    <span className="favorites-selected-count">
                                        Выбрано: {selectedItems.length}
                                    </span>
                                )}
                            </div>

                            <div className="favorites-toolbar-right">
                                <div className="favorites-sort">
                                    <label>Сортировка:</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="favorites-sort-select"
                                    >
                                        <option value="default">По умолчанию</option>
                                        <option value="price-asc">Цена (по возрастанию)</option>
                                        <option value="price-desc">Цена (по убыванию)</option>
                                        <option value="name-asc">Название (А-Я)</option>
                                        <option value="name-desc">Название (Я-А)</option>
                                    </select>
                                </div>

                                <div className="favorites-actions">
                                    <button
                                        className="favorites-action-btn delete"
                                        onClick={removeSelected}
                                        disabled={selectedItems.length === 0}
                                        title="Удалить выбранные"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button
                                        className="favorites-action-btn clear"
                                        onClick={clearAll}
                                        title="Очистить всё"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Сводка по избранному */}
                        <div className="favorites-summary">
                            <div className="summary-card">
                                <div className="summary-icon">📊</div>
                                <div className="summary-info">
                                    <span className="summary-label">Всего товаров</span>
                                    <span className="summary-value">{favorites.length}</span>
                                </div>
                            </div>
                            <div className="summary-card">
                                <div className="summary-icon">💰</div>
                                <div className="summary-info">
                                    <span className="summary-label">Общая сумма</span>
                                    <span className="summary-value">{totalSum.toLocaleString()} $</span>
                                </div>
                            </div>
                            <div className="summary-card">
                                <div className="summary-icon">📦</div>
                                <div className="summary-info">
                                    <span className="summary-label">В наличии</span>
                                    <span className="summary-value">{favorites.filter(c => c.inStock).length}</span>
                                </div>
                            </div>
                        </div>

                        {/* Сетка избранного */}
                        <div className="favorites-grid">
                            {sortedFavorites.map(carpet => (
                                <div key={carpet.id} className={`favorite-card ${!carpet.inStock ? 'out-of-stock' : ''} ${selectedItems.includes(carpet.id) ? 'selected' : ''}`}>
                                    <div className="favorite-image">
                                        <Link href={`/catalog/${carpet.id}`}>
                                            <Image
                                                src={carpet.image}
                                                alt={carpet.name}
                                                width={400}
                                                height={300}
                                                layout="responsive"
                                                className="favorite-image-img"
                                            />
                                        </Link>

                                        {/* Бейджи */}
                                        <div className="favorite-badges">
                                            {carpet.oldPrice && (
                                                <span className="favorite-badge discount">
                                                    -{Math.round((1 - carpet.price / carpet.oldPrice) * 100)}%
                                                </span>
                                            )}
                                            {!carpet.inStock && (
                                                <span className="favorite-badge out">Нет в наличии</span>
                                            )}
                                        </div>

                                        {/* Чекбокс для выбора */}
                                        <button
                                            className={`favorite-select-btn ${selectedItems.includes(carpet.id) ? 'selected' : ''}`}
                                            onClick={() => toggleSelect(carpet.id)}
                                            aria-label="Выбрать"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                {selectedItems.includes(carpet.id) ? (
                                                    <path d="M5 12L10 17L19 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                ) : (
                                                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                                                )}
                                            </svg>
                                        </button>

                                        {/* Кнопка удаления */}
                                        <button
                                            className="favorite-remove-btn"
                                            onClick={() => removeFromFavorites(carpet.id, carpet.name)}
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
                                            <div className="favorite-detail">
                                                <span className="detail-label">Размер:</span>
                                                <span className="detail-value">{carpet.size}</span>
                                            </div>
                                            <div className="favorite-detail">
                                                <span className="detail-label">Плотность:</span>
                                                <span className="detail-value">{carpet.density}</span>
                                            </div>
                                        </div>

                                        <div className="favorite-price-block">
                                            {carpet.oldPrice ? (
                                                <>
                                                    <div className="price-block">
                                                        <span className="price-old">{carpet.oldPrice} $</span>
                                                        <span className="price-current">{carpet.price} $</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="price-block single">
                                                    <span className="price-current">{carpet.price} $</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="favorite-actions">
                                            <Link
                                                href={`/catalog/${carpet.id}`}
                                                className="favorite-action-btn primary"
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