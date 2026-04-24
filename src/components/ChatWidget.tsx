"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "bot";
  text: string;
  links?: { label: string; href: string }[];
}

type Phase =
  | "greeting"
  | "services_menu"
  | "service_detail"
  | "collect_name"
  | "collect_email"
  | "collect_phone"
  | "lead_saved"
  | "faq";

type ServiceKey = "private-duty" | "medicaid" | "cds" | "veterans" | "hcy";

// ─── Static data ─────────────────────────────────────────────────────────────

const SERVICES: Record<ServiceKey, { label: string; path: string; info: string }> = {
  "private-duty": {
    label: "Private Duty Care",
    path: "/services/private-duty-care",
    info: "Our Private Duty Care delivers one-on-one assistance with daily living, personal care, and companionship — available 24/7 and fully tailored to your loved one's needs, from a few hours a day to around-the-clock support.",
  },
  medicaid: {
    label: "Medicaid In-Home Care",
    path: "/services/medicaid-in-home-care",
    info: "We help eligible individuals receive high-quality care at home covered under Missouri Medicaid — including personal care, homemaking, and daily living assistance so clients can remain in the comfort of their own home.",
  },
  cds: {
    label: "Consumer Directed Services (CDS)",
    path: "/services/consumer-directed-services",
    info: "CDS lets you choose your own caregiver — even a trusted family member or friend. We handle all payroll, taxes, and compliance so you can focus entirely on quality care.",
  },
  veterans: {
    label: "Veterans Care",
    path: "/services/veterans-care",
    info: "We proudly honor those who served. Our Veterans Care program works with VA benefits to provide personal care, companionship, and daily living support — because our heroes deserve the very best.",
  },
  hcy: {
    label: "Youth & Children Program",
    path: "/services/youth-programs",
    info: "Our HCY (Healthy Children & Youth) program provides in-home support for children with special health care needs — including personal care, respite care, and skilled nursing to help families thrive.",
  },
};

const QA = [
  {
    keywords: ["hours", "available", "24", "weekend", "holiday", "open"],
    answer:
      "We provide 24-hour care, including weekends and holidays. Compassion never takes a day off at Algonquin Nurses.",
  },
  {
    keywords: ["location", "address", "office", "where", "find you"],
    answer:
      "We have three convenient offices:\n• St. Louis: 10135 Manchester Rd., MO 63122 — (314) 822-8158\n• House Springs: 7200 Executive Pkwy, MO 63051 — (636) 274-1870\n• O'Fallon: (636) 978-1775",
  },
  {
    keywords: ["contact", "phone", "call", "reach", "number"],
    answer:
      "Reach us at:\n• St. Louis: (314) 822-8158\n• House Springs: (636) 274-1870\n• O'Fallon: (636) 978-1775\n\nOr visit our Contact page for more options.",
  },
  {
    keywords: ["insurance", "pay", "cost", "price", "accept", "covered"],
    answer:
      "We accept Medicaid and work with various insurance providers. For private duty care we offer competitive rates. Call (636) 274-1870 to discuss payment options.",
  },
  {
    keywords: ["founded", "since", "year", "history", "how long", "experience"],
    answer:
      "Algonquin Nurses has proudly served the St. Louis metro area since 1987 — over 37 years of trusted, compassionate home health care.",
  },
  {
    keywords: ["eligib", "qualify", "who can", "criteria"],
    answer:
      "Eligibility varies by program. We work with Medicaid, VA benefits, and private pay. Contact us and we'll help determine which services you or your loved one qualifies for.",
  },
];

function findFaqAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const qa of QA) {
    if (qa.keywords.some((kw) => lower.includes(kw))) return qa.answer;
  }
  return "Great question! Our care coordinators would love to help — call us at (636) 274-1870 or visit the Contact page and we'll get back to you promptly.";
}

// ─── Quick-reply sets ─────────────────────────────────────────────────────────

const MAIN_MENU = [
  "🏥 Explore Our Services",
  "📋 Submit a Client Referral",
  "💼 Career Opportunities",
  "📞 Contact Us",
  "❓ Ask a Question",
];

const SERVICE_MENU = [
  ...Object.values(SERVICES).map((s) => s.label),
  "← Back",
];

