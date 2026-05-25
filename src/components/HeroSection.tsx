import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface HeroSectionProps {
  onShopClick: () => void;
}

export function HeroSection({ onShopClick }: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(38 43% 93%) 0%, hsl(22 50% 88%) 40%, hsl(38 43% 93%) 70%, hsl(120 20% 88%) 100%)",
        minHeight: "85vh",
      }}
      data-testid="hero-section"
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-10 left-10 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(22 40% 55%), transparent)" }}
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(120 15% 62%), transparent)" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(39 56% 58%), transparent)" }}
      />

      {/* Floating art elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["🌸", "🎨", "🌹", "✨", "🖌️", "🌻"].map((em, i) => (
          <span
            key={i}
            className="absolute text-4xl opacity-20"
            style={{
              top: `${[15, 70, 25, 80, 45, 60][i]}%`,
              left: `${[5, 85, 75, 10, 90, 50][i]}%`,
              transform: `rotate(${[15, -20, 10, -15, 25, -10][i]}deg)`,
              fontSize: `${[2.5, 2, 3, 2.2, 2.8, 2.3][i]}rem`,
            }}
            aria-hidden="true"
          >
            {em}
          </span>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center min-h-[85vh]">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-muted-foreground">Handcrafted with Love</span>
        </div>

        {/* Heading */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
          data-testid="hero-heading"
        >
          Art Your{" "}
          <span className="text-primary relative">
            Art
            <span
              className="absolute -bottom-2 left-0 right-0 h-1 rounded-full"
              style={{ background: "hsl(39 56% 58%)" }}
            />
          </span>
        </h1>

        {/* Intro quote */}
        <p
          className="max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 italic"
          style={{ fontFamily: "'Playfair Display', serif" }}
          data-testid="hero-tagline"
        >
          "Art isn't just about colors; it's a piece of the soul captured in a frame, a bloom, or a custom design.
          Every piece here is handcrafted with love, turning ordinary moments into timeless memories.
          Explore our world of imagination."
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button
            size="lg"
            onClick={onShopClick}
            className="px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            data-testid="hero-cta-button"
          >
            Explore Shop
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onShopClick}
            className="px-8 py-4 text-base font-semibold bg-white/60 backdrop-blur-sm"
            data-testid="hero-secondary-button"
          >
            View Collections
          </Button>
        </div>

        {/* Stats strip */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16">
          {[
            { value: "500+", label: "Happy Customers" },
            { value: "9", label: "Unique Products" },
            { value: "100%", label: "Handcrafted" },
            { value: "4.8", label: "Avg Rating" },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-bold text-primary"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
