import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js"
import PaymentForm from './PaymentForm';

const Payment = () => {
    const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_KEY}`);

    return <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
    </Elements>
};

export default Payment;