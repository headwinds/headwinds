export interface WishlistItem {
  id: string;
  name: string;
  url: string;
  image: string;
  category: string;
  status: "active" | "purchased";
  notes?: string;
}
