"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import PageShell from "@/components/layout/PageShell";
import { wishlistItems, wishlistCategories } from "./wishlists-data";
import { useFilterMetrics } from "@/hooks/useFilterMetrics";
import {
  CheckCircle,
  ClipboardText,
  ShoppingCartSimple,
  WarningCircle,
  X,
} from "@phosphor-icons/react/dist/ssr";
import {
  useWishlistCartStore,
  WISHLIST_BUDGET,
} from "@/stores/wishlist-cart-store";
import {
  formatWishlistPrice,
  getWishlistItemPrice,
} from "@/utils/wishlist-pricing";
import type { WishlistItem } from "./types";

const pastelColors = ["#C3DED8", "#C4CFDE", "#D5DCBA", "#E8D5C4"];

const VISIBLE_CHIP_COUNT = 8;

type CartToast = {
  itemName: string;
  remaining: number;
  itemCount: number;
};

type BudgetHelper = {
  kind: "item" | "cart";
  itemName: string;
  itemPrice: number;
  remaining: number;
  overBy: number;
};

type SubmitStatus = "idle" | "submitting" | "submitted" | "error";

const topCategories = (() => {
  const counts = new Map<string, number>();
  for (const item of wishlistItems) {
    counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([cat]) => cat);
})();

function getColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return pastelColors[Math.abs(hash) % pastelColors.length];
}

