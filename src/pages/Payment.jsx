import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { makePayment } from "../services/api";
import generatePaymentPDF from "../utils/generatePaymentPDF";

const Payment = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const username = userData?.username || "";

  const location = useLocation();
  const { type = "", planId = "", premium = 0 } = location.state || {};

  const [formData, setFormData] = useState({
    typeOfBooking: type,
    username: username,
    amount: premium,
    cardNumber: "",
    expiryDate: "",
    transactionId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRazorpayPayment = () => {
    if (!formData.username || !formData.typeOfBooking) {
      alert("Please fill in your name and booking type before proceeding.");
      return;
    }

    if (!formData.cardNumber || !formData.expiryDate) {
      alert(
        "Please fill in your card number and expiry date before proceeding."
      );
      return;
    }

    const razorpayAmount = formData.amount * 100;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: razorpayAmount,
      currency: "INR",
      name: "SmartInsure",
      description: "Insurance Payment",
      handler: async function (response) {
        try {
          const updatedFormData = {
            ...formData,
            transactionId: response.razorpay_payment_id,
            bookingId: planId,
          };

          // Save payment automatically after successful Razorpay payment

          const result = await makePayment(updatedFormData);
          alert(
            "Payment successful and recorded! Transaction ID: " +
              response.razorpay_payment_id
          );
          console.log(result);

          generatePaymentPDF(updatedFormData);

          setFormData({
            typeOfBooking: "",
            username: "",
            amount: 0,
            cardNumber: "",
            expiryDate: "",
            transactionId: "",
          });
        } catch (error) {
          console.error("Failed to record payment:", error);
          alert(
            "Payment was successful, but failed to record. Please contact support."
          );
        }
      },
      prefill: {
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={(e) => e.preventDefault()} // prevent default submit
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Secure Payment
        </h2>

        <input
          type="text"
          name="typeOfBooking"
          value={formData.typeOfBooking}
          onChange={handleChange}
          placeholder="Type of Booking"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="Card Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="text"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          placeholder="MM/YY"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <div className="text-center font-medium text-lg text-gray-700">
          Premium Amount: ₹{formData.amount}
        </div>

        <button
          type="button"
          onClick={handleRazorpayPayment}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition duration-300"
        >
          Pay ₹{formData.amount} with Razorpay
        </button>

        <p className="text-center text-sm text-gray-500">
          By proceeding, you agree to our{" "}
          <span className="text-blue-600 underline cursor-pointer">
            Terms & Conditions
          </span>
          .
        </p>
      </form>
    </div>
  );
};

export default Payment;
