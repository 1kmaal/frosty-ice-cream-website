import '@vly-ai/integrations';
import { Toaster } from "@/components/ui/sonner";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router";
import "./index.css";
import "./types/global.d.ts";

import Landing from "./pages/Landing.tsx";
import AuthPage from "./pages/Auth.tsx";
import FlavorsPage from "./pages/Flavors.tsx";
import ExperiencePage from "./pages/Experience.tsx";
import ReviewsPage from "./pages/Reviews.tsx";
import FAQPage from "./pages/FAQ.tsx";
import ContactPage from "./pages/Contact.tsx";
import OrderPage from "./pages/Order.tsx";
import PaymentPage from "./pages/Payment.tsx";
import SignupPage from "./pages/Signup.tsx";
import NotFound from "./pages/NotFound.tsx";
import SiteNavbar from "./components/SiteNavbar.tsx";

const convexUrl =
  (import.meta.env.VITE_CONVEX_URL as string | undefined) ||
  "https://placeholder.convex.cloud";

const convex = new ConvexReactClient(convexUrl);



function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [pathname]);

  return null;
}

function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}

function FrostyNavTransition() {
  const navigate = useNavigate();
  const location = useLocation();
  const [switchingTo, setSwitchingTo] = useState<string | null>(null);
  const navigateTimerRef = useRef<number | null>(null);
  const clearTimerRef = useRef<number | null>(null);
  const locationRef = useRef(location.pathname);

  useEffect(() => {
    locationRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    const handleTransition = (event: Event) => {
      const detail = (event as CustomEvent<{ label: string; target: string }>).detail;
      if (!detail?.target) return;

      if (navigateTimerRef.current) window.clearTimeout(navigateTimerRef.current);
      if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current);

      setSwitchingTo(detail.label);

      navigateTimerRef.current = window.setTimeout(() => {
        const target = detail.target;

        if (target.startsWith("/#")) {
          const sectionId = target.replace("/#", "");

          if (locationRef.current !== "/") {
            navigate("/");
            window.setTimeout(() => {
              document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 80);
          } else {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
          }

          return;
        }

        if (target === "/") {
          navigate("/");
          window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 80);
          return;
        }

        navigate(target);
      }, 260);

      clearTimerRef.current = window.setTimeout(() => {
        setSwitchingTo(null);
      }, 820);
    };

    window.addEventListener("frosty-nav-transition", handleTransition);
    return () => {
      window.removeEventListener("frosty-nav-transition", handleTransition);
    };
  }, [navigate]);

  return (
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
            {switchingTo}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VlyToolbar />
    <InstrumentationProvider>
      <ConvexAuthProvider client={convex}>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <RouteSyncer />
          <ScrollToTop />
          <SiteNavbar />
          <FrostyNavTransition />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/flavors" element={<FlavorsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/auth" element={<AuthPage redirectAfterAuth="/" />} /> {/* TODO: change redirect after auth to correct page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ConvexAuthProvider>
    </InstrumentationProvider>
  </StrictMode>,
);
