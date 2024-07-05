import React, { useState } from "react";
import axios from "axios";
import Card from '../../components/ui/Card'
import { API } from "../../host";

function PlanForm() {
  const [formData, setFormData] = useState({
    plan_name: "",
    plancost: "",
    count : " ",
    planimage: null // Changed to null for file type input
  });

const handleInputChange = (event) => {
    if (event.target.name === "planimage") {
      setFormData({ ...formData, planimage: event.target.files[0] });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("plan_name", formData.plan_name);
    formDataToSend.append("plancost", formData.plancost);
    formDataToSend.append("planimage", formData.planimage);
    formDataToSend.append("count", formData.count);
  
    try {
      const response = await axios.post(`${API}/plan`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      
        history.back();
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-6">
          <Card title="Categories">
            <div className="bg-transparent">
              <form className="space-y-3" onSubmit={handleSubmit}>
                {/* Subject input */}
                <div>
                  <label htmlFor="plan_name" className="capitalize form-label">
                    <b>Plan Name </b>
                  </label>
                  <input
                    type="text"
                    name="plan_name"
                    className="form-control py-2"
                    id="plan_name"
                    placeholder="plan_name"
                    value={formData.plan_name}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="plancost" className="capitalize form-label">
                    <b>Plan Cost </b>
                  </label>
                  <input
                    type="text"
                    name="plancost"
                    className="form-control py-2"
                    id="plancost"
                    placeholder="plancost"
                    value={formData.plancost}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label htmlFor="count" className="capitalize form-label">
                    <b>Credits </b>
                  </label>
                  <input
                    type="text"
                    name="count"
                    className="form-control py-2"
                    id="count"
                    placeholder="Credit"
                    value={formData.count}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Image input */}
                <div>
                  <label htmlFor="planimage" className="capitalize form-label">
                    <b>Plan Image</b>
                  </label>
                  <input
                    type="file"
                    name="planimage"
                    className="form-control py-2"
                    id="planimage"
                    accept=".jpg, .jpeg, .png,.json"
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit button */}
                <div className="ltr:text-right rtl:text-left">
                  <button className="btn btn-dark text-center" type="submit">
                    ADD
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PlanForm;
