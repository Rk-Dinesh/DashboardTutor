import React, { useEffect, useState } from 'react'
import Card from '../../components/ui/Card'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { API } from '../../host';

const Students = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const student_ids = params.get("student_id");


    const students = { student_id: ' ', fname: " ", lname: ' ', gender: ' ', dob: ' ', grade: ' ', email: ' ', phone: ' ', subject: ' ', tution_slot: ' ', gname: ' ', gphone: " ", address: ' ', state: ' ', postcode: " " }
    //const [student,setStudent] = useState(students)
    const [student, setStudent] = useState([])

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                const response = await axios.get(`${API}/studentGetData?student_id=${student_ids}`);
                const responseData = response.data;

                setStudent(responseData);

            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, [student_ids]);


    const stepStyles = {
        fontWeight: 'bold',
        fontSize: '15px',
        paddingBottom: '5px'
    };

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
            <Card bodyClass="p-4 rounded-md" className="group " title={"Student Info"}>

                <div>

                <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Student Id</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles3}>: {student[0]?.student_id || "N/A"} </p>
                    </div>

                    <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Name</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles3}>: {`${student[0]?.fname } ${student[0]?.lname }`|| "N/A"} </p>
                    </div>

                    <div className='flex'>
                        <div className='flex'>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Gender</p>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>: {student[0]?.gender || "N/A" }</p>
                        </div>
                        <div className='flex'>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles2}> DOB</p>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>: {student[0]?.dob || "N/A" }</p>
                        </div>
                    </div>

                    <div className='flex'>
                        <div className='flex'>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Email</p>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>:  {student[0]?.email || "N/A" } </p>
                        </div>
                        <div className='flex'>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles2}> Phone</p>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>:  {student[0]?.phone || "N/A" }</p>
                        </div>
                    </div>

                 <div className='flex'>
                 <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Subject</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>:  {student[0]?.subject || "N/A" }</p>
                    </div>

                    <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Grade</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>:  {student[0]?.grade || "N/A" }</p>
                    </div>
                 </div>

                    <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Tution Slot</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>: {student[0]?.tution_slot || "N/A" }</p>
                    </div>

                    <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Address</p>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles3}>: {student[0]?.address || "N/A" }</p>
                    </div>

                    <div className='flex'>
                        <div className='flex'>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> State</p>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>: {student[0]?.state || "N/A" }</p>
                        </div>
                        <div className='flex'>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles2}> Postcode</p>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>: {student[0]?.postcode || "N/A" }</p>
                        </div>
                    </div>

                    <div className='flex'>
                        <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={stepStyles}>Guardian </p>

                    </div>

                    <div className='flex'>
                        <div className='flex'>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles1}> Name</p>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>: {student[0]?.gname || "N/A" }</p>
                        </div>
                        <div className='flex'>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles2}> Phone</p>
                            <p className="text-slate-900 dark:text-slate-300 text-base	font-medium	mt-2 truncate" style={flexContainerStyles}>: {student[0]?.gphone || "N/A" }</p>
                        </div>
                    </div>
                </div>
            </Card>


        </div> */}
            <div>
                {student.map((student, index) => (
                    <div className="space-y-3 profile-page" key={index}>
                        <div className="profiel-wrap px-[35px] pb-10 md:pt-[40px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
                            <div className="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0  h-[30px] w-full z-[-1] rounded-t-lg " ></div>
                            <div className="profile-box flex-none md:text-start text-center">
                                <div className="flex-1">
                                    <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                                        {`${student?.fname} ${student?.lname}` || "N/A"}
                                    </div>
                                    <div className="text-sm font-light text-slate-600 dark:text-slate-400">
                                        {student?.student_id || "N/A"}
                                    </div>
                                </div>
                            </div>

                            <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
                                <div className="flex-1">
                                    <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                                        Gender
                                    </div>
                                    <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                                        {student?.gender || "N/A"}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                                        Grade
                                    </div>
                                    <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                                        {student?.grade || "N/A"}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                                        Subject
                                    </div>
                                    <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                                        {student?.subject || "N/A"}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="text-sm text-slate-600 font-light dark:text-slate-300">
                                        Tution Slot
                                    </div>
                                    <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">
                                        {student?.tution_slot || "N/A"}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="lg:col-span-12 col-span-12">
                                <Card title="Student Info" >
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
                                                    {student?.email || "N/A"}
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
                                                    {student?.phone || "N/A"}
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
                                                    {`${student?.address} , ${student?.state} - ${student?.postcode}` || "N/A"}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                        </div>
                        <div className="grid grid-cols-12 gap-6">
                            <div className="lg:col-span-12 col-span-12">
                                <Card title="Guardian Info" >
                                    <div className="  flex justify-around">
                                        <div className="flex space-x-3 rtl:space-x-reverse">
                                            <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                                                <Icon icon="heroicons:users" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                                                    Guardian Name
                                                </div>
                                                <div className="text-base text-slate-600 dark:text-slate-50">
                                                    {student?.gname || "N/A"}
                                                </div>
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
                                                    {student?.gphone || "N/A"}
                                                </a>
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

export default Students;