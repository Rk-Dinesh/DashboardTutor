import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Card from "../../components/ui/Card";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { API } from "../../host";
import { toast } from "react-toastify";

const FormValidationSchema = yup.object({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  phone: yup.string().required("Phone Number is required"),
  email: yup.string().required("Email is Required"),
});

const UpdateAdmin = ({ Current_user }) => {
  const { setValue } = useForm({
    resolver: yupResolver(FormValidationSchema),
  });

  // const { userid } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const userid = params.get("userid");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [role1, setRole1] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API}/getadmin?userid=${userid}`);
        const responseData = response.data;
        // console.log(responseData)

        setFname(responseData.fname);
        setLname(responseData.lname);
        setEmail(responseData.email);
        setPhone(responseData.phone);
        setRole(responseData.role);
        setRole1(responseData.role)

        setValue("fname", responseData.fname);
        setValue("lname", responseData.lname);
        setValue("email", responseData.email);
        setValue("phone", responseData.phone);
        setValue("role", responseData.role);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [userid]);

  const Update = async (e) => {
    e.preventDefault();
  
    try {
      let updateData = {
        userid,
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
      };
  
      if (Current_user === "superadmin") {
        updateData.role = role;
      } else {
        updateData.role = role1; 
      }
  
      const response = await axios.put(`${API}/updateadmin?userid=${userid}`, updateData);
  
      {
        Current_user === "superadmin" && navigate("/admin");
      }
      {
        Current_user === "admin" && navigate("/dashboard");
      }
      toast.success('Admin Updated Successfully')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div className="d-flex  align-items-center">
          <div className="col-md-6">
            <div className="bg-transparent">
              <Card title="Update Admin">
                <form className="space-y-3" onSubmit={Update}>
                  <div>
                    <label htmlFor="fname" className="capitalize form-label">
                      <b>FirstName </b>
                    </label>
                    <input
                      type="text"
                      name="fname"
                      className=" form-control py-2 "
                      id="fname"
                      placeholder="First Name"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="lname" className="capitalize form-label">
                      <b>LastName </b>
                    </label>
                    <input
                      type="text"
                      name="lname"
                      className=" form-control py-2 "
                      id="lname"
                      placeholder="Last Name"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="capitalize form-label">
                      <b>Email</b>
                    </label>
                    <input
                      type="text"
                      name="email"
                      className=" form-control py-2 "
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="capitalize form-label">
                      <b>Phone </b>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      className=" form-control py-2"
                      id="phone"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  {Current_user === "superadmin" && (
                  <div>
                    <label htmlFor="role" className="capitalize form-label">
                      <b>Role</b>
                    </label>
                    <select
                      name="role"
                      className="form-control py-2"
                      id="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </div>
                  )}

                  <div className="ltr:text-right rtl:text-left">
                    <button className="btn btn-dark text-center" type="submit">
                      UPDATE
                    </button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdmin;
