import React, { useEffect, useState } from 'react';
import PlanCard from '../components/PlanCard';
import AddPlan from '../components/AddPlan';
import { fetchPlans, deletePlan } from '../services/api';

const InsuranceSelection = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [insuranceType, setInsuranceType] = useState('');

  const userData = JSON.parse(localStorage.getItem("user"));
  const isAdmin = userData?.role === 'admin';

  useEffect(() => {
    const loadPlans = async () => {
      const planList = await fetchPlans();

      
      const mapped = planList.map((plan) => ({
        ...plan,
        insuranceType: plan.type,
      }));

      setPlans(mapped);
      setFilteredPlans(mapped);
    };

    loadPlans();
  }, []);

  const handleAddPlan = (newPlan) => {
    const mappedPlan = {
      ...newPlan,
      insuranceType: newPlan.type, // mapping for consistency
    };
    setPlans((prevPlans) => [...prevPlans, mappedPlan]);
    setFilteredPlans((prevPlans) => [...prevPlans, mappedPlan]);
  };

  const handleDeletePlan = async (id) => {
    const success = await deletePlan(id);
    if (success) {
      setPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== id));
      setFilteredPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== id));
    }
  };

  const handleFilterChange = () => {
    const trimmedType = insuranceType.trim().toLowerCase();
    if (trimmedType === '') {
      setFilteredPlans(plans);
    } else {
      const filtered = plans.filter((plan) =>
        plan.insuranceType?.toLowerCase().includes(trimmedType)
      );
      setFilteredPlans(filtered);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Select Your Insurance Plan</h2>

        {isAdmin && <AddPlan onAdd={handleAddPlan} />}

        {/* Search Filter UI */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
          <input
            type="text"
            value={insuranceType}
            onChange={(e) => setInsuranceType(e.target.value)}
            placeholder="Search by insurance type (e.g., Life, Auto, Home)"
            className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-80"
          />
          <button
            onClick={handleFilterChange}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredPlans.map((plan) => (
            <PlanCard key={plan._id} plan={plan} onDelete={handleDeletePlan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsuranceSelection;
