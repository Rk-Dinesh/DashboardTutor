import React from "react";
import StudentTable from "./StudentTable";

const StudentDetails = ({Current_user}) => {
  return (
    <div >
      <StudentTable Current_user ={Current_user}/>
    </div>
  );
};

export default StudentDetails;
