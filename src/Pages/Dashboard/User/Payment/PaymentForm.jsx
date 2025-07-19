import React, { useEffect, useState } from "react";
import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router";

const PaymentForm = () => {
  const { id } = useParams(); // offer id
  console.log(id)
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [offer, setOffer] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Load offer details
    axiosSecure.get(`/offers/${id}`).then((res) => setOffer(res.data));
  }, [axiosSecure, id]);

  useEffect(() => {
    if (offer?.offerAmount) {
      // Create payment intent
      axiosSecure
        .post("/create-payment-intent", { price: offer.offerAmount })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, offer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire("Payment Error", error.message, "error");
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
        receipt_email: user.email,
      });

    if (confirmError) {
      Swal.fire("Confirmation Error", confirmError.message, "error");
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Save transaction
      const paymentInfo = {
        transactionId: paymentIntent.id,
        status: "bought",
      };
      await axiosSecure.patch(`/offers/pay/${id}`, paymentInfo);

      Swal.fire("Success", "Payment complete! 🎉", "success");
      navigate("/dashboard/bought");
    }

    setProcessing(false);
  };

  return (
    <div className="max-w-xl mx-auto my-12 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Pay for Property</h2>

      {offer && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold">{offer.title}</h3>
          <p className="text-gray-600">{offer.location}</p>
          <p className="text-green-700 font-semibold text-xl mt-2">
            Amount: ${offer.offerAmount}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary mt-6 w-full"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
