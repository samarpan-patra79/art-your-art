import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { GallerySection } from "@/components/GallerySection";
import { ShopView } from "@/components/ShopView";
import { ProductDetail } from "@/components/ProductDetail";
import { CartSheet } from "@/components/CartSheet";
import { OrderHistory } from "@/components/OrderHistory";
import { products as initialProducts, initialOrders, Product, Order, Review } from "@/data/products";

export type View = "home" | "shop" | "product" | "orders";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Filters {
  search: string;
  category: "All" | "Bouquets" | "Phone Covers" | "Portraits";
  priceRange: [number, number];
  bouquetTypes: string[];
  phoneModel: string;
  portraitSizes: string[];
}

function AppContent() {
  const { toast } = useToast();

  const [view, setView] = useState<View>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [productList, setProductList] = useState<Product[]>(initialProducts);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "All",
    priceRange: [0, 5000],
    bouquetTypes: [],
    phoneModel: "",
    portraitSizes: [],
  });

  const navigateTo = (v: View, product?: Product, category?: Filters["category"]) => {
    if (product) setSelectedProduct(product);
    if (category) setFilters(f => ({ ...f, category }));
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
    toast({ title: "Added to cart", description: `${product.name} added to your cart.` });
  };

  const buyNow = (product: Product) => {
    addToCart(product);
    setCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(i => i.product.id === productId ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  const checkout = () => {
    if (cartItems.length === 0) return;
    const total = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const newOrder: Order = {
      id: `#${1025 + orders.filter(o => !initialOrders.includes(o)).length}`,
      name: cartItems.length === 1 ? cartItems[0].product.name : `${cartItems.length} items`,
      status: "Processing",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      amount: `₹${total.toLocaleString("en-IN")}`,
    };
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setCartOpen(false);
    toast({ title: "Order placed!", description: "Your order has been placed successfully." });
  };

  const addReview = (productId: string, review: Omit<Review, "id">) => {
    setProductList(prev =>
      prev.map(p =>
        p.id === productId
          ? {
              ...p,
              reviewList: [
                { ...review, id: `rev-${Date.now()}` },
                ...p.reviewList,
              ],
              reviews: p.reviews + 1,
            }
          : p
      )
    );
    if (selectedProduct?.id === productId) {
      setSelectedProduct(prev =>
        prev
          ? {
              ...prev,
              reviewList: [{ ...review, id: `rev-${Date.now()}` }, ...prev.reviewList],
              reviews: prev.reviews + 1,
            }
          : prev
      );
    }
  };

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar
          cartCount={cartCount}
          currentView={view}
          onNavigate={navigateTo}
          onCartOpen={() => setCartOpen(true)}
        />

        <main>
          {view === "home" && (
            <>
              <HeroSection onShopClick={() => navigateTo("shop")} />
              <GallerySection onViewCollection={(cat) => navigateTo("shop", undefined, cat as Filters["category"])} />
            </>
          )}

          {view === "shop" && (
            <ShopView
              products={productList}
              filters={filters}
              setFilters={setFilters}
              likedProducts={likedProducts}
              onToggleLike={toggleLike}
              onAddToCart={addToCart}
              onViewProduct={(p) => navigateTo("product", p)}
            />
          )}

          {view === "product" && selectedProduct && (
            <ProductDetail
              product={productList.find(p => p.id === selectedProduct.id) ?? selectedProduct}
              liked={likedProducts.has(selectedProduct.id)}
              onToggleLike={() => toggleLike(selectedProduct.id)}
              onAddToCart={addToCart}
              onBuyNow={buyNow}
              onBack={() => navigateTo("shop")}
              onAddReview={addReview}
            />
          )}

          {view === "orders" && (
            <OrderHistory orders={orders} />
          )}
        </main>

        <CartSheet
          open={cartOpen}
          onOpenChange={setCartOpen}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onCheckout={checkout}
          onContinueShopping={() => setCartOpen(false)}
        />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default function App() {
  return <AppContent />;
}
