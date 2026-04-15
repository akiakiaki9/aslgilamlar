'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    FaHeart, 
    FaRegHeart, 
    FaSearch, 
    FaTimes, 
    FaRuler, 
    FaHands,
    FaSort,
    FaSortAmountDown,
    FaSortAmountUp,
    FaSortAlphaDown,
    FaSortAlphaUp
} from 'react-icons/fa';
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
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Данные из QuickContacts
    const phoneNumber = "+998 (91) 718-33-33";

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
        e.preventDefault();
        e.stopPropagation();

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

        if (showFavoritesOnly) {
            filtered = filtered.filter(c => favorites.includes(c.id));
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(c => c.categoryId === parseInt(selectedCategory));
        }

        if (inStockOnly) {
            filtered = filtered.filter(c => c.inStock);
        }

        filtered = filtered.filter(c =>
            c.price >= priceRange.min && c.price <= priceRange.max
        );

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.description.toLowerCase().includes(query)
            );
        }

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
                break;
        }

        return filtered;
    };

    const filteredCarpets = getFilteredAndSortedCarpets();

    // Получение иконки сортировки
    const getSortIcon = () => {
        switch (sortBy) {
            case 'price-asc': return <FaSortAmountUp />;
            case 'price-desc': return <FaSortAmountDown />;
            case 'name-asc': return <FaSortAlphaDown />;
            case 'name-desc': return <FaSortAlphaUp />;
            default: return <FaSort />;
        }
    };

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
                {/* Мобильная кнопка фильтров */}
                <button 
                    className="mobile-filters-toggle"
                    onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                >
                    <FaSearch />
                    <span>Фильтры и сортировка</span>
                    {isMobileFiltersOpen ? <FaTimes /> : <FaSort />}
                </button>

                {/* Боковая панель с фильтрами */}
                <aside className={`catalog-sidebar ${isMobileFiltersOpen ? 'open' : ''}`}>
                    <div className="sidebar-header">
                        <h3>Фильтры</h3>
                        <button 
                            className="close-filters"
                            onClick={() => setIsMobileFiltersOpen(false)}
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Поиск */}
                    <div className="filter-section">
                        <h4>Поиск</h4>
                        <div className="search-wrapper">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Поиск ковров..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="filter-search"
                            />
                            {searchQuery && (
                                <button 
                                    className="clear-search"
                                    onClick={() => setSearchQuery('')}
                                >
                                    <FaTimes />
                                </button>
                            )}
                        </div>
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

                {/* Оверлей для мобильных фильтров */}
                {isMobileFiltersOpen && (
                    <div className="filters-overlay" onClick={() => setIsMobileFiltersOpen(false)}></div>
                )}

                {/* Основной контент */}
                <div className="catalog-main">
                    {/* Верхняя панель */}
                    <div className="catalog-toolbar">
                        <div className="results-count">
                            Найдено: <span>{filteredCarpets.length}</span> ковров
                        </div>

                        <div className="sort-select">
                            <label>Сортировка:</label>
                            <div className="select-wrapper">
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
                                <span className="select-icon">{getSortIcon()}</span>
                            </div>
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
                                            <img
                                                src={carpet.image}
                                                alt={carpet.name}
                                                width={400}
                                                height={300}
                                                layout="responsive"
                                                className="card-img"
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
                                                {favorites.includes(carpet.id) ? <FaHeart /> : <FaRegHeart />}
                                            </button>
                                        </div>

                                        <div className="card-content">
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
                                    <FaHeart className="no-results-icon" />
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
                                    <FaSearch className="no-results-icon" />
                                    <h3>Ковры не найдены</h3>
                                    <p>Попробуйте изменить параметры фильтрации</p>
                                    <button
                                        className="btn btn-outline-gold"
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            setPriceRange({ min: 0, max: 15000 });
                                            setInStockOnly(false);
                                            setSearchQuery('');
                                        }}
                                    >
                                        Сбросить фильтры
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}