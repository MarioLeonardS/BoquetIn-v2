import { useState, useRef } from "react";
import "./index.css";

const PRODUCTS = [
  {
    id: 1,
    title: "Midnight Indigo",
    description: "Deep sapphire roses layered with silver-tinted eucalyptus.",
    image:
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=500&h=600&fit=crop",
    category: "Luxury",
  },
  {
    id: 2,
    title: "Cerulean Whisper",
    description: "Ice-blue hydrangeas paired with delicate white ranunculus.",
    image:
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=500&h=600&fit=crop",
    category: "Minimalist",
  },
  {
    id: 3,
    title: "Porcelain Dusk",
    description:
      "Classic white peonies nestled in a deep navy structural wrap.",
    image:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=500&h=600&fit=crop",
    category: "Wedding",
  },
  {
    id: 4,
    title: "Siren of the Sea",
    description:
      "Rare tinted blue orchids combined with structural monstera leaves.",
    image:
      "https://images.unsplash.com/photo-1585841860560-5e8c4f2f8f8f?w=500&h=600&fit=crop",
    category: "Luxury",
  },
  {
    id: 5,
    title: "Academic Azure",
    description:
      "Bright delphiniums mixed with golden-accented celebratory foliage.",
    image:
      "https://images.unsplash.com/photo-1563241527-3004b5a8ce73?w=500&h=600&fit=crop",
    category: "Graduation",
  },
  {
    id: 6,
    title: "Sapphire Promise",
    description:
      "Rich blue roses intertwined with white lilies and premium silk ribbons.",
    image:
      "https://images.unsplash.com/photo-1611254949007-12be4a091e33?w=500&h=600&fit=crop",
    category: "Anniversary",
  },
  {
    id: 7,
    title: "Pastel Ocean",
    description:
      "Playful mixed arrangement of soft blue carnations and blush sweet peas.",
    image:
      "https://images.unsplash.com/photo-1580707387996-65e44800cbf1?w=500&h=600&fit=crop",
    category: "Birthday",
  },
  {
    id: 8,
    title: "Celestial Blossom",
    description: "A sculptural masterpiece featuring premium blue-toned flora.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=600&fit=crop",
    category: "Luxury",
  },
  {
    id: 9,
    title: "Monochrome Minimalist",
    description:
      "Three structural blue-dyed tulips in an architectural ceramic vase.",
    image:
      "https://images.unsplash.com/photo-1549927539-ae2e8ea0c39f?w=500&h=600&fit=crop",
    category: "Minimalist",
  },
  {
    id: 10,
    title: "Velvet Night",
    description:
      "The ultimate midnight blue rose collection for dramatic elegance.",
    image:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&h=600&fit=crop",
    category: "Anniversary",
  },
];

const FILTER_CATEGORIES = [
  "All",
  "Pipe Cleaner",
  "Satin",
  "Chocolatte",
  "Money",
  "Snack",
  "Artificial",
  "Custom",
];

