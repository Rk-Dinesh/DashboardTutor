import React from "react";
import SubTutorTable from "./SubTutorTable";
import SubParentTable from "./SubParentTable";
import Card from "../../../components/ui/Card";


const SubscriberDetails = () => {
  return (
    <div >
     <Card className="mb-4" title="Tutor Subscription List " noborder> <SubTutorTable /></Card>
     
      <Card title="Parent Subscription List " noborder><SubParentTable /></Card>
    </div>
  );
};

export default SubscriberDetails;
