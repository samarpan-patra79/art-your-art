import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/data/products";
import { Filters } from "@/App";

interface ShopViewProps {
  products: Product[];
  filters: Filters;
  setFilters: (f: Filters | ((prev: Filters) => Filters)) => void;
  likedProducts: Set<string>;
  onToggleLike: (id: string) => void;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

const categories = ["All", "Bouquets", "Phone Covers", "Portraits"] as const;
const bouquetSubtypes = ["Flower Bouquet", "Chocolate Bouquet"];
const phoneModels = ["iPhone 15", "Samsung S24", "OnePlus 12", "Pixel 8"];
const portraitSizes = ["8x10", "A4", "A3", "12x18"];

export function ShopView({
  products,
  filters,
  setFilters,
  likedProducts,
  onToggleLike,
  onAddToCart,
  onViewProduct,
}: ShopViewProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleBouquetType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      bouquetTypes: prev.bouquetTypes.includes(type)
        ? prev.bouquetTypes.filter(t => t !== type)
        : [...prev.bouquetTypes, type],
    }));
  };

  const togglePortraitSize = (size: string) => {
    setFilters(prev => ({
      ...prev,
      portraitSizes: prev.portraitSizes.includes(size)
        ? prev.portraitSizes.filter(s => s !== size)
        : [...prev.portraitSizes, size],
    }));
  };

  const filtered = products.filter(p => {
    const matchSearch =
      !filters.search ||
      p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.category.toLowerCase().includes(filters.search.toLowerCase());
    const matchCat = filters.category === "All" || p.category === filters.category;
    const matchPrice = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1];

    let matchDynamic = true;
    if (p.category === "Bouquets" && filters.bouquetTypes.length > 0) {
      matchDynamic = filters.bouquetTypes.includes(p.subtype ?? "");
    }
    if (p.category === "Phone Covers" && filters.phoneModel && filters.phoneModel !== "all") {
      matchDynamic = p.phoneModel === filters.phoneModel;
    }
    if (p.category === "Portraits" && filters.portraitSizes.length > 0) {
      matchDynamic = filters.portraitSizes.includes(p.size ?? "");
    }

    return matchSearch && matchCat && matchPrice && matchDynamic;
  });

  const Sidebar = () => (
    <aside
      className="w-full space-y-6"
      data-testid="shop-sidebar"
    >
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={filters.search}
          onChange={e => updateFilter("search", e.target.value)}
          className="pl-9"
          data-testid="search-input"
        />
        {filters.search && (
          <button
            onClick={() => updateFilter("search", "")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            data-testid="search-clear"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category filter */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => updateFilter("category", cat as Filters["category"])}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                filters.category === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-muted-foreground hover:border-primary hover:text-foreground"
              }`}
              data-testid={`category-filter-${cat.toLowerCase().replace(/ /g, "-")}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Price Range: ₹{filters.priceRange[0].toLocaleString("en-IN")} – ₹{filters.priceRange[1].toLocaleString("en-IN")}
        </h3>
        <Slider
          min={0}
          max={5000}
          step={100}
          value={filters.priceRange}
          onValueChange={([min, max]) => updateFilter("priceRange", [min, max])}
          className="w-full"
          data-testid="price-range-slider"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>₹0</span>
          <span>₹5,000</span>
        </div>
      </div>

      {/* Dynamic filters — Bouquets */}
      {(filters.category === "All" || filters.category === "Bouquets") && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Bouquet Type</h3>
          <div className="space-y-2">
            {bouquetSubtypes.map(type => (
              <div key={type} className="flex items-center gap-2">
                <Checkbox
                  id={`bouquet-${type}`}
                  checked={filters.bouquetTypes.includes(type)}
                  onCheckedChange={() => toggleBouquetType(type)}
                  data-testid={`bouquet-type-${type.toLowerCase().replace(/ /g, "-")}`}
                />
                <label
                  htmlFor={`bouquet-${type}`}
                  className="text-sm text-foreground cursor-pointer"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic filters — Phone Covers */}
      {(filters.category === "All" || filters.category === "Phone Covers") && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Phone Model</h3>
          <Select
            value={filters.phoneModel || "all"}
            onValueChange={val => updateFilter("phoneModel", val === "all" ? "" : val)}
          >
            <SelectTrigger data-testid="phone-model-select">
              <SelectValue placeholder="All Models" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              {phoneModels.map(model => (
                <SelectItem key={model} value={model} data-testid={`phone-model-${model.replace(/ /g, "-")}`}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Dynamic filters — Portraits */}
      {(filters.category === "All" || filters.category === "Portraits") && (
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Canvas Size</h3>
          <div className="flex flex-wrap gap-2">
            {portraitSizes.map(size => (
              <button
                key={size}
                onClick={() => togglePortraitSize(size)}
                className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                  filters.portraitSizes.includes(size)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:border-primary"
                }`}
                data-testid={`portrait-size-${size.toLowerCase()}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear filters */}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() =>
          setFilters({
            search: "",
            category: "All",
            priceRange: [0, 5000],
            bouquetTypes: [],
            phoneModel: "",
            portraitSizes: [],
          })
        }
        data-testid="clear-filters-btn"
      >
        <X className="w-3.5 h-3.5 mr-1.5" />
        Clear All Filters
      </Button>
    </aside>
  );

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-testid="shop-view">
      {/* Mobile filter toggle */}
      <div className="flex items-center justify-between mb-6 md:hidden">
        <h2
          className="text-2xl font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Shop
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(o => !o)}
          data-testid="mobile-filter-toggle"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="md:hidden bg-card border border-border rounded-xl p-5 mb-6">
          <Sidebar />
        </div>
      )}

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 bg-card border border-border rounded-xl p-5">
            <h2
              className="text-lg font-bold text-foreground mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Filters
            </h2>
            <Sidebar />
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="hidden md:block text-2xl font-bold text-foreground"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {filters.category === "All" ? "All Products" : filters.category}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {filtered.length} {filtered.length === 1 ? "product" : "products"} found
              </p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="text-6xl mb-4" aria-hidden="true">🎨</span>
              <h3
                className="text-xl font-bold text-foreground mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                No products found
              </h3>
              <p className="text-muted-foreground text-sm">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  liked={likedProducts.has(product.id)}
                  onToggleLike={() => onToggleLike(product.id)}
                  onAddToCart={() => onAddToCart(product)}
                  onViewProduct={() => onViewProduct(product)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
