import React, { useContext, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import dp from "../assets/dp.png"
import { RxCrossCircled } from "react-icons/rx";
import { FaRegCircleCheck } from "react-icons/fa6";

function Network() {

    const { serverUrl } = useContext(authDataContext);
    let [connections, setConnections] = useState([])

    const handleGetRequests = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/connection/requests`, { withCredentials: true });
            setConnections(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAcceptConnection = async (requestId) => {
        try {
            let result = await axios.put(`${serverUrl}/api/connection/accept/${requestId}`, {}, { withCredentials: true })
            setConnections(connections.filter((con) => con._id !== requestId))
        } catch (error) {
            console.log(error)
        }
    }

    const handleRejectConnection = async (requestId) => {
        try {
            let result = await axios.put(`${serverUrl}/api/connection/reject/${requestId}`, {}, { withCredentials: true })
            setConnections(connections.filter((con) => con._id !== requestId))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleGetRequests()
    }, [])

    return (
        <div className='w-screen h-[100vh] bg-[#F4F2EE] pt-[100px] px-[20px] flex flex-col gap-[40px] items-center'>
            <Nav />
            <div className='w-full h-[80px] bg-white shadow-lg rounded-lg flex items-center p-[10px] text-[22px] text-gray-600'>
                Invitations: {connections.length}
            </div>

            {
                connections.length > 0 && <div className='w-[700px] bg-white shadow-lg w-[90%] rounded-lg flex flex-col gap-[20px] min-h-[100px]'>
                    { connections.map((connection, index) => (
                        <div className='w-full min-h-[100px] p-[20px] flex items-center justify-between'>
                            <div className='flex items-center justify-center gap-[10px]'>
                                <div className='w-[60px] h-[60px] rounded-full bg-red-200 flex cursor-pointer'>
                                    <img className='rounded-full object-cover' src={connection.sender.profileImage || dp} alt="" />
                                </div>
                                <div className='text-[19px] font-semibold text-gray-700'>
                                    {`${connection.sender.firstName} ${connection.sender.lastName}`}
                                </div>
                            </div>
                            <div className='gap-[5px] flex' >
                                <button className='text-[blue] font-semibold' onClick={() => handleAcceptConnection(connection._id)}>
                                    <FaRegCircleCheck className='w-[37px] h-[37px]' />
                                </button>
                                <button className='text-[red] font-bold' onClick={() => handleRejectConnection(connection._id)}>
                                    <RxCrossCircled className='w-[42px] h-[42px]' />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Network;