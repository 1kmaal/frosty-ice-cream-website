import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgePercent,
  Box,
  Check,
  ChevronDown,
  ChevronUp,
  IceCream,
  Minus,
  PackageCheck,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import ScrollVelocity from "@/components/ScrollVelocity";

type OrderItem = {
  id: string;
  name: string;
  type: "flavor" | "special";
  price: number;
  quantity: number;
  color: string;
  bgColor: string;
  image?: string;
};

const FLAVORS = [
  {
    id: "velvet-chocolate",
    name: "Velvet Chocolate",
    tagline: "Deep, rich, and utterly indulgent",
    price: 5.99,
    color: "#5A2418",
    bgColor: "#F4E4DF",
    image: "/flavors/velvet-chocolate.png",
    badge: "Bestseller",
  },
  {
    id: "vanilla-dream",
    name: "Vanilla Dream",
    tagline: "Pure, classic, timeless",
    price: 5.49,
    color: "#6D4C41",
    bgColor: "#FFF8E1",
    image: "/flavors/vanilla-dream.png",
    badge: "Classic",
  },
  {
    id: "strawberry-bliss",
    name: "Strawberry Bliss",
    tagline: "Sweet, fruity, and dreamy",
    price: 5.69,
    color: "#880E4F",
    bgColor: "#FCE4EC",
    image: "/flavors/strawberry-bliss.png",
    badge: "Seasonal",
  },
  {
    id: "mint-eclipse",
    name: "Mint Eclipse",
    tagline: "Cool mint with chocolatey depth",
    price: 5.79,
    color: "#1B5E20",
    bgColor: "#E8F5E9",
    image: "/flavors/mint-eclipse.png",
    badge: "Fan Favorite",
  },
  {
    id: "cookies-and-cream",
    name: "Cookies & Cream",
    tagline: "Crunch meets cream",
    price: 5.89,
    color: "#263238",
    bgColor: "#ECEFF1",
    image: "/flavors/cookies-and-cream.png",
    badge: "New",
  },
];

const SPECIALS = [
  {
    id: "first-scoop-box",
    name: "First Scoop Box",
    tagline: "3 pints: choose your starter set",
    price: 15.99,
    color: "#5A2418",
    bgColor: "#F4E4DF",
    badge: "Starter",
    details: "A small tasting set for trying Frosty without overthinking it.",
  },
  {
    id: "party-pack",
    name: "Party Pack",
    tagline: "12 pints for events and groups",
    price: 59.99,
    color: "#880E4F",
    bgColor: "#FCE4EC",
    badge: "Bulk",
    details: "Built for birthdays, movie nights, and everyone asking for one more scoop.",
  },
  {
    id: "date-night-duo",
    name: "Date Night Duo",
    tagline: "2 pints + topping kit",
    price: 13.99,
    color: "#1B5E20",
    bgColor: "#E8F5E9",
    badge: "Special",
    details: "Two pints plus a small topping kit for a softer, premium dessert moment.",
  },
  {
    id: "cookie-crunch-kit",
    name: "Cookie Crunch Kit",
    tagline: "Cookies, drizzle, and scoop extras",
    price: 8.99,
    color: "#263238",
    bgColor: "#ECEFF1",
    badge: "Add-on",
    details: "A small kit made to upgrade any Frosty flavor with extra crunch.",
  },
];

const STORAGE_KEY = "frosty-order-cart";

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

