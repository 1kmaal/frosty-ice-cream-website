import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { IceCream } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

const NAV_ITEMS = ["flavors", "experience", "reviews", "faq", "signup"];

export default function SiteNavbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("flavors");
  const [switchingTo, setSwitchingTo] = useState<string | null>(null);
  const activeTimerRef = useRef<number | null>(null);
  const switchTimerRef = useRef<number | null>(null);

  const formatNavLabel = (id: string) => {
    if (id === "faq") return "FAQ";
    if (id === "signup") return "Sign Up";
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  const getTarget = (id: string) => {
    if (id === "flavors" || id === "experience" || id === "reviews" || id === "faq" || id === "order" || id === "signup") return `/${id}`;
    return `/#${id}`;
  };

  const currentActive =
    location.pathname === "/flavors"
      ? "flavors"
      : location.pathname === "/experience"
        ? "experience"
        : location.pathname === "/reviews"
          ? "reviews"
          : location.pathname === "/faq"
            ? "faq"
            : location.pathname === "/signup"
              ? "signup"
              : location.pathname === "/order"
                ? "order"
                : activeSection;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (activeTimerRef.current) window.clearTimeout(activeTimerRef.current);
      if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);
    };
  }, []);

  if (location.pathname === "/auth") return null;

  const handleNavClick = (id: string) => {
    setMobileOpen(false);

    if (activeTimerRef.current) window.clearTimeout(activeTimerRef.current);
    if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);

    setSwitchingTo(id);

    window.dispatchEvent(
      new CustomEvent("frosty-nav-transition", {
        detail: { label: formatNavLabel(id), target: getTarget(id) },
      }),
    );

    activeTimerRef.current = window.setTimeout(() => {
      setActiveSection(id);
    }, currentActive === id ? 80 : 260);

    switchTimerRef.current = window.setTimeout(() => {
      setSwitchingTo(null);
    }, 820);
  };

  const handleLogoClick = () => {
    setMobileOpen(false);

    if (switchTimerRef.current) window.clearTimeout(switchTimerRef.current);

    setSwitchingTo("home");

    window.dispatchEvent(
      new CustomEvent("frosty-nav-transition", {
        detail: { label: "Home", target: "/" },
      }),
    );

    switchTimerRef.current = window.setTimeout(() => {
      setSwitchingTo(null);
    }, 820);
  };

  return (
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
          <motion.button
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            onClick={handleLogoClick}
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

          <LayoutGroup id="frosty-nav-switch">
            <div className="hidden xl:flex items-center gap-5 2xl:gap-8 relative">
              {NAV_ITEMS.map((item, i) => {
                const isActive = currentActive === item;
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
                    className="group relative overflow-hidden px-1 py-1 text-xs 2xl:text-sm font-bold uppercase tracking-wider"
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

                    <span className="relative z-10">{formatNavLabel(item)}</span>
                    <span className="absolute left-0 -bottom-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="hidden xl:flex">
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

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden flex flex-col gap-1.5 p-2 border-2 border-black"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[3px] bg-black transition-transform ${mobileOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block w-6 h-[3px] bg-black transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[3px] bg-black transition-transform ${mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </motion.button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:hidden border-t-4 border-black py-4 bg-[#FFF8E1] max-h-[calc(100vh-5rem)] overflow-y-auto"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className={`text-xs 2xl:text-sm font-bold uppercase tracking-wider py-2 px-1 hover:bg-black/5 transition-colors text-left ${currentActive === item ? "text-black" : "text-black/50"}`}
                >
                  {formatNavLabel(item)}
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
  );
}
