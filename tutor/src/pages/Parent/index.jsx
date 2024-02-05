import React from "react";
import Card from '../../components/ui/Card'
import HomeParent from "./HomeParent";
import ParentDetails from "../../components/partials/Table/react-table-Parent";

const Parent = () => {

  return (
    <div>
      <HomeParent title="Parent List" />
      <div className="lg:col-span-12 col-span-12">
        <Card >
          <ParentDetails />
        </Card>
      </div>
    </div>
  );
};

export default Parent;



