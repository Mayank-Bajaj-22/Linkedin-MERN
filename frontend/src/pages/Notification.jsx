import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";
import dp from "../assets/dp.png"

function Notification() {

    let { serverUrl } = useContext(authDataContext);
    let [notificationData, setNotificationData] = useState([]);

    const handleGetNotification = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/notification/get` , { withCredentials: true });
            setNotificationData(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteNotification = async (id) => {
        try {
            let result = await axios.delete(`${serverUrl}/api/notification/deleteone/${id}` , { withCredentials: true });
            await handleGetNotification()
        } catch (error) {
            console.log(error)
        }
    }

    const handleClearAllNotification = async () => {
        try {
            let result = await axios.delete(`${serverUrl}/api/notification` , { withCredentials: true });
            await handleGetNotification()
        } catch (error) {
            console.log(error)
        }
    }

    function handleMessage(type) {
        if (type == "like") {
            return "liked your post"
        } else if (type == "comment") {
            return "commented on your post"
        } else {
            return "accepted your connection"
        }
    }

    useEffect(() => {
        handleGetNotification()
    }, [])

    return (
        <div className='w-full min-h-[100vh] bg-[#F4F2EE] pt-[90px] px-[20px] flex flex-col gap-[20px] items-center'>
            <Nav />
            <div className='w-full h-[80px] bg-white shadow-lg rounded-lg flex items-center p-[20px] text-[22px] text-gray-600 justify-between'>
                <div>
                    Notifications: {notificationData.length}
                </div>
                {
                    notificationData > 0 &&
                    <button className='min-w-[100px] h-[40px] rounded-full border-2 border-red-500 text-red-500 cursor-pointer text-[18px]' onClick={handleClearAllNotification}>
                        clear all
                    </button>
                }
            </div>

            {
                notificationData.length > 0 && <div className='max-w-[900px] bg-white shadow-lg w-full rounded-lg flex flex-col min-h-[100px]'>
                    { notificationData.map((noti, index) => (
                        <div key={index} className="relative w-full md:px-[20px] md:py-[10px] p-[10px] flex flex-col border-b-2 border-gray-200">
                            <div className='w-full min-h-[90px] flex items-center justify-between'>
                                <div className='flex items-center justify-center gap-[10px]'>
                                    <div className='w-[60px] h-[60px] rounded-full bg-red-200 flex cursor-pointer'>
                                        <img className='rounded-full object-cover' src={noti.relatedUser.profileImage || dp} alt="" />
                                    </div>
                                    <div className='text-[15px] md:text-[19px] font-semibold text-gray-700'>
                                        {`${noti.relatedUser.firstName} ${noti.relatedUser.lastName}`}
                                    </div>
                                    <div className='text-[12px] md:text-[16px] font-semibold text-gray-500'>
                                        {`${handleMessage(noti.type)}`}
                                    </div>
                                </div>
                            </div>
                            {noti.relatedPost && (
                                <div
                                    className="flex items-center gap-[12px] pl-[70px] pb-[20px]"
                                >
                                    {noti.relatedPost.image && (
                                    <div className="w-[80px] h-[50px] overflow-hidden rounded-md flex-shrink-0">
                                        <img
                                        className="w-full h-full object-cover"
                                        src={noti.relatedPost.image}
                                        alt=""
                                        />
                                    </div>
                                    )}

                                    <div className="text-gray-600 w-[80%] text-[14px] break-words truncate">
                                    {noti.relatedPost.description}
                                    </div>
                                </div>
                            )}
                            <div onClick={() => handleDeleteNotification(noti._id)}>
                                <RxCross2
                                    className="absolute right-[25px] top-[30px] md:top-1/2 -translate-y-1/2 w-[22px] h-[22px] text-gray-500 hover:text-gray-800 cursor-pointer transition"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Notification