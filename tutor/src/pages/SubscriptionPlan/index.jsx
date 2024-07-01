import React, { useState, useEffect } from "react";
import HomePlan from "./HomePlan";
import Card from "../../components/ui/Card";
import axios from "axios";
import { Icon } from "@iconify/react";
import { API } from "../../host";

const Plan = () => {
  const [plan, setPlan] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const plan = await axios.get(`${API}/getplans`);
      const planData = plan.data.token;

      setPlan(planData);
    } catch (error) {
      console.error("Error fetching  data:", error);
    }
  };

  const handleDelete = async (plan_id) => {
    try {
      await axios.delete(`${API}/deleteplan?plan_id=${plan_id}`);

      setPlan((prevCategories) =>
        prevCategories.filter((plan) => plan.plan_id!== plan_id)
      );
    } catch (error) {
      console.error("Error deleting Plan:", error);
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
                <img
                  className="w-full h-full object-cover rounded-t-md"
                  src={`${API}/${plan.planimage}`}
                  alt="Image"
                />
              </div>
              <div className="p-2 flex-1">
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
                  </div>
                 
                </div>
              </div>
              <div className="flex justify-end">
                    <button
                      onClick={() => handleDelete(plan.plan_id)}
                      className="bg-slate-100 text-slate-400 p-2 rounded-full hover:bg-red-200 hover:text-red-600"
                    >
                      <Icon
                        icon="heroicons:trash"
                        className="text-slate-400 dark:text-slate-400 hover:text-danger-600 dark:hover:text-danger-600"
                      />
                    </button>
                  </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Plan;