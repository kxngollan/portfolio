"use client";
import { FormEvent, ChangeEvent, useState } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="grid lg:grid-cols-2 items-start gap-16 p-6 mx-auto max-w-5xl max-lg:max-w-2xl ">
      <div>
        <h2 className=" text-3xl font-bold">Let{`'`}s Talk</h2>
        <p className="text-[15px]  mt-4 leading-relaxed">
          Have some big idea or brand to develop and need help? Then reach out
          we{`'`}d love to hear about your project and provide help.
        </p>
        <div className="mt-12">
          <h2 className=" text-base font-semibold">Email</h2>
          <ul className="mt-4">
            <li className="flex items-center">
              <div className=" h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="#000"
                  viewBox="0 0 479.058 479.058"
                >
                  <path
                    d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                    data-original="#000000"
                  />
                </svg>
              </div>
              <a href="javascript:void(0)" className="text-sm ml-4">
                <small className="block ">Mail</small>
                <span className="font-semibold text-[#ffa351]">
                  Ollanmuza@gmail.com
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <h2 className=" text-base font-semibold">Socials</h2>
          <ul className="flex mt-4 space-x-4">
            <Link href="https://www.github.com/kxngollan" target="_blank">
              <li className="bg-[#e6e6e6cf] text-inherit hover:bg-[#ffa351] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <FaGithub className="h-5 w-5" />
              </li>
            </Link>
            <Link href="https://www.linkedin.com/in/ollan-m" target="_blank">
              <li className="bg-[#e6e6e6cf] hover:bg-[#ffa351] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <FaLinkedin className="h-5 w-5" />
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <form className="lg:ml-auto space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Name"
          name="name"
          value={formData.name}
          className="w-full rounded-md py-3 px-4  text-sm border border-slate-700 focus:border-slate-900 dark:border-gray-600  dark:focus:border-white outline-none focus:bg-transparent"
        />
        <input
          type="email"
          onChange={handleChange}
          placeholder="Email"
          name="email"
          value={formData.email}
          className="w-full rounded-md py-3 px-4  text-sm border border-slate-700 focus:border-slate-900 dark:border-gray-600  dark:focus:border-white outline-none focus:bg-transparent"
        />
        <input
          type="number"
          onChange={handleChange}
          placeholder="Phone number..."
          name="number"
          value={formData.number}
          className="w-full rounded-md py-3 px-4  text-sm border border-slate-700 focus:border-slate-900 dark:border-gray-600  dark:focus:border-white outline-none focus:bg-transparent"
        />
        <input
          type="text"
          onChange={handleChange}
          name="company"
          value={formData.company}
          placeholder="Company"
          className="w-full rounded-md py-3 px-4 text-sm border border-slate-700 focus:border-slate-900 dark:border-gray-600  dark:focus:border-white outline-none focus:bg-transparent"
        />
        <textarea
          placeholder="Message"
          onChange={handleChange}
          rows={6}
          name="message"
          value={formData.message}
          className="w-full rounded-md px-4  text-sm pt-3 border  border-slate-700 focus:border-slate-900 dark:border-gray-600  dark:focus:border-white outline-none"
        ></textarea>
        <button
          type="button"
          className="bg-[#ffa351] text-white hover:text-[#ffa351] hover:border-[#ffa351] hover:bg-inherit border-2
          dar tracking-wide rounded-md text-sm font-medium px-4 py-3 w-full cursor-pointer mt-2! disabled:bg-gray-700 disabled:border-inherit disabled:text-white disabled:cursor-not-allowed"
          disabled={sending}
        >
          {sending ? "Sending..." : "Send message"}
        </button>
        <p
          className={`h-6 w-full flex items-center py-5 capitalize rounded-2xl text-white font-bold ${
            success ? "bg-emerald-400!" : error ? "bg-rose-700!" : ""
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
