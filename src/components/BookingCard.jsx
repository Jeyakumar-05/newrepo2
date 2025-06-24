import React from 'react';
import { XIcon, ShieldCheckIcon, CalendarIcon, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingCard = ({ booking, onDelete }) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const isAdmin = userData?.role === 'admin';

  return (
    <div className="w-full sm:w-[22rem] bg-white rounded-2xl overflow-hidden m-4 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-blue-800">{booking.planName}</h2>
        <p className="text-gray-500 mb-4 italic">{booking.conditions || 'No special conditions.'}</p>

        <div className="space-y-2 text-gray-700">
          <div className="flex items-center">
            <User size={18} className="text-blue-600 mr-2" />
            <span><span className="font-semibold">UserName:</span> {booking.username}</span>
          </div>
          <div className="flex items-center">
            <ShieldCheckIcon size={18} className="text-blue-600 mr-2" />
            <span><span className="font-semibold">Type:</span> {booking.type}</span>
          </div>

          <div className="flex items-center">
            <ShieldCheckIcon size={18} className="text-green-600 mr-2" />
            <span><span className="font-semibold">Coverage:</span> {booking.coverageType}</span>
          </div>

          <div>
            <span className="font-semibold">Price:</span> ₹{booking.price}
          </div>

          <div>
            <span className="font-semibold">Premium:</span> ₹{booking.premium}
          </div>

          <div className="flex items-center">
            <CalendarIcon size={18} className="text-purple-600 mr-2" />
            <span><span className="font-semibold">Term:</span> {booking.term} {booking.term > 1 ? 'Years' : 'Year'}</span>
          </div>

          <div>
            <span className="font-semibold">Booked On:</span> {new Date(booking.bookedAt).toLocaleDateString()}
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Link
            to="/payment"
            state={{
              planId: booking.planId,
              type: booking.type,
              price: booking.price,
              premium: booking.premium,
            }}
            className="bg-blue-700 text-white py-2 px-5 rounded-lg hover:bg-blue-800 transition"
          >
            Pay Now
          </Link>

          {isAdmin && (
            <button
              onClick={() => onDelete(booking._id)}
              className="bg-red-600 text-white py-2 px-3 rounded-lg flex items-center hover:bg-red-700 transition"
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

export default BookingCard;
