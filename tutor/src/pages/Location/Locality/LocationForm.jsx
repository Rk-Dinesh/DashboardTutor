import React, { useState } from "react";
import axios from "axios";

import Card from "../../../components/ui/Card";
import { API } from "../../../host";
import { toast } from "react-toastify";

function LocationForm({setIsModal,fetchData}) {

  const [location, setLocation] = useState('')

  const handleInputChange = (event) => {
    setLocation( event.target.value );
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const formData = {
      location_name: location,
      createdby:  'admin',
    };
    try {
      const response = await axios.post(`${API}/location`, formData);
      fetchData();
      setIsModal(false);
      toast.success('Location Added Successfully')
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ">
        <div className=" w-[522px]   font-lexend m-2 ">
          <Card title="Location">
            <div className="bg-transparent">
              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="subject" className="capitalize form-label">
                    <b>Location </b>
                  </label>
                  <input
                    type="text"
                    name="location_name"
                    className="form-control py-2"
                    id="location_name"
                    placeholder="Location"
                    value={location}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Submit button */}
                <div className="ltr:text-right rtl:text-left">
                  <p className="btn bg-slate-500 text-white hover:bg-slate-500 text-center mr-2"  onClick={()=>setIsModal(false)}>
                   Cancel
                  </p>
                  <button className="btn btn-dark text-center" >
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

export default LocationForm;
