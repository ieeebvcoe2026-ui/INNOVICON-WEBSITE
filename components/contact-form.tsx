"use client";

import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  if (status === "sent") {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 border border-rule bg-panel/60 px-8 py-16 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-sdg-15 text-sdg-15">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="font-bold text-xl uppercase tracking-wide text-white">Message sent</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Thank you for reaching out — the Innovicon team will connect with you shortly.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs font-semibold uppercase tracking-widest text-sdg-6 transition-colors hover:text-white cursor-pointer"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("sending");
        window.setTimeout(() => setStatus("sent"), 400);
      }}
    >
      {[
        { id: "name", label: "Name", type: "text" },
        { id: "email", label: "Email", type: "email" },
      ].map((f) => (
        <div key={f.id}>
          <label htmlFor={f.id} className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {f.label}
          </label>
          <input
            id={f.id}
            name={f.id}
            type={f.type}
            required
            className="mt-2 w-full border-0 border-b border-rule bg-transparent py-3 text-lg outline-none focus:border-sdg-6"
          />
        </div>
      ))}
      <div>
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Message / Project Idea
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-2 w-full resize-none border-0 border-b border-rule bg-transparent py-3 text-lg outline-none focus:border-sdg-6"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="border-b-2 border-foreground pb-1 font-bold text-lg uppercase tracking-wide cursor-pointer transition-colors hover:border-sdg-6 disabled:opacity-50 disabled:cursor-wait"
      >
        {status === "sending" ? "Sending…" : "Send message & Register →"}
      </button>
    </form>
  );
}
