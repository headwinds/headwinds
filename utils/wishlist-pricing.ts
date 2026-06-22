import type { WishlistItem } from "@/components/wishlists/types";

const categoryBasePrices: Record<string, number> = {
  "Air Monitors": 180,
  Art: 120,
  Audio: 320,
  Backyard: 160,
  "Board Games": 55,
  Books: 32,
  Calendar: 28,
  Cards: 45,
  "Chocolate & Mushroom": 38,
  "Cleaning & Aging": 26,
  Clothes: 90,
  "Coffee & Mushrooms": 42,
  "Computer Speakers": 95,
  Controller: 85,
  Cooking: 140,
  Desk: 260,
  "Drawing Tablet": 240,
  Drinking: 32,
  Fire: 115,
  "Focus Potions": 36,
  Food: 24,
  Games: 28,
  Garden: 130,
  "Gold Chains": 125,
  "Graphic Novels": 28,
  Headphones: 150,
  Hiking: 180,
  "Interactive Fiction": 20,
  Keyboards: 170,
  "Learning Cards": 65,
  Longboard: 210,
  "Mac Accessories": 95,
  "Mac Mini": 799,
  "MacBook Pro Bags": 125,
  "MacBook Stands": 85,
  Magazines: 18,
  Maps: 45,
  Misc: 60,
  "Non-fiction": 34,
  Noodles: 18,
  Notebooks: 28,
  Pants: 115,
  Plants: 95,
  Poncho: 80,
  Projectors: 240,
  Sauce: 15,
  Shirts: 65,
  Smartwatch: 85,
  Socks: 22,
  "Space Heater": 110,
  Sweatshirts: 95,
  TTRPG: 55,
  Toys: 45,
  Trackers: 35,
  Ultimate: 999,
  VR: 130,
  Vacuums: 180,
  "Wall Photos": 75,
  Wallets: 80,
  "Watercolor Paper": 35,
  Webcam: 120,
  Whisky: 90,
  Wine: 160,
  eBooks: 15,
  iPad: 160,
  "iPad/iPhone Stand": 65,
};

function hashText(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index++) {
    hash = value.charCodeAt(index) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function getWishlistItemPrice(item: WishlistItem): number {
  if (typeof item.price === "number" && item.price > 0) {
    return item.price;
  }

  const basePrice = categoryBasePrices[item.category] ?? 50;
  const variation = (hashText(item.id) % 7) * 5;
  const price = item.status === "purchased" ? Math.round(basePrice * 0.8) : basePrice + variation;

  return Math.max(5, price);
}

export function formatWishlistPrice(price: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}
