// /utils/data.js

// Единый URL для всех изображений по вашему требованию
const baseImageUrl = "/images/image.png";

export const categories = [
    {
        id: 1,
        name: "Шелковые ковры",
        description: "Роскошные шелковые ковры ручной работы",
        image: baseImageUrl,
        carpets: [
            {
                id: 101,
                name: "Шелковый ковер 'Золотая Бухара'",
                description: "Изысканный шелковый ковер с традиционным бухарским орнаментом",
                price: "1500",
                oldPrice: "2000",
                image: baseImageUrl,
                size: "200x300 см",
                density: "500 узлов/дм²",
                inStock: true
            },
            {
                id: 102,
                name: "Шелковый ковер 'Царский'",
                description: "Роскошный ковер с золотым шитьем и персидскими мотивами",
                price: "2800",
                image: baseImageUrl,
                size: "250x350 см",
                density: "600 узлов/дм²",
                inStock: true
            },
            {
                id: 103,
                name: "Шелковый ковер 'Император'",
                description: "Уникальный шелковый ковер с ручной работой высшего качества",
                price: "3200",
                oldPrice: "4000",
                image: baseImageUrl,
                size: "300x400 см",
                density: "700 узлов/дм²",
                inStock: false
            },
            {
                id: 104,
                name: "Шелковый ковер 'Самарканд'",
                description: "Ковер с узорами древнего Самарканда",
                price: "1800",
                image: baseImageUrl,
                size: "170x240 см",
                density: "550 узлов/дм²",
                inStock: true
            },
            {
                id: 105,
                name: "Шелковый ковер 'Золотой век'",
                description: "Ковер с золотыми нитями и сложным орнаментом",
                price: "3500",
                image: baseImageUrl,
                size: "200x300 см",
                density: "650 узлов/дм²",
                inStock: true
            }
        ]
    },
    {
        id: 2,
        name: "Шерстяные ковры",
        description: "Теплые и уютные шерстяные ковры премиум-класса",
        image: baseImageUrl,
        carpets: [
            {
                id: 201,
                name: "Шерстяной ковер 'Благородный'",
                description: "Мягкий шерстяной ковер с геометрическим узором",
                price: "850",
                image: baseImageUrl,
                size: "160x230 см",
                density: "300 узлов/дм²",
                inStock: true
            },
            {
                id: 202,
                name: "Шерстяной ковер 'Традиция'",
                description: "Классический бухарский ковер из высококачественной шерсти",
                price: "1100",
                oldPrice: "1400",
                image: baseImageUrl,
                size: "200x300 см",
                density: "350 узлов/дм²",
                inStock: true
            },
            {
                id: 203,
                name: "Шерстяной ковер 'Уют'",
                description: "Плотный шерстяной ковер с мягким ворсом",
                price: "950",
                image: baseImageUrl,
                size: "180x260 см",
                density: "320 узлов/дм²",
                inStock: true
            },
            {
                id: 204,
                name: "Шерстяной ковер 'Мастер'",
                description: "Ручная работа с использованием натуральных красителей",
                price: "1300",
                image: baseImageUrl,
                size: "200x300 см",
                density: "380 узлов/дм²",
                inStock: false
            },
            {
                id: 205,
                name: "Шерстяной ковер 'Династия'",
                description: "Ковер с фамильным орнаментом",
                price: "1650",
                image: baseImageUrl,
                size: "250x350 см",
                density: "400 узлов/дм²",
                inStock: true
            }
        ]
    },
    {
        id: 3,
        name: "Ворсовые ковры",
        description: "Современные ворсовые ковры европейского качества",
        image: baseImageUrl,
        carpets: [
            {
                id: 301,
                name: "Ворсовый ковер 'Модерн'",
                description: "Современный дизайн с высоким ворсом",
                price: "600",
                image: baseImageUrl,
                size: "140x200 см",
                density: "250 узлов/дм²",
                inStock: true
            },
            {
                id: 302,
                name: "Ворсовый ковер 'Престиж'",
                description: "Роскошный ворсовый ковер с объемным рисунком",
                price: "890",
                oldPrice: "1200",
                image: baseImageUrl,
                size: "160x230 см",
                density: "280 узлов/дм²",
                inStock: true
            },
            {
                id: 303,
                name: "Ворсовый ковер 'Комфорт'",
                description: "Мягкий и теплый ковер для спальни",
                price: "750",
                image: baseImageUrl,
                size: "180x260 см",
                density: "260 узлов/дм²",
                inStock: true
            },
            {
                id: 304,
                name: "Ворсовый ковер 'Элит'",
                description: "Премиальный ворсовый ковер с шелковистым блеском",
                price: "1200",
                image: baseImageUrl,
                size: "200x300 см",
                density: "320 узлов/дм²",
                inStock: true
            },
            {
                id: 305,
                name: "Ворсовый ковер 'Гранд'",
                description: "Большой ворсовый ковер для гостиной",
                price: "2100",
                image: baseImageUrl,
                size: "250x350 см",
                density: "350 узлов/дм²",
                inStock: false
            }
        ]
    },
    {
        id: 4,
        name: "Антикварные ковры",
        description: "Уникальные антикварные ковры с историей",
        image: baseImageUrl,
        carpets: [
            {
                id: 401,
                name: "Антикварный ковер 'Винтаж'",
                description: "Редкий антикварный ковер начала XX века",
                price: "4500",
                image: baseImageUrl,
                size: "200x300 см",
                density: "500 узлов/дм²",
                age: "1920-е годы",
                inStock: true
            },
            {
                id: 402,
                name: "Антикварный ковер 'Наследие'",
                description: "Семейная реликвия с уникальным узором",
                price: "5800",
                oldPrice: "7000",
                image: baseImageUrl,
                size: "180x250 см",
                density: "550 узлов/дм²",
                age: "1890-е годы",
                inStock: true
            },
            {
                id: 403,
                name: "Антикварный ковер 'Коллекция'",
                description: "Коллекционный ковер с идеальным состоянием",
                price: "6200",
                image: baseImageUrl,
                size: "230x330 см",
                density: "600 узлов/дм²",
                age: "1905 год",
                inStock: true
            },
            {
                id: 404,
                name: "Антикварный ковер 'Дворец'",
                description: "Роскошный ковер с золотым шитьем",
                price: "8900",
                image: baseImageUrl,
                size: "300x400 см",
                density: "650 узлов/дм²",
                age: "1870-е годы",
                inStock: false
            },
            {
                id: 405,
                name: "Антикварный ковер 'Эпоха'",
                description: "Уникальный экземпляр с богатой историей",
                price: "7500",
                image: baseImageUrl,
                size: "200x300 см",
                density: "580 узлов/дм²",
                age: "1912 год",
                inStock: true
            }
        ]
    },
    {
        id: 5,
        name: "Молитвенные коврики",
        description: "Традиционные молитвенные коврики ручной работы",
        image: baseImageUrl,
        carpets: [
            {
                id: 501,
                name: "Молитвенный коврик 'Намаз'",
                description: "Традиционный молитвенный коврик с михрабом",
                price: "150",
                image: baseImageUrl,
                size: "70x110 см",
                density: "400 узлов/дм²",
                inStock: true
            },
            {
                id: 502,
                name: "Молитвенный коврик 'Золотой'",
                description: "Шелковый молитвенный коврик с золотым шитьем",
                price: "350",
                oldPrice: "450",
                image: baseImageUrl,
                size: "80x120 см",
                density: "500 узлов/дм²",
                inStock: true
            },
            {
                id: 503,
                name: "Молитвенный коврик 'Медина'",
                description: "Коврик с изображением мечети Пророка",
                price: "280",
                image: baseImageUrl,
                size: "75x115 см",
                density: "450 узлов/дм²",
                inStock: true
            },
            {
                id: 504,
                name: "Молитвенный коврик 'Ислам'",
                description: "Строгий дизайн с каллиграфией",
                price: "200",
                image: baseImageUrl,
                size: "70x110 см",
                density: "420 узлов/дм²",
                inStock: true
            },
            {
                id: 505,
                name: "Молитвенный коврик 'Паломник'",
                description: "Легкий дорожный молитвенный коврик",
                price: "120",
                image: baseImageUrl,
                size: "60x100 см",
                density: "350 узлов/дм²",
                inStock: true
            }
        ]
    },
    {
        id: 6,
        name: "Дорожки",
        description: "Элегантные ковровые дорожки для коридоров",
        image: baseImageUrl,
        carpets: [
            {
                id: 601,
                name: "Дорожка 'Восток'",
                description: "Узкая ковровая дорожка с восточным орнаментом",
                price: "400",
                image: baseImageUrl,
                size: "80x300 см",
                density: "300 узлов/дм²",
                inStock: true
            },
            {
                id: 602,
                name: "Дорожка 'Золотая'",
                description: "Дорожка с золотыми акцентами",
                price: "550",
                image: baseImageUrl,
                size: "90x350 см",
                density: "350 узлов/дм²",
                inStock: true
            },
            {
                id: 603,
                name: "Дорожка 'Галерея'",
                description: "Длинная дорожка для коридора",
                price: "750",
                oldPrice: "900",
                image: baseImageUrl,
                size: "100x400 см",
                density: "380 узлов/дм²",
                inStock: false
            },
            {
                id: 604,
                name: "Дорожка 'Лестничная'",
                description: "Специальная дорожка для лестниц",
                price: "680",
                image: baseImageUrl,
                size: "70x500 см",
                density: "320 узлов/дм²",
                inStock: true
            },
            {
                id: 605,
                name: "Дорожка 'Дворец'",
                description: "Роскошная дорожка с богатым узором",
                price: "890",
                image: baseImageUrl,
                size: "100x600 см",
                density: "400 узлов/дм²",
                inStock: true
            }
        ]
    },
    {
        id: 7,
        name: "Детские ковры",
        description: "Яркие и безопасные ковры для детских комнат",
        image: baseImageUrl,
        carpets: [
            {
                id: 701,
                name: "Детский ковер 'Сказка'",
                description: "Ковер с персонажами сказок",
                price: "300",
                image: baseImageUrl,
                size: "140x200 см",
                density: "250 узлов/дм²",
                inStock: true
            },
            {
                id: 702,
                name: "Детский ковер 'Зоопарк'",
                description: "Ковер с изображением животных",
                price: "350",
                image: baseImageUrl,
                size: "150x210 см",
                density: "260 узлов/дм²",
                inStock: true
            },
            {
                id: 703,
                name: "Детский ковер 'Алфавит'",
                description: "Обучающий ковер с буквами",
                price: "380",
                oldPrice: "450",
                image: baseImageUrl,
                size: "160x220 см",
                density: "270 узлов/дм²",
                inStock: true
            },
            {
                id: 704,
                name: "Детский ковер 'Машинки'",
                description: "Ковер с дорогой и машинками",
                price: "320",
                image: baseImageUrl,
                size: "140x200 см",
                density: "250 узлов/дм²",
                inStock: true
            },
            {
                id: 705,
                name: "Детский ковер 'Принцесса'",
                description: "Розовый ковер для девочки",
                price: "340",
                image: baseImageUrl,
                size: "150x210 см",
                density: "260 узлов/дм²",
                inStock: false
            }
        ]
    },
    {
        id: 8,
        name: "Офисные ковры",
        description: "Статусные ковры для деловых интерьеров",
        image: baseImageUrl,
        carpets: [
            {
                id: 801,
                name: "Офисный ковер 'Директор'",
                description: "Статусный ковер для кабинета руководителя",
                price: "1200",
                image: baseImageUrl,
                size: "200x300 см",
                density: "400 узлов/дм²",
                inStock: true
            },
            {
                id: 802,
                name: "Офисный ковер 'Деловой'",
                description: "Строгий дизайн для переговорной",
                price: "950",
                image: baseImageUrl,
                size: "180x260 см",
                density: "380 узлов/дм²",
                inStock: true
            },
            {
                id: 803,
                name: "Офисный ковер 'Престиж'",
                description: "Ковер с геометрическим узором",
                price: "850",
                image: baseImageUrl,
                size: "160x230 см",
                density: "350 узлов/дм²",
                inStock: true
            },
            {
                id: 804,
                name: "Офисный ковер 'Конференц-зал'",
                description: "Большой ковер для конференц-зала",
                price: "2200",
                oldPrice: "2800",
                image: baseImageUrl,
                size: "300x400 см",
                density: "420 узлов/дм²",
                inStock: false
            },
            {
                id: 805,
                name: "Офисный ковер 'Минимализм'",
                description: "Современный дизайн для офиса",
                price: "1100",
                image: baseImageUrl,
                size: "200x300 см",
                density: "390 узлов/дм²",
                inStock: true
            }
        ]
    },
    {
        id: 9,
        name: "Эксклюзивные ковры",
        description: "Уникальные дизайнерские ковры ручной работы",
        image: baseImageUrl,
        carpets: [
            {
                id: 901,
                name: "Эксклюзивный ковер 'Шедевр'",
                description: "Уникальный дизайнерский ковер в единственном экземпляре",
                price: "5500",
                image: baseImageUrl,
                size: "250x350 см",
                density: "700 узлов/дм²",
                inStock: true
            },
            {
                id: 902,
                name: "Эксклюзивный ковер 'Арт'",
                description: "Ковер как произведение искусства",
                price: "6800",
                image: baseImageUrl,
                size: "200x300 см",
                density: "750 узлов/дм²",
                inStock: true
            },
            {
                id: 903,
                name: "Эксклюзивный ковер 'Золото'",
                description: "Ковер с вплетением золотых нитей",
                price: "8900",
                oldPrice: "10000",
                image: baseImageUrl,
                size: "230x330 см",
                density: "800 узлов/дм²",
                inStock: false
            },
            {
                id: 904,
                name: "Эксклюзивный ковер 'Императорский'",
                description: "Роскошный ковер для дворцовых интерьеров",
                price: "12500",
                image: baseImageUrl,
                size: "300x400 см",
                density: "850 узлов/дм²",
                inStock: true
            },
            {
                id: 905,
                name: "Эксклюзивный ковер 'Современное искусство'",
                description: "Абстрактный дизайн от известного художника",
                price: "7200",
                image: baseImageUrl,
                size: "200x300 см",
                density: "720 узлов/дм²",
                inStock: true
            }
        ]
    },
    {
        id: 10,
        name: "Современные ковры",
        description: "Модные ковры в современном стиле",
        image: baseImageUrl,
        carpets: [
            {
                id: 1001,
                name: "Современный ковер 'Лофт'",
                description: "Ковер в стиле лофт с абстрактным рисунком",
                price: "700",
                image: baseImageUrl,
                size: "160x230 см",
                density: "300 узлов/дм²",
                inStock: true
            },
            {
                id: 1002,
                name: "Современный ковер 'Геометрия'",
                description: "Ковер с геометрическим 3D эффектом",
                price: "850",
                image: baseImageUrl,
                size: "180x260 см",
                density: "320 узлов/дм²",
                inStock: true
            },
            {
                id: 1003,
                name: "Современный ковер 'Минимал'",
                description: "Лаконичный дизайн в нейтральных тонах",
                price: "650",
                oldPrice: "800",
                image: baseImageUrl,
                size: "140x200 см",
                density: "280 узлов/дм²",
                inStock: true
            },
            {
                id: 1004,
                name: "Современный ковер 'Бохо'",
                description: "Стильный ковер в стиле бохо",
                price: "780",
                image: baseImageUrl,
                size: "170x240 см",
                density: "290 узлов/дм²",
                inStock: true
            },
            {
                id: 1005,
                name: "Современный ковер 'Эко'",
                description: "Ковер из натуральных материалов",
                price: "920",
                image: baseImageUrl,
                size: "200x300 см",
                density: "310 узлов/дм²",
                inStock: false
            }
        ]
    }
];

export const getCarpetById = (id) => {
    for (const category of categories) {
        const carpet = category.carpets.find(c => c.id === id);
        if (carpet) {
            return { ...carpet, category: category.name };
        }
    }
    return null;
};

export const getCategoriesWithCarpets = () => {
    return categories.map(category => ({
        ...category,
        carpetsCount: category.carpets.length
    }));
};

export const getCarpetsByCategory = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.carpets : [];
};

export const searchCarpets = (query) => {
    const results = [];
    const searchTerm = query.toLowerCase();

    categories.forEach(category => {
        category.carpets.forEach(carpet => {
            if (carpet.name.toLowerCase().includes(searchTerm) ||
                carpet.description.toLowerCase().includes(searchTerm)) {
                results.push({ ...carpet, category: category.name });
            }
        });
    });

    return results;
};

export const getFeaturedCarpets = (limit = 8) => {
    const featured = [];
    categories.forEach(category => {
        category.carpets.forEach(carpet => {
            if (carpet.featured || (carpet.oldPrice && carpet.oldPrice > carpet.price)) {
                featured.push({ ...carpet, category: category.name });
            }
        });
    });

    return featured.sort(() => 0.5 - Math.random()).slice(0, limit);
};