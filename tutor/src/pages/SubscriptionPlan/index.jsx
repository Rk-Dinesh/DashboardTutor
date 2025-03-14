import React, { useState, useEffect } from "react";
import HomePlan from "./HomePlan";
import Card from "../../components/ui/Card";
import axios from "axios";
import { Icon } from "@iconify/react";
import { API } from "../../host";
import Modal from "./Modal";  // Import the modal component
import { toast } from "react-toastify";

const Plan = ({ Current_user }) => {
  const [plan, setPlan] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const planResponse = await axios.get(`${API}/getplans`);
      const planData = planResponse.data.token;

      setPlan(planData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setModal(true);
  };

  const handleSave = async (updatedPlan) => {
    try {
      const response = await axios.put(`${API}/updateplans?plan_id=${updatedPlan.plan_id}`, updatedPlan);
      const updatedPlanData = response.data;

      // Update the plan state
      setPlan((prevPlans) =>
        prevPlans.map((plan) =>
          plan.plan_id === updatedPlanData.plan_id ? updatedPlanData : plan
        )
      );

      setModal(false);
      setSelectedPlan(null);
      fetchData();
      toast.success('Plan Updated Successfully');
    } catch (error) {
      console.error("Error updating Plan:", error);
    }
  };

  return (
    <div>
      <HomePlan title="Subscription Plans" />
      <div className="grid grid-cols-3 gap-3 h-max py-4">
        {plan.map((plan, index) => (
          <Card key={index} className="group h-full w-full">
            <div className="flex flex-col h-full">
              <div className="flex justify-center">
                {plan.planimage ? (
                  <img
                    src={`${API}/${plan.planimage}`} // Assuming API is the base URL
                    alt={plan.plan_name}
                    className="h-48 w-48 object-cover"
                  />
                ) : (
                  <div>Loading image...</div>
                )}
              </div>
              <div className="p-2 flex-1 mt-6">
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <p className="text-lg font-medium text-center">
                      Plan{" "}
                      <span className="font-semibold">
                        {" "}
                        : {plan.plan_name || "N/A"}
                      </span>
                    </p>
                    <p className="text-lg font-medium text-center">
                      {" "}
                      Price{" "}
                      <span className="font-semibold">
                        {" "}
                        : {plan.plancost || "N/A"}
                      </span>
                    </p>
                    <p className="text-lg font-medium text-center">
                      {" "}
                      Credit{" "}
                      <span className="font-semibold">
                        {" "}
                        : {plan.count || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              {Current_user === 'superadmin' && (
                <div className="flex justify-end">
                  <button
                    onClick={() => openModal(plan)}
                    className="bg-slate-100 text-slate-400 p-2 rounded-full hover:bg-green-200 hover:text-green-600"
                  >
                    <Icon
                      icon="ic:outline-edit"
                      className="text-slate-400 dark:text-slate-400 hover:text-green-600 "
                    />
                  </button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
      <Modal
        show={modal}
        onClose={() => {
          setModal(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
        onSave={handleSave}
      />
    </div>
  );
};

export default Plan;