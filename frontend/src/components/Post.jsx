import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.png"
import moment from 'moment';
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import axios from 'axios';
import { useContext } from 'react';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import { BiSolidLike } from "react-icons/bi";
import { IoSendOutline  } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import socket from "../socket"

function Post({ author, id, like, comment, description, image, createdAt }) {

    let [more, setMore] = useState(false)

    let { serverUrl } = useContext(authDataContext)
    let [likes, setLikes] = useState(like || [])

    let { userData, setUserData, getPost } = useContext(userDataContext)
    let [commentsContent, setCommentsContent] = useState("")
    let [comments, setComments] = useState(comment || [])
    let [showComment, setShowComment] = useState(false)

    const handleLike = async () => {
        try {
            let result = await axios.get(serverUrl + `/api/post/like/${id}`, { withCredentials: true });
            setLikes(result.data.like)
        } catch (error) {
            console.log(error)
        }
    }

    const handleComment = async (e) => {
        e.preventDefault()
        try {
            let result = await axios.post(serverUrl + `/api/post/comment/${id}`, { content: commentsContent }, { withCredentials: true });
            setComments(result.data.comment)
            setCommentsContent("")
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            const result = await axios.delete(
                `${serverUrl}/api/post/comment/${id}/${commentId}`,
                { withCredentials: true }
            )
            setComments(result.data.comment)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        socket.on("likeUpdated", ({postId, likes}) => {
            if (postId == id) {
                setLikes(likes)
            }
        })

        socket.on("commentAdded", ({postId, comm}) => {
            if (postId == id) {
                setComments(comm)
            }
        })

        return () => {
            socket.off("likeUpdated")
            socket.off("commentAdded")
        }
    }, [id])

    useEffect(() => {
        getPost()
    }, [likes, setLikes, comments])

    return (
        <div className='w-full flex flex-col min-h-[200px] gap-[20px] bg-white rounded-lg shadow-lg p-[20px]'>
            <div className='flex justify-between items-start'>
                <div className='flex justify-center items-start gap-[15px]'>
                    <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer'>
                        <img className='h-full object-cover' src={ author.profileImage || dp} alt="" />
                    </div>
                    <div>
                        <div className='text-[22px] font-semibold'>{`${ author.firstName } ${ author.lastName }`}</div>
                        <div className='text-[16px]'>{ author.headline }</div>
                        <div className='text-[16px]'>{ moment(createdAt).fromNow() }</div>
                    </div>
                </div>
                <div>
                    {/* button */}
                </div>
            </div>
            <div className={`w-full ${ !more ? "max-h-[100px] overflow-hidden" : "" } pl-[50px]`}>
                { description }
            </div>
            <div className='pl-[50px] text-[19px] font-semibold hover:text-blue-600 cursor-pointer' onClick={() => setMore(prev => !prev)} >
                { !more ? "read more..." : "read less..."}
            </div>

            { image && <div className='w-full h-[300px] overflow-hidden flex justify-center rounded-lg'>
                <img className='h-full rounded-lg' src={image} alt="" />
            </div>}

            <div>
                <div className='w-full flex items-center justify-between p-[20px] border-b-2 border-gray-500'>
                    <div className='flex items-center justify-center gap-[5px] text-[18px]'>
                        <BiLike className='text-[#0A66C2] w-[20px] h-[20px]' /><span>{ likes.length }</span>
                    </div>
                    <div className='flex items-center justify-center gap-[5px] text-[17px] cursor-pointer' onClick={() => setShowComment(prev => !prev)}>
                        <span>{ comment.length }</span>
                        <span className='text-[#0A66C2]'>Comments</span>
                    </div>
                </div>
                <div className='flex items-center gap-[20px] w-full px-[20px] pt-[20px]'>
                    { !likes.includes(userData._id) && 
                    <div className='flex justify-center items-center gap-[5px] cursor-pointer' onClick={handleLike}>
                        <BiLike className='w-[20px] h-[20px]' />
                        <span>Like</span>
                    </div> }

                    { likes.includes(userData._id) && 
                    <div className='flex justify-center items-center gap-[5px] cursor-pointer' onClick={handleLike}>
                        <BiSolidLike className='w-[20px] h-[20px] text-[#0A66C2]' />
                        <span className='text-[#0A66C2] font-semibold'>Liked</span>
                    </div> }
                    
                    <div className='flex justify-center items-center gap-[8px] cursor-pointer' onClick={() => setShowComment(prev => !prev)}>
                        <FaRegCommentDots />
                        <span>Comment</span>
                    </div>
                    
                </div>
                { showComment && <div>
                    <form className='p-[10px] my-[25px] rounded-full border-gray-300 border-2 flex items-center justify-between bg-gray-100' onSubmit={handleComment}>
                        <input className='outline-none border-none px-[10px]' type="text" placeholder='leave a comment...' onChange={(e) => setCommentsContent(e.target.value)} value={commentsContent} />
                        <button className='text-[#0A66C2] pr-[10px]'><IoSendOutline className=' w-[22px] h-[22px]'  /></button>
                    </form>
                    <div className='flex flex-col gap-[20px]'>
                        { comments.map((com) => (
                            <div className='flex flex-col gap-[10px] border-b-2 border-b-gray-300 pb-[10px]'>
                                <div className='w-full flex items-center justify-start gap-[10px]'>
                                    <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer'>
                                        <img className='h-full' src={ com.user.profileImage || dp} alt="" />
                                    </div>
                                    <div>
                                        <div className='text-[20px] font-semibold'>{`${ com.user.firstName } ${ com.user.lastName }`}</div>
                                        {/* <div className='text-gray-600 text-[14px]'>{moment(com.createdAt).fromNow()}</div> */}
                                    </div>
                                    {com.user._id === userData._id && (
                                        <button
                                        onClick={() => handleDeleteComment(com._id)}
                                        className='text-red-500 text-[22px] hover:underline pl-[30px]'
                                        >
                                        <MdDelete />
                                        </button>
                                    )}
                                </div>
                                <div className='pl-[50px]'>{com.content}</div>
                            </div>
                        ))}
                    </div>
                </div> }
            </div>
        </div>
    )
}

export default Post