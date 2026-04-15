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
    FaSortAlphaUp,
    FaStar,
    FaShoppingBag,
    FaArrowRight,
    FaGem
} from 'react-icons/fa';
import { categories } from '../utils/data';
import './catalog.css';

export default function CatalogPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

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
                <div className="hero-particles">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="hero-particle" style={{ '--i': i, '--delay': `${i * 0.5}s` }}></div>
                    ))}
                </div>
                <div className="container catalog-hero-content">
                    <div className="hero-badge">
                        <FaGem className="hero-badge-icon" />
                        <span>Коллекция 2026</span>
                    </div>
                    <h1 className="hero-title">Каталог ковров</h1>
                    <p className="hero-subtitle">Изысканные ковры заводской работы из Бухары</p>
                    <div className="hero-stats">
                        <div className="hero-stat">
                            <span className="stat-number">{allCarpets.length}+</span>
                            <span className="stat-label">Эксклюзивных ковров</span>
                        </div>
                        <div className="hero-stat">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Гарантия качества</span>
                        </div>
                    </div>
                </div>
                <div className="hero-wave">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="var(--color-white)"></path>
                    </svg>
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

                    <button
                        className="filter-reset"
                        onClick={() => {
                            setSelectedCategory('all');
                            setSortBy('default');
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
                            <FaShoppingBag className="results-icon" />
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
                            {filteredCarpets.map((carpet, index) => (
                                <div 
                                    key={carpet.id} 
                                    className="catalog-card-wrapper"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                    onMouseEnter={() => setHoveredCard(carpet.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
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
                                                className="card-img"
                                            />
                                            {/* {carpet.oldPrice && (
                                                <span className="card-discount">
                                                    -{Math.round((1 - carpet.price / carpet.oldPrice) * 100)}%
                                                </span>
                                            )} */}
                                            {!carpet.inStock && (
                                                <span className="card-stock out">Нет в наличии</span>
                                            )}
                                            <div className="card-overlay">
                                                <button className="card-view-btn">
                                                    <span>Подробнее</span>
                                                    <FaArrowRight />
                                                </button>
                                            </div>
                                            <button
                                                className={`favorite-btn ${favorites.includes(carpet.id) ? 'active' : ''}`}
                                                onClick={(e) => toggleFavorite(e, carpet.id)}
                                                aria-label={favorites.includes(carpet.id) ? "Удалить из избранного" : "Добавить в избранное"}
                                            >
                                                {favorites.includes(carpet.id) ? <FaHeart /> : <FaRegHeart />}
                                            </button>
                                            {hoveredCard === carpet.id && (
                                                <div className="card-shine"></div>
                                            )}
                                        </div>

                                        <div className="card-content">
                                            <div className="card-category-wrapper">
                                                <span className="card-category">{carpet.categoryName}</span>
                                                {carpet.featured && <FaStar className="featured-star" />}
                                            </div>
                                            <h3>{carpet.name}</h3>
                                            <p className="card-description">{carpet.description.substring(0, 60)}...</p>

                                            <div className="card-details">
                                                <div className="card-detail-item">
                                                    <FaRuler className="detail-icon" />
                                                    <span>{carpet.size}</span>
                                                </div>
                                                <div className="card-detail-divider"></div>
                                                <div className="card-detail-item">
                                                    <FaHands className="detail-icon" />
                                                    <span>{carpet.density}</span>
                                                </div>
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