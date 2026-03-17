'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '../utils/data';
import './catalog.css';

export default function CatalogPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 15000 });
    const [inStockOnly, setInStockOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    // Загрузка избранного из localStorage при монтировании
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // Сохранение избранного в localStorage
    const saveFavorites = (newFavorites) => {
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        setFavorites(newFavorites);
    };

    // Добавление/удаление из избранного
    const toggleFavorite = (e, carpetId) => {
        e.preventDefault(); // Предотвращаем переход по ссылке
        e.stopPropagation(); // Останавливаем всплытие события

        let newFavorites;
        if (favorites.includes(carpetId)) {
            newFavorites = favorites.filter(id => id !== carpetId);
        } else {
            newFavorites = [...favorites, carpetId];
        }
        saveFavorites(newFavorites);
    };

    // Получаем все ковры
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

    // Фильтрация и сортировка
    const getFilteredAndSortedCarpets = () => {
        let filtered = allCarpets;

        // Фильтр по избранному
        if (showFavoritesOnly) {
            filtered = filtered.filter(c => favorites.includes(c.id));
        }

        // Фильтр по категории
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(c => c.categoryId === parseInt(selectedCategory));
        }

        // Фильтр по наличию
        if (inStockOnly) {
            filtered = filtered.filter(c => c.inStock);
        }

        // Фильтр по цене
        filtered = filtered.filter(c =>
            c.price >= priceRange.min && c.price <= priceRange.max
        );

        // Поиск по названию и описанию
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.description.toLowerCase().includes(query)
            );
        }

        // Сортировка
        switch (sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                // По умолчанию - без сортировки
                break;
        }

        return filtered;
    };

    const filteredCarpets = getFilteredAndSortedCarpets();

    return (
        <div className="catalog-page">
            {/* Hero секция каталога */}
            <section className="catalog-hero">
                <div className="catalog-hero-overlay"></div>
                <div className="container catalog-hero-content">
                    <h1>Каталог ковров</h1>
                    <p>Изысканные ковры ручной работы из Бухары</p>
                </div>
            </section>

            <div className="container catalog-container">
                {/* Боковая панель с фильтрами */}
                <aside className="catalog-sidebar">
                    <h3>Фильтры</h3>

                    {/* Поиск */}
                    <div className="filter-section">
                        <h4>Поиск</h4>
                        <input
                            type="text"
                            placeholder="Поиск ковров..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="filter-search"
                        />
                    </div>

                    {/* Категории */}
                    <div className="filter-section">
                        <h4>Категории</h4>
                        <div className="filter-categories">
                            <label className="filter-radio">
                                <input
                                    type="radio"
                                    name="category"
                                    value="all"
                                    checked={selectedCategory === 'all' && !showFavoritesOnly}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                        setShowFavoritesOnly(false);
                                    }}
                                />
                                <span>Все ковры</span>
                            </label>
                            {categories.map(category => (
                                <label key={category.id} className="filter-radio">
                                    <input
                                        type="radio"
                                        name="category"
                                        value={category.id}
                                        checked={selectedCategory === category.id.toString() && !showFavoritesOnly}
                                        onChange={(e) => {
                                            setSelectedCategory(e.target.value);
                                            setShowFavoritesOnly(false);
                                        }}
                                    />
                                    <span>{category.name} ({category.carpets.length})</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Избранное */}
                    <div className="filter-section">
                        <h4>Избранное</h4>
                        <label className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={showFavoritesOnly}
                                onChange={(e) => {
                                    setShowFavoritesOnly(e.target.checked);
                                    if (e.target.checked) {
                                        setSelectedCategory('all');
                                    }
                                }}
                            />
                            <span>Только избранные ({favorites.length})</span>
                        </label>
                    </div>

                    {/* Ценовой диапазон */}
                    <div className="filter-section">
                        <h4>Цена ($)</h4>
                        <div className="price-range">
                            <div className="price-inputs">
                                <input
                                    type="number"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                                    placeholder="От"
                                    min="0"
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                                    placeholder="До"
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Наличие */}
                    <div className="filter-section">
                        <h4>Наличие</h4>
                        <label className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={inStockOnly}
                                onChange={(e) => setInStockOnly(e.target.checked)}
                            />
                            <span>Товары в наличии</span>
                        </label>
                    </div>

                    <button
                        className="filter-reset"
                        onClick={() => {
                            setSelectedCategory('all');
                            setSortBy('default');
                            setPriceRange({ min: 0, max: 15000 });
                            setInStockOnly(false);
                            setSearchQuery('');
                            setShowFavoritesOnly(false);
                        }}
                    >
                        Сбросить фильтры
                    </button>
                </aside>

                {/* Основной контент */}
                <div className="catalog-main">
                    {/* Верхняя панель */}
                    <div className="catalog-toolbar">
                        <div className="results-count">
                            Найдено: <span>{filteredCarpets.length}</span> ковров
                        </div>

                        <div className="sort-select">
                            <label>Сортировка:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="default">По умолчанию</option>
                                <option value="price-asc">Цена: по возрастанию</option>
                                <option value="price-desc">Цена: по убыванию</option>
                                <option value="name-asc">Название: А-Я</option>
                                <option value="name-desc">Название: Я-А</option>
                            </select>
                        </div>
                    </div>

                    {/* Сетка ковров */}
                    {filteredCarpets.length > 0 ? (
                        <div className="catalog-grid">
                            {filteredCarpets.map(carpet => (
                                <div key={carpet.id} className="catalog-card-wrapper">
                                    <Link
                                        href={`/catalog/${carpet.id}`}
                                        className="catalog-card"
                                    >
                                        <div className="card-image">
                                            <Image
                                                src={carpet.image}
                                                alt={carpet.name}
                                                width={400}
                                                height={300}
                                                layout="responsive"
                                            />
                                            {carpet.oldPrice && (
                                                <span className="card-discount">
                                                    -{Math.round((1 - carpet.price / carpet.oldPrice) * 100)}%
                                                </span>
                                            )}
                                            {!carpet.inStock && (
                                                <span className="card-stock out">Нет в наличии</span>
                                            )}
                                            <button
                                                className={`favorite-btn ${favorites.includes(carpet.id) ? 'active' : ''}`}
                                                onClick={(e) => toggleFavorite(e, carpet.id)}
                                                aria-label={favorites.includes(carpet.id) ? "Удалить из избранного" : "Добавить в избранное"}
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    fill={favorites.includes(carpet.id) ? "currentColor" : "none"}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="card-content">
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
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            {showFavoritesOnly ? (
                                <>
                                    <h3>В избранном пока нет ковров</h3>
                                    <p>Добавьте понравившиеся ковры в избранное, нажав на сердечко</p>
                                    <button
                                        className="btn btn-gold"
                                        onClick={() => setShowFavoritesOnly(false)}
                                    >
                                        Показать все ковры
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h3>Ковры не найдены</h3>
                                    <p>Попробуйте изменить параметры фильтрации</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};