import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { triggerFrostyTransition } from "@/lib/frostyTransition";

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

const STORAGE_KEY = "frosty-order-cart";

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

function PaymentHero() {
  return (
    <section className="relative overflow-hidden border-b-4 border-black bg-[#FFF8E1] pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "58px 58px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="mb-6 inline-flex items-center gap-2 border-2 border-black bg-black px-4 py-2 text-[#FFF8E1]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs font-bold uppercase tracking-widest">Secure Checkout</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-black sm:text-6xl md:text-8xl"
        >
          Payment
          <br />
          Details
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-black/65 sm:text-lg"
        >
          Review your Frosty box, add delivery details, and complete the checkout form.
        </motion.p>
      </div>
    </section>
  );
}

function OrderSummary({ cart }: { cart: OrderItem[] }) {
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const delivery = subtotal > 25 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + delivery;

  return (
    <aside className="order-first lg:order-none lg:sticky lg:top-28 border-4 border-black bg-[#FFF8E1] p-4 sm:p-5 shadow-[9px_9px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between gap-4 border-b-2 border-black/10 pb-5">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Summary</p>
          <h2 className="mt-1 text-3xl font-black uppercase tracking-tighter text-black">Your Box</h2>
        </div>
        <ShoppingBag className="h-8 w-8 text-black" />
      </div>

      <div className="mt-5 max-h-[260px] space-y-4 overflow-y-auto pr-1 sm:max-h-[380px]">
        {cart.length === 0 ? (
          <div className="border-2 border-dashed border-black/30 bg-white p-5 text-center">
            <p className="text-sm font-bold text-black/55">Your cart is empty.</p>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 border-2 border-black bg-white p-4">
              <div>
                <p className="text-sm font-black uppercase leading-[1.05] text-black">{item.name}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-black/40">
                  {item.type} × {item.quantity}
                </p>
              </div>
              <span className="text-sm font-black text-black">{formatPrice(item.price * item.quantity)}</span>
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

      <div className="mt-6 flex items-start gap-3 border-2 border-black bg-white p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-black" />
        <p className="text-xs font-bold leading-relaxed text-black/60">
          Demo checkout page. This does not process a real payment.
        </p>
      </div>
    </aside>
  );
}

function PaymentForm({ cart }: { cart: OrderItem[] }) {
  const navigate = useNavigate();
  const [complete, setComplete] = useState(false);
  const [method, setMethod] = useState("Card");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cart.length === 0) return;
    localStorage.removeItem(STORAGE_KEY);
    setComplete(true);
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42 }}
        viewport={{ once: true }}
        className="border-4 border-black bg-white p-6 shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] sm:p-8"
      >
        <div className="mb-8 flex items-center justify-between gap-4 border-b-2 border-black/10 pb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45">Checkout</p>
            <h2 className="mt-1 text-3xl font-black uppercase tracking-tighter text-black">Delivery & Payment</h2>
          </div>
          <Lock className="h-7 w-7 text-black" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Full Name</span>
            <input required className="mt-2 w-full border-2 border-black bg-[#FFF8E1] px-4 py-3 text-sm font-bold text-black outline-none focus:bg-[#F4E4DF]" placeholder="Your name" />
          </label>
          <label className="block">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Email</span>
            <input required type="email" className="mt-2 w-full border-2 border-black bg-[#FFF8E1] px-4 py-3 text-sm font-bold text-black outline-none focus:bg-[#F4E4DF]" placeholder="you@email.com" />
          </label>
        </div>

        <label className="mt-5 block">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Delivery Address</span>
          <div className="relative mt-2">
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45" />
            <input required className="w-full border-2 border-black bg-[#FFF8E1] py-3 pl-11 pr-4 text-sm font-bold text-black outline-none focus:bg-[#F4E4DF]" placeholder="Street, city, state" />
          </div>
        </label>

        <div className="mt-7 border-t-2 border-black/10 pt-6">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Payment Method</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Card", "Cash", "Invoice"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMethod(option)}
                className={`border-2 border-black px-4 py-3 text-xs font-black uppercase tracking-widest ${
                  method === option ? "bg-black text-[#FFF8E1]" : "bg-[#FFF8E1] text-black"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {method === "Card" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Card Number</span>
              <div className="relative mt-2">
                <CreditCard className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45" />
                <input required className="w-full border-2 border-black bg-[#FFF8E1] py-3 pl-11 pr-4 text-sm font-bold text-black outline-none focus:bg-[#F4E4DF]" placeholder="0000 0000 0000 0000" />
              </div>
            </label>
            <label className="block">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Expiry</span>
              <input required className="mt-2 w-full border-2 border-black bg-[#FFF8E1] px-4 py-3 text-sm font-bold text-black outline-none focus:bg-[#F4E4DF]" placeholder="MM / YY" />
            </label>
            <label className="block">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">CVC</span>
              <input required className="mt-2 w-full border-2 border-black bg-[#FFF8E1] px-4 py-3 text-sm font-bold text-black outline-none focus:bg-[#F4E4DF]" placeholder="123" />
            </label>
          </motion.div>
        )}

        {method !== "Card" && (
          <div className="mt-5 border-2 border-black bg-[#FFF8E1] p-4">
            <p className="text-sm font-bold leading-relaxed text-black/65">
              {method === "Cash"
                ? "Cash payment will be collected on delivery."
                : "An invoice will be sent to your email after order confirmation."}
            </p>
          </div>
        )}

        <div className="mt-7 flex flex-col gap-4 border-t-2 border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => triggerFrostyTransition("Order", "/order")}
            className="inline-flex w-full items-center justify-center gap-3 border-2 border-black bg-[#FFF8E1] px-6 py-4 sm:w-auto text-xs font-black uppercase tracking-widest text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Back To Order
          </button>

          <button
            type="submit"
            disabled={cart.length === 0}
            className="inline-flex w-full items-center justify-center gap-3 border-2 border-black bg-black px-8 py-4 sm:w-auto text-xs font-black uppercase tracking-widest text-[#FFF8E1] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Place Order
            <PackageCheck className="h-4 w-4" />
          </button>
        </div>
      </motion.form>

      <AnimatePresence>
        {complete && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              className="max-w-lg border-4 border-black bg-[#FFF8E1] p-8 text-center shadow-[10px_10px_0px_0px_rgba(255,248,225,1)]"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-black bg-black text-[#FFF8E1]">
                <Check className="h-8 w-8" />
              </div>
              <h2 className="mt-6 text-4xl font-black uppercase leading-[0.95] tracking-tighter text-black">Order Placed</h2>
              <p className="mt-4 text-sm font-bold leading-relaxed text-black/60">
                Demo confirmation complete. Your cart has been cleared.
              </p>
              <button
                onClick={() => triggerFrostyTransition("Home", "/")}
                className="mt-7 border-2 border-black bg-black px-8 py-4 text-xs font-black uppercase tracking-widest text-[#FFF8E1]"
              >
                Back Home
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Payment() {
  const [cart, setCart] = useState<OrderItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const parsed = JSON.parse(saved) as OrderItem[];
      setCart(parsed.filter((item) => item.quantity > 0));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="min-h-screen bg-white">
      <PaymentHero />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8 lg:gap-10">
          <PaymentForm cart={cart} />
          <OrderSummary cart={cart} />
        </div>
      </section>
    </motion.div>
  );
}
