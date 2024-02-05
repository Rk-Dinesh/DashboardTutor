import React,{useState, useEffect} from "react";
import Card from "../../components/ui/Card";
import axios from "axios";
import { API } from "../../host";



const columns = [
    {
      label: "Name",
      field: "fname",
    },
    {
      label: "Phone",
      field: "phone",
    },
  
    {
      label: "Email",
      field: "email",
    },
  ];
  
const ParentList = () => {

    const [data, setData] = useState([]);
    const [student, setStudent] = useState([]);
    


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API}/parentget`);

           const responseData =  response.data

            setData(responseData)

        } catch (error) {
            console.error("Error fetching  data:", error);
            
        }

        try {
            const response = await axios.get(`${API}/studentget`);

           const responseData =  response.data

            setStudent(responseData)

        } catch (error) {
            console.error("Error fetching  data:", error);
            
        }
    };

  return (
    <div  className="grid xl:grid-cols-2 grid-cols-1 gap-5">
       <Card title="Recent Parent List " noborder>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className="bg-slate-200 dark:bg-slate-700">
                  <tr>
                    {columns.map((data,index) => (
                      <th key={index} scope="col" className=" table-th ">
                        {data.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                  {data.slice(- 4).map((Data,index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <td className="table-td">{Data.fname}</td>
                      <td className="table-td">{Data.phone}</td>
                      <td className="table-td ">{Data.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
      <Card title="Recent Student List" noborder >
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className="bg-slate-200 dark:bg-slate-700">
                  <tr>
                    {columns.map((data,index) => (
                      <th key={index} scope="col" className=" table-th ">
                        {data.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                  {student.slice(- 4).map((data,index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <td className="table-td">{data.fname}</td>
                      <td className="table-td">{data.phone}</td>
                      <td className="table-td ">{data.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ParentList;
