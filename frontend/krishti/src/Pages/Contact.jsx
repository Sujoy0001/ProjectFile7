import React, { useState } from "react";
import { FaWhatsapp, FaGooglePay, FaEnvelope, FaPhone, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { useForm } from '@formspree/react';
import "../App.css";



export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [state, formSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await formSubmit({
      name: formData.name,
      email: formData.email,
      message: formData.message
    });
    if (result) {
      setFormData({ name: "", email: "", message: "" });
      alert("Thanks for reaching out! I'll get back to you soon.");
    }
  };

  if (state.succeeded) {
    return (
      <div className="animate-fade-in">
        <p className="text-center text-green-600 font-semibold py-10 px-4 text-lg md:text-xl">
          Thanks for contacting me! 
          <span className="block mt-3 text-sm text-green-500 font-normal">
            I'll get back to you soon.
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-14 text-center text-gray-800">Contact Me</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6" name="contact">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium w-full cursor-pointer"
              disabled={state.submitting}
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          {/* Map */}
          <div className="h-64 bg-gray-100 rounded-lg overflow-hidden shadow-md border border-gray-200">
            <iframe
              title="My Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3999.2088019742782!2d87.4521939448019!3d23.19607637414512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f7859c00001b85%3A0xcfeda99c5fce3b5e!2s%22Krishti%22%20-%20an%20art%20academy!5e0!3m2!1sen!2sin!4v1750666500755!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Information</h2>
            <div className="space-y-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-600 text-xl" />
                <a href="mailto:animeshday.in@gmail.com" className="text-gray-700 hover:text-blue-600 transition-colors font-bold">
                  animeshdey.in@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-blue-600 text-xl" />
                <a href="tel:+9732172167" className="text-gray-700 hover:text-blue-600 transition-colors font-bold">
                  +91 9732172167
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaWhatsapp className="text-blue-600 text-xl" />
                <a href="tel:+9732172167" className="text-gray-700 hover:text-blue-600 transition-colors font-bold">
                  +91 9732172167
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaGooglePay className="text-blue-600 text-4xl" />
                <span className="text-gray-700 font-bold">
                  9134501272 (Google Pay/PhonePe)
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-2">
              <h3 className="text-xl font-medium mb-4 text-gray-800">Connect With Me</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/animesh.dey.5209/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-blue-700 text-gray-100 hover:bg-yellow-500 transition-colors duration-300">
                  <FaFacebookF className="text-xl" />
                </a>
                <a href="https://www.youtube.com/krishti" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-red-700 text-gray-100 hover:bg-yellow-500 transition-colors duration-300">
                  <FaYoutube className="text-xl" />
                </a>
                <a href="https://www.instagram.com/adrish_dastru/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-pink-700 text-gray-100 hover:bg-yellow-500 transition-colors duration-300">
                  <FaInstagram className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