function OrderHero() {
  return (
    <section className="relative overflow-hidden border-b-4 border-black bg-[#FFF8E1] pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, rotate: -5, x: -30 }}
        animate={{ opacity: 1, rotate: -5, x: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="absolute left-8 top-32 hidden border-4 border-black bg-[#E8F5E9] p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:block"
      >
        <ShoppingBag className="h-10 w-10 text-black" />
        <p className="mt-3 text-xs font-black uppercase tracking-widest text-black/55">Build Cart</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 4, x: 30 }}
        animate={{ opacity: 1, rotate: 4, x: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="absolute bottom-28 right-10 hidden border-4 border-black bg-[#F4E4DF] p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:block"
      >
        <BadgePercent className="h-10 w-10 text-black" />
        <p className="mt-3 text-xs font-black uppercase tracking-widest text-black/55">Specials Included</p>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="mb-6 inline-flex items-center gap-2 border-2 border-black bg-black px-4 py-2 text-[#FFF8E1]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs font-bold uppercase tracking-widest">Frosty Order</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-black sm:text-6xl md:text-8xl lg:text-9xl"
        >
          Build Your
          <br />
          Frosty Box
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-black/65 sm:text-lg"
        >
          Add as many flavors and specials as you want. Mix pints, bundles, kits, and event packs in one order.
        </motion.p>
      </div>
    </section>
  );
}

function QuantityControl({
  quantity,
  onIncrease,
  onDecrease,
}: {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div className="flex items-center border-2 border-black bg-white">
      <button
        onClick={onDecrease}
        className="flex h-11 w-11 items-center justify-center border-r-2 border-black text-black disabled:opacity-30"
        disabled={quantity === 0}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="flex h-11 min-w-[52px] items-center justify-center text-sm font-black text-black">{quantity}</span>
      <button onClick={onIncrease} className="flex h-11 w-11 items-center justify-center border-l-2 border-black text-black">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function FlavorCard({
  flavor,
  quantity,
  onIncrease,
  onDecrease,
}: {
  flavor: (typeof FLAVORS)[0];
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -5, rotate: -0.5 }}
      transition={{ duration: 0.25 }}
      className="relative flex min-h-[460px] sm:min-h-[520px] flex-col border-4 border-black p-4 sm:p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      style={{ backgroundColor: flavor.bgColor }}
    >
      <span className="absolute -right-3 -top-3 border-2 border-black bg-black px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#FFF8E1]">
        {flavor.badge}
      </span>

      <div className="flex h-[180px] sm:h-[210px] items-center justify-center border-2 border-black/10" style={{ backgroundColor: `${flavor.color}18` }}>
        <img src={flavor.image} alt={flavor.name} className="h-[150px] sm:h-[178px] w-auto max-w-[84%] object-contain" draggable={false} />
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <h2 className="text-2xl font-black uppercase leading-[0.95] tracking-tight" style={{ color: flavor.color }}>
          {flavor.name}
        </h2>
        <p className="mt-2 min-h-[38px] text-[11px] font-black uppercase tracking-[0.16em]" style={{ color: flavor.color, opacity: 0.65 }}>
          {flavor.tagline}
        </p>
        <div className="mt-4 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-4 w-4 fill-black text-black" />
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t-2 border-black/10 pt-5">
          <div>
            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-black/40">Per pint</p>
            <p className="text-3xl font-black tracking-tighter" style={{ color: flavor.color }}>
              {formatPrice(flavor.price)}
            </p>
          </div>
          <QuantityControl quantity={quantity} onIncrease={onIncrease} onDecrease={onDecrease} />
        </div>
      </div>
    </motion.div>
  );
}

function SpecialCard({
  special,
  quantity,
  onIncrease,
  onDecrease,
}: {
  special: (typeof SPECIALS)[0];
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -5, rotate: 0.5 }}
      transition={{ duration: 0.25 }}
      className="relative border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      style={{ backgroundColor: special.bgColor }}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-black text-[#FFF8E1]">
          <PackageCheck className="h-7 w-7" />
        </div>
        <span className="border-2 border-black bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black">
          {special.badge}
        </span>
      </div>

      <h2 className="mt-8 text-3xl font-black uppercase leading-[0.95] tracking-tight" style={{ color: special.color }}>
        {special.name}
      </h2>
      <p className="mt-2 text-[11px] font-black uppercase tracking-[0.16em]" style={{ color: special.color, opacity: 0.65 }}>
        {special.tagline}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-black/65">{special.details}</p>

      <div className="mt-7 flex items-end justify-between gap-4 border-t-2 border-black/10 pt-5">
        <div>
          <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-black/40">Special price</p>
          <p className="text-3xl font-black tracking-tighter" style={{ color: special.color }}>
            {formatPrice(special.price)}
          </p>
        </div>
        <QuantityControl quantity={quantity} onIncrease={onIncrease} onDecrease={onDecrease} />
      </div>
    </motion.div>
  );
}

function CartSummary({
  cart,
  updateQuantity,
  clearCart,
}: {
  cart: OrderItem[];
  updateQuantity: (item: OrderItem, quantity: number) => void;
  clearCart: () => void;
}) {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const delivery = subtotal > 25 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + delivery;

  const checkout = () => {
    if (cart.length === 0) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    window.dispatchEvent(
      new CustomEvent("frosty-nav-transition", {
        detail: { label: "Payment", target: "/payment" },
      }),
    );
  };

  return (
    <aside className="border-4 border-black bg-[#FFF8E1] p-4 shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] sm:p-5">
      <div className="flex items-center justify-between gap-4 border-b-2 border-black/10 pb-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Your Cart</p>
          <h2 className="mt-1 text-3xl font-black uppercase tracking-tighter text-black">Order Box</h2>
        </div>
        <ShoppingBag className="h-8 w-8 text-black" />
      </div>

      <div className="mt-5 max-h-[260px] space-y-4 overflow-y-auto pr-1 sm:max-h-[360px]">
        {cart.length === 0 ? (
          <div className="border-2 border-dashed border-black/30 bg-white p-5 text-center">
            <p className="text-sm font-bold text-black/55">Add flavors or specials to start your order.</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="border-2 border-black bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase leading-[1.05] text-black">{item.name}</p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-black/40">{item.type}</p>
                </div>
                <button onClick={() => updateQuantity(item, 0)} className="text-black/45 hover:text-black">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center border-2 border-black">
                  <button onClick={() => updateQuantity(item, item.quantity - 1)} className="flex h-9 w-9 items-center justify-center border-r-2 border-black">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="flex h-9 min-w-[42px] items-center justify-center text-xs font-black">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item, item.quantity + 1)} className="flex h-9 w-9 items-center justify-center border-l-2 border-black">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="text-sm font-black text-black">{formatPrice(item.price * item.quantity)}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-5 space-y-3 border-t-2 border-black/10 pt-5">
        <div className="flex justify-between text-sm font-bold text-black/60">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold text-black/60">
          <span>Delivery</span>
          <span>{delivery === 0 ? "Free" : formatPrice(delivery)}</span>
        </div>
        <div className="flex justify-between border-t-2 border-black pt-4 text-2xl font-black text-black">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={checkout}
          disabled={cart.length === 0}
          className="inline-flex items-center justify-center gap-3 border-2 border-black bg-black px-6 py-4 text-xs font-black uppercase tracking-widest text-[#FFF8E1] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continue To Payment
          <ArrowRight className="h-4 w-4" />
        </button>
        {cart.length > 0 && (
          <button onClick={clearCart} className="border-2 border-black bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-black">
            Clear Cart
          </button>
        )}
      </div>
    </aside>
  );
}

