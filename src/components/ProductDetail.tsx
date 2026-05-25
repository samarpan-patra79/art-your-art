import { useState } from "react";
import { ArrowLeft, Heart, Share2, ShoppingCart, Truck, CheckCircle, AlertCircle, XCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/StarRating";
import { ReviewSection } from "@/components/ReviewSection";
import { Product, Review } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface ProductDetailProps {
  product: Product;
  liked: boolean;
  onToggleLike: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
  onBack: () => void;
  onAddReview: (productId: string, review: Omit<Review, "id">) => void;
}

const stockIcons = {
  "In Stock": <CheckCircle className="w-4 h-4 text-green-600" />,
  "Limited Stock": <AlertCircle className="w-4 h-4 text-amber-600" />,
  "Out of Stock": <XCircle className="w-4 h-4 text-red-500" />,
};

const stockColors = {
  "In Stock": "text-green-600",
  "Limited Stock": "text-amber-600",
  "Out of Stock": "text-red-500",
};

const detailGradients: Record<string, string> = {
  Bouquets: "linear-gradient(135deg, hsl(0 60% 92%) 0%, hsl(22 70% 88%) 50%, hsl(38 60% 90%) 100%)",
  "Phone Covers": "linear-gradient(135deg, hsl(220 60% 92%) 0%, hsl(260 50% 92%) 50%, hsl(200 60% 92%) 100%)",
  Portraits: "linear-gradient(135deg, hsl(38 60% 90%) 0%, hsl(30 55% 87%) 50%, hsl(22 50% 90%) 100%)",
};

export function ProductDetail({
  product,
  liked,
  onToggleLike,
  onAddToCart,
  onBuyNow,
  onBack,
  onAddReview,
}: ProductDetailProps) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = product.stock === "Out of Stock";

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied!", description: "Product link copied to clipboard." });
    } catch {
      toast({ title: "Shared!", description: "Product link ready to share." });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="product-detail">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors group"
        data-testid="back-button"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Product image */}
        <div
          className="rounded-2xl overflow-hidden flex items-center justify-center min-h-80 relative"
          style={{ background: detailGradients[product.category] }}
          data-testid="product-image"
        >
          {/* Decorative blobs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-6 left-6 w-24 h-24 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, hsl(22 40% 55%), transparent)" }} />
            <div className="absolute bottom-6 right-6 w-32 h-32 rounded-full opacity-15"
              style={{ background: "radial-gradient(circle, hsl(120 15% 62%), transparent)" }} />
          </div>
          <span
            className="text-9xl select-none relative z-10"
            style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.1))" }}
            aria-hidden="true"
          >
            {product.emoji}
          </span>
        </div>

        {/* Product info */}
        <div className="flex flex-col" data-testid="product-info">
          {/* Category + social */}
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="text-xs">{product.category}</Badge>
            <div className="flex items-center gap-2">
              <button
                onClick={onToggleLike}
                className={`p-2 rounded-full border transition-all hover:scale-110 ${
                  liked ? "bg-rose-50 border-rose-200 text-rose-500" : "border-border text-muted-foreground hover:text-foreground"
                }`}
                aria-label={liked ? "Unlike" : "Like"}
                data-testid="like-button"
              >
                <Heart className={`w-4 h-4 ${liked ? "fill-rose-500" : ""}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                aria-label="Share"
                data-testid="share-button"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-3xl font-bold text-foreground mb-2 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
            data-testid="product-title"
          >
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={Math.round(product.rating)} />
            <span className="text-sm font-medium text-foreground">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div
            className="text-4xl font-bold text-primary mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
            data-testid="product-price"
          >
            ₹{product.price.toLocaleString("en-IN")}
          </div>

          {/* Stock */}
          <div className={`flex items-center gap-1.5 mb-5 text-sm font-medium ${stockColors[product.stock]}`} data-testid="product-stock">
            {stockIcons[product.stock]}
            {product.stock}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed mb-6 text-sm" data-testid="product-description">
            {product.description}
          </p>

          {/* Materials */}
          <div className="mb-5">
            <div className="flex items-center gap-1.5 mb-2">
              <Package className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Materials Used</span>
            </div>
            <ul className="space-y-1">
              {product.materials.map((m, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery */}
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg mb-6 text-sm text-muted-foreground">
            <Truck className="w-4 h-4 text-primary shrink-0" />
            <span>Estimated delivery: <strong className="text-foreground">{product.delivery}</strong></span>
          </div>

          {/* Quantity + CTA */}
          {!isOutOfStock && (
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-2 text-lg font-medium hover:bg-muted transition-colors"
                  data-testid="quantity-decrease"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span
                  className="px-4 py-2 text-sm font-semibold border-x border-border min-w-[3rem] text-center"
                  data-testid="quantity-value"
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-2 text-lg font-medium hover:bg-muted transition-colors"
                  data-testid="quantity-increase"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-muted-foreground">Qty</span>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={() => { if (!isOutOfStock) { for (let i = 0; i < quantity; i++) onAddToCart(product); } }}
              disabled={isOutOfStock}
              data-testid="add-to-cart-button"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => { if (!isOutOfStock) { for (let i = 0; i < quantity; i++) onBuyNow(product); } }}
              disabled={isOutOfStock}
              data-testid="buy-now-button"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Review section */}
      <div className="border-t border-border pt-8">
        <ReviewSection
          productId={product.id}
          reviews={product.reviewList}
          avgRating={product.rating}
          onAddReview={onAddReview}
        />
      </div>
    </div>
  );
}
