import React, { useState, useEffect } from 'react'
import HomePlan from './HomePlan'
import Card from '../../components/ui/Card'
import axios from 'axios'
import { Icon } from '@iconify/react'
import { API } from '../../host'

const Plan = () => {

    const [plan, setPlan] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const plan = await axios.get(`${API}/getplans`);
            const planData = plan.data.token
            
            setPlan(planData);

        } catch (error) {
            console.error("Error fetching  data:", error);

        }
    };

    const handleDelete = async (plan_id) => {
        try {
            
            await axios.delete(`${API}/deleteplan?plan_id=${plan_id}`);
            
           
            setPlan(prevCategories =>
                prevCategories.filter(plan => plan.plan_id !== plan_id)
            );
        } catch (error) {
            console.error('Error deleting Plan:', error);
        }
    };

    return (
        <div>
            <HomePlan title="Subscription Plans" />
            <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 h-max py-4">
                {plan.map((plan, index) => (
                    <Card key={index} bodyClass="p-4 rounded-md" className="group  " >
                        <div className=" bg-white dark:rounded relative h-[90px] flex flex-col justify-start items-start mb-3 rounded-md">
                            <div className="h-[100px]">
                                <img
                                    className="  h-full w-full   transition-all duration-300 group-hover:scale-105 "
                                    src={`${API}/${plan.planimage}`}
                                    alt="Image"
                                   
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center items-center " >
                                <p className="	text-slate-900 dark:text-slate-300 " style={{position : 'absolute', top : '40px', right : '200px', fontFamily : 'cursive'}}>
                                   Plan 
                                </p>
                                <p className="	text-slate-900 dark:text-slate-300 "style={{position : 'absolute', top : '40px', right : '120px', fontFamily : 'cursive'}}>
                                    : {plan.plan_name || "N/A"}
                                </p>
                                
                            </div>
                            <div className="flex justify-center items-center " >
                                <p className="	text-slate-900 dark:text-slate-300 " style={{position : 'absolute', top : '80px', right : '192px', fontFamily : 'cursive'}}>
                                   Price 
                                </p>
                                <p className="	text-slate-900 dark:text-slate-300 "style={{position : 'absolute', top : '80px', right : '130px', fontFamily : 'cursive'}}>
                                    : {plan.plancost || "N/A"}
                                </p>
                                
                            </div>
                            <div style={{position : 'absolute', bottom : '10px', right : '20px'}} >
                            <button 
                            onClick={() => handleDelete(plan.plan_id)}
                            className="bg-slate-100 text-slate-400  p-2.5  mb-1.5 rounded-full hover:bg-red-200 hover: text-red-600">
                                    <Icon icon="heroicons:trash"  className="text-slate-400 dark:text-slate-400 hover:text-danger-600 dark:hover:text-danger-600" />
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Plan