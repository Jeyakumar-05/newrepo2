import axios from "axios";
// const API_URL = "http://localhost:7777";
const API_URL = "https://smartinsure-backend.onrender.com";

export const api = axios.create({
  // baseURL: "http://localhost:7777/api/v1/user",
  baseURL: "https://smartinsure-backend.onrender.com/api/v1/user",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fetch all plans
export const fetchPlans = async () => {
  try {
    const response = await axios.get(`${API_URL}/plans`);
    return response.data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    return [];
  }
};

// Add a new plan
export const addPlan = async (plan) => {
  try {
    const response = await axios.post(`${API_URL}/plans`, plan, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding plan:", error);
    return null;
  }
};

// Delete a plan by ID
export const deletePlan = async (id) => {
  try {
    await axios.delete(`${API_URL}/plans/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting plan:", error);
    return false;
  }
};

//create booking

export const createBooking = async (bookingData) => {
  try {
    const res = await axios.post(`${API_URL}/bookings`, bookingData);
    return res.data;
  } catch (error) {
    console.error("Booking error:", error);
    return null;
  }
};

// Fetch bookings for a specific user
export const fetchUserBookings = async (userId) => {
  try {
    const res = await fetch(`${API_URL}/bookings/user/${userId}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch bookings error", err);
    return []; // fallback to empty array
  }
};

// Fetch all bookings (Admin use only)
export const fetchAllBookings = async () => {
  try {
    const res = await fetch(`${API_URL}/bookings/all`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch all bookings error", err);
    return []; // fallback to empty array
  }
};


// Delete a booking by its ID
export const deleteBooking = async (bookingId) => {
  try {
    const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      return true;
    }
    return false;
  } catch (err) {
    console.error("Delete booking error", err);
    return false;
  }
};

//make payment
export const makePayment = async (paymentDetails) => {
  try {
    const response = await axios.post(`${API_URL}/payments/makePayment`, paymentDetails);
    return response.data;
  } catch (error) {
    console.error('Payment API error:', error);
    throw error;
  }
};