export default function Order() {
  const [cartMap, setCartMap] = useState<Record<string, OrderItem>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as OrderItem[];
      const next: Record<string, OrderItem> = {};
      parsed.forEach((item) => {
        if (item.quantity > 0) next[item.id] = item;
      });
      setCartMap(next);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const cart = useMemo(() => Object.values(cartMap).filter((item) => item.quantity > 0), [cartMap]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const updateQuantity = (item: OrderItem, quantity: number) => {
    setCartMap((current) => {
      const next = { ...current };
      if (quantity <= 0) {
        delete next[item.id];
      } else {
        next[item.id] = { ...item, quantity };
      }
      return next;
    });
  };

  const addFlavor = (flavor: (typeof FLAVORS)[0], delta: number) => {
    const current = cartMap[flavor.id]?.quantity ?? 0;
    updateQuantity(
      {
        id: flavor.id,
        name: flavor.name,
        type: "flavor",
        price: flavor.price,
        quantity: current + delta,
        color: flavor.color,
        bgColor: flavor.bgColor,
        image: flavor.image,
      },
      current + delta,
    );
  };

  const addSpecial = (special: (typeof SPECIALS)[0], delta: number) => {
    const current = cartMap[special.id]?.quantity ?? 0;
    updateQuantity(
      {
        id: special.id,
        name: special.name,
        type: "special",
        price: special.price,
        quantity: current + delta,
        color: special.color,
        bgColor: special.bgColor,
      },
      current + delta,
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="min-h-screen bg-white">
      <OrderHero />
      <ScrollVelocity
        texts={[
          "ADD AS MANY AS YOU WANT · MIX FLAVORS · ADD SPECIALS · BUILD YOUR BOX · ",
          "VELVET CHOCOLATE · VANILLA DREAM · STRAWBERRY BLISS · MINT ECLIPSE · COOKIES & CREAM · ",
        ]}
        velocity={72}
        className="border-b-4 border-black bg-black py-8 text-2xl font-black uppercase tracking-tighter text-[#FFF8E1] sm:text-3xl md:text-4xl"
        numCopies={4}
      />

      <section id="order-builder-section" className="frosty-order-builder relative bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1500px] items-start gap-8 px-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_340px] lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10 lg:px-8">
          <div className="md:hidden">
            <CartSummary
              cart={cart}
              updateQuantity={updateQuantity}
              clearCart={() => setCartMap({})}
            />
          </div>

          <div>
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <span className="inline-flex border-2 border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FFF8E1]">
                  Choose Flavors
                </span>
                <h2 className="mt-5 text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl">
                  Pints First
                </h2>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-black/60">
                shadcn-style quantity controls, Magic UI-style product cards, and a sticky checkout summary.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
              {FLAVORS.map((flavor) => (
                <FlavorCard
                  key={flavor.id}
                  flavor={flavor}
                  quantity={cartMap[flavor.id]?.quantity ?? 0}
                  onIncrease={() => addFlavor(flavor, 1)}
                  onDecrease={() => addFlavor(flavor, -1)}
                />
              ))}
            </div>

            <div className="mt-16 mb-10">
              <span className="inline-flex border-2 border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FFF8E1]">
                Specials
              </span>
              <h2 className="mt-5 text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl">
                Boxes, Bundles
                <br />
                And Add-ons
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {SPECIALS.map((special) => (
                <SpecialCard
                  key={special.id}
                  special={special}
                  quantity={cartMap[special.id]?.quantity ?? 0}
                  onIncrease={() => addSpecial(special, 1)}
                  onDecrease={() => addSpecial(special, -1)}
                />
              ))}
            </div>
          </div>

          <div className="frosty-order-sticky hidden md:block">
            <CartSummary
              cart={cart}
              updateQuantity={updateQuantity}
              clearCart={() => setCartMap({})}
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
