import React, { useState ,useEffect} from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import SignInSide from "./pages/auth/login1";
import Dashboard from "./pages/dashboard";
import Admin from "./pages/Admin";
import { API } from "./host";
import AdminForm from "./pages/Admin/AdminForm";
import UpdateForm from "./pages/Admin/UpdateForm";
import Login from "./pages/auth/login";
import Layout from "./layout/Layout";
import UserProfile from "./components/partials/header/Tools/UserProfile";
import Student from "./pages/Student";
import Parent from "./pages/Parent";
import Teacher from "./pages/Teacher";
import Students from "./pages/Student/viewStudent";
import Parents from "./pages/Parent/viewParent";
import Teachers from "./pages/Teacher/viewTeacher";
import Categories from "./pages/Category";
import CategoryForm from "./pages/Category/CategoryForm";
import PlanForm from "./pages/SubscriptionPlan/Planform";
import Plan from "./pages/SubscriptionPlan";
import Subscribers from "./pages/Subscribers";
import Invoice from "./pages/Razorpay/invoice";
import NotFound from "./404";
import Cover from "./pages/Coverimage";
import Location from "./pages/Location/Locality";
import Street from "./pages/Location/Street";



function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const decodedToken = token ? jwtDecode(token) : null;
  const [userData, setUserData] = useState({ role: "superadmin" });
  
  useEffect(() => {
    if (decodedToken) {
      const decodedEmail = decodedToken.email;
  
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${API}/getemail?email=${decodedEmail}`);
          const responseData = response.data;
          setUserData({ role: responseData.role });
        } catch (error) {
          console.error(error);
          // Display an error message to the user
          // or retry the request
        }
      };
  
      fetchUserData();
    }
  }, [decodedToken]);
  
  const Current_user = userData;
  console.log("user", Current_user);
  
  if (!token) {
    // Handle the case where token is null
    return <Login setToken={setToken} />;
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login setToken={setToken} />} />
        <Route path="/" element={token ? <Layout token={token} Current_user ={Current_user}/> : <Navigate to='/' />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {Current_user === 'superadmin' && (
            <Route path="admin" element={<Admin />} />
          )}
          <Route path="categories" element={<Categories Current_user ={Current_user}/>} />
          <Route path="student" element={<Student Current_user ={Current_user}/>} />
          <Route path="students" element={<Students/>} />
          <Route path="parent" element={<Parent Current_user ={Current_user}/>} />
          <Route path="parents" element={<Parents/>} />
          <Route path="teacher" element={<Teacher  Current_user ={Current_user}/>} />
          <Route path="tutor" element={<Teachers/>} />
          <Route path="plan" element={<Plan Current_user ={Current_user}/>} />
          <Route path="subscribers" element={<Subscribers/>} />
          <Route path="form" element={<AdminForm />} />
          <Route path="category_form" element={<CategoryForm />} />
          <Route path="plan_form" element={<PlanForm />} />
          <Route path="updateform" element={<UpdateForm Current_user ={Current_user}/>} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="profile" element={<UserProfile token={token} Current_user ={Current_user} />} />
          <Route path="cover" element={<Cover Current_user ={Current_user}/>} />
          <Route path="location" element={<Location Current_user ={Current_user}/>} />
          <Route path="street" element={<Street Current_user ={Current_user}/>} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
     </BrowserRouter>
     <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
     </>
  );
}

export default App;