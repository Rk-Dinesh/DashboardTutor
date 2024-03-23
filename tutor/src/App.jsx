import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";


import Dashboard from "./pages/dashboard";
import Admin from "./pages/Admin";
import Layout from "./layout/Layout";
import UserProfile from "./components/partials/header/Tools/UserProfile";
import Invoice from "./pages/Razorpay/invoice";

// Lazy loaded components
const Login = lazy(() => import("./pages/auth/login"));
const AdminForm = lazy(() => import("./pages/Admin/AdminForm"));
const UpdateForm = lazy(() => import("./pages/Admin/UpdateForm"));
const Student = lazy(() => import("./pages/Student"));
const Parent = lazy(() => import("./pages/Parent"));
const Teacher = lazy(() => import("./pages/Teacher"));
const Students = lazy(() => import("./pages/Student/viewStudent"));
const Parents = lazy(() => import("./pages/Parent/viewParent"));
const Teachers = lazy(() => import("./pages/Teacher/viewTeacher"));
const Categories = lazy(() => import("./pages/Category"));
const CategoryForm = lazy(() => import("./pages/Category/CategoryForm"));
const PlanForm = lazy(() => import("./pages/SubscriptionPlan/Planform"));
const Plan = lazy(() => import("./pages/SubscriptionPlan"));
const Subscribers = lazy(() => import("./pages/Subscribers"));

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000} />
      <Routes>
        <Route path="" element={<Suspense fallback={<div>Loading...</div>}><Login setToken={setToken} /></Suspense>} />
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
