import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Clock,
  HelpCircle,
  IceCream,
  Leaf,
  MessageCircle,
  PackageCheck,
  RefreshCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Truck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollVelocity from "@/components/ScrollVelocity";
import { triggerFrostyTransition } from "@/lib/frostyTransition";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CATEGORIES = ["All", "Shipping", "Flavors", "Orders", "Guarantee"];

const FAQS = [
  {
    category: "Shipping",
    q: "Where do you ship?",
    a: "We ship nationwide across the continental US. Every order is packed with dry ice in insulated containers so your ice cream arrives frozen and ready for the freezer.",
    icon: Truck,
    color: "#263238",
    bgColor: "#ECEFF1",
  },
  {
    category: "Shipping",
    q: "How long does delivery take?",
    a: "Most orders arrive within 2–3 business days. We ship early in the week to avoid packages sitting in transit over the weekend.",
    icon: Clock,
    color: "#6D4C41",
    bgColor: "#FFF8E1",
  },
  {
    category: "Flavors",
    q: "Do you offer vegan or dairy-free options?",
    a: "Yes. We are expanding the menu carefully. Mint Eclipse and Strawberry Bliss are the first flavors planned for oat-milk based versions.",
    icon: Leaf,
    color: "#1B5E20",
    bgColor: "#E8F5E9",
  },
  {
    category: "Orders",
    q: "Can I order in bulk for events?",
    a: "Absolutely. Frosty can support party packs, event tubs, and custom flavor requests. For larger orders, contact the team before checkout so the order can be packed correctly.",
    icon: Box,
    color: "#5A2418",
    bgColor: "#F4E4DF",
  },
  {
    category: "Guarantee",
    q: "What if my ice cream arrives melted?",
    a: "We guarantee every delivery. If your ice cream arrives less than frozen, we will send a replacement or issue a full refund.",
    icon: ShieldCheck,
    color: "#263238",
    bgColor: "#ECEFF1",
  },
  {
    category: "Flavors",
    q: "Do you have no-sugar-added options?",
    a: "Vanilla Dream and Strawberry Bliss are planned as no-sugar-added options sweetened with monk fruit. Same Frosty feel, lighter finish.",
    icon: IceCream,
    color: "#880E4F",
    bgColor: "#FCE4EC",
  },
  {
    category: "Orders",
    q: "Can I change my order after placing it?",
    a: "If the order has not been packed yet, yes. Once it is packed with dry ice and handed to delivery, changes may not be possible.",
    icon: RefreshCcw,
    color: "#6D4C41",
    bgColor: "#FFF8E1",
  },
  {
    category: "Guarantee",
    q: "How should I store Frosty after delivery?",
    a: "Move the container into your freezer as soon as it arrives. For the best scoop, let it sit for a few minutes before serving.",
    icon: Snowflake,
    color: "#1B5E20",
    bgColor: "#E8F5E9",
  },
];

const QUICK_HELP = [
  {
    title: "Shipping Help",
    description: "Delivery windows, dry ice, and frozen arrival questions.",
    icon: Truck,
    color: "#263238",
    bgColor: "#ECEFF1",
  },
  {
    title: "Flavor Help",
    description: "Ingredients, dairy-free plans, and no-sugar-added options.",
    icon: IceCream,
    color: "#880E4F",
    bgColor: "#FCE4EC",
  },
  {
    title: "Order Help",
    description: "Bulk orders, edits, party packs, and checkout questions.",
    icon: PackageCheck,
    color: "#5A2418",
    bgColor: "#F4E4DF",
  },
];

function FAQHero() {
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
        <Search className="h-10 w-10 text-black" />
        <p className="mt-3 text-xs font-black uppercase tracking-widest text-black/55">Quick Answers</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 4, x: 30 }}
        animate={{ opacity: 1, rotate: 4, x: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="absolute bottom-28 right-10 hidden border-4 border-black bg-[#F4E4DF] p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:block"
      >
        <HelpCircle className="h-10 w-10 text-black" />
        <p className="mt-3 text-xs font-black uppercase tracking-widest text-black/55">FAQ Center</p>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="mb-6 inline-flex items-center gap-2 border-2 border-black bg-black px-4 py-2 text-[#FFF8E1]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs font-bold uppercase tracking-widest">Frosty Help Desk</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-black sm:text-6xl md:text-8xl lg:text-9xl"
        >
          Questions,
          <br />
          Answered
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-black/65 sm:text-lg"
        >
          Everything from shipping and dry ice to flavors, bulk orders, refunds, and first-scoop storage.
        </motion.p>
      </div>
    </section>
  );
}

