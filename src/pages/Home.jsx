import React from "react";
import FloatingChatbot from "../components/FloatingChatbot";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white text-gray-800">
    {/* Hero Section */}
    <section className="bg-gradient-to-r fbg-blue-50 shadow-xl rounded-md text-blue py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Secure Your Future with SmartInsure</h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto">
        Explore a range of insurance plans tailored to your needs. Protect your family, assets, and lifestyle with confidence.
      </p>
    </section>

    {/* Overview Section */}
    <section className="py-16 px-6 text-center max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Why Choose SmartInsure?</h2>
      <p className="text-gray-600 mb-8">
        We offer a variety of insurance options to suit your individual or family needs. Get covered with flexible and affordable plans.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl shadow-lg bg-blue-50 hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Easy Policy Management</h3>
          <p>Manage your policies, claims, and payments seamlessly through our intuitive platform.</p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-blue-50 hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Expert Guidance</h3>
          <p>Our experts help you pick the best plan according to your unique needs and life stage.</p>
        </div>
        <div className="p-6 rounded-2xl shadow-lg bg-blue-50 hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-bold text-blue-600 mb-2">24/7 Support</h3>
          <p>Our team is always available to assist you with queries, claims, and emergencies.</p>
        </div>
      </div>
    </section>

    {/* Policy Selection */}
    <section className="bg-gray-100 py-16 px-6 text-center">
      <h2 className="text-3xl font-semibold mb-6">Choose Your Coverage</h2>
      <p className="mb-8 text-gray-700">Select a policy type that suits you best.</p>
      <div className="flex justify-center gap-6 flex-wrap">
        <Link to="/insurance-selection" className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">Individual Policy</Link>
        <Link to="/insurance-selection" className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-600">Family Policy</Link>
      </div>
    </section>

    {/* Insurance Types */}
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-10">Our Insurance Plans</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {[
          { name: "Health Insurance", desc: "Covers medical expenses for illness and injury." },
          { name: "Life Insurance", desc: "Financial protection for your loved ones in your absence." },
          { name: "Auto Insurance", desc: "Protects against damage or theft of your vehicle." },
          { name: "Home Insurance", desc: "Secures your home and valuables against disasters." },
          { name: "Travel Insurance", desc: "Coverage for trip cancellations, health issues, or lost baggage." },
          { name: "Business Insurance", desc: "Shield your business from risks and liabilities." },
        ].map((plan, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition duration-300 hover:scale-105"
          >
            <h3 className="text-2xl font-bold text-blue-600 mb-3">{plan.name}</h3>
            <p className="text-gray-600 mb-5 text-sm leading-relaxed">{plan.desc}</p>
            <Link 
            to="/insurance-selection"
            className="text-blue-700 font-semibold hover:underline"
            >
            Learn More
            </Link>
          </div>
        ))}
      </div>
    </section>
    <FloatingChatbot />
  </div>
  );
};

export default Home;
