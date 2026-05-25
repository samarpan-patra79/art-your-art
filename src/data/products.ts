export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
};

export type Product = {
  id: string;
  name: string;
  category: "Bouquets" | "Phone Covers" | "Portraits";
  subtype?: string;
  phoneModel?: string;
  size?: string;
  price: number;
  stock: "In Stock" | "Limited Stock" | "Out of Stock";
  rating: number;
  reviews: number;
  description: string;
  materials: string[];
  delivery: string;
  emoji: string;
  reviewList: Review[];
};

export const products: Product[] = [
  {
    id: "b1",
    name: "Eternal Rose Bouquet",
    category: "Bouquets",
    subtype: "Flower Bouquet",
    price: 1299,
    stock: "In Stock",
    rating: 4.8,
    reviews: 34,
    description: "A timeless arrangement of 24 red roses handpicked and wrapped with love. Perfect for anniversaries and special moments.",
    materials: ["Fresh red roses", "Baby's breath", "Satin ribbon", "Artisan wrap paper"],
    delivery: "2-3 business days",
    emoji: "🌹",
    reviewList: [
      { id: "r1", name: "Sarah M.", rating: 5, text: "Absolutely gorgeous! The roses were so fresh and lasted for days.", date: "May 1, 2026" },
      { id: "r2", name: "John D.", rating: 4, text: "Beautiful arrangement, my wife loved it.", date: "April 28, 2026" }
    ]
  },
  {
    id: "b2",
    name: "Sunset Wildflower Mix",
    category: "Bouquets",
    subtype: "Flower Bouquet",
    price: 899,
    stock: "In Stock",
    rating: 4.6,
    reviews: 22,
    description: "A free-spirited mix of wildflowers in warm sunset hues — sunflowers, gerberas, and marigolds.",
    materials: ["Sunflowers", "Gerberas", "Marigolds", "Dried lavender", "Kraft paper wrap"],
    delivery: "1-2 business days",
    emoji: "🌻",
    reviewList: [
      { id: "r3", name: "Emily R.", rating: 5, text: "So bright and cheerful! Perfect for brightening up the living room.", date: "May 10, 2026" },
    ]
  },
  {
    id: "b3",
    name: "Chocolate Dream Bouquet",
    category: "Bouquets",
    subtype: "Chocolate Bouquet",
    price: 1599,
    stock: "Limited Stock",
    rating: 4.9,
    reviews: 41,
    description: "A delightful bouquet of premium Belgian chocolates artfully arranged to look like a floral arrangement.",
    materials: ["Belgian dark chocolates", "Milk chocolate truffles", "Gold foil wrappers", "Ribbon bow"],
    delivery: "2-3 business days",
    emoji: "🍫",
    reviewList: [
      { id: "r4", name: "Mike T.", rating: 5, text: "Such a unique gift idea! The chocolates were delicious too.", date: "May 15, 2026" },
      { id: "r5", name: "Anna K.", rating: 4, text: "A bit pricey, but totally worth it for a special occasion.", date: "April 20, 2026" }
    ]
  },
  {
    id: "p1",
    name: "Floral Watercolor Cover",
    category: "Phone Covers",
    phoneModel: "iPhone 15",
    price: 649,
    stock: "In Stock",
    rating: 4.7,
    reviews: 58,
    description: "A gorgeous hand-painted watercolor floral design printed on a premium matte case.",
    materials: ["Polycarbonate shell", "Matte UV coating", "Custom print", "Corner protection"],
    delivery: "3-5 business days",
    emoji: "🌸",
    reviewList: [
      { id: "r6", name: "Jessica W.", rating: 5, text: "The print quality is amazing, looks exactly like a real watercolor painting.", date: "May 5, 2026" },
      { id: "r7", name: "David L.", rating: 4, text: "Nice case, fits perfectly.", date: "May 2, 2026" }
    ]
  },
  {
    id: "p2",
    name: "Mandala Art Cover",
    category: "Phone Covers",
    phoneModel: "Samsung S24",
    price: 549,
    stock: "In Stock",
    rating: 4.5,
    reviews: 31,
    description: "Intricate mandala design in gold and terracotta tones, inspired by traditional Indian art forms.",
    materials: ["TPU flexible case", "High-res digital print", "Anti-scratch coating"],
    delivery: "3-5 business days",
    emoji: "🔯",
    reviewList: [
      { id: "r8", name: "Priya S.", rating: 5, text: "Love the intricate details and the colors are vibrant.", date: "May 12, 2026" }
    ]
  },
  {
    id: "p3",
    name: "Sunset Landscape Cover",
    category: "Phone Covers",
    phoneModel: "OnePlus 12",
    price: 699,
    stock: "Out of Stock",
    rating: 4.4,
    reviews: 19,
    description: "A breathtaking digital painting of a golden sunset over rolling hills.",
    materials: ["Hard plastic case", "Vibrant photo print", "Camera protection ring"],
    delivery: "3-5 business days",
    emoji: "🌅",
    reviewList: [
      { id: "r9", name: "Tom H.", rating: 4, text: "Beautiful design, just wish it offered more drop protection.", date: "April 15, 2026" },
      { id: "r10", name: "Lisa C.", rating: 5, text: "Stunning colors, I get compliments on it all the time.", date: "April 10, 2026" }
    ]
  },
  {
    id: "r1",
    name: "Custom Pet Portrait",
    category: "Portraits",
    size: "A4",
    price: 2499,
    stock: "In Stock",
    rating: 4.9,
    reviews: 67,
    description: "Send us your pet's photo and we'll create a stunning hand-drawn portrait in pencil or watercolor.",
    materials: ["300gsm watercolor paper", "Professional watercolors", "UV protective varnish", "Wooden frame optional"],
    delivery: "7-10 business days",
    emoji: "🐾",
    reviewList: [
      { id: "r11", name: "Mark B.", rating: 5, text: "They captured my dog's expression perfectly! So impressed.", date: "May 18, 2026" },
      { id: "r12", name: "Rachel G.", rating: 5, text: "A beautiful memorial for my cat. Thank you so much.", date: "May 8, 2026" }
    ]
  },
  {
    id: "r2",
    name: "Couple Portrait Painting",
    category: "Portraits",
    size: "12x18",
    price: 3999,
    stock: "In Stock",
    rating: 5.0,
    reviews: 28,
    description: "A romantic hand-painted oil portrait of you and your partner, captured in timeless style.",
    materials: ["Canvas board", "Professional oil paints", "Varnish finish", "Hanging kit"],
    delivery: "10-14 business days",
    emoji: "👫",
    reviewList: [
      { id: "r13", name: "Kevin & Amanda", rating: 5, text: "We gave this to each other for our anniversary. It's now the centerpiece of our living room.", date: "May 20, 2026" }
    ]
  },
  {
    id: "r3",
    name: "Family Sketch Portrait",
    category: "Portraits",
    size: "A3",
    price: 3299,
    stock: "Limited Stock",
    rating: 4.8,
    reviews: 45,
    description: "A beautiful charcoal or pencil sketch of your entire family, lovingly crafted by our artists.",
    materials: ["A3 cartridge paper", "Charcoal pencils", "Fixative spray", "Certificate of authenticity"],
    delivery: "7-10 business days",
    emoji: "👨‍👩‍👧‍👦",
    reviewList: [
      { id: "r14", name: "The Smith Family", rating: 5, text: "Such a wonderful piece of art to have in our home.", date: "May 14, 2026" },
      { id: "r15", name: "Laura N.", rating: 4, text: "Really good likeness, took a little longer than expected to arrive though.", date: "April 5, 2026" }
    ]
  }
];

export type Order = {
  id: string;
  name: string;
  status: "Delivered" | "In Transit" | "Processing";
  date: string;
  amount: string;
};

export const initialOrders: Order[] = [
  { id: "#1024", name: "Customized Rose Bouquet", status: "Delivered", date: "May 10, 2026", amount: "₹1,299" },
  { id: "#1023", name: "Custom Pet Portrait", status: "In Transit", date: "May 18, 2026", amount: "₹2,499" },
  { id: "#1022", name: "Floral Watercolor Cover", status: "Processing", date: "May 22, 2026", amount: "₹649" }
];