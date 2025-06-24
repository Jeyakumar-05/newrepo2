import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebLayout from "./layout/WebLayout";
import Home from "./pages/Home";
import InsuranceSelection from "./pages/InsuranceSelection";
import InsuranceBooking from "./pages/InsuranceBooking";
import Payment from "./pages/Payment";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Routes wrapped in WebLayout */}
          <Route element={<WebLayout />}>
            {/* All protected routes inside PrivateRoute */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/insurance-selection"
                element={<InsuranceSelection />}
              />
              <Route path="/insurance-booking" element={<InsuranceBooking />} />
              <Route path="/payment" element={<Payment />} />
            </Route>
          </Route>

          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
