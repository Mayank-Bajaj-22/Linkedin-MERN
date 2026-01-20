import React, { useContext, useRef, useState } from 'react'
import Nav from '../components/Nav'
import dp from "../assets/dp.png"
import { IoMdAdd } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { userDataContext } from '../context/UserContext';
import { HiPencil } from "react-icons/hi2";
import EditProfile from '../components/EditProfile';
import { RxCross2 } from "react-icons/rx";
import { BsFillImageFill } from "react-icons/bs";

function Home() {

    let { userData, setUserData, edit, setEdit } = useContext(userDataContext);

    let [frontendImage, setFrontendImage] = useState("")
    let [backendImage, setBackendImage] = useState("")
    let [description, setDescription] = useState("")

    let image = useRef()

    function handleImage (e) {
        let file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    return (
        <div className='w-full h-[100vh] bg-[#F4F2EE] lg:pt-[100px] pt-[220px] flex items-start justify-center gap-[20px] px-[20px] flex-col lg:flex-row relative'>
            { edit && <EditProfile /> }
            <Nav />

            {/* left */}
            <div className='w-full lg:w-[25%] lg:min-h-[200px] min-h-[280px] bg-white shadolw-lg rounded-lg p-[10px] relative'>
                <div className='w-[100%] h-[100px] bg-gray-300 rounded overflow-hidden flex items-center justify-center cursor-pointer' onClick={() => setEdit(true)}>
                    <img src={userData.coverImage || null} alt="" />
                    <IoCameraOutline className='w-[25px] h-[25px] absolute top-[20px] right-[20px] text-gray-800' />
                </div>
                <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center absolute top-[70px] left-[35px] cursor-pointer' onClick={() => setEdit(true)}>
                    <img className='h-full' src={ userData.profileImage || dp} alt="" />
                </div>
                <div className='w-[20px] h-[20px] absolute top-[110px] left-[88px] bg-[#0A66C2] flex items-center justify-center rounded-full'>
                    <IoMdAdd onClick={() => setEdit(true)} className='text-white' />
                </div>
                <div className='mt-[32px] pl-[15px]'>
                    <div className='text-[22px] font-semibold text-gray-700'>
                        {`${userData.firstName} ${userData.lastName}`}
                    </div>
                    <div className='text-[16px] text-gray-600'>
                        {userData.headline || ""}
                    </div>
                    <div className='text-[16px] text-gray-600'>
                        {userData.location}
                    </div>
                </div>
                <button className='w-[100%] mt-[20px] mb-[10px] h-[40px] rounded-full border-2 border-[#4C8ECE] text-[#4C8ECE] cursor-pointer flex items-center justify-center gap-[10px]' onClick={() => setEdit(true)}>Edit Profile <HiPencil /></button>
            </div>

            {/* post div */}
            <div className='w-full h-full bg-black opacity-[0.6] left-0 absolute top-0 z-[100]'>

            </div>

            <div className='w-[90%] max-w-[500px] h-[600px] bg-white shadow-lg rounded-lg absolute z-[200] p-[20px] flex items-start justify-start flex-col gap-[20px]'>
                <div className='absolute top-[10px] right-[20px] cursor-pointer' >
                    <RxCross2 className='w-[25px] h-[25px] text-gray-800 font-bold cursor-pointer' />
                </div>
                <div className='flex justify-start items-center gap-[15px]'>
                    <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer'>
                        <img className='h-full' src={ userData.profileImage || dp} alt="" />
                    </div>
                    <div className='text-[22px] font-semibold text-gray-700'>
                        {`${userData.firstName} ${userData.lastName}`}
                    </div>
                </div>

                <div className='overflow-auto w-full h-[750px]'>
                    <textarea className={`w-full outline-none ${frontendImage ? "min-h-[100px]" : "h-[750px]"} border-none p-[10px] resize-none text-[18px]`} placeholder='what do you want to talk about ?' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <input type="file" accept="image/*" hidden ref={image} onChange={handleImage} />
                    <div className='w-full overflow-hidden'>
                        <img src={ frontendImage || ""} alt="" />
                    </div>
                </div>

                <div className='w-full h-[100px] flex items-center justify-between border-t-2 border-gray-500'>
                    <div className='p-[20px] flex items-center justify-start'>
                        <BsFillImageFill className='w-[28px] h-[28px] text-gray-600' onClick={() => image.current.click()} />
                    </div>
                    <div className='flex justify-end items-center'>
                        <button className='w-[100px] h-[50px] rounded-full bg-[#0A66C2] mt-[20px] text-[white] font-semibold text-[18px]'>Post</button>
                    </div>
                </div>
            </div>

            {/* middle */}
            <div className='w-full lg:w-[50%] min-h-[200px] bg-[#F4F2EE] shadolw-lg'>
                <div className='w-full gap-[15px] h-[80px] bg-white shadow-lg rounded-lg  flex items-center justify-center'>
                    <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer'>
                        <img className='h-full' src={ userData.profileImage || dp} alt="" />
                    </div>
                    <button className='w-[80%] h-[60%] rounded-full border-2 border-gray-400 flex items-center justify-start px-[20px] hover:bg-gray-100 text-gray-700'>start a post</button>
                </div>
            </div>

            {/* right */}
            <div className='w-full lg:w-[25%] min-h-[200px] bg-white shadolw-lg'>

            </div>
        </div>
    )
}

export default Home