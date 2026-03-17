'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { categories } from '@/app/utils/data';
import './category.css';

export default function CategoryPage() {
    const params = useParams();
    const categoryId = parseInt(params.id);

    const [sortBy, setSortBy] = useState('default');
    const [filterPrice, setFilterPrice] = useState('all');
    const [filterSize, setFilterSize] = useState('all');
    const [visibleCount, setVisibleCount] = useState(8);

    // Находим категорию по ID
    const category = categories.find(c => c.id === categoryId);

    if (!category) {
        return (
            <div className="not-found">
                <h1>Категория не найдена</h1>
                <p>Извините, запрашиваемая категория отсутствует.</p>
                <Link href="/catalog" className="btn btn-gold">
                    Вернуться в каталог
                </Link>
            </div>
        );
    }

    // Получаем все ковры категории
    let carpets = [...category.carpets];

    // Фильтрация по цене
    if (filterPrice !== 'all') {
        const [min, max] = filterPrice.split('-').map(Number);
        carpets = carpets.filter(carpet => {
            const price = carpet.price;
            if (max) {
                return price >= min && price <= max;
            } else {
                return price >= min;
            }
        });
    }

    // Фильтрация по размеру (пример)
    if (filterSize !== 'all') {
        // Здесь можно добавить логику фильтрации по размеру
        // Например, по площади или по типоразмеру
    }

    // Сортировка
    switch (sortBy) {
        case 'price-asc':
            carpets.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            carpets.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            carpets.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            carpets.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            // Сортировка по умолчанию (как в данных)
            break;
    }

    const visibleCarpets = carpets.slice(0, visibleCount);
    const hasMore = visibleCount < carpets.length;

    const loadMore = () => {
        setVisibleCount(prev => prev + 8);
    };

    const handlePhoneOrder = (carpetName) => {
        window.location.href = 'tel:+998917183333';
    };

    return (
        <div className="category-page">
            {/* Верхняя панель */}
            <div className="category-header">
                <div className="container">
                    <div className="breadcrumbs">
                        <Link href="/">Главная</Link>
                        <span className="breadcrumbs-separator">/</span>
                        <Link href="/catalog">Каталог</Link>
                        <span className="breadcrumbs-separator">/</span>
                        <span className="breadcrumbs-current">{category.name}</span>
                    </div>

                    <h1 className="category-title">{category.name}</h1>
                    {category.description && (
                        <p className="category-description">{category.description}</p>
                    )}

                    <div className="category-stats">
                        <span className="stat-item">
                            <strong>{carpets.length}</strong> ковров
                        </span>
                        <span className="stat-item">
                            <strong>{carpets.filter(c => c.inStock).length}</strong> в наличии
                        </span>
                        <span className="stat-item">
                            <strong>
                                {Math.min(...carpets.map(c => c.price))} - {Math.max(...carpets.map(c => c.price))} $
                            </strong> цены
                        </span>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Фильтры и сортировка */}
                <div className="category-toolbar">
                    <div className="filters">
                        <select
                            className="filter-select"
                            value={filterPrice}
                            onChange={(e) => setFilterPrice(e.target.value)}
                        >
                            <option value="all">Все цены</option>
                            <option value="0-500">До 500 $</option>
                            <option value="500-1000">500 - 1000 $</option>
                            <option value="1000-2000">1000 - 2000 $</option>
                            <option value="2000-5000">2000 - 5000 $</option>
                            <option value="5000">От 5000 $</option>
                        </select>

                        <select
                            className="filter-select"
                            value={filterSize}
                            onChange={(e) => setFilterSize(e.target.value)}
                        >
                            <option value="all">Все размеры</option>
                            <option value="small">Маленькие (до 2x3 м)</option>
                            <option value="medium">Средние (2x3 - 3x4 м)</option>
                            <option value="large">Большие (от 3x4 м)</option>
                        </select>
                    </div>

                    <div className="sorting">
                        <select
                            className="sort-select"
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
                {visibleCarpets.length > 0 ? (
                    <>
                        <div className="carpets-grid">
                            {visibleCarpets.map(carpet => (
                                <div key={carpet.id} className="carpet-card">
                                    <Link href={`/catalog/${carpet.id}`} className="card-link">
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
                                        </div>

                                        <div className="card-content">
                                            <h3>{carpet.name}</h3>
                                            <p className="card-description">
                                                {carpet.description.substring(0, 60)}...
                                            </p>

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

                        {hasMore && (
                            <div className="load-more">
                                <button onClick={loadMore} className="btn btn-outline-gold">
                                    Показать еще ({carpets.length - visibleCount})
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="no-results">
                        <h3>Ковры не найдены</h3>
                        <p>Попробуйте изменить параметры фильтрации</p>
                        <button
                            className="btn btn-gold"
                            onClick={() => {
                                setFilterPrice('all');
                                setFilterSize('all');
                                setSortBy('default');
                            }}
                        >
                            Сбросить фильтры
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}