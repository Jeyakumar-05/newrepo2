// src/utils/generatePaymentPDF.js

import { jsPDF } from 'jspdf';

const generatePaymentPDF = (formData) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Payment Confirmation', 14, 20);

  doc.setFontSize(12);
  doc.text(`Name: ${formData.username}`, 14, 30);
  doc.text(`Booking Type: ${formData.typeOfBooking}`, 14, 40);
  doc.text(`Amount: ₹${formData.amount}`, 14, 50);
  doc.text(`Card Number: ${formData.cardNumber}`, 14, 60);
  doc.text(`Expiry Date: ${formData.expiryDate}`, 14, 70);
  doc.text(`Transaction ID: ${formData.transactionId}`, 14, 80);

  // Save the generated PDF
  doc.save(`Payment_Confirmation_${formData.transactionId}.pdf`);
};

export default generatePaymentPDF;
