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
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";

const PaymentForm = () => {
  const { id } = useParams(); // offer id
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // const [errors, setErrors] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  // 1. Load offer data
  const { isPending, data: offer = {} } = useQuery({
    queryKey: ['offers', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/${id}`);
      return res.data;
    }
  });
  const amount = offer?.offerAmount
  const propertyId = offer?.propertyId

  // 2. Create payment intent when offer is loaded
  useEffect(() => {
    if (offer?.offerAmount) {
      const amountInCents = offer.offerAmount * 100;
      axiosSecure
        .post("/offers/create-payment-intent", { amountInCents })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Failed to create payment intent", error);
        });
    }
  }, [axiosSecure, offer]);

  if (isPending) return <Loader />;

  // 3. Handle submit
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
      const transactionId = paymentIntent.id;
      // step-4 mark parcel paid also create payment history
      const paymentData = {
        id,
        propertyId,
        email: user.email,
        amount,
        transactionId: transactionId,
        paymentMethod: paymentIntent.payment_method_types
      }
      const paymentRes = await axiosSecure.post('/payments', paymentData);
      if (paymentRes.data.insertedId) {

        // ✅ Show SweetAlert with transaction ID
        await Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
          confirmButtonText: 'Go to My Parcels',
        });

        // ✅ Redirect to /myParcels
        navigate('/dashboard');

      }
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
