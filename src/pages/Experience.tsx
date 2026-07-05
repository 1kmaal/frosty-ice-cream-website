import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Box,
  CheckCircle2,
  Clock,
  Heart,
  IceCream,
  Leaf,
  PackageCheck,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Truck,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollVelocity from "@/components/ScrollVelocity";
import { triggerFrostyTransition } from "@/lib/frostyTransition";

const EXPERIENCE_WORDS = [
  "Small Batch",
  "Premium Ingredients",
  "Perfect Texture",
  "Delivered Cold",
  "Made To Feel Special",
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Choose The Flavor",
    description: "Start with one of Frosty's five signatures, then build the kind of moment you are craving.",
    icon: IceCream,
    color: "#5A2418",
    bgColor: "#F4E4DF",
  },
  {
    number: "02",
    title: "Packed Fresh",
    description: "Each order is prepared with care, sealed cleanly, and packed so the product still feels premium when it arrives.",
    icon: PackageCheck,
    color: "#6D4C41",
    bgColor: "#FFF8E1",
  },
  {
    number: "03",
    title: "Kept Frozen",
    description: "Cold handling is part of the experience, not an afterthought. Texture matters from freezer to first scoop.",
    icon: Snowflake,
    color: "#1B5E20",
    bgColor: "#E8F5E9",
  },
  {
    number: "04",
    title: "Delivered Fast",
    description: "The final step is simple: get it to you quickly, neatly, and ready to enjoy.",
    icon: Truck,
    color: "#263238",
    bgColor: "#ECEFF1",
  },
];

const EXPERIENCE_DETAILS = [
  {
    title: "Premium Ingredients",
    description: "Rich cocoa, creamy vanilla, bright strawberry, cool mint, and cookie pieces chosen to taste bold without feeling messy.",
    icon: Award,
    color: "#5A2418",
    bgColor: "#F4E4DF",
    className: "md:col-span-2",
  },
  {
    title: "Small Batch Feel",
    description: "A slower, more careful approach so every scoop feels intentional.",
    icon: Heart,
    color: "#880E4F",
    bgColor: "#FCE4EC",
    className: "md:col-span-1",
  },
  {
    title: "Texture First",
    description: "The experience is built around the first spoonful: dense, smooth, cold, and satisfying.",
    icon: Snowflake,
    color: "#1B5E20",
    bgColor: "#E8F5E9",
    className: "md:col-span-1",
  },
  {
    title: "Better Packaging",
    description: "Clean presentation, strong labels, and a box that should feel like opening something worth waiting for.",
    icon: Box,
    color: "#263238",
    bgColor: "#ECEFF1",
    className: "md:col-span-2",
  },
];

const DETAIL_TABS = [
  {
    label: "Texture",
    title: "Dense. Smooth. Cold.",
    description: "The product should feel premium before you even think about the flavor. That means the scoop needs weight, smoothness, and a clean finish.",
    icon: Snowflake,
    color: "#1B5E20",
    bgColor: "#E8F5E9",
  },
  {
    label: "Flavor",
    title: "Bold, But Not Loud.",
    description: "Every flavor has a clear identity. Chocolate should feel rich, mint should feel cool, strawberry should feel bright, and cookies should actually taste like cookies.",
    icon: IceCream,
    color: "#5A2418",
    bgColor: "#F4E4DF",
  },
  {
    label: "Packaging",
    title: "Looks Good In Your Hand.",
    description: "The container is part of the brand. Simple, centered, bold, and clean enough to feel like a premium product.",
    icon: PackageCheck,
    color: "#263238",
    bgColor: "#ECEFF1",
  },
  {
    label: "Delivery",
    title: "Still Frozen. Still Fresh.",
    description: "Delivery should not ruin the product. The goal is a cold, neat arrival that feels as considered as the flavor itself.",
    icon: Truck,
    color: "#6D4C41",
    bgColor: "#FFF8E1",
  },
];