const FAQ_PROMPTS = [
  "What are your hours?",
  "Where are your offices?",
  "What insurance do you accept?",
  "How long have you been in business?",
  "← Back to menu",
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Welcome to Algonquin Nurses Home Health Care! 👋\n\nI'm your virtual care assistant, here to help you navigate our services, connect with our team, or answer any questions. We've proudly served St. Louis families since 1987.\n\nHow may I help you today?",
    },
  ]);
  const [phase, setPhase] = useState<Phase>("greeting");
  const [selectedService, setSelectedService] = useState<ServiceKey | null>(null);
  const [lead, setLead] = useState({ name: "", email: "", phone: "" });
  const [input, setInput] = useState("");
  const [saving, setSaving] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function bot(text: string, links?: { label: string; href: string }[]) {
    setMessages((prev) => [...prev, { role: "bot", text, links }]);
  }

  function user(text: string) {
    setMessages((prev) => [...prev, { role: "user", text }]);
  }

  // ── Quick-reply handler ──────────────────────────────────────────────────

  function handleQuickReply(label: string) {
    user(label);

    if (phase === "greeting") {
      if (label === "🏥 Explore Our Services") {
        setPhase("services_menu");
        bot("We offer five specialized home health care programs. Which one would you like to learn more about?");
      } else if (label === "📋 Submit a Client Referral") {
        bot(
          "I'll take you to our Client Referral page where you can quickly submit a referral. Our intake team will follow up promptly.",
          [{ label: "Go to Referral Page →", href: "/client-referral" }]
        );
      } else if (label === "💼 Career Opportunities") {
        bot(
          "We're always looking for compassionate, dedicated caregivers! Browse open positions and apply directly on our Careers page.",
          [{ label: "View Careers →", href: "/careers" }]
        );
      } else if (label === "📞 Contact Us") {
        bot(
          "Our friendly team is ready to assist you! Send a message through our Contact page or call any of our three offices.",
          [{ label: "Go to Contact Page →", href: "/contact" }]
        );
      } else if (label === "❓ Ask a Question") {
        setPhase("faq");
        bot("Of course! Select a common question below or type your own.");
      }
      return;
    }

    if (phase === "services_menu") {
      if (label === "← Back") {
        setPhase("greeting");
        bot("No problem! Is there anything else I can help you with?");
        return;
      }
      const entry = Object.entries(SERVICES).find(([, s]) => s.label === label);
      if (entry) {
        const [key, svc] = entry;
        setSelectedService(key as ServiceKey);
        setPhase("service_detail");
        bot(
          `${svc.info}\n\nWould you like a member of our care team to personally reach out to you about ${svc.label}?`
        );
      }
      return;
    }

    if (phase === "service_detail") {
      if (label === "✅ Yes, contact me") {
        setPhase("collect_name");
        bot("Wonderful! Let's get your contact information.\n\nWhat is your full name?");
      } else if (label === "↩ Back to services") {
        setPhase("services_menu");
        setSelectedService(null);
        bot("Sure! Which service would you like to learn more about?");
      }
      return;
    }

    if (phase === "lead_saved" && label === "← Back to main menu") {
      setPhase("greeting");
      bot("Is there anything else I can help you with today?");
      return;
    }

    if (phase === "faq") {
      if (label === "← Back to menu") {
        setPhase("greeting");
        bot("Is there anything else I can help you with today?");
        return;
      }
      bot(findFaqAnswer(label));
    }
  }

  // ── Text input handler ───────────────────────────────────────────────────

  async function handleTextInput(text: string) {
    user(text);

    if (phase === "collect_name") {
      setLead((prev) => ({ ...prev, name: text }));
      setPhase("collect_email");
      bot(`Nice to meet you, ${text.split(" ")[0]}! 😊\n\nWhat's the best email address to reach you?`);
      return;
    }

    if (phase === "collect_email") {
      if (!text.includes("@") || !text.includes(".")) {
        bot("That doesn't look quite right. Please enter a valid email address (e.g. name@email.com).");
        return;
      }
      setLead((prev) => ({ ...prev, email: text }));
      setPhase("collect_phone");
      bot("Perfect! And the best phone number to reach you?");
      return;
    }

    if (phase === "collect_phone") {
      const updatedLead = { ...lead, phone: text };
      setLead(updatedLead);
      setSaving(true);

      try {
        await fetch("/api/chat-leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: updatedLead.name,
            email: updatedLead.email,
            phone: updatedLead.phone,
            service: selectedService ?? undefined,
          }),
        });
      } catch {
        // continue even if save fails — user experience shouldn't break
      }

      setSaving(false);
      setPhase("lead_saved");

      const svc = selectedService ? SERVICES[selectedService] : null;
      bot(
        `You're all set, ${updatedLead.name.split(" ")[0]}! 🎉\n\nWe've received your information and a member of our care team will be in touch within 1 business day. A confirmation has been sent to ${updatedLead.email}.${
          svc ? `\n\nIn the meantime, feel free to learn more about ${svc.label} below.` : ""
        }`,
        svc ? [{ label: `Learn about ${svc.label} →`, href: svc.path }] : undefined
      );
      return;
    }

    if (phase === "faq") {
      bot(findFaqAnswer(text));
      return;
    }

    // Fallback for other phases
    bot(
      "I'd love to help! Please use the options below, or call us anytime at (636) 274-1870."
    );
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || saving) return;
    setInput("");
    handleTextInput(trimmed);
  }

  // ── Computed state ───────────────────────────────────────────────────────

  const quickReplies =
    phase === "greeting" ? MAIN_MENU
    : phase === "services_menu" ? SERVICE_MENU
    : phase === "service_detail" ? ["✅ Yes, contact me", "↩ Back to services"]
    : phase === "lead_saved" ? ["← Back to main menu"]
    : phase === "faq" ? FAQ_PROMPTS
    : [];

  const showInput = ["collect_name", "collect_email", "collect_phone", "faq"].includes(phase);

  const inputPlaceholder: Record<string, string> = {
    collect_name: "Enter your full name...",
    collect_email: "Enter your email address...",
    collect_phone: "Enter your phone number...",
    faq: "Type your question...",
  };

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      {/* Toggle button — bottom left */}
      {!open && (
        <div className="fixed bottom-6 left-6 z-50">
          {/* Attention pulse ring */}
          <span className="absolute inset-0 rounded-full bg-chat animate-chat-ring pointer-events-none" />
          <button
            onClick={() => setOpen(true)}
            className="relative bg-chat hover:bg-chat-dark text-white rounded-full shadow-xl transition-all hover:scale-105 flex items-center gap-2 pl-3.5 pr-5 py-3"
            aria-label="Open chat"
          >
            <span className="animate-wave-hand text-xl leading-none select-none">👋</span>
            <span className="text-sm font-semibold leading-none">Chat with Us!</span>
          </button>
        </div>
      )}

      {/* Chat panel — bottom left */}
      {open && (
        <div
          className="fixed bottom-6 left-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200"
          style={{ maxHeight: "min(560px, calc(100vh - 48px))" }}
        >
          {/* Header */}
          <div className="bg-chat text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 text-lg leading-none select-none">
                👋
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">Algonquin Nurses</p>
                <p className="text-xs text-white/70 leading-tight mt-0.5">Virtual Assistant · Online</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white/20 rounded-full p-1.5 transition-colors ml-2"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Welcome banner */}
          <div className="bg-chat/8 px-4 py-2 border-b border-chat/20 flex-shrink-0">
            <p className="text-xs text-chat-dark font-semibold text-center tracking-wide">
              Welcome — How may we help you today?
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%] space-y-2">
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                      msg.role === "user"
                        ? "bg-chat text-white rounded-br-sm"
                        : "bg-white text-neutral-800 border border-neutral-200 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.links?.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block text-center text-xs font-semibold text-chat border-2 border-chat rounded-xl px-3 py-2 hover:bg-chat hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick replies */}
            {quickReplies.length > 0 && !saving && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {quickReplies.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleQuickReply(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-chat/30 text-chat bg-white hover:bg-chat hover:text-white transition-colors font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {saving && (
              <div className="flex justify-start">
                <div className="bg-white border border-neutral-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center h-3">
                    <span className="w-1.5 h-1.5 bg-chat/60 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-chat/60 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-chat/60 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Text input — only shown when collecting info or in FAQ mode */}
          {showInput && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2 p-3 border-t border-neutral-200 bg-white flex-shrink-0"
            >
              <input
                type={phase === "collect_email" ? "email" : "text"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={inputPlaceholder[phase] ?? "Type a message..."}
                className="flex-1 text-sm px-3 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:border-chat focus:ring-1 focus:ring-chat/20"
                autoFocus
              />
              <button
                type="submit"
                className="bg-chat hover:bg-chat-dark text-white rounded-xl p-2.5 transition-colors disabled:opacity-40"
                disabled={!input.trim() || saving}
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
