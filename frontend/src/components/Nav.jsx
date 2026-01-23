import React, { useContext, useState } from 'react'
import logo2 from "../assets/logo2.png"
import dp from "../assets/dp.png"
import { IoSearchSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

function Nav() {

    let [activeSearch, setActiveSearch] = useState(false);
    let { userData, setUserData } = useContext(userDataContext);
    let [show, setShow] = useState(false);
    let { serverUrl } = useContext(authDataContext);
    const navigate = useNavigate();
    
    const handleSignOut = async () => {
        try {
            let result = await axios.get(serverUrl + "/api/auth/logout" , { withCredentials: true })
            setUserData(null)
            navigate("/login")
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full h-[70px] bg-[#ffffff] fixed top-0 shadow-lg flex items-center md:justify-around justify-between px-[10px] left-0 z-99'>
            {/* left */}
            <div className='flex justify-center items-center gap-[10px]'>
                <div onClick={() => {setActiveSearch(false)}}>
                    <img src={logo2} className='w-[45px]' alt="" onClick={() => navigate("/")} />
                </div>
                { !activeSearch && <div>
                    <IoSearchSharp className='w-[23px] h-[23px] text-gray-600 md:hidden' onClick={() => setActiveSearch(true)} />
                </div> }
                <form className={`w-[200px] lg:w-[350px] h-[40px] bg-transparent border-1 border-gray-500 lg:flex items-center gap-[10px] px-[10px] py-[5px] rounded-full ${ !activeSearch ? "hidden" : "flex" }`}>
                    <div>
                        <IoSearchSharp className='w-[23px] h-[23px] text-gray-600' />
                    </div>
                    <input className='w-[80%] h-full bg-transparent outline-none' type="text" placeholder="search users..." />
                </form>

            </div>

            {/* right  */}
            <div className='flex items-center justify-center gap-[20px] relative'>

                {/* pop-up */}
                { show && <div className='absolute w-[300px] min-h-[300px] bg-white shadow-lg top-17 lg:left-0 -left-55 flex flex-col items-center p-[15px] gap-[15px] rounded-lg'>
                    <div className='w-[70px] h-[70px] rounded-full'>
                        <img className='rounded-full' src={ userData.profileImage || dp } alt="" />
                    </div>
                    <div className='text-[19px] font-semibold text-gray-700'>
                        {` ${userData.firstName} ${userData.lastName}`}
                    </div>
                    <button className='w-[100%] h-[40px] rounded-full border-2 border-[#4C8ECE] text-[#4C8ECE] cursor-pointer' onClick={() => navigate("/profile")}>View Profile</button>
                    <div className='w-full h-[1px] bg-gray-500'></div>
                    <div className='flex items-center w-full px-[10px] justify-start text-gray-600 gap-[12px]' onClick={() => navigate("/network")} >
                        <FaUserGroup className='w-[23px] h-[23px] text-gray-600' />
                        <div className='text-md'>
                            My Network
                        </div>
                    </div>
                    <button className='w-[100%] h-[40px] rounded-full border-2 border-red-500 text-red-500 cursor-pointer' onClick = {handleSignOut}>Sign Out</button>
                </div> }

                <div className='lg:flex flex-col items-center justify-center text-gray-600 hidden cursor-pointer' onClick={() => navigate("/")}>
                    <MdHome className='w-[23px] h-[23px] text-gray-600' />
                    <div className='text-md'>
                        Home
                    </div>
                </div>
                <div className='lg:flex flex-col items-center justify-center gap-[2px] text-gray-600 hidden cursor-pointer' onClick={() => navigate("/network")}>
                    <FaUserGroup className='w-[21px] h-[21px] text-gray-600' />
                    <div className='text-md'>
                        My Network
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center text-gray-600 cursor-pointer'>
                    <IoIosNotifications className='md:w-[23px] md:h-[23px] w-[26px] h-[26px] text-gray-600' />
                    <div className='text-md hidden md:block'>
                        Notifications
                    </div>
                </div>
                <div className='w-[40px] h-[40px] rounded-full bg-red-200 flex cursor-pointer' onClick={(prev) => setShow(prev => !prev)}>
                    <img className='rounded-full object-cover' src={userData.profileImage || dp} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Nav