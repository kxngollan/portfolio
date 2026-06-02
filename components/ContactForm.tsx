"use client";
import { FormEvent, ChangeEvent, useState } from "react";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import "@/components/ContactForm.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    number: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const fieldClassName =
    "w-full rounded-xl border border-black/20 dark:border-white/10 bg-white/3 dark:bg-white/3 px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-600 outline-none transition-all duration-200 focus:border-[#ffa351]/50 focus:bg-white/5 dark:focus:bg-white/5 focus:outline-none";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          company: "",
          number: "",
          email: "",
          message: "",
        });
        setSuccess(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(true);
    }
    setSending(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full max-w-5xl px-4 py-3">
      {/* Section header */}
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-xs font-medium text-[#ffa351] tracking-wider">
            04
          </span>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-white/8" />
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/35">
            Contact
          </span>
        </div>
        <h2 className="text-3xl xl:text-4xl font-bold dark:text-white tracking-tight">
          Let&apos;s Work Together
        </h2>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500 max-w-md">
          Have a project in mind or want to chat? I&apos;d love to hear from
          you.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left — contact info */}
        <div>
          <div className="border border-zinc-200 dark:border-white/8 rounded-2xl p-6 bg-zinc-50 dark:bg-white/1 space-y-6">
            {/* Email */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-zinc-500 mb-2 font-medium">
                Email
              </p>
              <a
                href="mailto:Ollanmuza@gmail.com"
                className="text-sm font-semibold text-[#ffa351] hover:underline"
              >
                Ollanmuza@gmail.com
              </a>
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-200 dark:bg-white/8" />

            {/* Socials */}
            <div>
              <p className="text-[11px] uppercase tracking-widest text-zinc-500 mb-3 font-medium">
                Socials
              </p>
              <div className="flex gap-3">
                {[
                  {
                    href: "https://www.github.com/kxngollan",
                    icon: <FaGithub className="h-4 w-4" />,
                    label: "GitHub",
                  },
                  {
                    href: "https://www.linkedin.com/in/ollan-m",
                    icon: <FaLinkedin className="h-4 w-4" />,
                    label: "LinkedIn",
                  },
                  {
                    href: "https://www.instagram.com/ollandagreat/",
                    icon: <FaInstagram className="h-4 w-4" />,
                    label: "Instagram",
                  },
                ].map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl border border-white/10 dark:border-white/10 bg-white/3 dark:bg-white/3 flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:border-[#ffa351]/40 hover:text-[#ffa351] hover:bg-[#ffa351]/5 transition-all duration-200"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              onChange={handleChange}
              placeholder="Name"
              name="name"
              value={formData.name}
              className={fieldClassName}
            />
            <input
              type="text"
              onChange={handleChange}
              name="company"
              value={formData.company}
              placeholder="Company"
              className={fieldClassName}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="email"
              onChange={handleChange}
              placeholder="Email"
              name="email"
              value={formData.email}
              className={fieldClassName}
            />
            <input
              type="number"
              onChange={handleChange}
              placeholder="Phone number"
              name="number"
              value={formData.number}
              className={fieldClassName}
            />
          </div>
          <textarea
            placeholder="Tell me about your project..."
            onChange={handleChange}
            rows={5}
            name="message"
            value={formData.message}
            className={fieldClassName}
          />
          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 px-6 rounded-xl text-sm font-semibold uppercase tracking-widest bg-[#ffa351] text-zinc-900 hover:bg-[#ffb66f] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
          {(success || error) && (
            <p
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                success
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              }`}
            >
              {success
                ? "Message sent — I'll be in touch soon!"
                : "Something went wrong. Please try again."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
