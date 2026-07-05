import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Message {
  text: string;
  isLeft: boolean;
  delay: number;
}

const MESSAGES: Message[] = [
  { text: "Craving something cold?", isLeft: true, delay: 0 },
  { text: "Ugh, always. What's the move?", isLeft: false, delay: 0.7 },
  { text: "There's that new place down the street...", isLeft: true, delay: 1.4 },
  { text: "Which one? Not the one with the weird flavors?", isLeft: false, delay: 2.1 },
  { text: "Nah.. Frosty, people say they got the best ice cream in town.", isLeft: true, delay: 2.8 },
  { text: "Oh I've heard of them! That Mint Chip is legendary.", isLeft: false, delay: 3.5 },
  { text: "Right?? And their Cookies & Cream uses house-made cookies 🤤", isLeft: true, delay: 4.2 },
  { text: "Stop. You're convincing me. Let's just get Frosty!", isLeft: false, delay: 4.9 },
];

const AVATARS = {
  left: {
    emoji: "🧑‍🍳",
    name: "Alex",
  },
  right: {
    emoji: "😋",
    name: "Jordan",
  },
};

function ChatBubble({ message, index }: { message: Message; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const avatar = message.isLeft ? AVATARS.left : AVATARS.right;
  const isFinalMessage = index === MESSAGES.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.4,
        delay: message.delay,
        ease: "easeOut",
      }}
      className={`flex max-w-full items-start gap-3 sm:gap-4 ${
        message.isLeft ? "self-start flex-row" : "self-end flex-row-reverse"
      }`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: message.delay + 0.1,
        }}
        className="shrink-0"
      >
        <div className="flex h-11 w-11 items-center justify-center border-[3px] border-black bg-white text-xl sm:h-12 sm:w-12">
          {avatar.emoji}
        </div>
      </motion.div>

      <div
        className={`flex max-w-[calc(100%-56px)] flex-col ${
          message.isLeft ? "items-start" : "items-end"
        }`}
      >
        <span className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-black/50 sm:text-xs">
          {avatar.name}
        </span>
        <motion.div
          initial={{
            opacity: 0,
            x: message.isLeft ? -20 : 20,
            scale: 0.95,
          }}
          animate={
            isInView
              ? { opacity: 1, x: 0, scale: 1 }
              : { opacity: 0, x: message.isLeft ? -20 : 20, scale: 0.95 }
          }
          transition={{
            duration: 0.35,
            delay: message.delay + 0.05,
            ease: [0.23, 1, 0.32, 1],
          }}
          className={`
            w-fit max-w-[230px] border-[3px] border-black px-4 py-2.5 sm:max-w-[280px] sm:px-5 sm:py-3
            ${isFinalMessage
              ? "bg-black text-[#FFF8E1] font-bold"
              : message.isLeft
                ? "bg-white text-black"
                : "bg-[#FFF8E1] text-black"
            }
          `}
        >
          <p className="text-sm leading-relaxed sm:text-base">
            {message.text}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ChatConversation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section id="reviews" className="bg-white py-20 sm:py-28 border-b-4 border-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 border-2 border-black bg-black px-4 py-2 text-[#FFF8E1]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest">Real Talk</span>
          </motion.div>

          <h2 className="text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl md:text-6xl">
            Friends Don't Let Friends
            <br />
            <span className="text-5xl sm:text-6xl md:text-7xl">Eat Mediocre Ice Cream</span>
          </h2>
        </div>

        <div ref={sectionRef} className="relative mx-auto flex justify-center pb-6 sm:pb-8">
          <div className="relative mx-auto w-full max-w-[430px] border-[3px] border-black bg-[#FAFAF5] p-5 sm:max-w-[500px] sm:p-8">
            <div className="flex flex-col gap-4 sm:gap-6">
              {MESSAGES.map((msg, i) => (
                <ChatBubble key={i} message={msg} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 7.0, duration: 0.5, ease: "easeOut" }}
              className="mt-6 flex items-center justify-center pt-2 sm:mt-8 sm:pt-3"
            >
              <div className="inline-flex w-full max-w-[320px] items-center justify-center gap-2 border-[3px] border-black bg-black px-4 py-3 text-center text-[#FFF8E1] sm:max-w-[360px] sm:px-6">
                <span className="text-base sm:text-lg">🎉</span>
                <span className="text-[10px] font-bold uppercase tracking-wider sm:text-xs">
                  Alex &amp; Jordan — heading to Frosty right now!
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 7.0, type: "spring", stiffness: 200 }}
              className="absolute -bottom-4 right-4 hidden whitespace-nowrap border-[3px] border-black bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FFF8E1] sm:right-[-22px] sm:block"
            >
              🍦 Frosty &gt; Everything
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
