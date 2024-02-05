import React from "react";
import Card from '../../components/ui/Card'
import HomeStudent from "./HomeStudent";
import StudentDetails from "../../components/partials/Table/react-table-Student";

const Student = () => {

  return (
    <div>
      <HomeStudent title="Student List" />
      <div className="lg:col-span-12 col-span-12">
        <Card >
          <StudentDetails />
        </Card>
      </div>
    </div>
  );
};

export default Student;



