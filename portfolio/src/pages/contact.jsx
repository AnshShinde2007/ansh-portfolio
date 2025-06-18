//src/pages/contact.jsx
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_kjj75vk",
        "template_rdwq63j",
        form.current,
        {
          publicKey: "A7jM5V212fbAzicAY",
        }
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          alert("Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.log("Email error:", error.text);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <div
      className="bg-secondary bg-opacity-10 rounded-4 p-4 mt-3 mx-auto"
      style={{ maxWidth: "1000px" }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-4">
        <div>
          <h2 className="text-white mb-0">Contact</h2>
          <div
            className="bg-warning"
            style={{ height: "4px", width: "50px", marginTop: "5px" }}
          ></div>
        </div>
        <nav className="d-none d-md-flex gap-3">
          <a href="/" className="text-white text-decoration-none">About</a>
          <a href="/resume" className="text-white text-decoration-none">Resume</a>
          <a href="/portfolio" className="text-white text-decoration-none">Portfolio</a>
          <a href="/contact" className="text-warning fw-semibold text-decoration-none">Contact</a>
        </nav>
      </div>

      {/* Google Map */}
      <div className="mb-4">
        <iframe
          title="Location"
          className="w-100 rounded"
          height="300"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241316.70176810728!2d72.71412747332747!3d19.082482210877558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1750246134843!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Contact Form */}
      <h4 className="text-white fw-bold mb-4">Contact Form</h4>
      <form ref={form} onSubmit={sendEmail} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            name="user_name"
            placeholder="Full name"
            className="form-control bg-dark text-white border-0"
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="email"
            name="user_email"
            placeholder="Email address"
            className="form-control bg-dark text-white border-0"
            required
          />
        </div>
        <div className="col-12">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="form-control bg-dark text-white border-0"
            required
          />
        </div>
        <div className="col-12">
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            className="form-control bg-dark text-white border-0"
            required
          ></textarea>
        </div>
        <input type="hidden" name="time" value={new Date().toLocaleString()} />
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-warning fw-bold px-4 shadow-sm"
          >
            Send Message *doesn't work for now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
