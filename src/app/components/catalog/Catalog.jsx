'use client'
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/app/utils/data';
import './catalog.css';

const FeaturedCatalog = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [visibleCount, setVisibleCount] = useState(4);

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
        setVisibleCount(4); // Сбрасываем количество при смене категории
    };

    const loadMore = () => {
        setVisibleCount(prev => prev + 4);
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
                        <Link
                            href={`/catalog/${carpet.id}`}
                            key={carpet.id}
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
                                    <span className="card-discount">-{Math.round((1 - carpet.price / carpet.oldPrice) * 100)}%</span>
                                )}
                                {!carpet.inStock && (
                                    <span className="card-stock out">Нет в наличии</span>
                                )}
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