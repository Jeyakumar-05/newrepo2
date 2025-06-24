import { jsPDF } from "jspdf";

export const generatePDF = (planDetails, username, email) => {
  const doc = new jsPDF();
  doc.text('Insurance Policy', 105, 10, { align: 'center' });
  doc.text(`User: ${username}`, 10, 20);
  doc.text(`Email: ${email}`, 10, 30);
  doc.text(`Plan Name: ${planDetails.planName}`, 10, 40);
  doc.text(`Price: ₹${planDetails.price}`, 10, 50);
  doc.text(`Coverage Type: ${planDetails.coverageType}`, 10, 60);
  doc.text(`Premium: ₹${planDetails.premium}`, 10, 70);
  doc.text(`Term(Year): ${planDetails.term}`, 10, 80);
  doc.text(`Conditions: ${planDetails.conditions}`, 10, 90);

  // Save PDF (this triggers the download)
  doc.save('insurance-policy.pdf');
};
