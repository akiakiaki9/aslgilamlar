const baseImageUrl = "/images/data";

export const categories = [
    {
        id: 1,
        name: "Шелковые ковры",
        description: "Роскошные шелковые ковры ручной работы",
        image: `${baseImageUrl}/1.png`,
        carpets: [
            {
                id: 101,
                name: "Шелковый ковер 'Золотая Бухара'",
                description: "Изысканный шелковый ковер с традиционным бухарским орнаментом",
                price: "1500",
                oldPrice: "2000",
                image: `${baseImageUrl}/1.png`,
                size: "200x300 см",
                density: "500 узлов/дм²",
                inStock: true
            },
            {
                id: 102,
                name: "Шелковый ковер 'Царский'",
                description: "Роскошный ковер с золотым шитьем и персидскими мотивами",
                price: "2800",
                image: `${baseImageUrl}/2.png`,
                size: "250x350 см",
                density: "600 узлов/дм²",
                inStock: true
            },
            {
                id: 103,
                name: "Шелковый ковер 'Самарканд'",
                description: "Ковер с узорами древнего Самарканда",
                price: "1800",
                image: `${baseImageUrl}/3.png`,
                size: "170x240 см",
                density: "550 узлов/дм²",
                inStock: true
            },
            {
                id: 104,
                name: "Шерстяной ковер 'Благородный'",
                description: "Мягкий шерстяной ковер с геометрическим узором",
                price: "850",
                image: `${baseImageUrl}/4.png`,
                size: "160x230 см",
                density: "300 узлов/дм²",
                inStock: true
            },
            {
                id: 105,
                name: "Шерстяной ковер 'Традиция'",
                description: "Классический бухарский ковер из высококачественной шерсти",
                price: "1100",
                oldPrice: "1400",
                image: `${baseImageUrl}/5.png`,
                size: "200x300 см",
                density: "350 узлов/дм²",
                inStock: true
            },
            {
                id: 106,
                name: "Молитвенный коврик 'Намаз'",
                description: "Традиционный молитвенный коврик с михрабом",
                price: "150",
                image: `${baseImageUrl}/6.png`,
                size: "70x110 см",
                density: "400 узлов/дм²",
                inStock: true
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