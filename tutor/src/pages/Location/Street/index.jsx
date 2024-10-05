import React, {useState,useEffect} from "react";
import Home from "../Home";
import StreetTable from "./StreetTable";
import { API } from "../../../host";
import axios from "axios";
import { toast } from "react-toastify";
import Template from "../../../components/ui/Template";

const csvData=`street_name,createdby
street,admin`;

const Street = ({Current_user}) => {

  const [isModal, setIsModal] = useState(false);
  const [file, setFile] = useState(null);
  const [buttonText, setButtonText] = useState("Bulk Upload");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/getstreet`);

      if (response.status === 200) {
        // Add rowIndex to each user object and set it in state
        const usersWithRowIndex = response.data.reverse().map((user, index) => ({
          ...user,
          rowIndex: index + 1,
        }));
        setData(usersWithRowIndex);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Admin data:", error);
      setLoading(false);
    }
  };


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setButtonText("Upload");
  };

  const handleButtonClick = () => {
    if (buttonText === "Bulk Upload") {
      document.getElementById("fileInput").click();
    } else {
      // Call your  here to upload the file
      uploadFile(file);
    }
  };
  

  const uploadFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
       `${API}/uploadcsvstr`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // console.log("File uploaded successfully");
        setButtonText("Bulk Upload");
        setFile(null);
        fetchData()
        toast.success("Data Uploaded Successfully");
      } else {
        toast.error("Data failed to Upload");
        //console.log("File upload failed");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const downloadCSV = (csvData) => {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =  "bulkupload_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleDownload = () => {
    downloadCSV(csvData);
  };

  
  return (
    <div>
      <Home title="Street" setIsModal={setIsModal} handleFileChange={handleFileChange} handleButtonClick={handleButtonClick} buttonText={buttonText}/>
      <div className="lg:col-span-12 col-span-12 mb-3">
       
          <StreetTable setIsModal={setIsModal} isModal={isModal} data={data} fetchData={fetchData} Current_user={Current_user}/>
      
      </div>
      <Template handleDownload={handleDownload}/>
    </div>
  );
};

export default Street;