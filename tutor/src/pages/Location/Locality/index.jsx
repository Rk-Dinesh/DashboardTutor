import React, {useState} from "react";
import Home from "../Home";
import LocationTable from "./LocationTable";
import LocationForm from "./LocationForm";


const Location = () => {

  const [isModal, setIsModal] = useState(false)
  

  return (
   
    <div>
      <Home title="Location" setIsModal={setIsModal}/>
      <div className="lg:col-span-12 col-span-12">
          <LocationTable setIsModal={setIsModal} isModal={isModal}/>
      </div>
    </div>
  
  );
};

export default Location;