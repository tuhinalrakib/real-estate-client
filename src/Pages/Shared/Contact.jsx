import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="bg-seconday/10 text-white py-16">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or want to find your dream property? Contact us and our experts will assist you promptly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <form className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-400">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-400">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full border text-gray-100 border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-400">Message</label>
                <textarea
                  placeholder="Your Message"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 h-32 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-focus transition-colors w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-primary text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Address</h4>
                <p className="text-gray-400">123 Main Street, Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-primary text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Phone</h4>
                <p className="text-gray-400">+880 160 925 355</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaEnvelope className="text-primary text-2xl mt-1" />
              <div>
                <h4 className="font-semibold text-lg">Email</h4>
                <p className="text-gray-600">eng.tuhin77@gmail.com</p>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 w-full h-64 rounded-lg overflow-hidden shadow-lg">
              <iframe
                title="Real Estate Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.907136281532!2d90.4073513154358!3d23.81033198459268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b073b13e8d%3A0x94419f27d4f0e7f5!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1692547200000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                allowFullScreen=""
                loading="lazy"
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
