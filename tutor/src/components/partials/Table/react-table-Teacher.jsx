import React from "react";
import TeacherTable from "./TeacherTable";


const TeacherDetails = ({Current_user}) => {
  return (
    <div >
      <TeacherTable Current_user ={Current_user}/>
    </div>
  );
};

export default TeacherDetails;