const NAV_ITEMS = [
  { label: "Flavors", href: "/flavors" },
  { label: "Experience", href: "/experience", active: true },
  { label: "Reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
];

function ExperienceNavbar() {
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

            <LayoutGroup id="experiencenavbar-nav-switch">
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
                onClick={() => handleNavClick("Explore Flavors", "/flavors")}
                className="bg-black px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#FFF8E1] transition-all hover:bg-black/90"
              >
                Explore Flavors
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
                  onClick={() => handleNavClick("Explore Flavors", "/flavors")}
                  className="mt-2 bg-black px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-[#FFF8E1]"
                >
                  Explore Flavors
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


function AnimatedExperienceWord() {
  const [index, setIndex] = useState(0);
  const word = EXPERIENCE_WORDS[index];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % EXPERIENCE_WORDS.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={word}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-wrap justify-center gap-x-2 text-3xl font-black uppercase tracking-tighter text-black sm:text-4xl md:text-5xl"
      >
        {word.split("").map((char, charIndex) => (
          <motion.span
            key={`${char}-${charIndex}`}
            initial={{ opacity: 0, y: 16, rotateX: -60 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.32,
              delay: charIndex * 0.018,
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

function ExperienceHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden border-b-4 border-black bg-[#FFF8E1] pt-24">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="absolute left-6 top-28 hidden border-4 border-black bg-[#F4E4DF] p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:block"
        initial={{ opacity: 0, x: -30, rotate: -4 }}
        animate={{ opacity: 1, x: 0, rotate: -4 }}
        transition={{ duration: 0.55, delay: 0.45 }}
      >
        <PackageCheck className="h-10 w-10 text-black" />
        <p className="mt-3 text-xs font-black uppercase tracking-widest text-black/55">Packed Fresh</p>
      </motion.div>

      <motion.div
        className="absolute bottom-24 right-8 hidden border-4 border-black bg-[#E8F5E9] p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:block"
        initial={{ opacity: 0, x: 30, rotate: 5 }}
        animate={{ opacity: 1, x: 0, rotate: 5 }}
        transition={{ duration: 0.55, delay: 0.6 }}
      >
        <Snowflake className="h-10 w-10 text-black" />
        <p className="mt-3 text-xs font-black uppercase tracking-widest text-black/55">Cold Arrival</p>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-6 inline-flex items-center gap-2 border-2 border-black bg-black px-4 py-2 text-[#FFF8E1]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs font-bold uppercase tracking-widest">The Frosty Difference</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-black sm:text-6xl md:text-8xl lg:text-9xl"
        >
          The Frosty
          <br />
          Experience
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28 }}
          className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-black/65 sm:text-lg"
        >
          Not just ice cream. A whole moment built around the scoop, the packaging, the cold arrival, and the first bite.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.42 }}
          className="mt-8"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-black/45">Built around</p>
          <div className="flex min-h-[64px] items-center justify-center">
            <AnimatedExperienceWord />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="border-b-4 border-black bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center sm:mb-20">
          <span className="inline-flex border-2 border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FFF8E1]">
            Scoop Process
          </span>
          <h2 className="mt-5 text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl md:text-6xl">
            From Craving
            <br />
            <span className="text-5xl sm:text-6xl md:text-7xl">To First Scoop</span>
          </h2>
          <ScrollReveal containerClassName="mt-4 sm:mt-6" textClassName="text-base sm:text-lg text-black/60 max-w-xl mx-auto justify-center">
            The experience is designed to feel clear, simple, cold, and premium from the moment you choose a flavor.
          </ScrollReveal>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-80px" }}
                className="relative min-h-[330px] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                style={{ backgroundColor: step.bgColor }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-5xl font-black tracking-tighter text-black/15">{step.number}</span>
                  <div className="flex h-14 w-14 items-center justify-center border-2 border-black bg-black text-[#FFF8E1]">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <h3 className="mt-12 text-2xl font-black uppercase leading-[1] tracking-tight" style={{ color: step.color }}>
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-black/68">{step.description}</p>

                {index < PROCESS_STEPS.length - 1 && (
                  <div className="absolute -right-6 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center border-2 border-black bg-black text-[#FFF8E1] md:flex">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function BentoExperienceSection() {
  return (
    <section className="border-b-4 border-black bg-[#FFF8E1] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex border-2 border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FFF8E1]">
              Detail System
            </span>
            <h2 className="mt-5 text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl md:text-6xl">
              Why It Feels
              <br />
              Premium
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-black/60">
            Every detail is built around texture, temperature, and that first perfect scoop.
          </p>
        </div>

        <div className="grid auto-rows-[260px] gap-7 md:grid-cols-3">
          {EXPERIENCE_DETAILS.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <motion.div
                key={detail.title}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true, margin: "-80px" }}
                className={`group relative overflow-hidden border-4 border-black p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${detail.className}`}
                style={{ backgroundColor: detail.bgColor }}
              >
                <div
                  className="absolute -right-12 -top-12 h-40 w-40 border-4 border-black opacity-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                  style={{ backgroundColor: detail.color }}
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-black text-[#FFF8E1]">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.25em] text-black/35">
                      0{index + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight" style={{ color: detail.color }}>
                      {detail.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-black/68">{detail.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InteractiveDetailsSection() {
  const [active, setActive] = useState(0);
  const activeDetail = DETAIL_TABS[active];
  const Icon = activeDetail.icon;

  return (
    <section className="border-b-4 border-black bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <span className="inline-flex border-2 border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FFF8E1]">
            Click A Detail
          </span>
          <h2 className="mt-5 text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl">
            The Feeling
            <br />
            Explained
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-black/60">
            Choose what part of the experience you want to understand. The page reacts without changing into another design.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {DETAIL_TABS.map((detail, index) => (
              <button
                key={detail.label}
                onClick={() => setActive(index)}
                className={`border-2 border-black px-4 py-4 text-left text-xs font-black uppercase tracking-widest transition-all ${
                  active === index ? "bg-black text-[#FFF8E1]" : "bg-[#FFF8E1] text-black hover:bg-black/5"
                }`}
              >
                {detail.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDetail.label}
            initial={{ opacity: 0, y: 24, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -24, rotate: 1 }}
            transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
            className="relative min-h-[440px] border-4 border-black p-7 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:p-9"
            style={{ backgroundColor: activeDetail.bgColor }}
          >
            <div
              className="absolute inset-6 border-2 border-black/10"
              style={{ backgroundColor: `${activeDetail.color}14` }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-start justify-between gap-6">
                <div className="flex h-20 w-20 items-center justify-center border-4 border-black bg-black text-[#FFF8E1]">
                  <Icon className="h-9 w-9" />
                </div>
                <CheckCircle2 className="h-8 w-8 text-black" />
              </div>

              <div className="mt-20">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-black/45">{activeDetail.label}</p>
                <h3 className="text-5xl font-black uppercase leading-[0.92] tracking-tighter sm:text-6xl" style={{ color: activeDetail.color }}>
                  {activeDetail.title}
                </h3>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/68">{activeDetail.description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ClosingCTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-[#FFF8E1] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl border-4 border-black bg-black px-6 py-14 text-center text-[#FFF8E1] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:px-10">
        <Clock className="mx-auto h-10 w-10" />
        <h2 className="mt-6 text-4xl font-black uppercase leading-[0.95] tracking-tighter sm:text-6xl">
          Ready For Your
          <br />
          First Frosty Moment?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#FFF8E1]/65">
          Start with the flavor page, then pick the scoop that feels most like you.
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <button
            onClick={() => triggerFrostyTransition("Flavors", "/flavors")}
            className="inline-flex w-full items-center justify-center gap-3 border-2 border-[#FFF8E1] bg-[#FFF8E1] px-8 py-4 sm:w-auto text-xs font-bold uppercase tracking-widest text-black"
          >
            Explore Flavors
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => triggerFrostyTransition("Home", "/")}
            className="inline-flex w-full items-center justify-center gap-3 border-2 border-[#FFF8E1] px-8 py-4 sm:w-auto text-xs font-bold uppercase tracking-widest text-[#FFF8E1]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Experience() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="min-h-screen bg-[#FFF8E1]">
      <ExperienceHero />
      <ScrollVelocity
        texts={[
          "SMALL BATCH · PREMIUM INGREDIENTS · PERFECT TEXTURE · DELIVERED COLD · ",
          "THE FROSTY EXPERIENCE · FROM CRAVING TO FIRST SCOOP · ",
        ]}
        velocity={72}
        className="border-b-4 border-black bg-black py-8 text-2xl font-black uppercase tracking-tighter text-[#FFF8E1] sm:text-3xl md:text-4xl"
        numCopies={4}
      />
      <ProcessSection />
      <BentoExperienceSection />
      <InteractiveDetailsSection />
      <ClosingCTA />
    </motion.div>
  );
}
