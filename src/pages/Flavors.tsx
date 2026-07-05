import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, IceCream, ShoppingBag, Sparkles, Star } from "lucide-react";
import ScrollVelocity from "@/components/ScrollVelocity";
import { triggerFrostyTransition } from "@/lib/frostyTransition";

const FLAVORS = [
  {
    name: "Velvet Chocolate",
    tagline: "Deep, rich, and utterly indulgent",
    color: "#5A2418",
    bgColor: "#F4E4DF",
    image: "/flavors/velvet-chocolate.png",
    description: "Made with rich cocoa and a velvety smooth texture for the ultimate chocolate lover.",
    price: "$5.99",
    badge: "Bestseller",
  },
  {
    name: "Vanilla Dream",
    tagline: "Pure, classic, timeless",
    color: "#6D4C41",
    bgColor: "#FFF8E1",
    image: "/flavors/vanilla-dream.png",
    description: "A creamy vanilla favorite with a smooth finish and comforting classic flavor.",
    price: "$5.49",
    badge: "Classic",
  },
  {
    name: "Strawberry Bliss",
    tagline: "Sweet, fruity, and dreamy",
    color: "#880E4F",
    bgColor: "#FCE4EC",
    image: "/flavors/strawberry-bliss.png",
    description: "A luscious strawberry scoop bursting with bright berry flavor in every bite.",
    price: "$5.69",
    badge: "Seasonal",
  },
  {
    name: "Mint Eclipse",
    tagline: "Cool mint with chocolatey depth",
    color: "#1B5E20",
    bgColor: "#E8F5E9",
    image: "/flavors/mint-eclipse.png",
    description: "Refreshing mint ice cream paired with rich chocolate notes for a bold cool finish.",
    price: "$5.79",
    badge: "Fan Favorite",
  },
  {
    name: "Cookies & Cream",
    tagline: "Crunch meets cream",
    color: "#263238",
    bgColor: "#ECEFF1",
    image: "/flavors/cookies-and-cream.png",
    description: "A creamy base loaded with cookie pieces for the perfect balance of crunch and sweetness.",
    price: "$5.89",
    badge: "New",
  },
];

const NAV_ITEMS = [
  { label: "Flavors", href: "/flavors", active: true },
  { label: "Experience", href: "/experience" },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
];

function FlavorsNavbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [switchingTo, setSwitchingTo] = useState<string | null>(null);
  const switchTimerRef = useRef<number | null>(null);
  const navigateTimerRef = useRef<number | null>(null);

  const formatNavLabel = (label: string) => (label === "FAQ" ? "FAQ" : label);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
      if (navigateTimerRef.current) window.clearTimeout(navigateTimerRef.current);
    };
  }, []);

  const handleNavClick = (label: string, href: string) => {
    setMobileOpen(false);

    if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
    if (navigateTimerRef.current) window.clearTimeout(navigateTimerRef.current);

    setSwitchingTo(label);

    window.dispatchEvent(
      new CustomEvent("frosty-nav-transition", {
        detail: { label: formatNavLabel(label), target: href },
      }),
    );

    switchTimerRef.current = window.setTimeout(() => {
      setSwitchingTo(null);
    }, 820);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
        className={`fixed left-0 right-0 top-0 z-50 border-b-4 border-black bg-[#FFF8E1] transition-all duration-300 ${
          scrolled ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : ""
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"}`}>
            <motion.button
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              onClick={() => handleNavClick("Home", "/")}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{
                  width: scrolled ? 32 : 40,
                  height: scrolled ? 32 : 40,
                }}
                className="flex items-center justify-center bg-black"
              >
                <IceCream className="h-5 w-5 text-[#FFF8E1] sm:h-6 sm:w-6" />
              </motion.div>
              <motion.span
                animate={{ fontSize: scrolled ? "1.125rem" : "1.25rem" }}
                className="hidden font-black uppercase tracking-tight text-black sm:inline"
              >
                Frosty
              </motion.span>
            </motion.button>

            <LayoutGroup id="flavorsnavbar-nav-switch">
              <div className="relative hidden items-center gap-8 md:flex">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = Boolean(item.active);
                  const isSwitching = switchingTo === item.label;

                  return (
                    <motion.button
                      key={item.label}
                      data-nav={item.label}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        color: isSwitching
                          ? "#FFF8E1"
                          : isActive
                            ? "#000000"
                            : "rgba(0,0,0,0.55)",
                      }}
                      transition={{
                        duration: 0.3,
                        delay: 0.3 + i * 0.08,
                        color: { duration: 0.18, ease: "easeOut" },
                      }}
                      onClick={() => handleNavClick(item.label, item.href)}
                      className="group relative overflow-hidden px-1 py-1 text-sm font-bold uppercase tracking-wider"
                    >
                      <AnimatePresence initial={false}>
                        {(isSwitching || (!switchingTo && isActive)) && (
                          <motion.span
                            layoutId="nav-switch-block"
                            className="absolute -inset-x-3 inset-y-0 bg-black"
                            initial={false}
                            animate={{
                              opacity: isSwitching ? 1 : 0,
                              scaleX: isSwitching ? 1 : 0.7,
                            }}
                            exit={{ opacity: 0, scaleX: 0.85 }}
                            transition={{
                              layout: {
                                duration: 0.52,
                                ease: [0.23, 1, 0.32, 1],
                              },
                              opacity: { duration: 0.16, ease: "easeOut" },
                              scaleX: {
                                duration: 0.32,
                                ease: [0.23, 1, 0.32, 1],
                              },
                            }}
                          />
                        )}
                      </AnimatePresence>

                      <span className="relative z-10">{item.label}</span>
                      <span className="absolute left-0 -bottom-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </motion.button>
                  );
                })}
              </div>
            </LayoutGroup>

            <div className="hidden md:flex">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                onClick={() => handleNavClick("Order Now", "/order")}
                className="bg-black px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#FFF8E1] transition-all hover:bg-black/90"
              >
                Order Now
              </motion.button>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex flex-col gap-1.5 border-2 border-black p-2 md:hidden"
              aria-label="Toggle menu"
            >
              <span className={`block h-[3px] w-6 bg-black transition-transform ${mobileOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-[3px] w-6 bg-black transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-[3px] w-6 bg-black transition-transform ${mobileOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </motion.button>
          </div>

          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-t-4 border-black bg-[#FFF8E1] py-4 md:hidden"
            >
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.label, item.href)}
                    className={`px-1 py-2 text-left text-sm font-bold uppercase tracking-wider transition-colors hover:bg-black/5 ${item.active ? "text-black" : "text-black/50"}`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick("Order Now", "/order")}
                  className="mt-2 bg-black px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-[#FFF8E1]"
                >
                  Order Now
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      <AnimatePresence mode="wait">
        {switchingTo && (
          <motion.div
            key={switchingTo}
            className="pointer-events-none fixed inset-x-0 bottom-0 top-16 z-40 overflow-hidden bg-black"
            initial={{ y: "-105%" }}
            animate={{ y: "0%" }}
            exit={{ y: "105%" }}
            transition={{ duration: 0.56, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-black uppercase tracking-[0.35em] text-[#FFF8E1] sm:text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {formatNavLabel(switchingTo)}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


function AnimatedFlavorName({ name }: { name: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={name}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-wrap justify-start gap-x-2 text-3xl font-black uppercase tracking-tighter text-black sm:text-4xl md:text-5xl"
      >
        {name.split("").map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            initial={{ opacity: 0, y: 16, rotateX: -60 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.32,
              delay: index * 0.018,
              ease: [0.23, 1, 0.32, 1],
            }}
            className={char === " " ? "w-3" : "inline-block"}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

function CardSwapShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFlavor = FLAVORS[activeIndex];

  const orderedCards = useMemo(
    () =>
      FLAVORS.map((flavor, index) => ({
        flavor,
        originalIndex: index,
        offset: (index - activeIndex + FLAVORS.length) % FLAVORS.length,
      })),
    [activeIndex],
  );

  const nextFlavor = () => setActiveIndex((current) => (current + 1) % FLAVORS.length);
  const prevFlavor = () => setActiveIndex((current) => (current - 1 + FLAVORS.length) % FLAVORS.length);

  return (
    <section className="relative overflow-hidden border-b-4 border-black bg-[#FFF8E1] pt-32 pb-20 sm:pt-40 sm:pb-28">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFlavor.name}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.82 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          style={{ backgroundColor: activeFlavor.bgColor }}
        />
      </AnimatePresence>

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="mb-6 inline-flex items-center gap-2 border-2 border-black bg-black px-4 py-2 text-[#FFF8E1]">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="text-xs font-bold uppercase tracking-widest">Flavor Library</span>
          </div>

          <h1 className="max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-tighter text-black sm:text-6xl md:text-7xl lg:text-8xl">
            Find Your
            <br />
            Frosty Flavor
          </h1>

          <div className="mt-6">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-black/50">Currently craving</p>
            <div className="mt-2 flex min-h-[64px] items-center">
              <AnimatedFlavorName name={activeFlavor.name} />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFlavor.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3 }}
              className="mt-8 max-w-xl border-4 border-black bg-[#FFF8E1] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="border-2 border-black bg-black px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#FFF8E1]">
                  {activeFlavor.badge}
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-black text-black" />
                  ))}
                </div>
              </div>
              <h2 className="mt-5 text-3xl font-black uppercase tracking-tight" style={{ color: activeFlavor.color }}>
                {activeFlavor.name}
              </h2>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: activeFlavor.color, opacity: 0.72 }}>
                {activeFlavor.tagline}
              </p>
              <p className="mt-5 text-base leading-relaxed text-black/70">{activeFlavor.description}</p>
              <div className="mt-6 flex items-end justify-between gap-4 border-t-2 border-black/10 pt-5">
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-black/40">Starting at</p>
                  <span className="text-3xl font-black tracking-tight" style={{ color: activeFlavor.color }}>
                    {activeFlavor.price}
                  </span>
                </div>
                <button
                  onClick={() => triggerFrostyTransition("Order", "/order")}
                  className="inline-flex items-center gap-3 border-2 border-black bg-black px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#FFF8E1]"
                >
                  Order
                  <ShoppingBag className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="relative mx-auto h-[500px] w-full max-w-[360px] sm:h-[620px] sm:max-w-[560px]">
          <div className="absolute inset-0 border-4 border-black bg-white/40" />

          {orderedCards.map(({ flavor, originalIndex, offset }) => {
            const isActive = offset === 0;
            return (
              <motion.button
                key={flavor.name}
                type="button"
                onClick={() => setActiveIndex(originalIndex)}
                className="absolute left-1/2 top-1/2 h-[390px] w-[260px] origin-center border-4 border-black bg-[#FFF8E1] p-4 text-left shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:h-[480px] sm:w-[350px] sm:p-5"
                animate={{
                  x: `calc(-50% + ${offset * 22}px)`,
                  y: `calc(-50% + ${offset * 18}px)`,
                  rotate: offset * 3 - 4,
                  scale: 1 - offset * 0.045,
                  opacity: offset > 4 ? 0 : 1,
                  zIndex: FLAVORS.length - offset,
                }}
                transition={{ type: "spring", stiffness: 170, damping: 22 }}
                style={{ backgroundColor: flavor.bgColor }}
              >
                <div className="flex items-center justify-between">
                  <span className="border-2 border-black bg-black px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#FFF8E1]">
                    {String(originalIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-black/45">
                    {flavor.badge}
                  </span>
                </div>

                <div className="mt-5 flex h-[205px] items-center justify-center border-2 border-black/10 sm:h-[260px]" style={{ backgroundColor: `${flavor.color}18` }}>
                  <img src={flavor.image} alt={flavor.name} className="h-[232px] w-auto max-w-[86%] object-contain" draggable={false} />
                </div>

                <div className="mt-5">
                  <h3 className="text-2xl font-black uppercase leading-[0.95] tracking-tight" style={{ color: flavor.color }}>
                    {flavor.name}
                  </h3>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: flavor.color, opacity: 0.68 }}>
                    {flavor.tagline}
                  </p>
                </div>

                {isActive && (
                  <motion.div
                    layoutId="active-card-line"
                    className="absolute bottom-0 left-0 h-2 w-full bg-black"
                  />
                )}
              </motion.button>
            );
          })}

          <div className="absolute -bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-3">
            <button onClick={prevFlavor} className="flex h-12 w-12 items-center justify-center border-2 border-black bg-[#FFF8E1] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button onClick={nextFlavor} className="flex h-12 w-12 items-center justify-center border-2 border-black bg-black text-[#FFF8E1] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlavorListSection() {
  return (
    <section className="border-b-4 border-black bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex border-2 border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FFF8E1]">
              Full Menu
            </span>
            <h2 className="mt-5 text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl">
              All Five Signatures
            </h2>
          </div>
          <p className="max-w-lg text-base leading-relaxed text-black/60">
            Same products from the homepage, now with a dedicated manual flavor showcase.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {FLAVORS.map((flavor) => (
            <div key={flavor.name} className="border-2 border-black p-5" style={{ backgroundColor: flavor.bgColor }}>
              <div className="flex h-40 items-center justify-center" style={{ backgroundColor: `${flavor.color}14` }}>
                <img src={flavor.image} alt={flavor.name} className="h-32 w-auto object-contain" draggable={false} />
              </div>
              <h3 className="mt-5 min-h-[52px] text-lg font-black uppercase leading-[1.05]" style={{ color: flavor.color }}>
                {flavor.name}
              </h3>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: flavor.color, opacity: 0.65 }}>
                {flavor.tagline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlavorsFooter() {
  const navigate = useNavigate();

  return (
    <footer className="bg-black py-12 text-[#FFF8E1] sm:py-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 sm:px-6 md:flex-row lg:px-8">
        <div>
          <span className="text-2xl font-black uppercase tracking-tight">Frosty</span>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-[#FFF8E1]/50">Flavor page</p>
        </div>
        <button
          onClick={() => triggerFrostyTransition("Home", "/")}
          className="border-2 border-[#FFF8E1] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#FFF8E1] transition-all hover:bg-[#FFF8E1] hover:text-black"
        >
          Back to Home
        </button>
      </div>
    </footer>
  );
}

export default function Flavors() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="min-h-screen bg-[#FFF8E1]">
      <CardSwapShowcase />
      <ScrollVelocity
        texts={[
          "VELVET CHOCOLATE · VANILLA DREAM · STRAWBERRY BLISS · MINT ECLIPSE · COOKIES & CREAM · ",
          "FROSTY FLAVORS · CARD SWAP SHOWCASE · PICK YOUR SCOOP · ",
        ]}
        velocity={80}
        className="border-b-4 border-black bg-black py-8 text-2xl font-black uppercase tracking-tighter text-[#FFF8E1] sm:text-3xl md:text-4xl"
        numCopies={4}
      />
      <FlavorListSection />
      <FlavorsFooter />
    </motion.div>
  );
}
