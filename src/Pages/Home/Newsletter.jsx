// src/components/Newsletter.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast"; // Optional: for success message

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email!");
    setLoading(true);

    try {
      // এখানে তুমি API call করতে পারো
      // await axios.post("/api/newsletter", { email });

      toast.success("Subscribed successfully!");
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error("Subscription failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-purple-50 py-16 px-4 md:px-8 rounded-2xl shadow-inner mt-10">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-700 mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-8">
          Get the latest updates, offers, and featured properties delivered straight to your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`btn bg-purple-600 text-white hover:bg-purple-700 transition-all px-6 py-2 rounded-xl ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        <p className="text-gray-500 text-sm mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </motion.div>
    </section>
  );
};

export default Newsletter;
