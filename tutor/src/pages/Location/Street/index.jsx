import React, {useState} from "react";
import Home from "../Home";
import StreetTable from "./StreetTable";


const Street = () => {

  const [isModal, setIsModal] = useState(false)
  
  return (
    <div>
      <Home title="Street" setIsModal={setIsModal}/>
      <div className="lg:col-span-12 col-span-12">
       
          <StreetTable setIsModal={setIsModal} isModal={isModal}/>
      
      </div>
    </div>
  );
};

export default Street;