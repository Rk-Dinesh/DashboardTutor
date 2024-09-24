import React, { useState } from "react";
import axios from "axios";
import Card from '../../components/ui/Card'
import { API } from "../../host";
import { toast } from "react-toastify";

function CategoryForm() {
  const [formData, setFormData] = useState({
    subject: "",
    categoryimage: null // Changed to null for file type input
  });

const handleInputChange = (event) => {
    if (event.target.name === "categoryimage") {
      setFormData({ ...formData, categoryimage: event.target.files[0] });
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("categoryimage", formData.categoryimage);
  
    try {
      const response = await axios.post(`${API}/categories`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      
  
     toast.success("Category Added Successfully")
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
                  <label htmlFor="subject" className="capitalize form-label">
                    <b>Subject </b>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="form-control py-2"
                    id="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
                

                {/* Image input */}
                <div>
                  <label htmlFor="categoryimage" className="capitalize form-label">
                    <b>Category Image</b>
                  </label>
                  <input
                    type="file"
                    name="categoryimage"
                    className="form-control py-2"
                    id="categoryimage"
                    accept=".jpg, .jpeg, .png"
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

export default CategoryForm;
