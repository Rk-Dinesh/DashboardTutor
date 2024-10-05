import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "../../../components/ui/Card";
import { API } from "../../../host";

function StreetForm({ setIsModal, fetchData }) {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading when submitting the form

    const formData = {
      street_name: location,
      createdby: "admin",
    };

    try {
      const response = await axios.post(`${API}/street`, formData);
      fetchData();
      setIsModal(false);
      toast.success("Street Added Successfully");
      setLoading(false); // Stop loading after success
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Stop loading after error
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[522px] font-lexend m-2">
          <Card title="Street">
            <div className="bg-transparent">
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="subject" className="capitalize form-label">
                    <b>Street</b>
                  </label>
                  <input
                    type="text"
                    name="street_name"
                    className="form-control py-2"
                    id="street_name"
                    placeholder="Street"
                    value={location}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit button */}
                <div className="ltr:text-right rtl:text-left">
                  <p
                    className="btn bg-slate-500 text-white hover:bg-slate-500 text-center mr-2"
                    onClick={() => setIsModal(false)}
                  >
                    Cancel
                  </p>
                  <button
                    className="btn btn-dark text-center"
                    type="submit"
                    disabled={loading} // Disable button while loading
                  >
                    {loading ? "Adding..." : "ADD"} {/* Show loading text */}
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

export default StreetForm;
