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
    "w-full rounded-md border border-slate-600 bg-white px-4 py-3 text-sm text-black placeholder:text-zinc-500 outline-none ring-0 transition-colors focus:border-[#ffa351] focus:outline-none focus:ring-0 focus-visible:outline-none dark:border-slate-300 dark:bg-[#1a1a1a] dark:text-white dark:placeholder:text-white dark:focus:border-[#ffa351]";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    setSuccess(false);

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(true);
    }
    setSending(false);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="grid lg:grid-cols-2 items-start gap-16 p-6 mx-auto max-w-5xl max-lg:max-w-2xl dark:bg-black ">
      <div className="dark:text-white">
        <h2 className=" text-3xl font-bold dark:text-white">Let{`'`}s Talk</h2>
        <p className="text-[15px]  mt-4 leading-relaxed dark:text-[#ededed]">
          Have some big idea or brand to develop and need help? Then reach out
          we{`'`}d love to hear about your project and provide help.
        </p>
        <div className="mt-12">
          <h2 className=" text-base font-semibold dark:text-white">Email</h2>
          <ul className="mt-4">
            <li className="flex items-center dark:text-[#ededed]">
              <div className=" h-10 w-10 rounded-full flex items-center justify-center shrink-0 dark:bg-[#ffa351]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="#000"
                  viewBox="0 0 479.058 479.058"
                  className="dark:invert"
                >
                  <path
                    d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                    data-original="#000000"
                  />
                </svg>
              </div>
              <a
                href="javascript:void(0)"
                className="text-sm ml-4 dark:text-[#ededed]"
              >
                <small className="block dark:text-[#8892b0]">Mail</small>
                <span className="font-semibold text-[#ffa351] dark:text-[#ffa351]">
                  Ollanmuza@gmail.com
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <h2 className=" text-base font-semibold dark:text-white">Socials</h2>
          <ul className="flex mt-4 space-x-4">
            <Link href="https://www.github.com/kxngollan" target="_blank">
              <li className="bg-[#e6e6e6cf] dark:bg-[#333] text-inherit dark:text-white hover:bg-[#ffa351] dark:hover:bg-[#ffa351] h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200">
                <FaGithub className="h-5 w-5" />
              </li>
            </Link>
            <Link href="https://www.linkedin.com/in/ollan-m" target="_blank">
              <li className="bg-[#e6e6e6cf] dark:bg-[#333] dark:text-white hover:bg-[#ffa351] dark:hover:bg-[#ffa351] h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200">
                <FaLinkedin className="h-5 w-5" />
              </li>
            </Link>{" "}
            <Link
              href="https://www.instagram.com/ollandagreat/"
              target="_blank"
            >
              <li className="bg-[#e6e6e6cf] dark:bg-[#333] dark:text-white hover:bg-[#ffa351] dark:hover:bg-[#ffa351] h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200">
                <FaInstagram className="h-5 w-5" />
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <form
        className="lg:ml-auto space-y-4 dark:bg-black"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          onChange={handleChange}
          placeholder="Name"
          name="name"
          value={formData.name}
          className={fieldClassName}
        />
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
          placeholder="Phone number..."
          name="number"
          value={formData.number}
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
        <textarea
          placeholder="Message"
          onChange={handleChange}
          rows={6}
          name="message"
          value={formData.message}
          className={fieldClassName}
        ></textarea>
        <button
          type="submit"
          className="bg-[#ffa351] dark:bg-[#ffa351] text-white dark:text-black hover:text-[#ffa351] dark:hover:text-[#ffa351] hover:bg-white dark:hover:bg-white hover:border-[#ffa351] border-2 border-[#ffa351] dark:border-[#ffa351] tracking-wide rounded-md text-sm font-medium px-4 py-3 w-full cursor-pointer mt-2 transition-all duration-200 disabled:bg-gray-700 dark:disabled:bg-gray-600 disabled:border-gray-700 disabled:text-white disabled:cursor-not-allowed"
          disabled={sending}
        >
          {sending ? "Sending..." : "Send message"}
        </button>
        <p
          className={`h-6 w-full flex items-center py-5 capitalize rounded-2xl text-white font-bold transition-colors duration-200 ${
            success
              ? "bg-emerald-500 dark:bg-emerald-600"
              : error
                ? "bg-rose-600 dark:bg-rose-700"
                : ""
          }`}
        >
          {success ? (
            <span className="ml-3">Thank you for sending a message</span>
          ) : error ? (
            <span className="ml-3">Message Failed to send</span>
          ) : (
            ""
          )}
        </p>
      </form>
    </div>
  );
};

export default Contact;