function QuickHelpSection() {
  return (
    <section className="border-b-4 border-black bg-white py-14">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {QUICK_HELP.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, rotate: index === 1 ? 0 : index === 0 ? -1 : 1 }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
              viewport={{ once: true, margin: "-60px" }}
              className="border-4 border-black p-6 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]"
              style={{ backgroundColor: item.bgColor }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center border-2 border-black bg-black text-[#FFF8E1]">
                  <Icon className="h-6 w-6" />
                </div>
                <BadgeCheck className="h-6 w-6 text-black/30" />
              </div>

              <h2 className="mt-8 text-2xl font-black uppercase tracking-tight" style={{ color: item.color }}>
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-black/65">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function FAQAccordionSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFaqs = useMemo(() => {
    if (activeCategory === "All") return FAQS;
    return FAQS.filter((faq) => faq.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="border-b-4 border-black bg-[#FFF8E1] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:gap-10">
        <div>
          <span className="inline-flex border-2 border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FFF8E1]">
            FAQ Categories
          </span>
          <h2 className="mt-5 text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl">
            Find The
            <br />
            Right Answer
          </h2>
          <ScrollReveal containerClassName="mt-5 max-w-lg" textClassName="text-base leading-relaxed text-black/60">
            Built with a shadcn-style accordion, category filters, and Frosty’s brutalist black-border layout.
          </ScrollReveal>

          <div className="mt-8 flex flex-wrap gap-3 lg:flex-col">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`border-2 border-black px-4 py-3 text-left text-xs font-black uppercase tracking-widest transition-all ${
                  activeCategory === category
                    ? "bg-black text-[#FFF8E1]"
                    : "bg-white text-black hover:bg-black/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28 }}
            className="border-4 border-black bg-white p-4 shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] sm:p-6"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => {
                const Icon = faq.icon;
                return (
                  <AccordionItem
                    key={`${activeCategory}-${faq.q}`}
                    value={`item-${index}`}
                    className="overflow-hidden border-[3px] border-black last:border-b-[3px]"
                    style={{ backgroundColor: faq.bgColor }}
                  >
                    <AccordionTrigger className="px-4 py-5 text-left hover:no-underline sm:px-6 [&>svg]:hidden">
                      <div className="flex w-full items-center gap-3 sm:gap-4">
                        <div className="flex h-10 w-10 shrink-0 sm:h-12 sm:w-12 items-center justify-center border-2 border-black bg-black text-[#FFF8E1]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 pr-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: faq.color, opacity: 0.7 }}>
                            {faq.category}
                          </p>
                          <h3 className="mt-1 text-sm font-black uppercase tracking-tight text-black sm:text-base">
                            {faq.q}
                          </h3>
                        </div>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-black bg-white text-lg font-black leading-none">
                          +
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-5 sm:px-6">
                      <div className="border-t-2 border-black pt-4">
                        <p className="text-sm leading-relaxed text-black/70 sm:text-base">{faq.a}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function StillNeedHelpSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl border-4 border-black bg-black px-6 py-14 text-center text-[#FFF8E1] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:px-10">
        <MessageCircle className="mx-auto h-10 w-10" />
        <h2 className="mt-6 text-4xl font-black uppercase leading-[0.95] tracking-tighter sm:text-6xl">
          Still Need
          <br />
          Help?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#FFF8E1]/65">
          Start with the flavors page, or reach out before placing a bigger order.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => triggerFrostyTransition("Flavors", "/flavors")}
            className="inline-flex w-full items-center justify-center gap-3 border-2 border-[#FFF8E1] bg-[#FFF8E1] px-8 py-4 sm:w-auto text-xs font-bold uppercase tracking-widest text-black"
          >
            Explore Flavors
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("frosty-nav-transition", {
                  detail: { label: "Contact", target: "/contact" },
                }),
              )
            }
            className="inline-flex w-full items-center justify-center gap-3 border-2 border-[#FFF8E1] px-8 py-4 sm:w-auto text-xs font-bold uppercase tracking-widest text-[#FFF8E1]"
          >
            <ShoppingBag className="h-4 w-4" />
            Contact Team
          </button>
        </div>
      </div>
    </section>
  );
}

export default function FAQ() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="min-h-screen bg-[#FFF8E1]">
      <FAQHero />
      <ScrollVelocity
        texts={[
          "SHIPPING · FLAVORS · ORDERS · GUARANTEE · FIRST SCOOP · ",
          "QUESTIONS ANSWERED · FROSTY HELP DESK · QUICK SUPPORT · ",
        ]}
        velocity={72}
        className="border-b-4 border-black bg-black py-8 text-2xl font-black uppercase tracking-tighter text-[#FFF8E1] sm:text-3xl md:text-4xl"
        numCopies={4}
      />
      <QuickHelpSection />
      <FAQAccordionSection />
      <StillNeedHelpSection />
    </motion.div>
  );
}
