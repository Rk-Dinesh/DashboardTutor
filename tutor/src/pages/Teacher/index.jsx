import React from "react";
import Card from '../../components/ui/Card'
import HomeTeacher from "./HomeTeacher";
import TeacherDetails from "../../components/partials/Table/react-table-Teacher";

const Teacher = () => {

  return (
    <div>
      <HomeTeacher title="TeacherList" />
      <div className="lg:col-span-12 col-span-12">
        <Card >
          <TeacherDetails />
        </Card>
      </div>
    </div>
  );
};

export default Teacher;



