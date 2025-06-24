import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createBooking, fetchUserBookings, deleteBooking, fetchAllBookings } from '../services/api';
import { toast } from 'sonner';
import { generatePDF } from '../utils/pdfGenerator';
import BookingCard from '../components/BookingCard';

const MyBookings = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const isUser = user?.role === 'user';

  const [email, setEmail] = useState(user?.email || '');
  const [username, setUsername] = useState(user?.username || '');
  const [planDetails, setPlanDetails] = useState({
    planId: location?.state?.planId || '',
    planName: location?.state?.planName || '',
    type: location?.state?.type || '',
    price: location?.state?.price || '',
    coverageType: location?.state?.coverageType || '',
    premium: location?.state?.premium || '',
    term: location?.state?.term || '',
    conditions: location?.state?.conditions || '',
  });
  const [userBookings, setUserBookings] = useState([]);
  
  // Fetch the current user's bookings or all bookings for admin
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (user?.role === 'admin') {
          const bookings = await fetchAllBookings(); // Fetch all bookings for admin
          setUserBookings(bookings);
        } else {
          const bookings = await fetchUserBookings(user?._id); // Regular user fetch
          if (bookings.length === 0) {
            toast.info("You don't have any bookings yet.");
          }
          setUserBookings(bookings);
        }
      } catch (err) {
        toast.error("Failed to fetch bookings.");
      }
    };
    fetchBookings();
  }, [user?._id, user?.role]); //useEffect triggers when userId or role changes

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!planDetails.planId) {
      return toast.error("No plan selected");
    }

    const newBooking = {
      userId: user?._id,
      email,
      username,
      ...planDetails,
    };

    const success = await createBooking(newBooking);
    if (success) {
      toast.success("Booking successful!");
      generatePDF(planDetails, username, email);

      setEmail('');
      setUsername('');
      setPlanDetails({
        planId: '',
        planName: '',
        type: '',
        price: '',
        coverageType: '',
        premium: '',
        term: '',
        conditions: '',
      });

      // Re-fetch bookings after successful booking
      const bookings = await fetchUserBookings(user?._id);
      setUserBookings(bookings);
    } else {
      toast.error("Booking failed.");
    }
  };

  const handleDelete = async (bookingId) => {
    const success = await deleteBooking(bookingId);
    if (success) {
      setUserBookings(prev => prev.filter(b => b._id !== bookingId));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-semibold text-center mb-6">{ isUser ? 'Your Bookings' : 'User Bookings'  }</h1>

      {/* Booking Form */}
      { isUser && (
      <form onSubmit={handleBooking} className="bg-white p-6 rounded-md shadow-md mb-10 space-y-4">
        <input
          type="text"
          value={planDetails.planName}
          readOnly
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Plan Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Email"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Username"
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Confirm Booking
        </button>
      </form>)
}

      {/* Display bookings */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">{ isUser ? 'Your Bookings' : 'User Bookings'  }</h3>
        <div className='flex flex-wrap justify-center gap-4'>
          {userBookings.length > 0 ? (
            userBookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} onDelete={handleDelete} />
            ))
          ) : (
            <p className="text-gray-600">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;

