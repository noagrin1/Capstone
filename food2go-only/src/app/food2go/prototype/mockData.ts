import type { MenuItem, Restaurant } from "./types";

export const restaurants: Restaurant[] = [
  { id: "r1", name: "Saffron Street Kitchen", cuisine: "Indian", rating: 4.6, etaMinutes: 25, deliveryFee: 2.99, priceLevel: 2 },
  { id: "r2", name: "Sunset Sushi Bar", cuisine: "Japanese", rating: 4.8, etaMinutes: 35, deliveryFee: 3.49, priceLevel: 3 },
  { id: "r3", name: "Bella Napoli Pizzeria", cuisine: "Italian", rating: 4.4, etaMinutes: 20, deliveryFee: 1.99, priceLevel: 1 },
];

export const menuItems: MenuItem[] = [
  { id: "m1", restaurantId: "r1", category: "Popular", name: "Butter Chicken", description: "Creamy tomato curry, tender chicken, basmati rice.", price: 14.99 },
  { id: "m2", restaurantId: "r1", category: "Popular", name: "Chana Masala", description: "Chickpeas simmered with onion, tomato, and spices.", price: 11.49 },
  { id: "m3", restaurantId: "r1", category: "Sides", name: "Garlic Naan", description: "Fresh-baked naan brushed with garlic butter.", price: 3.49 },
  { id: "m4", restaurantId: "r1", category: "Drinks", name: "Mango Lassi", description: "Chilled yogurt drink blended with mango.", price: 4.25 },
  { id: "m5", restaurantId: "r2", category: "Popular", name: "Salmon Avocado Roll", description: "Fresh salmon, avocado, seasoned rice, nori.", price: 9.95 },
  { id: "m6", restaurantId: "r2", category: "Popular", name: "Spicy Tuna Roll", description: "Spicy tuna, cucumber, sesame, house chili mayo.", price: 10.5 },
  { id: "m7", restaurantId: "r2", category: "Bowls", name: "Chicken Teriyaki Bowl", description: "Teriyaki chicken, rice, broccoli, pickled ginger.", price: 13.75 },
  { id: "m8", restaurantId: "r2", category: "Sides", name: "Miso Soup", description: "Classic miso with tofu, scallion, wakame.", price: 2.99 },
  { id: "m9", restaurantId: "r3", category: "Pizza", name: "Margherita Pizza", description: "San Marzano tomato, mozzarella, basil, olive oil.", price: 12.99 },
  { id: "m10", restaurantId: "r3", category: "Pizza", name: "Pepperoni Pizza", description: "Mozzarella, pepperoni, house red sauce.", price: 14.49 },
  { id: "m11", restaurantId: "r3", category: "Pasta", name: "Penne Alfredo", description: "Creamy parmesan sauce, garlic, cracked pepper.", price: 13.25 },
  { id: "m12", restaurantId: "r3", category: "Dessert", name: "Tiramisu", description: "Espresso-soaked ladyfingers, mascarpone cream.", price: 6.5 },
];

export function getRestaurantById(id: string) {
  return restaurants.find((r) => r.id === id) ?? null;
}

export function getMenuForRestaurant(restaurantId: string) {
  return menuItems.filter((m) => m.restaurantId === restaurantId);
}