const GALLERY_IMAGES = [
  {
    id: 0,
    src: "https://images.unsplash.com/photo-1519915212116-7cfef70e5c5b?w=1200&h=800&fit=crop",
    alt: "Atelier Bouquet",
  },
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=1200&h=800&fit=crop",
    alt: "Florist Craft",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200&h=800&fit=crop",
    alt: "Luxury Blue Selection",
  },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const catalogRef = useRef(null);
  const orderListRef = useRef(null);

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const addToCart = (product) => setCartItems([...cartItems, product]);
  const removeFromCart = (index) =>
    setCartItems(cartItems.filter((_, i) => i !== index));

  const WHATSAPP_NUMBER = "6281234567890";

  // Perbaikan fungsi navigasi galeri agar aman dari error undefined
  const nextGalleryImage = () => {
    setCurrentGalleryIndex(
      (prevIndex) => (prevIndex + 1) % GALLERY_IMAGES.length,
    );
  };

  const prevGalleryImage = () => {
    setCurrentGalleryIndex(
      (prevIndex) =>
        (prevIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
    );
  };

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;
    const productList = cartItems
      .map((item, i) => `${i + 1}. ${item.title} - $${item.price.toFixed(2)}`)
      .join("\n");
    const message = `Hello Boquetín, I would like to place an elegant order:\n\n${productList}\n\nPlease arrange the delivery. Thank you.`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-sky-100">
      {/* HEADER NAV */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <img
            src="src\assets\boquetin.webp"
            alt="Boquetín Logo"
            className="w-32 object-contain"
          />
          <div className="hidden md:flex space-x-12 text-xs uppercase tracking-widest font-medium text-black">
            <a href="#" className="hover:text-blue-700 transition-colors">
              Beranda
            </a>
            <button
              onClick={() =>
                catalogRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-blue-700 transition-colors uppercase"
            >
              Katalog
            </button>
            <a href="#galeri" className="hover:text-blue-700 transition-colors">
              Galeri
            </a>
            <a
              href="#hubungi-kami"
              className="hover:text-blue-700 transition-colors"
            >
              Hubungi Kami
            </a>
          </div>
          <button
            onClick={() =>
              orderListRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="text-xs uppercase tracking-widest font-semibold border-b border-slate-950 pb-1 hover:text-blue-700 transition-all"
          >
            Keranjang ({cartItems.length})
          </button>
        </nav>
      </header>

      {/* SECTION 1: HERO SECTION */}
      <section
        id="home"
        className="mt-12 rounded-t-3xl pt-16  px-6 max-w-4xl mx-auto text-center flex flex-col items-center bg-[url('src/assets/blueflowerhero.webp')] bg-cover bg-center border border-slate-200 shadow-lg"
      >
        <span className="text-xs font-semibold tracking-widest uppercase text-white mb-5">
          The Autumn Azure Collection
        </span>
        <h2 className="text-4xl sm:text-6xl font-serif font-light tracking-tight text-white max-w-2xl leading-tight mb-8">
          Architectural Bouquets Curation for{" "}
          <span className="italic font-normal text-white">Modern Spaces</span>
        </h2>
        <p className="text-base sm:text-lg text-white font-light max-w-xl leading-relaxed tracking-wide mb-10">
          Moving away from the traditional, we craft asymmetrical floral
          installations featuring moody midnight indigos and structural ceramic
          styling.
        </p>

        <button
          onClick={() =>
            catalogRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          className="mb-16 px-10 py-4 bg-white rounded-lg text-blue-800 text-xs uppercase tracking-widest font-medium hover:bg-blue-800 hover:text-white border hover:border-white border-blue-800 transition-colors duration-300"
        >
          Lihat Katalog
        </button>

        {/* Kurung kotak dihapus -> diganti menjadi aspect-video standar */}
        <div className="w-full aspect-video bg-slate-100 relative group overflow-hidden rounded-t-2xl">
          <img
            src="src\assets\blueboquet.webp"
            alt="Signature Deep Blue Couture Bouquet"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <p className="absolute bottom-0 bg-blue-800 left-0 right-0 font-bold text-white text-center py-2">
            Satin Boquet
          </p>
        </div>
      </section>

      {/* SECTION 2: ARCHIVE CATALOG */}
      <section
        ref={catalogRef}
        id="katalog"
        className="py-24 border-t border-slate-200 bg-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col mb-16 gap-6">
            <div className="text-center">
              <span className="text-xs font-semibold tracking-widest uppercase text-blue-600">
                Katalog
              </span>
              <h3 className="text-3xl font-serif font-light text-slate-950 mt-2">
                Kategori Boquet
              </h3>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 text-xs uppercase tracking-widest font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-800 rounded text-white"
                      : "bg-white text-slate-600 hover:text-slate-950 outline outline-slate-300 rounded"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Strict 5 Columns Grid System - Kurung kotak dihapus -> diganti aspect-square */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-t border-l border-slate-200">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-5 flex flex-col justify-between border-r border-b border-slate-200 transition-all duration-300 hover:bg-slate-50/50 group"
              >
                <div>
                  <div className="aspect-square overflow-hidden bg-slate-100 mb-5 relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-sky-600 font-semibold">
                      {product.category}
                    </span>
                    <h4 className="font-serif text-base font-normal text-slate-950 group-hover:text-sky-900 transition-colors">
                      {product.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="text-[11px] uppercase tracking-wider font-semibold border-b border-slate-950 pb-0.5 hover:text-sky-600 hover:border-sky-600 transition-all"
                  >
                    Request Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOATING STICKY ORDER BUTTON */}
      {cartItems.length > 0 && (
        <button
          onClick={() =>
            orderListRef.current?.scrollIntoView({ behavior: "smooth" })
          }
          className="fixed bottom-8 right-8 z-50 bg-slate-950 text-white px-6 py-4 shadow-xl flex items-center gap-3 hover:bg-sky-900 transition-all group duration-300"
        >
          <span className="text-xs uppercase tracking-widest font-medium">
            Open Manifest
          </span>
          <span className="w-5 h-5 bg-white text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">
            {cartItems.length}
          </span>
        </button>
      )}

      {/* SECTION 4: INVOICE / ORDER MANIFEST */}
      <section
        ref={orderListRef}
        className="py-24 bg-slate-100 border-t border-b border-slate-200"
      >
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-serif font-light text-slate-950">
              Your Selections
            </h3>
            <div className="w-12 h-px bg-slate-400 mx-auto mt-4"></div>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white border border-slate-200 p-12 text-center">
              <p className="text-sm text-slate-500 font-light uppercase tracking-widest">
                Your curation folder is empty
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 divide-y divide-slate-100">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-serif text-base text-slate-950 font-normal">
                        {item.title}
                      </h4>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-xs uppercase tracking-widest text-red-700 font-medium hover:text-red-500 transition-colors"
                    >
                      [ Remove ]
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-slate-200 p-6 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs uppercase tracking-widest font-medium text-slate-500">
                    Estimated Total:
                  </span>
                </div>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-4 bg-slate-950 text-white text-xs uppercase tracking-widest font-semibold hover:bg-sky-900 transition-colors duration-300"
                >
                  Forward Manifest via WhatsApp
                </button>

                <button
                  onClick={() => setCartItems([])}
                  className="w-full text-center text-[11px] uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Clear All Selections
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: LOOKBOOK CAROUSEL */}
      <section id="gallery" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-sky-600">
              Editorial Gallery
            </span>
            <h3 className="text-3xl font-serif font-light text-slate-950 mt-2">
              Atelier Atmosphere
            </h3>
          </div>

          {/* Kurung kotak dihapus -> diganti aspect-video standar */}
          <div className="relative aspect-video bg-slate-900 overflow-hidden group">
            <img
              src={GALLERY_IMAGES[currentGalleryIndex].src}
              alt={GALLERY_IMAGES[currentGalleryIndex].alt}
              className="w-full h-full object-cover opacity-95 transition-all duration-700"
            />

            <button
              onClick={prevGalleryImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 hover:bg-white text-slate-950 transition-all border border-slate-200"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={nextGalleryImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 hover:bg-white text-slate-950 transition-all border border-slate-200"
              aria-label="Next image"
            >
              →
            </button>

            <div className="absolute bottom-4 left-6 text-white text-xs uppercase tracking-widest font-light bg-slate-950/40 backdrop-blur-sm px-4 py-2">
              {GALLERY_IMAGES[currentGalleryIndex].alt}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: PHYSICAL STUDIO MAPS */}
      <section
        id="location"
        className="py-24 bg-slate-50 border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-sky-600">
              Visit The Studio
            </span>
            <h3 className="text-4xl font-serif font-light text-slate-950">
              Boquetín Atelier
            </h3>
            <p className="text-sm text-slate-600 font-light leading-relaxed tracking-wide">
              Our flagship laboratory is located within the historical art house
              district. Stop by to view fresh imports or consult custom
              installations.
            </p>
            <div className="pt-4 space-y-3 text-xs uppercase tracking-widest font-medium text-slate-700">
              <p>
                <span className="text-slate-400">Location:</span> 123 Flower
                Street, Luxury Boulevard
              </p>
              <p>
                <span className="text-slate-400">Hours:</span> Mon - Sat / 09:00
                - 18:00
              </p>
            </div>
          </div>

          {/* Kurung kotak dihapus -> diganti aspect-video standar */}
          <div className="aspect-video bg-slate-200 border border-slate-200 overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354763695137!2d144.95373!3d-37.8162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce6e0!2sFlower%20Store!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Atelier Location Map"
            ></iframe>
          </div>
        </div>
      </section>

      {/* SECTION 7: EDITORIAL FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-xs tracking-widest uppercase font-light">
          <div className="space-y-4">
            <h4 className="text-base font-serif tracking-widest font-normal text-white lowercase first-letter:uppercase">
              Boquetín.
            </h4>
            <p className="leading-relaxed lowercase first-letter:uppercase text-slate-500 tracking-normal font-sans">
              Avant-garde floral compositions engineered for lasting visual
              impression. Est. 2020.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Navigations</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Top
                </a>
              </li>
              <li>
                <button
                  onClick={() =>
                    catalogRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="hover:text-white transition-colors uppercase"
                >
                  Archive
                </button>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-white transition-colors"
                >
                  Visuals
                </a>
              </li>
              <li>
                <a
                  href="#location"
                  className="hover:text-white transition-colors"
                >
                  Atelier
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Legal Intel</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Curation
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Channels</h4>
            <ul className="space-y-2 font-medium">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Direct
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-6 border-t border-slate-900 text-[10px] tracking-widest text-slate-600 flex flex-col sm:flex-row justify-between gap-4 uppercase font-medium">
          <p>© 2026 Boquetín. Structural Flora Bureau.</p>
          <p>Handcrafted in Alignment with the Golden Ratio 💜</p>
        </div>
      </footer>
    </div>
  );
}
