import React from 'react';
import { XIcon, ShieldIcon, BadgeCheckIcon, CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlanCard = ({ plan, onDelete }) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const isAdmin = userData?.role === 'admin';

  return (
    <div className="bg-gradient-to-br from-white via-gray-100 to-white shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden transform hover:scale-[1.03] transition-all duration-300 p-6">
      <div className="flex flex-col justify-between h-full space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-blue-700">{plan.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{plan.conditions}</p>

          <div className="space-y-3 text-gray-700 text-[15px]">
            <div className="flex items-center gap-2">
              <ShieldIcon size={18} className="text-blue-600" />
              <span>Type: <strong>{plan.type}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheckIcon size={18} className="text-green-600" />
              <span>Coverage: <strong>{plan.coverageType}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Price:</span> ₹{plan.price}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Premium:</span> ₹{plan.premium}
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon size={18} className="text-purple-600" />
              <span>Term: <strong>{plan.term}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <Link
            to="/insurance-booking"
            state={{
              planId: plan._id,
              planName: plan.name,
              type: plan.type,
              price: plan.price,
              coverageType: plan.coverageType,
              premium: plan.premium,
              term: plan.term,
              conditions: plan.conditions,
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full text-sm font-semibold transition"
          >
            Book Now
          </Link>

          {isAdmin && (
            <button
              onClick={() => onDelete(plan._id)}
              className="flex items-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full text-sm font-semibold transition"
            >
              <XIcon size={18} className="mr-1" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
