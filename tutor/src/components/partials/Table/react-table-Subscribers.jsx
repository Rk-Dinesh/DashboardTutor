import React from "react";
import SubTutorTable from "./SubTutorTable";
import SubParentTable from "./SubParentTable";
import Card from "../../../components/ui/Card";
import SubStudentTable from "./SubStudentTable";


const SubscriberDetails = () => {
  return (
    <div >
     <Card className="mb-4" title="Tutor Subscription List " noborder> <SubTutorTable /></Card>
     
      <Card className="mb-4" title="Parent Subscription List " noborder><SubParentTable /></Card>

      <Card title="Student Subscription List " noborder><SubStudentTable /></Card>
    </div>
  );
};

export default SubscriberDetails;
