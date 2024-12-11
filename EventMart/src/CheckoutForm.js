import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      '{CLIENT_SECRET}', // Replace this dynamically
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: 'Customer Name' },
        },
      }
    );

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent) {
      setMessage('Payment successful!');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default CheckoutForm;
