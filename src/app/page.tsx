"use client";

import Image from "next/image";
import { useState } from "react";
import emailjs from "@emailjs/nodejs";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "loading" }
    | { type: "success"; message: string }
    | { type: "error"; message: string }
  >({ type: "idle" });

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string | undefined;
  const templateId = "template_123456789"
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string | undefined;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: "Please fill out all fields." });
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: "error",
        message:
          "Email service is not configured. Please set the required environment variables.",
      });
      return;
    }

    setStatus({ type: "loading" });

    try {
      const params = {
        from_name: form.name,
        reply_to: form.email,
        message: form.message,
      } as Record<string, unknown>;

      await emailjs.send(serviceId, templateId, params, { publicKey });
      setStatus({ type: "success", message: "Message sent! We'll be in touch." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: "Something went wrong sending your message. Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-500 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl flex flex-col items-center gap-8">
        <Image
          src="/TX BG.png"
          alt="Company Logo"
          width={260}
          height={260}
          priority
          className="w-40 h-auto sm:w-52 md:w-64 object-contain"
        />

        <div className="text-center space-y-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide font-ethnocentric">
            Coming Soon
          </h1>
          <p className="text-yellow-400/80 text-base md:text-lg font-ethnocentric">
            We are crafting something exceptional. Stay tuned!
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="w-full bg-neutral-900/60 rounded-xl p-5 sm:p-6 md:p-8 border border-yellow-500/20 shadow-[0_0_0_1px_rgba(255,215,0,0.06)]"
        >
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm text-yellow-400/80">Name</span>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                required
                className="px-3 py-2 rounded-md bg-black/60 border border-yellow-500/30 text-yellow-100 placeholder:text-yellow-100/40 outline-none focus:ring-2 focus:ring-yellow-500/60"
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-yellow-400/80">Email</span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
                className="px-3 py-2 rounded-md bg-black/60 border border-yellow-500/30 text-yellow-100 placeholder:text-yellow-100/40 outline-none focus:ring-2 focus:ring-yellow-500/60"
                placeholder="you@example.com"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-sm text-yellow-400/80">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                required
                rows={4}
                className="px-3 py-2 rounded-md bg-black/60 border border-yellow-500/30 text-yellow-100 placeholder:text-yellow-100/40 outline-none focus:ring-2 focus:ring-yellow-500/60 resize-y"
                placeholder="How can we help?"
              />
            </label>
            <button
              type="submit"
              disabled={status.type === "loading"}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-yellow-500 text-black font-semibold px-4 py-2 transition-colors hover:bg-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status.type === "loading" ? "Sending..." : "Send Message"}
            </button>
            {status.type === "error" && (
              <p className="text-red-400 text-sm">{status.message}</p>
            )}
            {status.type === "success" && (
              <p className="text-green-400 text-sm">{status.message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
