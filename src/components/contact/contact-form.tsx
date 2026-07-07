"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { site } from "@/content/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${name || "your website"}`);
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}\n${email}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent-start"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent-start"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          What are you trying to build?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-accent-start"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
      >
        Send message <Send className="h-4 w-4" aria-hidden="true" />
      </button>
      <p className="text-xs text-muted">
        Opens your email client with this pre-filled — nothing is sent through this site.
      </p>
    </form>
  );
}
