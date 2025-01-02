"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import "./Contact.css";

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
  const [successName, setSuccessName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    setSuccess(false);
    console.log("Form submitted:", formData);

    try {
      ("use server");
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        setFormData({
          name: "",
          company: "",
          number: "",
          email: "",
          message: "",
        });
        setSuccessName(name);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const parentVariants = {
    initial: {},
    animate: {
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.4,
      },
    },
  };

  const childVariants = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 1 } },
  };

  return (
    <motion.div initial="initial" animate="animate" variants={parentVariants}>
      <main>
        <motion.div
          initial="initial"
          animate="animate"
          variants={childVariants}
          className="contact-container"
        >
          <h2>Contact Me</h2>
          <form onSubmit={handleSubmit} method="POST">
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label htmlFor="company">Company:</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />

            <label htmlFor="number">Phone Number:</label>
            <input
              type="tel"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            {!sending ? (
              <button type="submit">Submit</button>
            ) : (
              <button type="button" disabled>
                Sending...
              </button>
            )}
            {error ? (
              <div className="failure">
                <p>
                  Error: Failed to send message. Please try again later or email
                  ammmuza@gmail.com
                </p>
              </div>
            ) : null}
            {success ? (
              <div className="success">
                <p>Hey {successName}, your message was sent successfully!</p>
              </div>
            ) : null}
          </form>

          <div className="my-details">
            <h3>My Contact Details</h3>
            <p>
              <MdOutlineEmail /> Email: ammmuza@gmail.com
            </p>
            <p>
              <FaPhoneAlt /> Phone: +44 7427673621
            </p>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default Contact;
