import React from 'react';
  import { useNavigate } from 'react-router-dom';

import '../styles/checkout.css';

const CheckoutPage = () => {

  const navigate = useNavigate();

    const handleCheckout = () => {
    navigate("/checkout");
  };


  return (
    <div className="checkout-container">
      <button onClick={() => navigate('/')} className="back-button">GO BACK</button>
      <form className="checkout-form">
        <h2 className="payment-title">Payment Details</h2>

        <div className="input_container">
          <label>Cardholder Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="input_container">
          <label>Card Number</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="0000 0000 0000 0000"
            maxLength="19"
            required
          />
        </div>

        <div className="split">
          <div className="input_container">
            <label>Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              required
            />
          </div>

          <div className="input_container">
            <label>CVV</label>
            <input
              type="password"
              placeholder="CVV"
              maxLength="4"
              required
            />
          </div>
        </div>

        <button type="submit" className="checkout-btn">
          Checkout
        </button>

      </form>
    </div>
  );
};

export default CheckoutPage;
