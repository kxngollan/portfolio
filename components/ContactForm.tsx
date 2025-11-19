"use client";
import { FormEvent, ChangeEvent, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Link from "next/link";

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
    <div className="px-4 py-12 max-w-4xl mx-auto">
      <div className="flex flex-col gap-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white  shadow-lg rounded-xl p-8 space-y-5 border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-3">Send Me a Message</h2>

          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
              className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition p-3"
            ></textarea>
          </div>

          {!sending ? (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
            >
              Sending...
            </button>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-600 p-3 rounded-lg">
              Error sending message. Please try again or email
              ollanmuza@gmail.com
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 p-3 rounded-lg">
              Your message has been sent successfully!
            </div>
          )}
        </form>
        <div className="bg-gray-50 shadow-inner rounded-xl p-8">
          <h3 className="text-xl font-semibold mb-4">My Contact Details</h3>

          <p className="flex items-center gap-3 mb-4 text-gray-700">
            <MdOutlineEmail size={22} />
            <Link
              href="mailto:ollanmuza@gmail.com"
              className="text-blue-600 hover:underline"
            >
              ollanmuza@gmail.com
            </Link>
          </p>

          <p className="flex items-center gap-3 text-gray-700">
            <FaPhoneAlt size={20} /> +44 7427673621
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
