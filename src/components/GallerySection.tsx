import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface GallerySectionProps {
  onViewCollection: (category: string) => void;
}

const categories = [
  {
    key: "Bouquets",
    title: "Bouquets",
    description: "Handcrafted floral and chocolate arrangements made fresh with premium blooms and artisan packaging.",
    gradient: "linear-gradient(135deg, hsl(0 60% 88%) 0%, hsl(22 70% 85%) 50%, hsl(38 60% 90%) 100%)",
    accent: "hsl(0 50% 70%)",
    art: (
      <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Stem */}
        <path d="M100 180 Q95 150 98 120 Q100 100 100 80" stroke="hsl(120 30% 35%)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M100 150 Q85 140 75 130" stroke="hsl(120 30% 35%)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Roses */}
        <circle cx="100" cy="70" r="22" fill="hsl(0 65% 68%)" opacity="0.9"/>
        <circle cx="100" cy="70" r="15" fill="hsl(0 65% 58%)" opacity="0.8"/>
        <circle cx="100" cy="70" r="9" fill="hsl(0 65% 48%)" opacity="0.7"/>
        <circle cx="75" cy="85" r="18" fill="hsl(22 75% 75%)" opacity="0.9"/>
        <circle cx="75" cy="85" r="12" fill="hsl(22 75% 65%)" opacity="0.8"/>
        <circle cx="125" cy="85" r="18" fill="hsl(350 60% 72%)" opacity="0.9"/>
        <circle cx="125" cy="85" r="12" fill="hsl(350 60% 62%)" opacity="0.8"/>
        <circle cx="88" cy="105" r="14" fill="hsl(0 55% 75%)" opacity="0.85"/>
        <circle cx="112" cy="105" r="14" fill="hsl(15 70% 72%)" opacity="0.85"/>
        {/* Leaves */}
        <ellipse cx="75" cy="140" rx="14" ry="7" fill="hsl(120 35% 45%)" opacity="0.8" transform="rotate(-30 75 140)"/>
        <ellipse cx="118" cy="148" rx="12" ry="6" fill="hsl(120 30% 40%)" opacity="0.75" transform="rotate(20 118 148)"/>
        {/* Wrap */}
        <path d="M70 165 L80 185 L120 185 L130 165 Q115 170 100 172 Q85 170 70 165Z" fill="hsl(38 70% 75%)" opacity="0.85"/>
        <path d="M75 163 Q100 168 125 163 L130 165 Q115 170 100 172 Q85 170 70 165Z" fill="hsl(38 65% 65%)" opacity="0.7"/>
        {/* Gold ribbon */}
        <path d="M85 175 Q100 178 115 175" stroke="hsl(39 56% 58%)" strokeWidth="2" fill="none"/>
      </svg>
    ),
  },
  {
    key: "Phone Covers",
    title: "Phone Covers",
    description: "Custom-designed phone cases featuring original artwork — watercolors, mandalas, and scenic landscapes.",
    gradient: "linear-gradient(135deg, hsl(220 60% 92%) 0%, hsl(260 50% 90%) 50%, hsl(200 60% 90%) 100%)",
    accent: "hsl(220 50% 70%)",
    art: (
      <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Phone body */}
        <rect x="60" y="30" width="80" height="140" rx="12" fill="hsl(220 30% 88%)" stroke="hsl(220 30% 70%)" strokeWidth="2"/>
        <rect x="65" y="45" width="70" height="110" rx="6" fill="white"/>
        {/* Screen art - watercolor flowers */}
        <circle cx="100" cy="75" r="20" fill="hsl(0 60% 78%)" opacity="0.6"/>
        <circle cx="85" cy="90" r="15" fill="hsl(300 50% 75%)" opacity="0.55"/>
        <circle cx="115" cy="88" r="15" fill="hsl(30 70% 75%)" opacity="0.6"/>
        <circle cx="100" cy="100" r="12" fill="hsl(200 60% 75%)" opacity="0.55"/>
        {/* Petals */}
        {[0,60,120,180,240,300].map((angle, i) => (
          <ellipse
            key={i}
            cx={100 + 18 * Math.cos(angle * Math.PI / 180)}
            cy={75 + 18 * Math.sin(angle * Math.PI / 180)}
            rx="7" ry="4"
            fill="hsl(0 65% 72%)"
            opacity="0.7"
            transform={`rotate(${angle} ${100 + 18 * Math.cos(angle * Math.PI / 180)} ${75 + 18 * Math.sin(angle * Math.PI / 180)})`}
          />
        ))}
        {/* Center */}
        <circle cx="100" cy="75" r="6" fill="hsl(39 56% 58%)"/>
        {/* Leaves on screen */}
        <ellipse cx="80" cy="115" rx="12" ry="5" fill="hsl(120 40% 50%)" opacity="0.6" transform="rotate(-20 80 115)"/>
        <ellipse cx="120" cy="118" rx="10" ry="4" fill="hsl(120 35% 45%)" opacity="0.55" transform="rotate(15 120 118)"/>
        {/* Home bar */}
        <rect x="88" y="162" width="24" height="3" rx="2" fill="hsl(220 30% 70%)"/>
        {/* Camera */}
        <circle cx="100" cy="38" r="3" fill="hsl(220 30% 60%)"/>
        {/* Gold frame accent */}
        <rect x="60" y="30" width="80" height="140" rx="12" fill="none" stroke="hsl(39 56% 58%)" strokeWidth="1" opacity="0.6"/>
      </svg>
    ),
  },
  {
    key: "Portraits",
    title: "Portraits",
    description: "Commissioned hand-drawn and painted portraits of pets, couples, and families on premium canvas and paper.",
    gradient: "linear-gradient(135deg, hsl(38 60% 88%) 0%, hsl(30 55% 85%) 50%, hsl(22 50% 88%) 100%)",
    accent: "hsl(30 50% 65%)",
    art: (
      <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Canvas frame */}
        <rect x="30" y="25" width="140" height="150" rx="3" fill="hsl(38 50% 82%)" stroke="hsl(30 40% 50%)" strokeWidth="4"/>
        <rect x="38" y="33" width="124" height="134" rx="2" fill="hsl(38 30% 95%)"/>
        {/* Portrait - face */}
        <ellipse cx="100" cy="95" rx="32" ry="38" fill="hsl(25 60% 82%)"/>
        {/* Hair */}
        <ellipse cx="100" cy="72" rx="33" ry="20" fill="hsl(22 50% 35%)"/>
        <ellipse cx="68" cy="88" rx="10" ry="22" fill="hsl(22 50% 35%)"/>
        <ellipse cx="132" cy="88" rx="10" ry="22" fill="hsl(22 50% 35%)"/>
        {/* Eyes */}
        <ellipse cx="88" cy="92" rx="5" ry="6" fill="white"/>
        <ellipse cx="112" cy="92" rx="5" ry="6" fill="white"/>
        <circle cx="89" cy="93" r="3.5" fill="hsl(22 50% 25%)"/>
        <circle cx="113" cy="93" r="3.5" fill="hsl(22 50% 25%)"/>
        <circle cx="90" cy="91.5" r="1" fill="white"/>
        <circle cx="114" cy="91.5" r="1" fill="white"/>
        {/* Nose */}
        <path d="M98 100 Q100 106 102 100" stroke="hsl(25 40% 60%)" strokeWidth="1.5" fill="none"/>
        {/* Mouth */}
        <path d="M91 112 Q100 118 109 112" stroke="hsl(0 50% 55%)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Shoulders */}
        <ellipse cx="100" cy="152" rx="40" ry="18" fill="hsl(22 60% 55%)"/>
        {/* Neck */}
        <rect x="93" y="130" width="14" height="20" fill="hsl(25 60% 78%)"/>
        {/* Decorative watercolor wash around portrait */}
        <circle cx="55" cy="48" r="12" fill="hsl(120 40% 70%)" opacity="0.3"/>
        <circle cx="148" cy="46" r="10" fill="hsl(0 60% 75%)" opacity="0.3"/>
        <circle cx="52" cy="148" r="10" fill="hsl(39 56% 68%)" opacity="0.3"/>
        <circle cx="150" cy="150" r="12" fill="hsl(22 60% 68%)" opacity="0.3"/>
        {/* Frame corner ornaments */}
        {[[34,29],[158,29],[34,167],[158,167]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="hsl(39 56% 58%)" opacity="0.9"/>
        ))}
        {/* Frame */}
        <rect x="30" y="25" width="140" height="150" rx="3" fill="none" stroke="hsl(30 50% 40%)" strokeWidth="2"/>
      </svg>
    ),
  },
];

export function GallerySection({ onViewCollection }: GallerySectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background" data-testid="gallery-section">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Discover</p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Collections
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Three curated categories, each crafted with unique artistry and genuine care for the person receiving them.
          </p>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="group relative rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              style={{ background: cat.gradient }}
              onClick={() => onViewCollection(cat.key)}
              data-testid={`gallery-card-${cat.key.toLowerCase().replace(/ /g, "-")}`}
            >
              {/* Art area */}
              <div className="relative h-56 flex items-center justify-center p-6">
                <div className="w-48 h-48 transition-transform duration-500 group-hover:scale-105">
                  {cat.art}
                </div>
              </div>

              {/* Content */}
              <div className="bg-white/70 backdrop-blur-sm p-6 border-t border-white/50">
                <h3
                  className="text-xl font-bold text-foreground mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {cat.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group/btn bg-white/80 hover:bg-primary hover:text-primary-foreground border-border transition-all duration-300"
                  onClick={(e) => { e.stopPropagation(); onViewCollection(cat.key); }}
                  data-testid={`gallery-view-btn-${cat.key.toLowerCase().replace(/ /g, "-")}`}
                >
                  View Collection
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
