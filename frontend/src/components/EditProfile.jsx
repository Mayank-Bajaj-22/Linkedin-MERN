import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { userDataContext } from '../context/UserContext';
import dp from "../assets/dp.png"
import { IoCameraOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

function EditProfile() {

    let { edit, setEdit, userData, setUserData } = useContext(userDataContext);
    let [firstName, setFirstName] = useState(userData.firstName || "");
    let [lastName, setLastName] = useState(userData.lastName || "");
    let [userName, setUserName] = useState(userData.userName || "");
    let [headline, setHeadLine] = useState(userData.headline || "");
    let [location, setLocation] = useState(userData.location || "");
    let [gender, setGender] = useState(userData.gender || "");

    return (
        <div className='w-full h-[100vh] fixed top-0 z-100 flex items-center justify-center'>
            <div className='bg-black opacity-[0.6] w-full h-full absolute'></div>
            <div className='w-[90%] max-w-[500px] h-[600px] bg-white relative z-200 shadow-lg rounded-lg p-[10px] overflow-auto'>
                <div className='absolute top-[20px] right-[20px] cursor-pointer' >
                    <RxCross2 onClick={() => setEdit(false)} className='w-[25px] h-[25px] text-gray-800 font-bold cursor-pointer' />
                </div>
                <div className='w-full h-[200px] bg-gray-500 rounded-lg overflow-hidden'>
                    <img className='w-full' src="" alt="" />
                    <IoCameraOutline className='w-[25px] h-[25px] absolute top-[180px] right-[20px] text-white' />
                </div>
                <div className='w-[80px] h-[80px] rounded-full absolute top-[172px] left-[30px]'>
                    <img className='rounded-full' src={dp} alt="" />
                </div>
                <div className='w-[20px] h-[20px] absolute top-[220px] left-[90px] bg-[#0A66C2] flex items-center justify-center rounded-full'>
                    <IoMdAdd onClick={() => setEdit(true)} className='text-white' />
                </div>
                <form className='w-full flex flex-col items-center justify-center mt-[55px] gap-[20px]'>
                    <input type="text" placeholder='firstName' className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder='lastName' className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="text" placeholder='userName' className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <input type="text" placeholder='headline' className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={headline} onChange={(e) => setHeadLine(e.target.value)} />
                    <input type="text" placeholder='location' className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={location} onChange={(e) => setLocation(e.target.value)} />
                    <input type="text" placeholder='gender (male/female/other)' className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={gender} onChange={(e) => setGender(e.target.value)} />
                    <div>
                        <h1>Skills</h1>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile