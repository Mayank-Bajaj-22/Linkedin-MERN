import React, { useState } from 'react'
import dp from "../assets/dp.png"
import moment from 'moment';
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";

function Post({ author, id, like, comment, description, image, createdAt }) {

    let [more, setMore] = useState(false)

    return (
        <div className='w-full flex flex-col min-h-[200px] gap-[20px] bg-white rounded-lg shadow-lg p-[20px]'>
            <div className='flex justify-between items-start'>
                <div className='flex justify-center items-start gap-[15px]'>
                    <div className='w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center cursor-pointer'>
                        <img className='h-full' src={ author.profileImage || dp} alt="" />
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
                        <BiLike className='text-[#0A66C2] w-[20px] h-[20px]' /><span>{ like.length }</span>
                    </div>
                    <div className='flex items-center justify-center gap-[5px] text-[17px]'>
                        <span className='text-[#0A66C2]'>{ comment.length }</span>
                        <span>Comments</span>
                    </div>
                </div>
                <div className='flex items-center justify-between w-full px-[20px] pt-[20px]'>
                    <div className='flex justify-center items-center gap-[5px]'>
                        <BiLike className='w-[20px] h-[20px]' />
                        <span>Like</span>
                    </div>
                    <div className='flex justify-center items-center gap-[8px]'>
                        <FaRegCommentDots />
                        <span>Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post