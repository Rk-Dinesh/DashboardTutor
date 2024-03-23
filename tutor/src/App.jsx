import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";

import SignInSide from "./pages/auth/login1";
import Dashboard from "./pages/dashboard";
import Admin from "./pages/Admin";

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



function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="" element={<Login setToken={setToken} />} />
        {/* <Route path="" element={<SignInSide setToken={setToken} />} /> */}
        <Route path="/*" element={token ? <Layout token={token}/> : <Navigate to='/' />}>
          <Route path="dashboard" element={<Dashboard />} />
          
          <Route path="admin" element={<Admin />} />
          <Route path="categories" element={<Categories />} />
          <Route path="student" element={<Student />} />
          <Route path="students" element={<Students/>} />
          <Route path="parent" element={<Parent />} />
          <Route path="parents" element={<Parents/>} />
          <Route path="teacher" element={<Teacher />} />
          <Route path="tutor" element={<Teachers/>} />
          <Route path="plan" element={<Plan/>} />
          <Route path="subscribers" element={<Subscribers/>} />
          {/* <Route path="page" element={<SignInSide />} /> */}
          <Route path="form" element={<AdminForm />} />
          <Route path="category_form" element={<CategoryForm />} />
          <Route path="plan_form" element={<PlanForm />} />
          <Route path="updateform" element={<UpdateForm />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="profile" element={<UserProfile token={token} />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;