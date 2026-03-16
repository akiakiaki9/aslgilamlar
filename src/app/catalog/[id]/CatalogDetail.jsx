'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { categories } from '@/app/utils/data';
import './catalogdetail.css';

export default function CarpetDetailPage() {
    const params = useParams();
    const id = parseInt(params.id);

    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    // Функция для поиска ковра по ID
    const findCarpetById = (id) => {
        for (const category of categories) {
            const carpet = category.carpets.find(c => c.id === id);
            if (carpet) {
                return { ...carpet, categoryName: category.name, categoryId: category.id };
            }
        }
        return null;
    };

    // Получаем данные ковра
    const carpet = findCarpetById(id);

    // Если ковер не найден
    if (!carpet) {
        return (
            <div className="not-found">
                <h1>Ковер не найден</h1>
                <p>Извините, запрашиваемый ковер отсутствует в каталоге.</p>
                <Link href="/catalog" className="btn btn-gold">
                    Вернуться в каталог
                </Link>
            </div>
        );
    }

    // Для демонстрации создаем массив дополнительных изображений
    const images = [
        carpet.image,
        carpet.image.replace('.jpg', '-2.jpg'),
        carpet.image.replace('.jpg', '-3.jpg'),
        carpet.image.replace('.jpg', '-4.jpg'),
    ].filter(img => img); // Убираем undefined

    // Похожие ковры (из той же категории)
    const getSimilarCarpets = () => {
        const category = categories.find(c => c.id === carpet.categoryId);
        if (!category) return [];

        return category.carpets
            .filter(c => c.id !== carpet.id) // Исключаем текущий ковер
            .slice(0, 4); // Берем первые 4
    };

    const similarCarpets = getSimilarCarpets();

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = () => {
        // Здесь будет логика добавления в корзину
        alert(`Добавлено в корзину: ${carpet.name} (${quantity} шт.)`);
    };

    const handleBuyNow = () => {
        // Здесь будет логика быстрого заказа
        alert(`Быстрый заказ: ${carpet.name}`);
    };

    return (
        <div className="carpet-detail-page">
            {/* Хлебные крошки */}
            <div className="breadcrumbs">
                <div className="container">
                    <Link href="/">Главная</Link>
                    <span className="breadcrumbs-separator">/</span>
                    <Link href="/catalog">Каталог</Link>
                    <span className="breadcrumbs-separator">/</span>
                    <Link href={`/catalog?category=${carpet.categoryId}`}>
                        {carpet.categoryName}
                    </Link>
                    <span className="breadcrumbs-separator">/</span>
                    <span className="breadcrumbs-current">{carpet.name}</span>
                </div>
            </div>

            <div className="container">
                {/* Основная информация о ковре */}
                <div className="carpet-main">
                    {/* Галерея изображений */}
                    <div className="carpet-gallery">
                        <div className="gallery-main">
                            <Image
                                src={images[selectedImage] || carpet.image}
                                alt={carpet.name}
                                width={800}
                                height={600}
                                className="gallery-main-image"
                                priority
                            />
                            {carpet.oldPrice && (
                                <span className="gallery-discount">
                                    -{Math.round((1 - carpet.price / carpet.oldPrice) * 100)}%
                                </span>
                            )}
                            {!carpet.inStock && (
                                <span className="gallery-stock out">Нет в наличии</span>
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="gallery-thumbnails">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        className={`thumbnail-btn ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${carpet.name} - вид ${index + 1}`}
                                            width={100}
                                            height={80}
                                            className="thumbnail-image"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Информация о ковре */}
                    <div className="carpet-info">
                        <div className="info-header">
                            <span className="info-category">{carpet.categoryName}</span>
                            <h1 className="info-title">{carpet.name}</h1>
                            {carpet.age && (
                                <span className="info-age">Возраст: {carpet.age}</span>
                            )}
                        </div>

                        <div className="info-price-block">
                            {carpet.oldPrice ? (
                                <div className="price-block">
                                    <span className="price-old">{carpet.oldPrice} $</span>
                                    <span className="price-current">{carpet.price} $</span>
                                    <span className="price-save">
                                        Экономия {carpet.oldPrice - carpet.price} $
                                    </span>
                                </div>
                            ) : (
                                <div className="price-block">
                                    <span className="price-current">{carpet.price} $</span>
                                </div>
                            )}
                        </div>

                        <div className="info-availability">
                            <div className={`availability-status ${carpet.inStock ? 'in-stock' : 'out-of-stock'}`}>
                                {carpet.inStock ? '✓ В наличии' : '✕ Нет в наличии'}
                            </div>
                            {carpet.inStock && (
                                <div className="info-delivery">
                                    Доставка по всему миру от 3 дней
                                </div>
                            )}
                        </div>

                        <div className="info-characters">
                            <div className="character-item">
                                <span className="character-label">Размер:</span>
                                <span className="character-value">{carpet.size}</span>
                            </div>
                            <div className="character-item">
                                <span className="character-label">Плотность:</span>
                                <span className="character-value">{carpet.density}</span>
                            </div>
                            {carpet.age && (
                                <div className="character-item">
                                    <span className="character-label">Год создания:</span>
                                    <span className="character-value">{carpet.age}</span>
                                </div>
                            )}
                        </div>

                        {/* Количество и кнопки */}
                        {carpet.inStock && (
                            <>
                                <div className="info-quantity">
                                    <span className="quantity-label">Количество:</span>
                                    <div className="quantity-controls">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={quantity <= 1}
                                        >
                                            −
                                        </button>
                                        <span className="quantity-value">{quantity}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="info-buttons">
                                    <button className="btn btn-gold btn-large" onClick={handleAddToCart}>
                                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Добавить в корзину
                                    </button>
                                    <button className="btn btn-outline-gold btn-large" onClick={handleBuyNow}>
                                        Быстрый заказ
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Дополнительная информация */}
                        <div className="info-extra">
                            <div className="extra-item">
                                <svg className="extra-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Гарантия подлинности</span>
                            </div>
                            <div className="extra-item">
                                <svg className="extra-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Ручная работа</span>
                            </div>
                            <div className="extra-item">
                                <svg className="extra-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Бесплатная доставка</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Табы с подробной информацией */}
                <div className="carpet-tabs">
                    <div className="tabs-header">
                        <button
                            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                            onClick={() => setActiveTab('description')}
                        >
                            Описание
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'characteristics' ? 'active' : ''}`}
                            onClick={() => setActiveTab('characteristics')}
                        >
                            Характеристики
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'care' ? 'active' : ''}`}
                            onClick={() => setActiveTab('care')}
                        >
                            Уход
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'delivery' ? 'active' : ''}`}
                            onClick={() => setActiveTab('delivery')}
                        >
                            Доставка
                        </button>
                    </div>

                    <div className="tabs-content">
                        {activeTab === 'description' && (
                            <div className="tab-pane">
                                <h3>Описание</h3>
                                <p>{carpet.description}</p>
                                <p>
                                    Этот великолепный ковер ручной работы выполнен мастерами Бухары
                                    с использованием традиционных техник ткачества, передаваемых из
                                    поколения в поколение. Каждый узел завязан вручную, что гарантирует
                                    высочайшее качество и долговечность.
                                </p>
                                <p>
                                    Натуральные красители, используемые при создании ковра, не выцветают
                                    со временем и безопасны для здоровья. Ковер станет настоящим
                                    украшением вашего интерьера и прослужит не одно десятилетие.
                                </p>
                            </div>
                        )}

                        {activeTab === 'characteristics' && (
                            <div className="tab-pane">
                                <h3>Характеристики</h3>
                                <table className="characteristics-table">
                                    <tbody>
                                        <tr>
                                            <td>Категория</td>
                                            <td>{carpet.categoryName}</td>
                                        </tr>
                                        <tr>
                                            <td>Название</td>
                                            <td>{carpet.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Размер</td>
                                            <td>{carpet.size}</td>
                                        </tr>
                                        <tr>
                                            <td>Плотность узлов</td>
                                            <td>{carpet.density}</td>
                                        </tr>
                                        {carpet.age && (
                                            <tr>
                                                <td>Возраст</td>
                                                <td>{carpet.age}</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td>Материал</td>
                                            <td>Натуральный шелк / Шерсть</td>
                                        </tr>
                                        <tr>
                                            <td>Техника</td>
                                            <td>Ручное ткачество</td>
                                        </tr>
                                        <tr>
                                            <td>Страна производства</td>
                                            <td>Узбекистан, Бухара</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeTab === 'care' && (
                            <div className="tab-pane">
                                <h3>Уход за ковром</h3>
                                <ul className="care-list">
                                    <li>Регулярно пылесосьте ковер с обеих сторон</li>
                                    <li>Избегайте прямых солнечных лучей для предотвращения выцветания</li>
                                    <li>При пятнах используйте сухую чистку или специальные средства для ковров</li>
                                    <li>Раз в год рекомендуется профессиональная химчистка</li>
                                    <li>Поворачивайте ковер раз в полгода для равномерного износа</li>
                                    <li>Не используйте агрессивные моющие средства</li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'delivery' && (
                            <div className="tab-pane">
                                <h3>Доставка и оплата</h3>
                                <div className="delivery-info">
                                    <div className="delivery-item">
                                        <h4>🚚 Доставка по Узбекистану</h4>
                                        <p>Бесплатно от 500 000 сум. Срок доставки: 1-2 дня</p>
                                    </div>
                                    <div className="delivery-item">
                                        <h4>✈️ Международная доставка</h4>
                                        <p>Стоимость рассчитывается индивидуально. Срок доставки: 3-7 дней</p>
                                    </div>
                                    <div className="delivery-item">
                                        <h4>💳 Способы оплаты</h4>
                                        <p>Наличные, банковский перевод, Visa/Mastercard, PayPal</p>
                                    </div>
                                    <div className="delivery-item">
                                        <h4>🛡️ Гарантия</h4>
                                        <p>14 дней на возврат. Гарантия подлинности 100%</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Похожие ковры */}
                {similarCarpets.length > 0 && (
                    <div className="similar-carpets">
                        <h2>Похожие ковры</h2>
                        <div className="similar-grid">
                            {similarCarpets.map(similar => (
                                <Link
                                    href={`/catalog/${similar.id}`}
                                    key={similar.id}
                                    className="similar-card"
                                >
                                    <div className="similar-image">
                                        <Image
                                            src={similar.image}
                                            alt={similar.name}
                                            width={300}
                                            height={250}
                                        />
                                    </div>
                                    <div className="similar-info">
                                        <h3>{similar.name}</h3>
                                        <div className="similar-price">
                                            {similar.oldPrice ? (
                                                <>
                                                    <span className="price-old">{similar.oldPrice} $</span>
                                                    <span className="price-current">{similar.price} $</span>
                                                </>
                                            ) : (
                                                <span className="price-current">{similar.price} $</span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}