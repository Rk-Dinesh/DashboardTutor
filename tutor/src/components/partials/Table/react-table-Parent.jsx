import React from "react";
import ParentTable from "./ParentTable";


const ParentDetails = ({Current_user}) => {
  return (
    <div >
      <ParentTable Current_user ={Current_user}/>
    </div>
  );
};

export default ParentDetails;