function getInitials(name: string): string {
  return name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const ItemCard = ({
  item,
  inCart,
  price,
  onToggleCart,
}: {
  item: WishlistItem;
  inCart: boolean;
  price: number;
  onToggleCart: (itemId: string) => void;
}) => {
  const hasImage = item.image && !item.image.endsWith("/favicon.ico");
  const bgColor = getColor(item.id);
  const [imgFailed, setImgFailed] = useState(false);

  const handleCopyName = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    await navigator.clipboard.writeText(item.name);
  };

  const handleToggleCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onToggleCart(item.id);
  };

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col bg-[#F3EBE2] rounded-2xl overflow-hidden no-underline transition-shadow hover:shadow-lg"
    >
      {/* Image / Placeholder */}
      <div className="relative w-full h-44 overflow-hidden">
        {hasImage && !imgFailed ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105 rounded-[18px]"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-2xl font-bold"
            style={{ backgroundColor: bgColor }}
          >
            {getInitials(item.name)}
          </div>
        )}
        {item.status === "purchased" && (
          <div className="absolute top-3 left-3 bg-[#1A1A1A] text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            Owned
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-full p-1.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
          >
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-[#1A1A1A] leading-tight truncate m-0">
            {item.name}
          </h3>
          <button
            type="button"
            aria-label={`Copy ${item.name}`}
            title="Copy item name"
            onClick={handleCopyName}
            className="shrink-0 rounded-md p-1 text-[#6B6B6B] transition-colors hover:bg-[#EAE3DA] hover:text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C3DED8]"
            style={{height: 28, width: 28}}
          >
            <ClipboardText size={14} weight="regular" />
          </button>
        </div>
       
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="text-sm font-medium tabular-nums text-[#1A1A1A]">
            {formatWishlistPrice(price)}
          </span>
           <span
          className="text-[11px] px-2.5 py-0.5 rounded-full w-fit"
          style={{ backgroundColor: bgColor, color: "#1A1A1A" }}
        >
          {item.category}
        </span>
        {item.notes && (
          <p className="text-xs text-[#6B6B6B] truncate m-0">{item.notes}</p>
        )}
          <button
            type="button"
            aria-label={inCart ? `Remove ${item.name} from cart` : `Add ${item.name} to cart`}
            title={inCart ? "Remove from cart" : "Add to cart"}
            onClick={handleToggleCart}
            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#C3DED8] ${
              inCart
                ? "bg-[#1A1A1A] text-[#F3EBE2] hover:bg-[#333333]"
                : "bg-white text-[#1A1A1A] hover:bg-[#EAE3DA]"
            }`}
          >
            {inCart ? (
              <CheckCircle size={17} weight="fill" />
            ) : (
              <ShoppingCartSimple size={17} weight="regular" />
            )}
          </button>
        </div>
      </div>
    </a>
  );
};

const WishlistPage = () => {
  const pageHeaderRef = useRef<HTMLDivElement | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [showAllChips, setShowAllChips] = useState(false);
  const [chipPage, setChipPage] = useState(0);
  const [cartToast, setCartToast] = useState<CartToast | null>(null);
  const [budgetHelper, setBudgetHelper] = useState<BudgetHelper | null>(null);
  const [filterAffordableOnly, setFilterAffordableOnly] = useState(false);
  const [overBudgetCartWarningDismissed, setOverBudgetCartWarningDismissed] =
    useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [showFloatingCartBar, setShowFloatingCartBar] = useState(false);
  const [cartListOpen, setCartListOpen] = useState(false);
  const { track } = useFilterMetrics("wishlist");
  const cartItemIds = useWishlistCartStore((state) => state.itemIds);
  const addItem = useWishlistCartStore((state) => state.addItem);
  const removeItem = useWishlistCartStore((state) => state.removeItem);
  const clearCart = useWishlistCartStore((state) => state.clearCart);
  const budgetReachedEventSent = useWishlistCartStore(
    (state) => state.budgetReachedEventSent
  );
  const markBudgetReachedEventSent = useWishlistCartStore(
    (state) => state.markBudgetReachedEventSent
  );

  const priceByItemId = useMemo(() => {
    return new Map(
      wishlistItems.map((item) => [item.id, getWishlistItemPrice(item)])
    );
  }, []);

  const cartItems = useMemo(() => {
    const itemById = new Map(wishlistItems.map((item) => [item.id, item]));
    return cartItemIds
      .map((itemId) => itemById.get(itemId))
      .filter((item): item is WishlistItem => Boolean(item));
  }, [cartItemIds]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + (priceByItemId.get(item.id) ?? 0),
      0
    );
  }, [cartItems, priceByItemId]);

  const budgetRemaining = Math.max(WISHLIST_BUDGET - cartTotal, 0);
  const budgetProgress = Math.min((cartTotal / WISHLIST_BUDGET) * 100, 100);
  const cartCanSubmit = cartItems.length > 0 && cartTotal <= WISHLIST_BUDGET;
  const showCartCommandBar = cartItems.length > 0 && (showFloatingCartBar || Boolean(budgetHelper));

  const cartPayload = useMemo(
    () => ({
      total: cartTotal,
      budget: WISHLIST_BUDGET,
      itemCount: cartItems.length,
      remaining: budgetRemaining,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: priceByItemId.get(item.id) ?? 0,
      })),
    }),
    [budgetRemaining, cartItems, cartTotal, priceByItemId]
  );

  const affordableItemsCount = useMemo(() => {
    return wishlistItems.filter((item) => {
      return (
        !cartItemIds.includes(item.id) &&
        (priceByItemId.get(item.id) ?? 0) <= budgetRemaining
      );
    }).length;
  }, [budgetRemaining, cartItemIds, priceByItemId]);

  const CHIPS_PER_PAGE = 50;
  const totalChipPages = Math.ceil(topCategories.length / CHIPS_PER_PAGE);
  const pagedChips = showAllChips
    ? topCategories.slice(chipPage * CHIPS_PER_PAGE, (chipPage + 1) * CHIPS_PER_PAGE)
    : topCategories.slice(0, VISIBLE_CHIP_COUNT);

  const handleCategoryChange = (category: string) => {
    track(category);
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      const isSelected = selectedCategories.includes(category);
      const next = isSelected
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories.filter((c) => c !== "All"), category];
      setSelectedCategories(next.length === 0 ? ["All"] : next);
    }
  };

  const handleToggleCart = (itemId: string) => {
    setSubmitStatus("idle");

    if (cartItemIds.includes(itemId)) {
      removeItem(itemId);
      return;
    }

    const item = wishlistItems.find((wishlistItem) => wishlistItem.id === itemId);
    if (!item) {
      return;
    }

    const itemPrice = priceByItemId.get(itemId) ?? 0;
    const nextTotal = cartTotal + itemPrice;

    if (nextTotal > WISHLIST_BUDGET) {
      setCartToast(null);
      setBudgetHelper({
        kind: "item",
        itemName: item.name,
        itemPrice,
        remaining: budgetRemaining,
        overBy: nextTotal - WISHLIST_BUDGET,
      });
      return;
    }

    addItem(itemId);

    setCartToast({
      itemName: item.name,
      remaining: Math.max(WISHLIST_BUDGET - nextTotal, 0),
      itemCount: cartItemIds.length + 1,
    });
  };

  const handleRemoveCartItem = (itemId: string) => {
    removeItem(itemId);
    setSubmitStatus("idle");
  };

  const showAffordableItems = () => {
    setFilterAffordableOnly(true);
    setSearchQuery("");
    setSelectedCategories(["All"]);
  };

  const clearAffordableFilter = () => {
    setFilterAffordableOnly(false);
  };

  const handleClearCart = () => {
    clearCart();
    setSubmitStatus("idle");
    setBudgetHelper(null);
    setFilterAffordableOnly(false);
    setCartListOpen(false);
  };

  const closeBudgetHelper = () => {
    setBudgetHelper(null);

    if (cartTotal > WISHLIST_BUDGET) {
      setOverBudgetCartWarningDismissed(true);
    }
  };

  const handleSubmitCart = async () => {
    if (cartItems.length === 0 || submitStatus === "submitting") {
      return;
    }

    if (cartTotal > WISHLIST_BUDGET) {
      setBudgetHelper({
        kind: "cart",
        itemName: "Your current cart",
        itemPrice: cartTotal,
        remaining: 0,
        overBy: cartTotal - WISHLIST_BUDGET,
      });
      return;
    }

    setSubmitStatus("submitting");

    try {
      const response = await fetch("/api/wishlist/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartPayload),
      });

      if (!response.ok) {
        throw new Error("Cart submission failed");
      }

      setSubmitStatus("submitted");
      setCartToast(null);
    } catch {
      setSubmitStatus("error");
    }
  };

  useEffect(() => {
    const updateFloatingCartBar = () => {
      const pageHeader = pageHeaderRef.current;

      if (!pageHeader) {
        setShowFloatingCartBar(false);
        return;
      }

      setShowFloatingCartBar(pageHeader.getBoundingClientRect().bottom < 0);
    };

    updateFloatingCartBar();
    window.addEventListener("scroll", updateFloatingCartBar, { passive: true });
    window.addEventListener("resize", updateFloatingCartBar);

    return () => {
      window.removeEventListener("scroll", updateFloatingCartBar);
      window.removeEventListener("resize", updateFloatingCartBar);
    };
  }, []);

  useEffect(() => {
    if (!cartToast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCartToast(null);
    }, 2600);

    return () => window.clearTimeout(timeoutId);
  }, [cartToast]);

  useEffect(() => {
    if (cartItems.length === 0) {
      setCartListOpen(false);
    }
  }, [cartItems.length]);

  useEffect(() => {
    if (cartTotal <= WISHLIST_BUDGET) {
      setOverBudgetCartWarningDismissed(false);

      if (budgetHelper?.kind === "cart") {
        setBudgetHelper(null);
      }

      return;
    }

    if (budgetHelper || overBudgetCartWarningDismissed) {
      return;
    }

    setBudgetHelper({
      kind: "cart",
      itemName: "Your current cart",
      itemPrice: cartTotal,
      remaining: 0,
      overBy: cartTotal - WISHLIST_BUDGET,
    });
  }, [budgetHelper, cartTotal, overBudgetCartWarningDismissed]);

  useEffect(() => {
    if (cartTotal < WISHLIST_BUDGET || budgetReachedEventSent) {
      return;
    }

    const payload = cartPayload;

    fetch("/api/wishlist/budget-reached", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          markBudgetReachedEventSent();
        }
      })
      .catch(() => {
        // Shopping should not block on analytics.
      });
  }, [
    budgetReachedEventSent,
    cartPayload,
    cartTotal,
    markBudgetReachedEventSent,
  ]);

  const filtered = wishlistItems.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === "" ||
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      (item.notes && item.notes.toLowerCase().includes(q));

    const matchesCategory =
      selectedCategories.includes("All") ||
      selectedCategories.includes(item.category);

    const matchesBudget =
      !filterAffordableOnly ||
      (!cartItemIds.includes(item.id) &&
        (priceByItemId.get(item.id) ?? 0) <= budgetRemaining);

    return matchesSearch && matchesCategory && matchesBudget;
  });

  return (
    <PageShell>
      {showCartCommandBar && (
        <>
          <style>{`
            @keyframes wishlistBudgetHelperIn {
              from { opacity: 0; transform: translate(-50%, -22px); }
              to { opacity: 1; transform: translate(-50%, 0); }
            }
          `}</style>
          <div
            role={budgetHelper ? "alert" : "status"}
            aria-live={budgetHelper ? "assertive" : "polite"}
            className="fixed top-4 z-50 w-[calc(100vw-32px)] max-w-3xl rounded-2xl border border-[#D8C998] bg-[#F3EBE2] p-4 text-[#1A1A1A] shadow-2xl"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              animation: "wishlistBudgetHelperIn 220ms ease-out",
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex min-w-0 gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#C9A962] text-[#1A1A1A]">
                    {budgetHelper ? (
                      <WarningCircle size={20} weight="fill" />
                    ) : (
                      <ShoppingCartSimple size={20} weight="fill" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="m-0 text-sm font-medium">
                      {budgetHelper
                        ? budgetHelper.kind === "cart"
                          ? "Your cart is over budget."
                          : "That item would go over budget."
                        : `${cartItems.length} selected · ${formatWishlistPrice(cartTotal)}`}
                    </p>
                    <p className="m-0 mt-1 text-sm leading-relaxed text-[#3D3D3D]">
                      {budgetHelper
                        ? budgetHelper.kind === "cart"
                          ? `${budgetHelper.itemName} totals ${formatWishlistPrice(budgetHelper.itemPrice)}, which is ${formatWishlistPrice(budgetHelper.overBy)} over the budget.`
                          : `${budgetHelper.itemName} costs ${formatWishlistPrice(budgetHelper.itemPrice)}, which puts you ${formatWishlistPrice(budgetHelper.overBy)} over. You have ${formatWishlistPrice(budgetHelper.remaining)} left.`
                        : `${formatWishlistPrice(budgetRemaining)} remaining before you submit.`}
                    </p>
                    {filterAffordableOnly && (
                      <p className="m-0 mt-2 text-xs text-[#6B6B6B]">
                        Showing {affordableItemsCount} items priced at {formatWishlistPrice(budgetRemaining)} or less.
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2 md:justify-end">
                  <button
                    type="button"
                    onClick={() => setCartListOpen((isOpen) => !isOpen)}
                    aria-expanded={cartListOpen}
                    className="rounded-lg border border-[#D5CEC6] bg-white px-3 py-2 text-xs font-medium text-[#1A1A1A] transition-colors hover:bg-[#EAE3DA]"
                  >
                    {cartListOpen ? "Hide" : "View cart"}
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitCart}
                    disabled={
                      !cartCanSubmit ||
                      submitStatus === "submitting" ||
                      submitStatus === "submitted"
                    }
                    className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                      cartCanSubmit && submitStatus !== "submitting" && submitStatus !== "submitted"
                        ? "bg-[#1A1A1A] text-[#F3EBE2] hover:bg-[#333333]"
                        : "cursor-not-allowed bg-[#D5CEC6] text-[#6B6B6B]"
                    }`}
                  >
                    {submitStatus === "submitting"
                      ? "Submitting..."
                      : submitStatus === "submitted"
                        ? "Submitted"
                        : "Submit cart"}
                  </button>
                  {filterAffordableOnly ? (
                    <button
                      type="button"
                      onClick={clearAffordableFilter}
                      className="rounded-lg border border-[#D5CEC6] bg-white px-3 py-2 text-xs font-medium text-[#1A1A1A] transition-colors hover:bg-[#EAE3DA]"
                    >
                      Clear price filter
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={showAffordableItems}
                      className="rounded-lg border border-[#D5CEC6] bg-white px-3 py-2 text-xs font-medium text-[#1A1A1A] transition-colors hover:bg-[#EAE3DA]"
                    >
                      Under {formatWishlistPrice(budgetRemaining)}
                    </button>
                  )}
                  {budgetHelper && (
                    <button
                      type="button"
                      aria-label="Close budget helper"
                      onClick={closeBudgetHelper}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B6B6B] transition-colors hover:bg-[#EAE3DA] hover:text-[#1A1A1A]"
                    >
                      <X size={16} weight="bold" />
                    </button>
                  )}
                </div>
              </div>
              {cartListOpen && (
                <div className="max-h-72 overflow-y-auto rounded-xl border border-[#D5CEC6] bg-white p-2">
                  <ul className="m-0 flex list-none flex-col gap-1 p-0">
                    {cartItems.map((item) => {
                      const itemPrice = priceByItemId.get(item.id) ?? 0;

                      return (
                        <li
                          key={item.id}
                          className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-[#1A1A1A] hover:bg-[#F3EBE2]"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="m-0 truncate font-medium">{item.name}</p>
                            <p className="m-0 mt-0.5 truncate text-xs text-[#6B6B6B]">
                              {item.category}
                            </p>
                          </div>
                          <span className="shrink-0 text-xs font-medium tabular-nums text-[#3D3D3D]">
                            {formatWishlistPrice(itemPrice)}
                          </span>
                          <button
                            type="button"
                            aria-label={`Remove ${item.name} from cart`}
                            onClick={() => handleRemoveCartItem(item.id)}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#6B6B6B] transition-colors hover:bg-[#EAE3DA] hover:text-[#1A1A1A]"
                          >
                            <X size={13} weight="bold" />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Page Header */}
      <div
        ref={pageHeaderRef}
        className="bg-[#F3EBE2] rounded-2xl px-8 md:px-12 py-10 md:py-12 flex flex-col gap-4"
      >
        <span className="text-xs font-medium text-[#6B6B6B] tracking-[3px] uppercase">
          Wishlist
        </span>
        <h1 className="text-3xl md:text-5xl text-[#1A1A1A] m-0 -tracking-wide font-normal">
          Studio Wishlist
        </h1>
        <p className="text-[17px] text-[#3D3D3D] leading-relaxed m-0 max-w-3xl">
          Working in eCommerce & Logistics has given me a front-row seat to the tools, software, and services that power the modern supply chain. This is a curated list of the products and services I find most interesting, useful, or just plain cool.{" "}
   
        </p>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl px-8 md:px-12 py-6 flex flex-col gap-5 text-[#F3EBE2] md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-medium tracking-[3px] uppercase text-[#AAAAAA]">
            Studio cart challenge
          </span>
          <h2 className="text-2xl md:text-3xl font-normal leading-tight m-0">
            You have {formatWishlistPrice(WISHLIST_BUDGET)} to spend.
          </h2>
          <p className="text-sm leading-relaxed text-[#AAAAAA] m-0 max-w-2xl">
            Add items to your virtual cart and see what kind of studio kit you build before the budget runs out.
          </p>
        </div>
        <div className="w-full md:w-[320px] rounded-2xl bg-[#2A2A2A] p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-[#AAAAAA]">Cart total</span>
            <span className="text-xl font-medium tabular-nums text-[#F3EBE2]">
              {formatWishlistPrice(cartTotal)}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#444444]">
            <div
              className="h-full rounded-full bg-[#C9A962] transition-[width] duration-300"
              style={{ width: `${budgetProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-between gap-3 text-xs text-[#AAAAAA]">
            <span>{cartItems.length} selected</span>
            <span>
              {cartTotal >= WISHLIST_BUDGET
                ? "Budget reached"
                : `${formatWishlistPrice(budgetRemaining)} left`}
            </span>
          </div>
          {cartItems.length > 0 && (
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleSubmitCart}
                disabled={
                  !cartCanSubmit ||
                  submitStatus === "submitting" ||
                  submitStatus === "submitted"
                }
                className={`inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A962] ${
                  cartCanSubmit && submitStatus !== "submitting" && submitStatus !== "submitted"
                    ? "bg-[#C9A962] text-[#1A1A1A] hover:bg-[#D8BE72]"
                    : "cursor-not-allowed bg-[#444444] text-[#AAAAAA]"
                }`}
              >
                {submitStatus === "submitting"
                  ? "Submitting..."
                  : submitStatus === "submitted"
                    ? "Cart submitted"
                    : "Submit cart"}
              </button>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleClearCart}
                  className="w-fit rounded-lg border border-[#555555] bg-transparent px-3 py-1.5 text-xs text-[#F3EBE2] transition-colors hover:border-[#F3EBE2]"
                >
                  Clear cart
                </button>
                <span className="text-xs text-[#AAAAAA]">
                  {submitStatus === "submitted"
                    ? "Thanks for helping collect data."
                    : submitStatus === "error"
                      ? "Submission failed. Try again."
                      : cartCanSubmit
                        ? `${formatWishlistPrice(budgetRemaining)} left when submitted.`
                        : "Remove items to submit."}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="bg-[#F3EBE2] rounded-2xl px-8 py-5 flex items-center gap-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6B6B6B"
          strokeWidth="2"
          className="shrink-0"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder={`Search ${wishlistItems.length} items...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white rounded-lg h-10 px-3 text-sm text-[#1A1A1A] placeholder:text-[#AAAAAA] border-0 outline-none focus:ring-2 focus:ring-[#C3DED8]"
        />
        {filterAffordableOnly && (
          <button
            type="button"
            onClick={clearAffordableFilter}
            className="hidden shrink-0 rounded-lg bg-[#1A1A1A] px-3 py-2 text-xs font-medium text-[#F3EBE2] transition-colors hover:bg-[#333333] md:inline-flex"
          >
            Under {formatWishlistPrice(budgetRemaining)}
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="bg-[#F3EBE2] rounded-2xl px-8 py-4 flex flex-col gap-3">
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => handleCategoryChange("All")}
            className={`h-8 px-4 rounded-full text-[13px] border-0 cursor-pointer transition-colors ${
              selectedCategories.includes("All")
                ? "bg-[#1A1A1A] text-white font-medium"
                : "bg-white text-[#3D3D3D] border border-[#D0D0D0]"
            }`}
          >
            All
          </button>
          {pagedChips.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`h-8 px-4 rounded-full text-[13px] border-0 cursor-pointer transition-colors ${
                selectedCategories.includes(cat)
                  ? "bg-[#1A1A1A] text-white font-medium"
                  : "bg-white text-[#3D3D3D]"
              }`}
              style={
                !selectedCategories.includes(cat)
                  ? { border: "1px solid #D0D0D0" }
                  : undefined
              }
            >
              {cat}
            </button>
          ))}
          {!showAllChips && topCategories.length > VISIBLE_CHIP_COUNT && (
            <button
              onClick={() => { setShowAllChips(true); setChipPage(0); }}
              className="h-8 px-4 rounded-full text-[13px] text-[#6B6B6B] hover:text-[#1A1A1A] border border-dashed border-[#C5BEB6] bg-transparent cursor-pointer transition-colors"
            >
              +{topCategories.length - VISIBLE_CHIP_COUNT} more
            </button>
          )}
        </div>

        {/* Pagination controls when expanded */}
        {showAllChips && (
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => { setShowAllChips(false); setChipPage(0); }}
              className="text-[13px] text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors cursor-pointer bg-transparent border-0 p-0"
            >
              ← Show less
            </button>
            {totalChipPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setChipPage((p) => Math.max(0, p - 1))}
                  disabled={chipPage === 0}
                  className="w-8 h-8 rounded-full border border-[#D5CEC6] bg-white flex items-center justify-center text-[#6B6B6B] hover:text-[#1A1A1A] disabled:opacity-30 cursor-pointer disabled:cursor-default transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <span className="text-[13px] text-[#6B6B6B] tabular-nums">
                  {chipPage + 1} / {totalChipPages}
                </span>
                <button
                  onClick={() => setChipPage((p) => Math.min(totalChipPages - 1, p + 1))}
                  disabled={chipPage === totalChipPages - 1}
                  className="w-8 h-8 rounded-full border border-[#D5CEC6] bg-white flex items-center justify-center text-[#6B6B6B] hover:text-[#1A1A1A] disabled:opacity-30 cursor-pointer disabled:cursor-default transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="bg-[#F3EBE2] rounded-2xl px-8 py-3">
        <span className="text-sm text-[#6B6B6B]">
          Showing {filtered.length} {filtered.length === 1 ? "item" : "items"}
          {filterAffordableOnly
            ? ` under ${formatWishlistPrice(budgetRemaining)}`
            : ""}
          {cartItems.length > 0
            ? ` · ${cartItems.length} in cart · ${formatWishlistPrice(cartTotal)}`
            : ""}
        </span>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5">
        {filtered.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            inCart={cartItemIds.includes(item.id)}
            price={priceByItemId.get(item.id) ?? 0}
            onToggleCart={handleToggleCart}
          />
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="bg-[#F3EBE2] rounded-2xl px-12 py-16 text-center">
          <p className="text-[#6B6B6B] text-base m-0">
            No items found. Try adjusting your search or filters.
          </p>
        </div>
      )}

      {cartToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 w-[calc(100vw-40px)] max-w-sm rounded-2xl bg-[#1A1A1A] p-4 text-[#F3EBE2] shadow-2xl animate-[scaleIn_180ms_ease-out]"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#C9A962] text-[#1A1A1A]">
              <ShoppingCartSimple size={18} weight="fill" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="m-0 truncate text-sm font-medium">
                Added {cartToast.itemName}
              </p>
              <p className="m-0 mt-1 text-xs leading-relaxed text-[#AAAAAA]">
                {cartToast.itemCount} items selected · {formatWishlistPrice(cartToast.remaining)} remaining
              </p>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
};

export default WishlistPage;
