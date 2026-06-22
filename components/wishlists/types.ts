export interface WishlistItem {
  id: string;
  name: string;
  url: string;
  image: string;
  category: string;
  price?: number;
  status: "active" | "purchased";
  notes?: string;
}
