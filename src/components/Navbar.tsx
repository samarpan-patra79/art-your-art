import { ShoppingCart, Palette, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { View } from "@/App";

interface NavbarProps {
  cartCount: number;
  currentView: View;
  onNavigate: (view: View) => void;
  onCartOpen: () => void;
}

export function Navbar({ cartCount, currentView, onNavigate, onCartOpen }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks: { label: string; view: View }[] = [
    { label: "Home", view: "home" },
    { label: "Shop", view: "shop" },
    { label: "Orders", view: "orders" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border shadow-sm" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 group"
            data-testid="logo-button"
          >
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-md">
              <Palette className="w-5 h-5 text-primary-foreground" />
            </div>
            <span
              className="text-xl font-bold text-foreground tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Art Your Art
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" data-testid="desktop-nav">
            {navLinks.map(link => (
              <button
                key={link.view}
                onClick={() => onNavigate(link.view)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentView === link.view
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-testid={`nav-link-${link.view}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={onCartOpen}
              className="relative p-2 rounded-lg hover:bg-muted transition-colors"
              data-testid="cart-button"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5 text-foreground" />
              {cartCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground"
                  data-testid="cart-count-badge"
                >
                  {cartCount}
                </Badge>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMenuOpen(o => !o)}
              aria-label="Toggle menu"
              data-testid="mobile-menu-toggle"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden border-t border-border py-3 space-y-1" data-testid="mobile-nav">
            {navLinks.map(link => (
              <button
                key={link.view}
                onClick={() => { onNavigate(link.view); setMenuOpen(false); }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentView === link.view
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
                data-testid={`mobile-nav-link-${link.view}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
