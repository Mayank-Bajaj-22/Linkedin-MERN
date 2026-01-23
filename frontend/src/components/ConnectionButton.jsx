import React, { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import socket from "../socket"
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ConnectionButton({ userId }) {

    let { serverUrl } = useContext(authDataContext)
    let { userData, setUserData } = useContext(userDataContext)
    let [status, setStatus] = useState("")
    let navigate = useNavigate();

    const handleSendConnection = async () => {
        try {
            let result = await axios.post(`${serverUrl}/api/connection/send/${userId}`, {}, { withCredentials: true });
            // console.log(result)
            await handleGetStatus();
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemoveConnection = async () => {
        try {
            let result = await axios.delete(`${serverUrl}/api/connection/remove/${userId}`, { withCredentials: true });
            // console.log(result)
            await handleGetStatus();
        } catch (error) {
            console.log(error)
        }
    }

    const handleGetStatus = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/connection/getstatus/${userId}`, { withCredentials: true });
            // console.log(result)
            setStatus(result.data.status)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = async () => {
        if (status == "disconnect") {
            await handleRemoveConnection()
        } else if (status == "received") {
            navigate("/network")
        } else {
            await handleSendConnection()
        }
    }

    useEffect(() => {
        socket.emit("register", userData._id)
        handleGetStatus()

        socket.on("statusUpdate", ({ updatedUserId, newStatus}) => {
            
            if (updatedUserId == userId) {
                setStatus(newStatus)
            } 
        })

        return () => {
            socket.off("statusUpdate")
        }
    }, [userId])

    return (
        <button className='min-w-[100px] h-[40px] rounded-full border-2 border-[#0A66C2] text-[#0A66C2] cursor-pointer' onClick={handleClick} disabled={ status == "pending" }>
            {status}
        </button>
    )
}

export default ConnectionButton