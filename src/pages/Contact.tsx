import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  PackageCheck,
  Send,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { triggerFrostyTransition } from "@/lib/frostyTransition";

const SUPPORT_EMAIL = "hello@frosty.com";

function ContactHero() {
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
        <Mail className="h-10 w-10 text-black" />
        <p className="mt-3 text-xs font-black uppercase tracking-widest text-black/55">Email Us</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 4, x: 30 }}
        animate={{ opacity: 1, rotate: 4, x: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="absolute bottom-20 right-10 hidden border-4 border-black bg-[#F4E4DF] p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:block"
      >
        <PackageCheck className="h-10 w-10 text-black" />
        <p className="mt-3 text-xs font-black uppercase tracking-widest text-black/55">Order Help</p>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          className="mb-6 inline-flex items-center gap-2 border-2 border-black bg-black px-4 py-2 text-[#FFF8E1]"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs font-bold uppercase tracking-widest">Contact Frosty</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="text-5xl font-black uppercase leading-[0.9] tracking-tighter text-black sm:text-6xl md:text-8xl"
        >
          Send Us
          <br />
          An Email
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.24 }}
          className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-black/65 sm:text-lg"
        >
          A short contact form for order questions, delivery help, bulk requests, or anything that was not covered in the FAQ.
        </motion.p>
      </div>
    </section>
  );
}

function ContactForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Order Help",
    message: "",
  });

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = `Frosty Contact: ${form.topic}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Topic: ${form.topic}`,
      "",
      form.message,
    ].join("\n");

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <motion.aside
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42 }}
          viewport={{ once: true }}
          className="border-4 border-black bg-[#F4E4DF] p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-black text-[#FFF8E1]">
            <MessageCircle className="h-7 w-7" />
          </div>

          <h2 className="mt-8 text-3xl font-black uppercase leading-[0.95] tracking-tighter text-black">
            Keep It
            <br />
            Simple
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-black/65">
            Send us a note about orders, events, partnerships, or anything you want Frosty to help with.
          </p>

          <div className="mt-8 border-t-2 border-black/15 pt-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Email goes to</p>
            <p className="mt-2 text-sm font-black text-black">{SUPPORT_EMAIL}</p>
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
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Name</span>
              <input
                required
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                placeholder="Your name"
                className="mt-2 w-full border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black outline-none focus:bg-[#F4E4DF]"
              />
            </label>

            <label className="block">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Email</span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="you@email.com"
                className="mt-2 w-full border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black outline-none focus:bg-[#F4E4DF]"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Topic</span>
            <select
              value={form.topic}
              onChange={(event) => updateField("topic", event.target.value)}
              className="mt-2 w-full border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black outline-none focus:bg-[#F4E4DF]"
            >
              <option>Order Help</option>
              <option>Delivery Question</option>
              <option>Bulk / Event Order</option>
              <option>Flavor Question</option>
              <option>Refund / Replacement</option>
              <option>Other</option>
            </select>
          </label>

          <label className="mt-5 block">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/45">Message</span>
            <textarea
              required
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Tell us what you need help with..."
              rows={6}
              className="mt-2 w-full resize-none border-2 border-black bg-white px-4 py-3 text-sm font-bold leading-relaxed text-black outline-none focus:bg-[#F4E4DF]"
            />
          </label>

          <div className="mt-7 flex flex-col gap-4 border-t-2 border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => triggerFrostyTransition("FAQ", "/faq")}
              className="inline-flex w-full items-center justify-center gap-3 border-2 border-black bg-white px-6 py-4 sm:w-auto text-xs font-black uppercase tracking-widest text-black"
            >
              <ArrowLeft className="h-4 w-4" />
              Back To FAQ
            </button>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-3 border-2 border-black bg-black px-8 py-4 sm:w-auto text-xs font-black uppercase tracking-widest text-[#FFF8E1]"
            >
              Send Email
              <Send className="h-4 w-4" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="min-h-screen bg-[#FFF8E1]">
      <ContactHero />
      <ContactForm />
    </motion.div>
  );
}
