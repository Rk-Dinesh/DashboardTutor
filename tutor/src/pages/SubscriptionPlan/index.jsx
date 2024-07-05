import React, { useState, useEffect } from "react";
import HomePlan from "./HomePlan";
import Card from "../../components/ui/Card";
import axios from "axios";
import { Icon } from "@iconify/react";
import Lottie from "lottie-react";
import { API } from "../../host";
import Modal from "./Modal";  // import the modal component

const Plan = () => {
  const [plan, setPlan] = useState([]);
  const [animations, setAnimations] = useState({});
  const [modal, setModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const planResponse = await axios.get(`${API}/getplans`);
      const planData = planResponse.data.token;

      // Fetch animations for each plan
      const animationPromises = planData.map(plan => 
        axios.get(`${API}/${plan.planimage}`).then(response => ({
          planId: plan.plan_id,
          animationData: response.data
        }))
      );
      const animations = await Promise.all(animationPromises);
      const animationsMap = animations.reduce((acc, anim) => {
        acc[anim.planId] = anim.animationData;
        return acc;
      }, {});

      setPlan(planData);
      setAnimations(animationsMap);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (plan_id) => {
    try {
      await axios.delete(`${API}/deleteplan?plan_id=${plan_id}`);

      setPlan((prevPlans) =>
        prevPlans.filter((plan) => plan.plan_id !== plan_id)
      );

      // Remove the animation data for the deleted plan
      setAnimations((prevAnimations) => {
        const newAnimations = { ...prevAnimations };
        delete newAnimations[plan_id];
        return newAnimations;
      });
    } catch (error) {
      console.error("Error deleting Plan:", error);
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
          plan.plan_id === updatedPlanData.plan_id? updatedPlanData : plan
        )
      );
  
      setModal(false);
      setSelectedPlan(null);
      fetchData()
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
              <div className="flex-1">
                {animations[plan.plan_id] ? (
                  <Lottie animationData={animations[plan.plan_id]} loop={true} />
                ) : (
                  <div>Loading animation...</div>
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
              <div className="flex justify-end">
                {/* <button
                  onClick={() => handleDelete(plan.plan_id)}
                  className="bg-slate-100 text-slate-400 p-2 rounded-full hover:bg-red-200 hover:text-red-600"
                >
                  <Icon
                    icon="heroicons:trash"
                    className="text-slate-400 dark:text-slate-400 hover:text-danger-600 dark:hover:text-danger-600"
                  />
                </button>
                &nbsp; */}
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
