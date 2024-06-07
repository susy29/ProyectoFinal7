function formatCurrency(number) {
    return number.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
    });
}

function cleanUpProducts(products) {
    return products.map((item) => {
        const product = {
            id: item.id,
            name: item.name,
            price: item.price,
            multiplier: item.multiplier,
            type: item?.type ?? "Redondo",
        };

        if (item.extraIngredients.length > 0) {
            product.ingredients = item.extraIngredients.map((ingredient) => {
                return {
                    name: ingredient.name,
                    price: ingredient.price,
                };
            });
        }

        return product;
    });
}

export { formatCurrency, cleanUpProducts };
