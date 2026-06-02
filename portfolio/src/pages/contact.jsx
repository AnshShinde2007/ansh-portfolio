// src/pages/contact.jsx
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/layout";

const Contact = () => {
  const form = useRef(null);
  const [sending, setSending] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    if (!form.current) return;

    setSending(true);

    const data = {
      username: form.current.username?.value || "",
      email: form.current.email?.value || "",
      subject: form.current.subject?.value || "",
      fullmsg: form.current.fullmsg?.value || "",
    };

    try {
      const response = await fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errBody = await response.text().catch(() => "");
        throw new Error(errBody || `Status ${response.status}`);
      }

      await response.json().catch(() => ({}));
      toast.success("Message sent!");
      form.current.reset();
    } catch (err) {
      console.error("Send error:", err);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--bg-card)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            fontFamily: "var(--font-body)",
          },
        }}
      />

      {/* Google Map */}
      <div className="map-wrap">
        <iframe
          title="Location"
          width="100%"
          height="280"
          style={{ border: 0, display: "block" }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.70176810728!2d72.71412747332747!3d19.082482210877558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1750246134843!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Contact Form */}
      <p className="contact-form-title">Send a Message</p>

      <form ref={form} onSubmit={send}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <input
            type="text"
            name="username"
            placeholder="Full name"
            className="form-field"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="form-field"
            required
          />
        </div>

        <input
          name="subject"
          placeholder="Subject"
          className="form-field"
          style={{ display: "block", marginBottom: "12px" }}
          required
        />

        <textarea
          name="fullmsg"
          placeholder="Your message…"
          rows="5"
          className="form-field"
          style={{ display: "block", marginBottom: "16px" }}
          required
        />

        <input type="hidden" name="time" value={new Date().toLocaleString()} />

        <button type="submit" className="send-btn" disabled={sending}>
          {sending ? "Sending…" : "✉ Send Message"}
        </button>
      </form>
    </Layout>
  );
};

export default Contact;
