import React, { useState, useEffect } from 'react'
import HomeCategory from './HomeCategory'
import Card from '../../components/ui/Card'
import axios from 'axios'
import { Icon } from '@iconify/react'
import { API } from '../../host'

const Categories = () => {

    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const Category = await axios.get(`${API}/getcategories`);
            const CategoryData = Category.data.token
            
            setCategory(CategoryData);

        } catch (error) {
            console.error("Error fetching  data:", error);

        }
    };

    const handleDelete = async (subject) => {
        try {
            
            await axios.delete(`${API}/categoriesDelete?subject=${subject}`);
            
           
            setCategory(prevCategories =>
                prevCategories.filter(category => category.subject !== subject)
            );
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };
    return (
        <div>
            <HomeCategory title="Category" />
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 h-max">
                {category.map((category, index) => (
                    <Card key={index} bodyClass="p-4 rounded-md" className="group ">
                        <div className=" bg-white dark:rounded relative h-[191px] flex flex-col justify-center items-center mb-3 rounded-md">
                            <div className="h-[200px]">
                                <img
                                    className="  h-full w-full   transition-all duration-300 group-hover:scale-105"
                                    src={`${API}/${category.categoryimage}`}
                                    alt="Image"
                                    style={{paddingTop : '10px'}}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-center items-center " style={{paddingTop : '13px'}}>
                                <p className="	text-slate-900 dark:text-slate-300 ">
                                    {category.subject || "N/A"}
                                </p>
                                
                            </div>
                            <div style={{position : 'absolute', bottom : '10px', right : '20px'}} >
                            <button 
                            onClick={() => handleDelete(category.subject)}
                            className="bg-slate-100 text-slate-400  p-2.5  mb-1.5 rounded-full hover:bg-red-200 hover:text-red-600">
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

export default Categories