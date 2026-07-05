import { motion, useScroll, useTransform, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ShoppingBag, ArrowRight, IceCream, Award, Truck, Heart, Star, Leaf, ChevronDown, Sparkles, Zap } from "lucide-react";
import RotatingText from "@/components/RotatingText";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollVelocity from "@/components/ScrollVelocity";
import CircularText from "@/components/CircularText";
import ChatConversation from "@/components/ChatConversation";
import { triggerFrostyTransition } from "@/lib/frostyTransition";

const FLAVORS = [
  {
    name: "Velvet Chocolate",
    tagline: "Deep, rich, and utterly indulgent",
    color: "#5A2418",
    bgColor: "#F4E4DF",
    accent: "#5A2418",
    image: `${import.meta.env.BASE_URL}flavors/velvet-chocolate.png`,
    description: "Made with rich cocoa and a velvety smooth texture for the ultimate chocolate lover.",
    price: "$5.99",
    badge: "Bestseller",
  },
  {
    name: "Vanilla Dream",
    tagline: "Pure, classic, timeless",
    color: "#6D4C41",
    bgColor: "#FFF8E1",
    accent: "#3E2723",
    image: `${import.meta.env.BASE_URL}flavors/vanilla-dream.png`,
    description: "A creamy vanilla favorite with a smooth finish and comforting classic flavor.",
    price: "$5.49",
    badge: "Classic",
  },
  {
    name: "Strawberry Bliss",
    tagline: "Sweet, fruity, and dreamy",
    color: "#880E4F",
    bgColor: "#FCE4EC",
    accent: "#3E2723",
    image: `${import.meta.env.BASE_URL}flavors/strawberry-bliss.png`,
    description: "A luscious strawberry scoop bursting with bright berry flavor in every bite.",
    price: "$5.69",
    badge: "Seasonal",
  },
  {
    name: "Mint Eclipse",
    tagline: "Cool mint with chocolatey depth",
    color: "#1B5E20",
    bgColor: "#E8F5E9",
    accent: "#1B5E20",
    image: `${import.meta.env.BASE_URL}flavors/mint-eclipse.png`,
    description: "Refreshing mint ice cream paired with rich chocolate notes for a bold cool finish.",
    price: "$5.79",
    badge: "Fan Favorite",
  },
  {
    name: "Cookies & Cream",
    tagline: "Crunch meets cream",
    color: "#263238",
    bgColor: "#ECEFF1",
    accent: "#3E2723",
    image: `${import.meta.env.BASE_URL}flavors/cookies-and-cream.png`,
    description: "A creamy base loaded with cookie pieces for the perfect balance of crunch and sweetness.",
    price: "$5.89",
    badge: "New",
  },
];

const NAV_ITEMS = ["flavors", "experience", "reviews", "faq"];

