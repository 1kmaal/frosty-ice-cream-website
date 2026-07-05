import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  IceCream,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import { FormEvent, useState } from "react";
import ScrollVelocity from "@/components/ScrollVelocity";
import { triggerFrostyTransition } from "@/lib/frostyTransition";

function SignupHero() {
  return (
    <section className="relative overflow-hidden border-b-4 border-black bg-[#FFF8E1] pt-32 pb-16 sm:pt-40 sm:pb-20">
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
        <User className="h-10 w-10 text-black" />
        <p className="mt-3 text-xs font-black uppercase tracking-widest text-black/55">Create Account</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 4, x: 30 }}
        animate={{ opacity: 1, rotate: 4, x: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="absolute bottom-20 right-10 hidden border-4 border-black bg-[#F4E4DF] p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:block"
      >
        <IceCream className="h-10 w-10 text-black" />
        <p className="mt-3 text-xs font-black uppercase tracking-widest text-black/55">Frosty Club</p>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="mb-6 inline-flex items-center gap-2 border-2 border-black bg-black px-4 py-2 text-[#FFF8E1]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs font-bold uppercase tracking-widest">Join Frosty</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-black sm:text-6xl md:text-8xl"
        >
          Sign Up
          <br />
          For Frosty
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-black/65 sm:text-lg"
        >
          A short, clean account page for faster orders, saved favorites, and early access to new specials.
        </motion.p>
      </div>
    </section>
  );
}

function SignupForm() {
  const [submitted, setSubmitted] = useState(false);
  const [plan, setPlan] = useState("Frosty Fan");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42 }}
            viewport={{ once: true }}
            className="border-4 border-black bg-[#F4E4DF] p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-black text-[#FFF8E1]">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <h2 className="mt-8 text-3xl font-black uppercase leading-[0.95] tracking-tighter text-black">
              Built For
              <br />
              Fast Orders
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-black/65">
              Create your Frosty account to save favorites, speed up checkout, and keep your next order ready.
            </p>

            <div className="mt-8 grid gap-3">
              {["Saved favorite flavors", "Faster checkout", "Early access specials"].map((item) => (
                <div key={item} className="flex items-center gap-3 border-2 border-black bg-white p-3">
                  <Check className="h-4 w-4 text-black" />
                  <span className="text-xs font-black uppercase tracking-widest text-black/60">{item}</span>
                </div>
              ))}
            </div>
          </motion.aside>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.08 }}
            viewport={{ once: true }}
            className="border-4 border-black bg-[#FFF8E1] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:p-8"
          >
            <div className="mb-7 flex items-center justify-between gap-4 border-b-2 border-black/10 pb-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/45">Account</p>
                <h2 className="mt-1 text-3xl font-black uppercase tracking-tighter text-black">Create Profile</h2>
              </div>
              <Lock className="h-7 w-7 text-black" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">First Name</span>
                <input required className="mt-2 w-full border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black outline-none focus:bg-[#F4E4DF]" placeholder="First name" />
              </label>

              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Last Name</span>
                <input required className="mt-2 w-full border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black outline-none focus:bg-[#F4E4DF]" placeholder="Last name" />
              </label>
            </div>

            <label className="mt-5 block">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Email</span>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45" />
                <input required type="email" className="w-full border-2 border-black bg-white py-3 pl-11 pr-4 text-sm font-bold text-black outline-none focus:bg-[#F4E4DF]" placeholder="you@email.com" />
              </div>
            </label>

            <label className="mt-5 block">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Password</span>
              <input required type="password" className="mt-2 w-full border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black outline-none focus:bg-[#F4E4DF]" placeholder="Create a password" />
            </label>

            <div className="mt-7 border-t-2 border-black/10 pt-6">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Choose Account Type</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {["Frosty Fan", "Event / Bulk"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPlan(option)}
                    className={`border-2 border-black px-4 py-4 text-xs font-black uppercase tracking-widest transition-all ${
                      plan === option ? "bg-black text-[#FFF8E1]" : "bg-white text-black hover:bg-black/5"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-4 border-t-2 border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => triggerFrostyTransition("Order", "/order")}
                className="inline-flex w-full items-center justify-center gap-3 border-2 border-black bg-white px-6 py-4 sm:w-auto text-xs font-black uppercase tracking-widest text-black"
              >
                Order Instead
              </button>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 border-2 border-black bg-black px-8 py-4 sm:w-auto text-xs font-black uppercase tracking-widest text-[#FFF8E1]"
              >
                Create Account
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      <AnimatePresence>
        {submitted && (
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
              <h2 className="mt-6 text-4xl font-black uppercase leading-[0.95] tracking-tighter text-black">Account Created</h2>
              <p className="mt-4 text-sm font-bold leading-relaxed text-black/60">
                Demo sign up complete. You can now continue to the order page.
              </p>
              <button
                onClick={() => triggerFrostyTransition("Order", "/order")}
                className="mt-7 w-full border-2 border-black bg-black px-8 py-4 sm:w-auto text-xs font-black uppercase tracking-widest text-[#FFF8E1]"
              >
                Start Order
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Signup() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="min-h-screen bg-[#FFF8E1]">
      <SignupHero />
      <ScrollVelocity
        texts={[
          "SIGN UP · SAVED FAVORITES · FASTER CHECKOUT · EARLY SPECIALS · ",
          "FROSTY CLUB · ORDER FASTER · NEW FLAVORS FIRST · ",
        ]}
        velocity={72}
        className="border-b-4 border-black bg-black py-8 text-2xl font-black uppercase tracking-tighter text-[#FFF8E1] sm:text-3xl md:text-4xl"
        numCopies={4}
      />
      <SignupForm />
    </motion.div>
  );
}
