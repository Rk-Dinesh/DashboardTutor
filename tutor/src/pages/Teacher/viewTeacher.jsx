import React, { useEffect, useState } from 'react'
import Card from '../../components/ui/Card'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { API } from '../../host';

const Teachers = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const tutor_ids = params.get("tutor_id");


    const Teachers = { tutor_id: ' ', fname: " ", laname: ' ', gender: ' ', email: ' ', phone: ' ', address: ' ', state: ' ', postcode: " ", subject: ' ', experience: ' ', qualification: ' ', bio: ' ', verification: " " }
    //const [tutor,setTutor] = useState(Teachers)
    const [tutor, setTutor] = useState([])

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const response = await axios.get(`${API}/teacherGetData?tutor_id=${tutor_ids}`);
                const responseData = response.data;
                
                setTutor(responseData);

            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, [tutor_ids]);




    const flexContainerStyles1 = {

        width: '100px',
        fontSize: '14px',
    };
    const flexContainerStyles2 = {
        width: '80px',
        fontSize: '14px',
    };
    const flexContainerStyles3 = {
        width: '400px',
        fontSize: '14px',
    };
    const flexContainerStyles = {
        fontSize: '14px',
        width: '200px',
        textAlign: 'left',
    };

    return (
        <div>
            {/* <div className="grid 2xl:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 h-max">
            <Card bodyClass="p-4 rounded-md" className="group " title={"Staff Info"}>

                <div>

                <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Tutor Id</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles3}>: {tutor[0]?.tutor_id || "N/A"} </p>
                    </div>

                    <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Name</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles3}>: {`${tutor[0]?.fname } ${tutor[0]?.laname }`|| "N/A"} </p>
                    </div>

                    
                        <div className='flex'>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Gender</p>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>: {tutor[0]?.gender || "N/A" }</p>
                        </div>
                       
                    

                    <div className='flex'>
                        <div className='flex'>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Email</p>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>:  {tutor[0]?.email || "N/A" } </p>
                        </div>
                        <div className='flex'>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles2}> Phone</p>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>:  {tutor[0]?.phone || "N/A" }</p>
                        </div>
                    </div>

                    <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Address</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles3}>: {tutor[0]?.address || "N/A" }</p>
                    </div>

                    <div className='flex'>
                        <div className='flex'>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> State</p>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>: {tutor[0]?.state || "N/A" }</p>
                        </div>
                        <div className='flex'>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles2}> Postcode</p>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>: {tutor[0]?.postcode || "N/A" }</p>
                        </div>
                    </div>

            

                   <div className='flex'>
                   <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Subject</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>:  {tutor[0]?.subject || "N/A" }</p>
                    </div>

                    <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Qualification</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>: {tutor[0]?.qualification || "N/A" }</p>
                    </div>
                    
                   </div>

                   <div className='flex'>

                   <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Bio</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>: {tutor[0]?.bio || "N/A" }</p>
                    </div>

                    <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Experience</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>:  {tutor[0]?.Experience || "N/A" }</p>
                    </div>
                   </div>

                    <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Verification</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>: {tutor[0]?.verification || "N/A" }</p>
                    </div>

                
                </div>
            </Card>
        </div> */}
            <div>
                {tutor.map((tutor, index) => (
                    <div className="space-y-3 profile-page" key={index}>
                        <div className="profiel-wrap px-[35px] pb-10 md:pt-[30px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
                            <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>
                            <div className="profile-box flex-none md:text-start text-center">
                                <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
                                    <div className="flex-none">
                                        <div className="md:h-[176px] md:w-[176px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                                            <img
                                                src={`${API}/${tutor.teacherimage}`}
                                                alt="Image"
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                                            {`${tutor?.fname} ${tutor?.lname}` || "N/A"}
                                        </div>
                                        <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                                            {tutor?.tutor_id || "N/A"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
                                <div className="flex-1">
                                    <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                                        Gender
                                    </div>
                                    <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                                        {tutor?.email || "N/A"}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                                        Subject
                                    </div>
                                    <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                                        {tutor?.subject || "N/A"}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                                        Qualification
                                    </div>
                                    <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                                        {tutor?.qualification || "N/A"}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="lg:col-span-12 col-span-12">
                                <Card title="Contact Info" >
                                    <div className="  flex justify-around">
                                        <div className="flex space-x-3 rtl:space-x-reverse">
                                            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                                                <Icon icon="heroicons:envelope" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                                    EMAIL
                                                </div>
                                                <a
                                                    href="mailto:someone@example.com"
                                                    className="text-base text-slate-600 dark:text-slate-50"
                                                >
                                                    {tutor?.email || "N/A"}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3 rtl:space-x-reverse">
                                            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                                                <Icon icon="heroicons:phone-arrow-up-right" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                                    PHONE
                                                </div>
                                                <a
                                                    href="tel:0189749676767"
                                                    className="text-base text-slate-600 dark:text-slate-50"
                                                >
                                                    {tutor?.phone || "N/A"}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3 rtl:space-x-reverse">
                                            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                                                <Icon icon="heroicons:map" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                                    LOCATION
                                                </div>
                                                <div className="text-base text-slate-600 dark:text-slate-50">
                                                    {`${tutor?.address} , ${tutor?.state} - ${tutor?.postcode}` || "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                        </div>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="lg:col-span-12 col-span-12">
                                <Card title="Bio" >
                                    <div className="  flex justify-around">
                                        <div className="flex space-x-3 rtl:space-x-reverse">
                                            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                                                <Icon icon="heroicons:academic-cap" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                                    Qualification
                                                </div>
                                                <div className="text-base text-slate-600 dark:text-slate-50">
                                                    {tutor?.qualification || "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-3 rtl:space-x-reverse">
                                            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                                                <Icon icon="fluent-mdl2:work" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                                    Experience
                                                </div>
                                                <div className="text-base text-slate-600 dark:text-slate-50">
                                                    {tutor?.experience || "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-3 rtl:space-x-reverse">
                                            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                                                <Icon icon="uiw:verification" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                                    Verification
                                                </div>
                                                <div className="text-base text-slate-600 dark:text-slate-50">
                                                    {tutor?.verification || "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                        

                                    </div>
                                </Card>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Teachers;