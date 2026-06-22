import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistCartState = {
  itemIds: string[];
  budgetReachedEventSent: boolean;
  addItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  markBudgetReachedEventSent: () => void;
};

export const WISHLIST_BUDGET = 1000;

export const useWishlistCartStore = create<WishlistCartState>()(
  persist(
    (set) => ({
      itemIds: [],
      budgetReachedEventSent: false,
      addItem: (itemId) =>
        set((state) => ({
          itemIds: state.itemIds.includes(itemId)
            ? state.itemIds
            : [...state.itemIds, itemId],
        })),
      removeItem: (itemId) =>
        set((state) => ({
          itemIds: state.itemIds.filter((currentId) => currentId !== itemId),
        })),
      clearCart: () => set({ itemIds: [], budgetReachedEventSent: false }),
      markBudgetReachedEventSent: () => set({ budgetReachedEventSent: true }),
    }),
    {
      name: "headwinds-wishlist-cart-v1",
    }
  )
);
