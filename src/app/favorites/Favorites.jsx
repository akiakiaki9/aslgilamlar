'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    FaHeart,
    FaTrash,
    FaTimes,
    FaCheck,
    FaSort,
    FaSortAmountUp,
    FaSortAmountDown,
    FaSortAlphaDown,
    FaSortAlphaUp,
    FaShoppingCart,
    FaInfoCircle,
    FaExclamationTriangle,
    FaCheckCircle,
    FaTimesCircle,
    FaRegHeart,
    FaStar,
    FaTruck,
    FaShieldAlt
} from 'react-icons/fa';
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

                    const allCarpets = categories.flatMap(category =>
                        category.carpets.map(carpet => ({
                            ...carpet,
                            categoryName: category.name,
                            categoryId: category.id
                        }))
                    );

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

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

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

    const clearAll = () => {
        if (favorites.length === 0) return;

        if (confirm('Очистить весь список избранного?')) {
            localStorage.removeItem('favorites');
            setFavorites([]);
            setSelectedItems([]);
            showNotification('Список избранного очищен', 'info');
        }
    };

    const selectAll = () => {
        if (selectedItems.length === favorites.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(favorites.map(c => c.id));
        }
    };

    const toggleSelect = (carpetId) => {
        setSelectedItems(prev =>
            prev.includes(carpetId)
                ? prev.filter(id => id !== carpetId)
                : [...prev, carpetId]
        );
    };

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

    const getSortIcon = () => {
        switch (sortBy) {
            case 'price-asc': return <FaSortAmountUp />;
            case 'price-desc': return <FaSortAmountDown />;
            case 'name-asc': return <FaSortAlphaDown />;
            case 'name-desc': return <FaSortAlphaUp />;
            default: return <FaSort />;
        }
    };

    const getNotificationIcon = () => {
        switch (notification.type) {
            case 'success': return <FaCheckCircle />;
            case 'error': return <FaTimesCircle />;
            case 'warning': return <FaExclamationTriangle />;
            default: return <FaInfoCircle />;
        }
    };

    // Удалена переменная totalSum

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
                    <span className="notification-icon">{getNotificationIcon()}</span>
                    <span className="notification-message">{notification.message}</span>
                </div>
            )}

            {/* Hero секция */}
            <div className="favorites-hero">
                <div className="favorites-hero-overlay"></div>
                <div className="container favorites-hero-content">
                    <div className="hero-badge">
                        <FaHeart className="hero-badge-icon" />
                        <span>Ваша коллекция</span>
                    </div>
                    <h1 className="hero-title">
                        Избранное
                        {favorites.length > 0 && (
                            <span className="hero-title-badge">{favorites.length}</span>
                        )}
                    </h1>
                    <div className="hero-breadcrumbs">
                        <Link href="/">Главная</Link>
                        <span className="breadcrumbs-separator">/</span>
                        <span className="breadcrumbs-current">Избранное</span>
                    </div>
                </div>
                <div className="hero-wave">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="var(--bg-primary)"></path>
                    </svg>
                </div>
            </div>

            <div className="container">
                {favorites.length === 0 ? (
                    <div className="favorites-empty">
                        <div className="empty-animation">
                            <div className="empty-heart"><FaRegHeart /></div>
                            <div className="empty-carpet">🧶</div>
                            <div className="empty-sparkles">✨</div>
                        </div>
                        <h2>В избранном пока пусто</h2>
                        <p>Добавляйте понравившиеся ковры в избранное, нажимая на сердечко в каталоге</p>
                        <div className="empty-actions">
                            <Link href="/catalog" className="btn btn-gold">
                                <FaShoppingCart />
                                Перейти в каталог
                            </Link>
                            <Link href="/" className="btn btn-outline-gold">
                                На главную
                            </Link>
                        </div>
                        <div className="empty-features">
                            <div className="empty-feature">
                                <FaStar className="empty-feature-icon" />
                                <span>Эксклюзивные ковры</span>
                            </div>
                            <div className="empty-feature">
                                <FaTruck className="empty-feature-icon" />
                                <span>Бесплатная доставка</span>
                            </div>
                            <div className="empty-feature">
                                <FaShieldAlt className="empty-feature-icon" />
                                <span>Гарантия качества</span>
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
                                    <div className="sort-select-wrapper">
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
                                        <span className="sort-icon">{getSortIcon()}</span>
                                    </div>
                                </div>

                                <div className="favorites-actions">
                                    <button
                                        className="favorites-action-btn delete"
                                        onClick={removeSelected}
                                        disabled={selectedItems.length === 0}
                                        title="Удалить выбранные"
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        className="favorites-action-btn clear"
                                        onClick={clearAll}
                                        title="Очистить всё"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Сводка по избранному - убран блок с общей суммой */}
                        <div className="favorites-summary">
                            <div className="summary-card">
                                <div className="summary-icon">📊</div>
                                <div className="summary-info">
                                    <span className="summary-label">Всего товаров</span>
                                    <span className="summary-value">{favorites.length}</span>
                                </div>
                            </div>
                            <div className="summary-card">
                                <div className="summary-icon">📦</div>
                                <div className="summary-info">
                                    <span className="summary-label">В наличии</span>
                                    <span className="summary-value">{favorites.filter(c => c.inStock).length}</span>
                                </div>
                            </div>
                            <div className="summary-card">
                                <div className="summary-icon">❤️</div>
                                <div className="summary-info">
                                    <span className="summary-label">Избранное</span>
                                    <span className="summary-value">{favorites.length} товаров</span>
                                </div>
                            </div>
                        </div>

                        {/* Сетка избранного */}
                        <div className="favorites-grid">
                            {sortedFavorites.map((carpet, index) => (
                                <div
                                    key={carpet.id}
                                    className={`favorite-card ${!carpet.inStock ? 'out-of-stock' : ''} ${selectedItems.includes(carpet.id) ? 'selected' : ''}`}
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <div className="favorite-image">
                                        <Link href={`/catalog/${carpet.id}`}>
                                            <Image
                                                src={carpet.image}
                                                alt={carpet.name}
                                                width={400}
                                                height={300}
                                                className="favorite-image-img"
                                            />
                                        </Link>

                                        <div className="favorite-badges">
                                            {carpet.oldPrice && (
                                                <span className="favorite-badge discount">
                                                    -{Math.round((1 - carpet.price / carpet.oldPrice) * 100)}%
                                                </span>
                                            )}
                                            {!carpet.inStock && (
                                                <span className="favorite-badge out">Нет в наличии</span>
                                            )}
                                            {carpet.featured && (
                                                <span className="favorite-badge featured">Эксклюзив</span>
                                            )}
                                        </div>

                                        <button
                                            className={`favorite-select-btn ${selectedItems.includes(carpet.id) ? 'selected' : ''}`}
                                            onClick={() => toggleSelect(carpet.id)}
                                            aria-label="Выбрать"
                                        >
                                            {selectedItems.includes(carpet.id) ? <FaCheck /> : <div className="select-circle"></div>}
                                        </button>

                                        <button
                                            className="favorite-remove-btn"
                                            onClick={() => removeFromFavorites(carpet.id, carpet.name)}
                                            aria-label="Удалить из избранного"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>

                                    <div className="favorite-content">
                                        <span className="favorite-category">{carpet.categoryName}</span>
                                        <Link href={`/catalog/${carpet.id}`} className="favorite-title">
                                            <h3>{carpet.name}</h3>
                                        </Link>

                                        <div className="favorite-details">
                                            <div className="favorite-detail">
                                                <span className="detail-label">Размер</span>
                                                <span className="detail-value">{carpet.size}</span>
                                            </div>
                                            <div className="favorite-detail">
                                                <span className="detail-label">Плотность</span>
                                                <span className="detail-value">{carpet.density}</span>
                                            </div>
                                        </div>

                                        {/* Убрана цена из карточки */}

                                        <div className="favorite-actions">
                                            <Link
                                                href={`/catalog/${carpet.id}`}
                                                className="favorite-action-btn primary"
                                            >
                                                <span>Подробнее</span>
                                                <FaShoppingCart />
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

function getWordForm(number, forms) {
    const cases = [2, 0, 1, 1, 1, 2];
    return forms[
        (number % 100 > 4 && number % 100 < 20)
            ? 2
            : cases[(number % 10 < 5) ? number % 10 : 5]
    ];
}