import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { CartItem } from "@/App";

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function CartSheet({
  open,
  onOpenChange,
  cartItems,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  onContinueShopping,
}: CartSheetProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0"
        data-testid="cart-sheet"
      >
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle
            className="flex items-center gap-2 text-xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Cart
            {itemCount > 0 && (
              <span className="ml-auto text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4" data-testid="cart-items">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <span className="text-6xl mb-4" aria-hidden="true">🎨</span>
              <h3
                className="text-lg font-bold text-foreground mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Your cart is empty
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Discover handcrafted pieces made with love.
              </p>
              <Button
                variant="outline"
                onClick={onContinueShopping}
                data-testid="continue-shopping-empty-btn"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            cartItems.map(item => (
              <div
                key={item.product.id}
                className="flex items-start gap-3 p-3 bg-card rounded-xl border border-border"
                data-testid={`cart-item-${item.product.id}`}
              >
                {/* Emoji */}
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0 text-3xl"
                  style={{
                    background:
                      item.product.category === "Bouquets"
                        ? "linear-gradient(135deg, hsl(0 60% 92%), hsl(22 70% 90%))"
                        : item.product.category === "Phone Covers"
                        ? "linear-gradient(135deg, hsl(220 60% 92%), hsl(260 50% 92%))"
                        : "linear-gradient(135deg, hsl(38 60% 90%), hsl(22 50% 90%))",
                  }}
                  aria-hidden="true"
                >
                  {item.product.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    className="font-semibold text-foreground text-sm leading-snug line-clamp-1"
                    data-testid={`cart-item-name-${item.product.id}`}
                  >
                    {item.product.name}
                  </h4>
                  <p
                    className="text-primary font-bold text-sm mt-0.5"
                    data-testid={`cart-item-price-${item.product.id}`}
                  >
                    ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ₹{item.product.price.toLocaleString("en-IN")} each
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      aria-label="Decrease quantity"
                      data-testid={`cart-decrease-${item.product.id}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span
                      className="text-sm font-semibold min-w-[1.25rem] text-center"
                      data-testid={`cart-quantity-${item.product.id}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      aria-label="Increase quantity"
                      data-testid={`cart-increase-${item.product.id}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="p-1 rounded text-muted-foreground hover:text-destructive transition-colors shrink-0"
                  aria-label="Remove item"
                  data-testid={`cart-remove-${item.product.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-border p-6 space-y-4 bg-card/50">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Subtotal ({itemCount} items)</span>
              <span data-testid="cart-subtotal">₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg text-foreground">
              <span>Total</span>
              <span
                className="text-primary"
                style={{ fontFamily: "'Playfair Display', serif" }}
                data-testid="cart-total"
              >
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
            <Button
              className="w-full"
              size="lg"
              onClick={onCheckout}
              data-testid="checkout-button"
            >
              Place Order
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={onContinueShopping}
              data-testid="continue-shopping-btn"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
