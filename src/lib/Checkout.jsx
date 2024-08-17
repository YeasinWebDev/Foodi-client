// Checkout.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ amount, cartItems }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await axios.post('/api/payment', {
                    amount,
                    id,
                    cartItems,
                });

                if (response.data.success) {
                    console.log('Payment successful!');
                    navigate('/payment-success');  // Navigate to a success page
                } else {
                    console.error('Payment failed:', response.data.error);
                }
            } catch (error) {
                console.error('Payment failed:', error);
            }
        } else {
            console.error('Error creating payment method:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" className='bg-orange-500 w-40 px-4 py-3 mt-4 rounded-xl text-white font-semibold'>
                Pay ${amount / 100}
            </button>
        </form>
    );
};

export default Checkout;
