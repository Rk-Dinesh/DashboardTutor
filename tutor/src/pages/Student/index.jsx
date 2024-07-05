import React from "react";
import Card from '../../components/ui/Card'
import HomeStudent from "./HomeStudent";
import StudentDetails from "../../components/partials/Table/react-table-Student";

const Student = ({Current_user}) => {

  return (
    <div>
      <HomeStudent title="Student List" />
      <div className="lg:col-span-12 col-span-12">
        <Card >
          <StudentDetails Current_user ={Current_user}/>
        </Card>
      </div>
    </div>
  );
};

export default Student;



