import { Prototype } from "@framework/prototypes/prototype";

/** Products endpoint the ninjapizza.com.ua menu loads (glob, so query string variations still match). */
export const NINJA_PIZZA_PRODUCTS_ROUTE = 'https://ninjasushi.com.ua/api/catalog/products?*';
export const NINJA_PIZZA_URL = 'https://ninjapizza.com.ua/en';

/** Menu sections as rendered on the page: `<div id="pizza" class="product-list">`. */
export const NINJA_PIZZA_MENU_SECTIONS = ['pizza', 'snacks', 'drinks', 'desserts'] as const;

export type Translate = { language: string; name?: string; title: string; description: string };

/** Shape of one item in `GET /api/catalog/products` (only the fields the menu renders are typed strictly). */
export type NinjaPizzaProduct = {
    id: string;
    code: string;
    realm: string;
    status: string;
    cities: string[];
    name: string;
    category: string | null;
    active: boolean;
    price: number;
    unit: string;
    tags: { name: string; value: boolean }[];
    images: { id: string; code: string; url: string; translates: Translate[] }[];
    ingredients: { ingredient_id: string; position: number; is_main: boolean }[];
    properties: Record<string, unknown>;
    sortIndex: number;
    translates: Translate[];
    typeId: string | null;
    types: string[];
};

/** Paged envelope the endpoint returns. */
export type NinjaPizzaProductsResponse = {
    items: NinjaPizzaProduct[];
    total: number;
    limit: number;
    offset: number;
    sort: string;
    order: string;
};

/** A real pizza captured from the live API (2026-11). Valid as-is: the menu renders it in the Pizza section. */
const CAPTURED_PIZZA: NinjaPizzaProduct = {
    "code": "pizza-with-pear-and-gorgonzola",
    "realm": "pizza",
    "status": "ACTIVE",
    "cities": [
        "661e4a732d58889828aa230d"
    ],
    "name": "Піца з грушею та горгондзолою",
    "category": "673991cfd3f98a3ebbcca420",
    "active": true,
    "price": 405,
    "unit": "portion",
    "tags": [
        {
            "name": "new",
            "value": true
        },
        {
            "name": "vegan",
            "value": true
        }
    ],
    "images": [
        {
            "id": "673e2f48f16d25df9b28d5c4",
            "code": "image_m",
            "translates": [
                {
                    "title": "",
                    "language": "ua",
                    "description": ""
                },
                {
                    "title": "",
                    "language": "en",
                    "description": ""
                }
            ],
            "url": "https://d3mvlk4okvy3v4.cloudfront.net/pizza/catalog/6e51721e-8efa-4bb9-ad30-e0eecbf0e483/m2x.webp"
        },
        {
            "id": "673e2f48f16d25df9b28d5c6",
            "code": "image_l",
            "translates": [
                {
                    "title": "",
                    "language": "ua",
                    "description": ""
                },
                {
                    "title": "",
                    "language": "en",
                    "description": ""
                }
            ],
            "url": "https://d3mvlk4okvy3v4.cloudfront.net/pizza/catalog/5b15cd91-a59b-4ded-8b53-9dd216b86a08/l2x.webp"
        },
        {
            "id": "673e2f48f16d25df9b28d5c9",
            "code": "image_xl",
            "translates": [
                {
                    "title": "",
                    "language": "ua",
                    "description": ""
                },
                {
                    "title": "",
                    "language": "en",
                    "description": ""
                }
            ],
            "url": "https://d3mvlk4okvy3v4.cloudfront.net/pizza/catalog/f4472c8b-3a6d-40eb-8471-3c198593b286/xl2x.webp"
        }
    ],
    "ingredients": [
        {
            "ingredient_id": "6370db8c406ac67226254ea6",
            "position": 0,
            "is_main": false
        },
        {
            "ingredient_id": "67430e2e8cfa9f07c1d58e1e",
            "position": 0,
            "is_main": false
        },
        {
            "ingredient_id": "67430e118cfa9f07c1d58e0f",
            "position": 0,
            "is_main": false
        },
        {
            "ingredient_id": "6370db8c406ac67226254e92",
            "position": 0,
            "is_main": false
        },
        {
            "ingredient_id": "6370db89406ac67226254dd4",
            "position": 0,
            "is_main": false
        },
        {
            "ingredient_id": "6370db89406ac67226254de8",
            "position": 0,
            "is_main": false
        },
        {
            "ingredient_id": "6370db88406ac67226254dca",
            "position": 0,
            "is_main": false
        }
    ],
    "properties": {
        "weight": 550,
        "units": 1,
        "rating": 0,
        "popularity": 0,
        "fats": 0,
        "proteins": 0,
        "calories": 0,
        "carbohydrates": 0,
        "quantity": 0.55,
        "measurement": "kg",
        "viewMode": "measurement",
        "productClassification": "standard",
        "primaryProductId": null,
        "electricityLevel": 0
    },
    "sortIndex": 100,
    "id": "673e2f47f16d25df9b28d5c2",
    "translates": [
        {
            "name": "Піца з грушею та горгондзолою",
            "title": "Піца з грушею та горгондзолою",
            "language": "ua",
            "description": ""
        },
        {
            "name": "Піца з грушею та горгондзолою",
            "title": "Pizza with pear and gorgonzola",
            "language": "en",
            "description": ""
        }
    ],
    "typeId": null,
    "types": [
        "673fabdafb6148114a00355b"
    ]
};

/**
 * Prototype for menu products.
 *
 * `clone()` returns an independent deep copy; the `with...()` methods change
 * that copy and return it, so a test reads as "a pizza like the real one, but titled X".
 */
export class NinjaPizzaProductPrototype implements Prototype<NinjaPizzaProductPrototype> {
    private constructor(private readonly product: NinjaPizzaProduct) {}

    /** Prototype registry entry: a regular pizza in the Pizza category. */
    static readonly pizza = new NinjaPizzaProductPrototype(CAPTURED_PIZZA);

    clone(): NinjaPizzaProductPrototype {
        return new NinjaPizzaProductPrototype(structuredClone(this.product));
    }

    withId(id: string): this {
        this.product.id = id;
        this.product.code = `stub-${id}`;
        return this;
    }

    /** Sets the title shown on the product card in every language. */
    withTitle(title: string): this {
        this.product.name = title;
        this.product.translates.forEach(t => {
            t.name = title;
            t.title = title;
        });
        return this;
    }

    withPrice(price: number): this {
        this.product.price = price;
        return this;
    }

    toJSON(): NinjaPizzaProduct {
        return structuredClone(this.product);
    }
}

/** Wraps products in the paged envelope the endpoint returns. */
export function ninjaPizzaProductsResponse(...products: NinjaPizzaProductPrototype[]): NinjaPizzaProductsResponse {
    return {
        items: products.map(p => p.toJSON()),
        total: products.length,
        limit: 999,
        offset: 0,
        sort: '_id',
        order: 'asc',
    };
}
