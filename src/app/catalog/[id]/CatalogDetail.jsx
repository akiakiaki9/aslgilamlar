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

    const handlePhoneOrder = () => {
        // Здесь будет логика заказа по телефону
        window.location.href = 'tel:+998917183333';
    };

    return (
        <div className="carpet-detail-page">
            {/* Верхняя панель с названием страницы и хлебными крошками */}
            <div className="page-header">
                <div className="container">
                    <h1 className="page-title">Детальная информация о ковре</h1>
                    <div className="breadcrumbs">
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

                        {/* Кнопка заказа по телефону */}
                        {carpet.inStock && (
                            <div className="info-order">
                                <button className="btn btn-gold btn-large btn-order" onClick={handlePhoneOrder}>
                                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 16.92V19C22.0011 19.7904 21.816 20.5705 21.4617 21.2702C21.1073 21.97 20.5961 22.566 19.9744 23.002C19.3526 23.4381 18.6413 23.6991 17.899 23.7598C17.1567 23.8205 16.4094 23.6789 15.72 23.35C13.6339 22.4532 11.6636 21.2925 9.86002 19.9C8.19198 18.6105 6.73696 17.0653 5.56002 15.33C4.19012 13.5029 3.05193 11.5072 2.17002 9.39C1.85681 8.6939 1.72419 7.93264 1.78354 7.17499C1.84288 6.41733 2.09236 5.68662 2.50655 5.05022C2.92074 4.41381 3.4852 3.89323 4.14876 3.53689C4.81231 3.18055 5.55248 3.00015 6.30002 3.01H8.17002C8.81627 3.00203 9.44554 3.2082 9.96002 3.59C10.3881 3.91807 10.7161 4.36308 10.91 4.87C11.1924 5.64757 11.5259 6.40439 11.91 7.14C12.1422 7.59724 12.2559 8.10594 12.24 8.62C12.233 9.11573 12.0953 9.60006 11.84 10.02C11.707 10.2413 11.574 10.4627 11.44 10.68C11.2643 10.9435 11.1465 11.2428 11.095 11.5571C11.0435 11.8714 11.0597 12.1929 11.1425 12.5003C11.2253 12.8077 11.3727 13.0936 11.5741 13.3383C11.7755 13.5831 12.026 13.7808 12.31 13.92C13.3361 14.5033 14.4495 14.925 15.61 15.17C15.9965 15.2389 16.3943 15.2086 16.7648 15.0827C17.1353 14.9569 17.4641 14.7403 17.72 14.45C18.0238 14.0883 18.3949 13.7885 18.81 13.56C19.5328 13.1684 20.3852 13.1185 21.15 13.42C21.6499 13.6102 22.0909 13.9304 22.425 14.34C22.8052 14.835 23.0272 15.4372 23.06 16.06C23.0731 16.3616 23.0353 16.664 22.9486 16.9512C22.8619 17.2383 22.7283 17.5052 22.555 17.74C22.3618 18.0257 22.1771 18.317 22 18.61V16.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Заказать по телефону
                                    <span className="btn-phone">+998 (91) 718-33-33</span>
                                </button>
                                <p className="order-info">Звонок бесплатный. Работаем ежедневно с 9:00 до 21:00</p>
                            </div>
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