"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const QA: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["private duty", "private", "duty"],
    answer:
      "Our Private Duty Care provides one-on-one assistance with daily living activities, personal care, and companionship. Services are available 24/7 and tailored to each client's needs. Call (314) 822-8158 to learn more.",
  },
  {
    keywords: ["medicaid", "in-home", "in home"],
    answer:
      "We offer Medicaid In-Home Care for eligible individuals. Our team helps with personal care, homemaking, and daily activities covered under Missouri Medicaid. Contact us to check eligibility.",
  },
  {
    keywords: ["cds", "consumer directed", "consumer"],
    answer:
      "Consumer Directed Services (CDS) lets you choose your own caregiver — even a family member or friend. We handle payroll, taxes, and compliance so you can focus on care. Call us for details.",
  },
  {
    keywords: ["youth", "children", "child", "kid", "hcy"],
    answer:
      "Our Youth & Children Program (HCY) provides in-home support for children with special health care needs. Services include personal care, respite care, and skilled nursing.",
  },
  {
    keywords: ["veteran", "veterans", "va"],
    answer:
      "We proudly serve veterans with in-home care services. Our Veterans Care program works with VA benefits to provide personal care, companionship, and daily living assistance.",
  },
  {
    keywords: ["career", "job", "hire", "hiring", "work", "apply", "employment"],
    answer:
      "We're always looking for compassionate caregivers! Visit our Careers page at /careers or call (314) 822-8158 to learn about open positions.",
  },
  {
    keywords: ["hours", "available", "24", "weekend", "holiday"],
    answer:
      "We provide 24-hour services, including weekends and holidays. Care never stops at Algonquin Nurses.",
  },
  {
    keywords: ["location", "address", "office", "where"],
    answer:
      "We have three offices:\n• St. Louis: 10135 Manchester Rd., MO 63122 — (314) 822-8158\n• House Springs: 7200 Executive Pkwy, MO 63051 — (636) 274-1870\n• O'Fallon: (636) 978-1775",
  },
  {
    keywords: ["contact", "phone", "call", "reach", "number"],
    answer:
      "You can reach us at:\n• St. Louis: (314) 822-8158\n• House Springs: (636) 274-1870\n• O'Fallon: (636) 978-1775\nOr visit our Contact page for more options.",
  },
  {
    keywords: ["service", "services", "offer", "what do you", "help"],
    answer:
      "We offer five core services:\n1. Private Duty Care\n2. Medicaid In-Home Care\n3. Consumer Directed Services (CDS)\n4. Youth & Children Program\n5. Veterans Care\n\nAsk about any specific service for more details!",
  },
  {
    keywords: ["insurance", "pay", "cost", "price", "accept"],
    answer:
      "We accept Medicaid and work with various insurance providers. For private duty care, we offer competitive rates. Please call (314) 822-8158 to discuss payment options.",
  },
  {
    keywords: ["referral", "refer"],
    answer:
      "You can submit a client referral through our Client Referral page or by calling any of our offices. We make the intake process simple and quick.",
  },
];

const QUICK_QUESTIONS = [
  "What services do you offer?",
  "Tell me about Private Duty Care",
  "How does Medicaid In-Home Care work?",
  "What is Consumer Directed Services?",
  "Youth & Children Programs",
  "Veterans Care",
  "Where are you located?",
  "How do I contact you?",
  "Are you hiring?",
  "What insurance do you accept?",
];

const GREETING =
  "Hello! 👋 I'm here to help you learn about our services. Tap a question below or type your own!";

function findAnswer(input: string): string {
  const lower = input.toLowerCase();
  for (const qa of QA) {
    if (qa.keywords.some((kw) => lower.includes(kw))) {
      return qa.answer;
    }
  }
  return "I'm not sure about that. Please call us at (314) 822-8158 or visit our Contact page for assistance. You can also ask me about our services, locations, or careers!";
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(text: string) {
    const userMsg: Message = { role: "user", text };
    const botMsg: Message = { role: "bot", text: findAnswer(text) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage(trimmed);
    setInput("");
  }

  const showQuickReplies =
    messages.length > 0 && messages[messages.length - 1].role === "bot";

  return (
    <>
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary-dark text-white rounded-full p-4 shadow-lg transition-all hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-neutral-200"
          style={{ maxHeight: "min(500px, calc(100vh - 48px))" }}
        >
          {/* Header */}
          <div className="bg-primary text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">Services Inquiry</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-neutral-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-sm"
                      : "bg-white text-neutral-800 border border-neutral-200 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {showQuickReplies && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-2.5 py-1.5 rounded-full border border-primary/30 text-primary bg-white hover:bg-primary hover:text-white transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 p-3 border-t border-neutral-200 bg-white flex-shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our services..."
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white rounded-lg p-2 transition-colors disabled:opacity-50"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
