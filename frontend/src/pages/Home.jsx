import React, { useContext, useState } from 'react'
import Nav from '../components/Nav'
import dp from "../assets/dp.png"
import { IoMdAdd } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { userDataContext } from '../context/UserContext';
import { HiPencil } from "react-icons/hi2";
import EditProfile from '../components/EditProfile';

function Home() {

    let { userData, setUserData, edit, setEdit } = useContext(userDataContext)

    return (
        <div className='w-full h-[100vh] bg-[#F4F2EE] pt-[100px] flex items-start justify-center gap-[20px] px-[20px] flex-col lg:flex-row'>
            { edit && <EditProfile /> }
            <Nav />

            {/* left */}
            <div className='w-full lg:w-[25%] min-h-[200px] bg-white shadolw-lg rounded-lg p-[10px] relative'>
                <div className='w-[100%] h-[100px] bg-gray-300 rounded overflow-hidden flex items-center justify-center cursor-pointer' onClick={() => setEdit(true)}>
                    <img src="" alt="" />
                    <IoCameraOutline className='w-[25px] h-[25px] absolute top-[20px] right-[20px] text-gray-800' />
                </div>
                <div className='w-[70px] h-[70px] rounded-full overflow-hidden items-center justify-center absolute top-[70px] left-[35px] cursor-pointer' onClick={() => setEdit(true)}>
                    <img className='h-full' src={dp} alt="" />
                </div>
                <div className='w-[20px] h-[20px] absolute top-[110px] left-[88px] bg-[#0A66C2] flex items-center justify-center rounded-full'>
                    <IoMdAdd onClick={() => setEdit(true)} className='text-white' />
                </div>
                <div className='mt-[32px] pl-[15px]'>
                    <div className='text-[19px] font-semibold text-gray-700'>
                        {`${userData.firstName} ${userData.lastName}`}
                    </div>
                    <div className='text-[16px] text-gray-700'>
                        {userData.headline || ""}
                    </div>
                    <div className='text-[16px] text-gray-700'>
                        {userData.location}
                    </div>
                </div>
                <button className='w-[100%] mt-[20px] mb-[10px] h-[40px] rounded-full border-2 border-[#4C8ECE] text-[#4C8ECE] cursor-pointer flex items-center justify-center gap-[10px]' onClick={() => setEdit(true)}>Edit Profile <HiPencil /></button>
            </div>

            {/* middle */}
            <div className='w-full lg:w-[50%] min-h-[200px] bg-white shadolw-lg'>

            </div>

            {/* right */}
            <div className='w-full lg:w-[25%] min-h-[200px] bg-white shadolw-lg'>

            </div>
        </div>
    )
}

export default Home