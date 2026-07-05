import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Heart,
  IceCream,
  MessageSquareText,
  Quote,
  ShoppingBag,
  Sparkles,
  Star,
  ThumbsUp,
  Trophy,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollVelocity from "@/components/ScrollVelocity";
import { triggerFrostyTransition } from "@/lib/frostyTransition";

const FLAVOR_FILTERS = [
  "All",
  "Velvet Chocolate",
  "Vanilla Dream",
  "Strawberry Bliss",
  "Mint Eclipse",
  "Cookies & Cream",
];

const REVIEWS = [
  {
    name: "Maya R.",
    flavor: "Velvet Chocolate",
    rating: 5,
    title: "Actually tastes premium.",
    text: "The chocolate is rich without being too sweet. It feels like a proper dessert, not just a random tub of ice cream.",
    color: "#5A2418",
    bgColor: "#F4E4DF",
    verified: true,
  },
  {
    name: "Adam K.",
    flavor: "Vanilla Dream",
    rating: 5,
    title: "Clean and classic.",
    text: "Vanilla usually feels boring, but this one tastes smooth and comforting. The packaging makes it feel even better.",
    color: "#6D4C41",
    bgColor: "#FFF8E1",
    verified: true,
  },
  {
    name: "Nora S.",
    flavor: "Strawberry Bliss",
    rating: 5,
    title: "Bright strawberry flavor.",
    text: "The strawberry flavor feels fresh and not fake. It is sweet, soft, and really easy to finish.",
    color: "#880E4F",
    bgColor: "#FCE4EC",
    verified: true,
  },
  {
    name: "Zain A.",
    flavor: "Mint Eclipse",
    rating: 5,
    title: "Mint done right.",
    text: "Cool mint with chocolate makes sense here. It does not taste like toothpaste. It tastes like a proper dessert.",
    color: "#1B5E20",
    bgColor: "#E8F5E9",
    verified: true,
  },
  {
    name: "Hana M.",
    flavor: "Cookies & Cream",
    rating: 5,
    title: "Best texture.",
    text: "The cookie pieces make it feel more complete. Creamy, crunchy, and not too heavy.",
    color: "#263238",
    bgColor: "#ECEFF1",
    verified: true,
  },
  {
    name: "Leo T.",
    flavor: "Velvet Chocolate",
    rating: 5,
    title: "The safe best choice.",
    text: "If someone asks me what to try first, I say Velvet Chocolate. It feels like the main Frosty flavor.",
    color: "#5A2418",
    bgColor: "#F4E4DF",
    verified: true,
  },
  {
    name: "Sofia B.",
    flavor: "Strawberry Bliss",
    rating: 4,
    title: "Really pretty and tasty.",
    text: "The color, the taste, the whole look — it feels giftable. I would order this again.",
    color: "#880E4F",
    bgColor: "#FCE4EC",
    verified: true,
  },
  {
    name: "Ibrahim N.",
    flavor: "Cookies & Cream",
    rating: 5,
    title: "The one I keep going back to.",
    text: "This is the flavor I would order when I do not want to think too much. It just works.",
    color: "#263238",
    bgColor: "#ECEFF1",
    verified: true,
  },
  {
    name: "Aisha D.",
    flavor: "Vanilla Dream",
    rating: 4,
    title: "Simple in a good way.",
    text: "It is not trying too hard. Smooth, soft, and clean. Perfect if you like classic flavors.",
    color: "#6D4C41",
    bgColor: "#FFF8E1",
    verified: true,
  },
  {
    name: "Ryan P.",
    flavor: "Mint Eclipse",
    rating: 5,
    title: "Looks premium too.",
    text: "The mint green with chocolate packaging looks expensive. Taste matches the look.",
    color: "#1B5E20",
    bgColor: "#E8F5E9",
    verified: true,
  },
];

const STATS = [
  {
    label: "Average Rating",
    value: "4.9",
    detail: "from verified orders",
    icon: Trophy,
  },
  {
    label: "Happy Customers",
    value: "1.2K+",
    detail: "and counting",
    icon: Users,
  },
  {
    label: "Would Order Again",
    value: "98%",
    detail: "based on feedback",
    icon: ThumbsUp,
  },
  {
    label: "Signature Flavors",
    value: "5",
    detail: "built for every craving",
    icon: IceCream,
  },
];

const BREAKDOWN = [
  { label: "5 Stars", value: 88 },
  { label: "4 Stars", value: 9 },
  { label: "3 Stars", value: 3 },
  { label: "2 Stars", value: 0 },
  { label: "1 Star", value: 0 },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? "fill-black text-black" : "text-black/20"}`}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, compact = false }: { review: (typeof REVIEWS)[0]; compact?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -6, rotate: compact ? 0 : -0.75 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`relative shrink-0 border-4 border-black p-6 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] ${
        compact ? "w-[330px]" : "min-h-[320px]"
      }`}
      style={{ backgroundColor: review.bgColor }}
    >
      <div className="flex items-start justify-between gap-4">
        <Stars rating={review.rating} />
        <Quote className="h-7 w-7 text-black/25" />
      </div>

      <h3 className="mt-6 text-xl font-black uppercase leading-[1] tracking-tight" style={{ color: review.color }}>
        {review.title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-black/68">{review.text}</p>

      <div className="mt-6 flex items-center justify-between gap-4 border-t-2 border-black/10 pt-5">
        <div>
          <p className="text-sm font-black uppercase tracking-tight text-black">{review.name}</p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: review.color, opacity: 0.75 }}>
            {review.flavor}
          </p>
        </div>
        {review.verified && (
          <span className="inline-flex items-center gap-1 border-2 border-black bg-black px-2 py-1 text-[9px] font-black uppercase tracking-widest text-[#FFF8E1]">
            <BadgeCheck className="h-3 w-3" />
            Verified
          </span>
        )}
      </div>
    </motion.article>
  );
}

function ReviewsHero() {
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
        initial={{ opacity: 0, rotate: -4, x: -30 }}
        animate={{ opacity: 1, rotate: -4, x: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="absolute left-8 top-32 hidden border-4 border-black bg-[#FCE4EC] p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:block"
      >
        <Heart className="h-10 w-10 text-black" />
        <p className="mt-3 text-xs font-black uppercase tracking-widest text-black/55">Fan Favorite</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 5, x: 30 }}
        animate={{ opacity: 1, rotate: 5, x: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="absolute bottom-28 right-10 hidden border-4 border-black bg-[#E8F5E9] p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:block"
      >
        <MessageSquareText className="h-10 w-10 text-black" />
        <p className="mt-3 text-xs font-black uppercase tracking-widest text-black/55">Real Reviews</p>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="mb-6 inline-flex items-center gap-2 border-2 border-black bg-black px-4 py-2 text-[#FFF8E1]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs font-bold uppercase tracking-widest">Frosty Reviews</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-black sm:text-6xl md:text-8xl lg:text-9xl"
        >
          Loved By
          <br />
          Frosty Fans
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-black/65 sm:text-lg"
        >
          Actual review cards, not a fake chat conversation. Flavor ratings, verified orders, and the kind of comments a product page should show.
        </motion.p>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="border-b-4 border-black bg-white py-14">
      <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {STATS.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: index * 0.08 }}
              viewport={{ once: true, margin: "-60px" }}
              className="border-4 border-black bg-[#FFF8E1] p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/45">{stat.label}</p>
                  <p className="mt-2 text-4xl font-black tracking-tighter text-black">{stat.value}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-black text-[#FFF8E1]">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-black/45">{stat.detail}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function ReviewMarquee() {
  const firstRow = REVIEWS.slice(0, 5);
  const secondRow = REVIEWS.slice(5);

  return (
    <section className="overflow-hidden border-b-4 border-black bg-[#FFF8E1] py-20 sm:py-24">
      <div className="mx-auto mb-12 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex border-2 border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FFF8E1]">
          Review Wall
        </span>
        <h2 className="mt-5 text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl md:text-6xl">
          What People
          <br />
          Keep Saying
        </h2>
      </div>

      <div className="relative flex flex-col gap-8">
        <motion.div
          className="flex gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, ease: "linear", repeat: Infinity }}
        >
          {[...firstRow, ...firstRow].map((review, index) => (
            <ReviewCard key={`${review.name}-top-${index}`} review={review} compact />
          ))}
        </motion.div>

        <motion.div
          className="flex gap-8"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 34, ease: "linear", repeat: Infinity }}
        >
          {[...secondRow, ...secondRow].map((review, index) => (
            <ReviewCard key={`${review.name}-bottom-${index}`} review={review} compact />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FilteredReviewsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredReviews = useMemo(() => {
    if (activeFilter === "All") return REVIEWS;
    return REVIEWS.filter((review) => review.flavor === activeFilter);
  }, [activeFilter]);

  return (
    <section className="border-b-4 border-black bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="inline-flex border-2 border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FFF8E1]">
              Filter Reviews
            </span>
            <h2 className="mt-5 text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl md:text-6xl">
              Pick A Flavor
            </h2>
          </div>
          <ScrollReveal containerClassName="max-w-xl" textClassName="text-base text-black/60 leading-relaxed">
            Filter reviews by flavor and see what people are loving most.
          </ScrollReveal>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {FLAVOR_FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`border-2 border-black px-4 py-3 text-xs font-black uppercase tracking-widest transition-all ${
                activeFilter === filter
                  ? "bg-black text-[#FFF8E1]"
                  : "bg-[#FFF8E1] text-black hover:bg-black/5"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.28 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredReviews.map((review) => (
              <ReviewCard key={`${review.name}-${review.flavor}`} review={review} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function RatingBreakdownSection() {
  return (
    <section className="border-b-4 border-black bg-[#FFF8E1] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <span className="inline-flex border-2 border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FFF8E1]">
            Rating Breakdown
          </span>
          <h2 className="mt-5 text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl">
            The Numbers
            <br />
            Back It Up
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-black/60">
            A quick look at what customers mention most when they talk about Frosty.
          </p>
        </div>

        <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:p-8">
          <div className="mb-8 flex items-end justify-between gap-6 border-b-2 border-black/10 pb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45">Average</p>
              <p className="mt-2 text-6xl font-black tracking-tighter text-black">4.9</p>
            </div>
            <Stars rating={5} />
          </div>

          <div className="space-y-5">
            {BREAKDOWN.map((item) => (
              <div key={item.label} className="grid grid-cols-[72px_1fr_42px] items-center gap-4">
                <span className="text-xs font-black uppercase tracking-wider text-black/55">{item.label}</span>
                <div className="h-4 border-2 border-black bg-[#FFF8E1]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                    viewport={{ once: true }}
                    className="h-full bg-black"
                  />
                </div>
                <span className="text-right text-xs font-black text-black/55">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsCTA() {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl border-4 border-black bg-black px-6 py-14 text-center text-[#FFF8E1] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] sm:px-10">
        <ShoppingBag className="mx-auto h-10 w-10" />
        <h2 className="mt-6 text-4xl font-black uppercase leading-[0.95] tracking-tighter sm:text-6xl">
          Ready To See
          <br />
          The Hype?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#FFF8E1]/65">
          Start with the flavor page and choose the one people keep talking about.
        </p>
        <button
          onClick={() => triggerFrostyTransition("Flavors", "/flavors")}
          className="mt-8 inline-flex w-full items-center justify-center gap-3 border-2 border-[#FFF8E1] bg-[#FFF8E1] px-8 py-4 sm:w-auto text-xs font-bold uppercase tracking-widest text-black"
        >
          Explore Flavors
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

export default function Reviews() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="min-h-screen bg-[#FFF8E1]">
      <ReviewsHero />
      <ScrollVelocity
        texts={[
          "VERIFIED REVIEWS · 4.9 AVERAGE RATING · REAL FLAVOR FEEDBACK · ",
          "VELVET CHOCOLATE · VANILLA DREAM · STRAWBERRY BLISS · MINT ECLIPSE · COOKIES & CREAM · ",
        ]}
        velocity={72}
        className="border-b-4 border-black bg-black py-8 text-2xl font-black uppercase tracking-tighter text-[#FFF8E1] sm:text-3xl md:text-4xl"
        numCopies={4}
      />
      <StatsSection />
      <ReviewMarquee />
      <FilteredReviewsSection />
      <RatingBreakdownSection />
      <ReviewsCTA />
    </motion.div>
  );
}
