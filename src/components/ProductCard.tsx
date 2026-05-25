import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/StarRating";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  liked: boolean;
  onToggleLike: () => void;
  onAddToCart: () => void;
  onViewProduct: () => void;
}

const categoryColors: Record<string, string> = {
  Bouquets: "bg-rose-100 text-rose-700 border-rose-200",
  "Phone Covers": "bg-blue-100 text-blue-700 border-blue-200",
  Portraits: "bg-amber-100 text-amber-700 border-amber-200",
};

const stockColors: Record<string, string> = {
  "In Stock": "text-green-600",
  "Limited Stock": "text-amber-600",
  "Out of Stock": "text-red-500",
};

const cardGradients: Record<string, string> = {
  Bouquets: "linear-gradient(135deg, hsl(0 60% 92%) 0%, hsl(22 70% 90%) 100%)",
  "Phone Covers": "linear-gradient(135deg, hsl(220 60% 92%) 0%, hsl(260 50% 92%) 100%)",
  Portraits: "linear-gradient(135deg, hsl(38 60% 90%) 0%, hsl(22 50% 90%) 100%)",
};

export function ProductCard({ product, liked, onToggleLike, onAddToCart, onViewProduct }: ProductCardProps) {
  const isOutOfStock = product.stock === "Out of Stock";

  return (
    <div
      className="group relative bg-card rounded-2xl border border-card-border shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 overflow-hidden flex flex-col"
      data-testid={`product-card-${product.id}`}
    >
      {/* Image area */}
      <div
        className="relative h-52 flex items-center justify-center cursor-pointer"
        style={{ background: cardGradients[product.category] }}
        onClick={onViewProduct}
      >
        <span
          className="text-8xl select-none transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        >
          {product.emoji}
        </span>

        {/* Like button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleLike(); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-all"
          aria-label={liked ? "Unlike" : "Like"}
          data-testid={`like-btn-${product.id}`}
        >
          <Heart
            className={`w-4 h-4 transition-colors ${liked ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}`}
          />
        </button>

        {/* Stock badge */}
        {product.stock !== "In Stock" && (
          <div className="absolute top-3 left-3">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm ${stockColors[product.stock]}`}
            >
              {product.stock}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            className="font-bold text-foreground text-base leading-snug cursor-pointer hover:text-primary transition-colors line-clamp-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
            onClick={onViewProduct}
            data-testid={`product-name-${product.id}`}
          >
            {product.name}
          </h3>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${categoryColors[product.category]}`}
          >
            {product.category}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={Math.round(product.rating)} />
          <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
        </div>

        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xl font-bold text-primary"
              style={{ fontFamily: "'Playfair Display', serif" }}
              data-testid={`product-price-${product.id}`}
            >
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className={`text-xs font-medium ${stockColors[product.stock]}`}>
              {product.stock}
            </span>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => !isOutOfStock && onAddToCart()}
              disabled={isOutOfStock}
              data-testid={`add-to-cart-btn-${product.id}`}
            >
              <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onViewProduct}
              className="px-3"
              aria-label="View details"
              data-testid={`view-details-btn-${product.id}`}
            >
              <Eye className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
