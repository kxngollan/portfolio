"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="text-sm font-semibold text-[#b88a5a] dark:text-[#ffa351]">
        Thanks! You&apos;re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="w-full rounded-lg border border-[#e8e2da] bg-[#fbfaf7] px-3 py-2 text-sm text-[#1f1d1a] placeholder:text-[#a9a49e] focus:outline-none focus:ring-2 focus:ring-[#b88a5a] dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
      />
      <button
        type="submit"
        className="w-full rounded-lg bg-[#151515] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2b2926] dark:bg-[#ffa351] dark:text-black dark:hover:bg-[#ffb870]"
      >
        Subscribe
      </button>
    </form>
  );
}
