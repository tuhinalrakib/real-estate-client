import React from 'react';
// import {loadStripe} from '@stripe/stripe-js';
import {Elements} from "@stripe/react-stripe-js"
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_KEY}`);

const Payment = () => {
    return <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
    </Elements>
};

export default Payment;