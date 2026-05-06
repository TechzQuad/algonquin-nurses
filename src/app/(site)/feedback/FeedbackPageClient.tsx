"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Star, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { Testimonials, type TestimonialItem } from "@/components/Testimonials";
import { CTASection } from "@/components/CTASection";

export function FeedbackPageClient({ testimonials = [] }: { testimonials?: TestimonialItem[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.7);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setIsPlaying(true); }
    else { v.pause(); setIsPlaying(false); }
  }

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    if (!v.muted) v.volume = volume;
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const v = videoRef.current;
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (v) { v.volume = val; v.muted = val === 0; }
    setIsMuted(val === 0);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const payload = { ...Object.fromEntries(formData.entries()), rating };
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Hero
        subtitle="Your Voice Matters"
        title="Client Feedback"
        description="We value your feedback. Help us continue to improve our services and care for the St. Louis community."
        imageSrc="/images/fed.jpg"
        imageAlt="Client feedback"
        compact
        showCTA={false}
      />

      {/* Video section */}
      <section className="py-12 lg:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">Real Stories. Real Families.</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4 leading-tight">
                Hear It Straight From the People We Serve
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-3">
                Behind every review is a family who trusted us with someone they love. These aren't just words — they're real moments shared by real clients who've experienced our care firsthand.
              </p>
              <p className="text-neutral-600 leading-relaxed mb-3">
                At Algonquin Nurses, we believe the best measure of our work is the peace of mind we bring to families across St. Louis — one home, one person at a time.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Watched their story? We'd love to hear yours — scroll down and leave your feedback. It takes less than two minutes.
              </p>
            </motion.div>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl group"
            >
              <video
                ref={videoRef}
                src="/videos/testimonial.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />

              {/* Controls bar */}
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center gap-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={togglePlay} className="text-white hover:text-accent transition-colors flex-shrink-0" aria-label={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button onClick={toggleMute} className="text-white hover:text-accent transition-colors flex-shrink-0" aria-label={isMuted ? "Unmute" : "Mute"}>
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolume}
                  className="w-16 h-1 accent-accent cursor-pointer"
                  aria-label="Volume"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Existing testimonials */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Testimonials"
            title="What Our Clients Say"
            description="Read what families across St. Louis have to say about their experience with Algonquin Nurses."
          />
          <Testimonials items={testimonials} />
        </div>
      </section>

      {/* Feedback form */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Share Your Experience"
            title="Submit Your Feedback"
            description="Your feedback helps us improve and lets other families know what to expect."
          />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-accent/5 border border-accent/20 rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">Thank You!</h3>
              <p className="text-neutral-600">
                We appreciate your feedback. It helps us continue to provide the best care possible.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fbName" className="block text-sm font-medium text-neutral-700 mb-1.5">Your Name</label>
                  <input type="text" id="fbName" name="name" className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
                </div>
                <div>
                  <label htmlFor="fbRelation" className="block text-sm font-medium text-neutral-700 mb-1.5">Relationship to Client</label>
                  <select id="fbRelation" name="relationship" className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white">
                    <option value="">Select...</option>
                    <option value="client">I am the client</option>
                    <option value="family">Family member</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Star rating */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-0.5 transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="fbMessage" className="block text-sm font-medium text-neutral-700 mb-1.5">Your Feedback *</label>
                <textarea id="fbMessage" name="message" required rows={5} className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" placeholder="Share your experience with Algonquin Nurses..." />
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button type="submit" disabled={submitting} className="w-full sm:w-auto px-8 py-3.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                <Send className="w-4 h-4" />
                {submitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