function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("flavors");
  const [switchingTo, setSwitchingTo] = useState<string | null>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const switchTimerRef = useRef<number | null>(null);

  const formatNavLabel = (id: string) =>
    id === "faq" ? "FAQ" : id.charAt(0).toUpperCase() + id.slice(1);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
    };
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);

    if (scrollTimerRef.current) window.clearTimeout(scrollTimerRef.current);
    if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);

    setSwitchingTo(id);

    const target = id === "flavors" || id === "experience" ? `/${id}` : `/#${id}`;

    window.dispatchEvent(
      new CustomEvent("frosty-nav-transition", {
        detail: { label: formatNavLabel(id), target },
      }),
    );

    if (id !== "flavors" && id !== "experience") {
      scrollTimerRef.current = window.setTimeout(() => {
        setActiveSection(id);
      }, activeSection === id ? 80 : 260);
    }

    switchTimerRef.current = window.setTimeout(() => {
      setSwitchingTo(null);
    }, 820);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
          mass: 0.8,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#FFF8E1] border-b-4 border-black ${
          scrolled ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"}`}>
            {/* Logo - left */}
            <motion.button
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2"
            >
              <motion.div
                animate={{
                  width: scrolled ? 32 : 40,
                  height: scrolled ? 32 : 40,
                }}
                className="bg-black flex items-center justify-center"
              >
                <IceCream className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFF8E1]" />
              </motion.div>
              <motion.span
                animate={{ fontSize: scrolled ? "1.125rem" : "1.25rem" }}
                className="font-black uppercase tracking-tight text-black hidden sm:inline"
              >
                Frosty
              </motion.span>
            </motion.button>

            {/* Desktop Nav - hover underline + temporary switching animation */}
            <LayoutGroup id="frosty-nav-switch">
              <div className="hidden md:flex items-center gap-8 relative">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeSection === item;
                  const isSwitching = switchingTo === item;

                  return (
                    <motion.button
                      key={item}
                      data-nav={item}
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
                      onClick={() => handleNavClick(item)}
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

                      <span className="relative z-10">{item}</span>

                      {/* Underline appears only on hover, not as the active state */}
                      <span className="absolute left-0 -bottom-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
                    </motion.button>
                  );
                })}
              </div>
            </LayoutGroup>

            {/* Desktop CTA */}
            <div className="hidden md:flex">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                onClick={() => handleNavClick("order")}
                className="bg-black text-[#FFF8E1] px-5 py-2 text-xs font-bold uppercase tracking-widest border-2 border-black hover:bg-black/90 transition-all"
              >
                Order Now
              </motion.button>
            </div>

            {/* Mobile trigger */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 border-2 border-black"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-[3px] bg-black transition-transform ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`block w-6 h-[3px] bg-black transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-[3px] bg-black transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </motion.button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden border-t-4 border-black py-4 bg-[#FFF8E1]"
            >
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`text-sm font-bold uppercase tracking-wider py-2 px-1 hover:bg-black/5 transition-colors text-left ${activeSection === item ? "text-black" : "text-black/50"}`}
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={() => handleNavClick("order")}
                  className="bg-black text-[#FFF8E1] px-5 py-3 text-xs font-bold uppercase tracking-widest text-center mt-2"
                >
                  Order Now
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Page-switch wipe triggered by nav clicks */}
      <AnimatePresence mode="wait">
        {switchingTo && (
          <motion.div
            key={switchingTo}
            className="fixed inset-x-0 top-16 bottom-0 z-40 pointer-events-none overflow-hidden bg-black"
            initial={{ y: "-105%" }}
            animate={{ y: "0%" }}
            exit={{ y: "105%" }}
            transition={{ duration: 0.56, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FFF8E1] text-xs sm:text-sm font-black uppercase tracking-[0.35em]"
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

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFF8E1] border-b-4 border-black"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Decorative beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-48 w-[500px] h-[500px] bg-black/[0.03] rotate-12" />
        <div className="absolute bottom-1/3 -right-48 w-[500px] h-[500px] bg-black/[0.03] -rotate-12" />
      </div>

      {/* Hero content */}
      <motion.div
        style={{ y: backgroundY, opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 py-24 sm:py-32"
      >
        {/* Centered Logo Mark - big and prominent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col items-center mb-10 sm:mb-14"
        >
          {/* Logo icon */}
          <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-black flex items-center justify-center mb-4 sm:mb-6 border-4 border-black">
            <IceCream className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#FFF8E1]" />
          </div>

          {/* Logo text */}
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black uppercase tracking-tighter text-black leading-none">
            Frosty
          </h1>

          {/* Tagline */}
          <div className="flex items-center gap-3 mt-3 sm:mt-4">
            <span className="w-8 h-[2px] bg-black/30" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-black/50">
              Artisan Ice Cream
            </span>
            <span className="w-8 h-[2px] bg-black/30" />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-black text-[#FFF8E1] px-4 py-2 border-2 border-black">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              Five Signature Flavors
            </span>
          </div>
        </motion.div>

        {/* Rotating action text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider text-black/60">
            Find Your
          </p>
          <div className="mt-1 sm:mt-2 flex justify-center">
            <RotatingText
              texts={["Velvet Chocolate", "Vanilla Dream", "Strawberry Bliss", "Mint Eclipse", "Cookies & Cream"]}
              rotationInterval={2200}
              mainClassName="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-black"
              splitBy="characters"
              staggerDuration={0.015}
              transition={{ type: "spring", damping: 20, stiffness: 180 }}
            />
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => triggerFrostyTransition("Flavors", "/flavors")}
            className="inline-flex w-full max-w-xs items-center justify-center gap-3 bg-black text-[#FFF8E1] px-8 py-4 text-sm font-bold uppercase tracking-widest border-2 border-black hover:bg-black/90 transition-all group sm:w-auto sm:max-w-none sm:px-10 sm:py-5"
          >
            Explore Flavors
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => triggerFrostyTransition("Reviews", "/reviews")}
            className="inline-flex w-full max-w-xs items-center justify-center gap-2 bg-transparent text-black px-8 py-4 text-sm font-bold uppercase tracking-widest border-2 border-black hover:bg-black/5 transition-all sm:w-auto sm:max-w-none sm:px-10 sm:py-5"
          >
            <Zap className="w-4 h-4" />
            See the Hype
          </button>
        </motion.div>

        {/* Decorative circular text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 sm:mt-16 flex items-center justify-center"
        >
          <div className="relative w-[160px] h-[160px] flex items-center justify-center">
            <CircularText
              text="FROSTY · ICE CREAM · SINCE 2024 · "
              spinDuration={22}
              onHover="speedUp"
              radius={62}
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl leading-none">🍦</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FlavorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredFlavor, setHoveredFlavor] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleCardEnter = (flavorName: string, e: { clientX: number; clientY: number }) => {
    setHoveredFlavor(flavorName);
    const section = sectionRef.current;
    if (section) {
      const rect = section.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleCardLeave = () => {
    setHoveredFlavor(null);
  };

  const activeFlavor = FLAVORS.find((f) => f.name === hoveredFlavor);
  const targetBg = activeFlavor ? activeFlavor.bgColor : "#ffffff";

  return (
    <section
      ref={sectionRef}
      id="flavors"
      className="relative py-24 sm:py-32 border-b-4 border-black overflow-hidden"
    >
      {/* Animated background overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: targetBg }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      />

      {/* Expanding circle overlay (MagicUI-style) */}
      <AnimatePresence>
        {hoveredFlavor && (
          <motion.div
            key={hoveredFlavor}
            className="absolute inset-0 pointer-events-none"
            initial={{
              clipPath: `circle(0% at ${mousePos.x}px ${mousePos.y}px)`,
            }}
            animate={{
              clipPath: `circle(150% at ${mousePos.x}px ${mousePos.y}px)`,
            }}
            exit={{
              clipPath: `circle(0% at ${mousePos.x}px ${mousePos.y}px)`,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            transition={{
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{ backgroundColor: targetBg }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Section header */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-black text-[#FFF8E1] px-4 py-2 mb-6 border-2 border-black"
          >
            <IceCream className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-widest">Our Signature Collection</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-black">
            Five Flavors
            <br />
            <span className="text-5xl sm:text-6xl md:text-7xl">One Love</span>
          </h2>
          <ScrollReveal containerClassName="mt-4 sm:mt-6" textClassName="text-base sm:text-lg text-black/60 max-w-xl mx-auto justify-center">
            Each flavor is a labor of love — crafted in small batches with the finest ingredients from around the world.
          </ScrollReveal>
        </div>

        {/* Flavor cards - uniform size with whitespace */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6 sm:gap-8 xl:gap-10 2xl:gap-12 items-stretch">
          {FLAVORS.map((flavor, index) => (
            <motion.div
              key={flavor.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              viewport={{ once: true, margin: "-50px" }}
              className="h-full max-w-[250px] sm:max-w-none mx-auto w-full"
            >
              <Flavor3DCard
                flavor={flavor}
                onHoverEnter={handleCardEnter}
                onHoverLeave={handleCardLeave}
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <div className="mt-12 text-center sm:hidden">
          <p className="text-xs font-bold uppercase tracking-wider text-black/50">
            Scroll to explore all flavors
          </p>
          <ChevronDown className="w-5 h-5 mx-auto mt-2 text-black/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function Flavor3DCard({
  flavor,
  onHoverEnter,
  onHoverLeave,
}: {
  flavor: (typeof FLAVORS)[0];
  onHoverEnter: (name: string, e: { clientX: number; clientY: number }) => void;
  onHoverLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const touchActiveRef = useRef(false);

  const applyCardMotion = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 7;
    const rotateX = -((y - centerY) / centerY) * 7;
    const liftX = ((x - centerX) / centerX) * 5;
    const liftY = ((y - centerY) / centerY) * 5;

    cardRef.current.style.transition = "transform 120ms ease-out";
    cardRef.current.style.transform = `translate3d(${liftX}px, ${liftY}px, 0) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  };

  const resetCardMotion = () => {
    if (!cardRef.current) return;

    cardRef.current.style.transition = "transform 500ms ease-out";
    cardRef.current.style.transform = "translate3d(0px, 0px, 0) rotateY(0deg) rotateX(0deg)";
    onHoverLeave();
  };

  useEffect(() => {
    const handleGlobalTouchEnd = () => {
      if (!touchActiveRef.current) return;
      touchActiveRef.current = false;
      resetCardMotion();
    };

    window.addEventListener("touchend", handleGlobalTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, []);

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    onHoverEnter(flavor.name, e);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || e.pointerType === "pen") {
      touchActiveRef.current = true;

      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Some browsers may ignore pointer capture during scroll gestures.
      }
    }

    onHoverEnter(flavor.name, e);
    applyCardMotion(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    onHoverEnter(flavor.name, e);
    applyCardMotion(e.clientX, e.clientY);
  };

  const handlePointerLeave = () => {
    if (touchActiveRef.current) return;
    resetCardMotion();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || e.pointerType === "pen") {
      touchActiveRef.current = false;

      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore release errors.
      }
    }

    resetCardMotion();
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;

    touchActiveRef.current = true;
    onHoverEnter(flavor.name, touch);
    applyCardMotion(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;

    touchActiveRef.current = true;
    onHoverEnter(flavor.name, touch);
    applyCardMotion(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    touchActiveRef.current = false;
    resetCardMotion();
  };

  return (
    <div
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative border-2 border-black transition-all duration-500 ease-out cursor-pointer group h-full min-h-[500px] sm:min-h-[560px] 2xl:min-h-[580px] flex flex-col touch-pan-y"
      style={{ backgroundColor: flavor.bgColor, transformStyle: "preserve-3d" }}
    >
      {/* Badge */}
      <div className="absolute -top-3 -right-3 z-10">
        <div
          className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest border-2 border-black ${
            flavor.badge === "Bestseller"
              ? "bg-black text-[#FFF8E1]"
              : flavor.badge === "New"
                ? "bg-[#A5D6A7] text-black"
                : flavor.badge === "Fan Favorite"
                  ? "bg-[#F48FB1] text-black"
                  : "bg-white text-black"
          }`}
        >
          {flavor.badge}
        </div>
      </div>

      {/* Product image */}
      <div
        className="relative flex items-center justify-center px-4 pt-6 pb-4 sm:px-5 sm:pt-8 sm:pb-5"
        style={{ transform: "translateZ(20px)" }}
      >
        <div
          className="relative flex h-[190px] sm:h-[220px] 2xl:h-[228px] w-full items-center justify-center overflow-hidden"
          style={{ backgroundColor: `${flavor.color}1A` }}
        >
          <img
            src={flavor.image}
            alt={flavor.name}
            className="block h-[160px] sm:h-[184px] 2xl:h-[192px] w-auto max-w-[82%] object-contain object-center select-none"
            draggable={false}
          />
        </div>
      </div>

      {/* Content - flex-1 to fill remaining space evenly */}
      <div
        className="flex flex-col flex-1 px-4 pb-6 sm:px-6 sm:pb-8"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className="mb-3 min-h-[102px]">
          <h3
            className="min-h-[56px] text-base sm:text-lg font-black uppercase tracking-tight leading-[1.1]"
            style={{ color: flavor.color }}
          >
            {flavor.name}
          </h3>
          <p className="mt-2 text-xs sm:text-sm font-semibold text-black/60 leading-relaxed">
            {flavor.tagline}
          </p>
        </div>

        <p className="mb-4 min-h-[72px] text-xs sm:text-sm text-black/50 leading-relaxed flex-1">
          {flavor.description}
        </p>

        <div className="mt-auto pt-4 border-t-2 border-black/10 flex items-center justify-between gap-3">
          <span className="text-xl sm:text-2xl font-black" style={{ color: flavor.color }}>
            {flavor.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => triggerFrostyTransition("Order", "/order")}
            className="px-4 py-2 bg-black text-[#FFF8E1] text-xs font-bold uppercase tracking-wider"
          >
            Order
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Premium Ingredients",
      description: "We source only the finest vanilla from Madagascar, cocoa from Belgium, and strawberries from California.",
      color: "#3E2723",
      bgColor: "#FFF8E1",
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Delivery",
      description: "Free delivery on all orders over $25. We pack your ice cream in dry ice to keep it perfectly frozen.",
      color: "#1B5E20",
      bgColor: "#E8F5E9",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Small Batches",
      description: "Every batch is hand-crafted in small quantities to ensure the highest quality and freshest taste.",
      color: "#880E4F",
      bgColor: "#FCE4EC",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Eco-Friendly",
      description: "Our pint containers are 100% compostable. We offset 200% of our carbon footprint through reforestation.",
      color: "#4E342E",
      bgColor: "#ECEFF1",
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 sm:py-28 bg-[#FFF8E1] border-b-4 border-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-black text-[#FFF8E1] px-4 py-2 mb-6 border-2 border-black"
          >
            <Award className="w-3.5 h-3.5" />
            <span className="text-xs font-bold uppercase tracking-widest">The Frosty Difference</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter text-black">
            Why Frosty?
          </h2>
          <ScrollReveal containerClassName="mt-4 sm:mt-6" textClassName="text-base sm:text-lg text-black/60 max-w-xl mx-auto justify-center">
            We obsess over every detail so you can enjoy every spoonful.
          </ScrollReveal>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-2 border-black p-6 sm:p-8 flex flex-col sm:flex-row gap-5 sm:gap-6 items-start"
              style={{ backgroundColor: feature.bgColor }}
            >
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0 border-2 border-black"
                style={{ backgroundColor: feature.color, color: "#FFF8E1" }}
              >
                {feature.icon}
              </div>
              <div>
                <h3
                  className="text-lg sm:text-xl font-black uppercase tracking-tight mb-2"
                  style={{ color: feature.color }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-black/70">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollVelocitySection() {
  return (
    <div className="border-b-4 border-black overflow-hidden bg-black py-8">
      <ScrollVelocity
        texts={[
          "FROSTY ICE CREAM · ARTISAN CRAFTED · SMALL BATCH · PREMIUM INGREDIENTS · ",
          "TASTE THE DIFFERENCE · SCOOP BY SCOOP · PURE JOY · ",
        ]}
        velocity={80}
        className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-[#FFF8E1]"
        numCopies={4}
      />
    </div>
  );
}

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-black text-[#FFF8E1] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#FFF8E1] flex items-center justify-center">
              <IceCream className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#FFF8E1]">
                Frosty
              </span>
              <p className="text-xs font-bold uppercase tracking-widest text-[#FFF8E1]/50">
                Artisan Ice Cream
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => triggerFrostyTransition(item === "faq" ? "FAQ" : item.charAt(0).toUpperCase() + item.slice(1), `/${item}`)}
                className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#FFF8E1]/70 hover:text-[#FFF8E1] transition-colors"
              >
                {item === "faq" ? "FAQ" : item}
              </button>
            ))}
          </div>

          {/* Auth */}
          <button
            onClick={() => triggerFrostyTransition("Order", "/order")}
            className="border-2 border-[#FFF8E1] text-[#FFF8E1] hover:bg-[#FFF8E1] hover:text-black transition-all px-6 py-3 text-xs font-bold uppercase tracking-widest"
          >
            <ShoppingBag className="w-4 h-4 inline mr-2" />
            Order Now
          </button>
        </div>

        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t-2 border-[#FFF8E1]/20 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-[#FFF8E1]/40">
            &copy; {new Date().getFullYear()} Frosty Ice Cream Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#FFF8E1]"
    >
      <HeroSection />
      <ScrollVelocitySection />
      <FlavorsSection />
      <FeaturesSection />
      <ChatConversation />
      <Footer />
    </motion.div>
  );
}
