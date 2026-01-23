import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import { IoMdAdd } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { userDataContext } from "../context/UserContext";
import { HiPencil } from "react-icons/hi2";
import dp from "../assets/dp.png";
import EditProfile from "../components/EditProfile";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import Post from "../components/Post";
import ConnectionButton from "../components/ConnectionButton";

function Profile() {

    let { userData, setUserData, edit, setEdit, postData, setPostData, profileData, setProfileData } = useContext(userDataContext);

    let { serverUrl } = useContext(authDataContext);
    // let [userConnection, setUserConnection] = useState([]);
    let [profilePost, setProfilePost] = useState([])

    // const handleGetUserConnection = async () => {
    //     try {
    //         let result = await axios.get(`${serverUrl}/api/connection`, { withCredentials: true })
    //         console.log(result)
    //         setUserConnection(result.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     handleGetUserConnection()
    // }, [])

    useEffect(() => {
        if (profileData?._id) {
            setProfilePost(
            postData.filter(post => post.author._id === profileData._id)
        );
        }
    }, [postData, profileData]);


    return (
        <>
        {edit && <EditProfile setEdit={setEdit} />}
        <div className="w-full min-h-[100vh] bg-[#F4F2EE] flex flex-col items-center pt-[100px] pb-[50px]">
        <Nav />
        <div className="w-full max-w-[900px] min-h-[100vh] flex flex-col gap-[10px]">
            <div className="relative bg-white pb-[40px] rounded shadow-lg"> 
                <div
                    className="w-[100%] h-[180px] bg-gray-300 rounded overflow-hidden flex items-center justify-center cursor-pointer"
                    onClick={() => setEdit(true)}
                >
                    <img
                    className="object-cover object-center w-full h-full"
                    src={profileData.coverImage || null}
                    alt=""
                    />
                    <IoCameraOutline className="w-[25px] h-[25px] absolute top-[20px] right-[20px] text-white" />
                </div>
                <div
                    className="w-[100px] h-[100px] rounded-full overflow-hidden flex items-center justify-center absolute top-[120px] left-[33px] cursor-pointer"
                    onClick={() => setEdit(true)}
                >
                    <img
                    className="h-full object-cover"
                    src={profileData.profileImage || dp}
                    alt=""
                    />
                </div>
                <div className="w-[25px] h-[25px] absolute top-[175px] left-[117px] bg-[#0A66C2] flex items-center justify-center rounded-full">
                    <IoMdAdd onClick={() => setEdit(true)} className="text-white" />
                </div>
                <div className="mt-[42px] pl-[25px]">
                    <div className="text-[22px] font-semibold text-gray-700">
                    {`${profileData.firstName} ${profileData.lastName}`}
                    </div>
                    <div className="text-[16px] text-gray-600">
                    {profileData.headline || ""}
                    </div>
                    <div className="text-[16px] text-gray-600">{profileData.location}</div>
                    <div className="text-[16px] text-gray-600">{`${profileData.connection.length} connections`}</div>
                </div>
                {
                    profileData._id == userData._id &&
                    <button
                    className="min-w-[150px] ml-[20px] mt-[20px] mb-[10px] h-[40px] rounded-full border-2 border-[#4C8ECE] text-[#4C8ECE] cursor-pointer flex items-center justify-center gap-[10px]"
                    onClick={() => setEdit(true)}
                    >
                        Edit Profile <HiPencil />
                    </button>
                }
                {
                    profileData._id !== userData._id && 
                    <div className="mt-[15px] ml-[20px]">
                        <ConnectionButton userId={profileData._id} />
                    </div>
                }
                </div>
                <div className="w-full h-[100px] flex items-center p-[20px] text-[22px] text-gray-600 font-semibold bg-white shadow-lg rounded-lg">
                    {`Post (${profilePost.length})`}
                </div>
                {
                    profilePost.map((post, index) => (
                        <Post key={index} id={post._id} description={post.description} author={post.author} image={post.image} like={post.like} comment={post.comment} createdAt={post.createdAt} />
                    ))
                }
                {
                    profileData.skills.length > 0 && 
                    <div className="w-full min-h-[100px] flex justify-center p-[30px] bg-white shadow-lg rounded-lg font-semibold flex-col gap-[10px]">
                        <div className=" text-[22px] text-gray-600">
                            Skills
                        </div>
                        <div className="flex items-center justify-start gap-[20px] flex-wrap text-gray-600">
                            {
                                profileData.skills.map((skill) => (
                                    <div>{skill}</div>
                                ))
                            }
                            {
                                profileData._id == userData._id &&
                                    <button className="min-w-[150px] ml-[20px] h-[40px] rounded-full border-2 border-[#4C8ECE] text-[#4C8ECE] cursor-pointer flex items-center justify-center gap-[10px]" onClick={() => setEdit(true)}>
                                    Add Skills
                                </button>
                            }
                            
                        </div>
                    </div>
                }
                
                {
                    profileData.education.length > 0 && 
                    <div className="w-full min-h-[100px] flex justify-center p-[30px] bg-white shadow-lg rounded-lg font-semibold flex-col gap-[10px]">
                        <div className=" text-[22px] text-gray-600">
                            Education
                        </div>
                        <div className="flex items-start justify-start gap-[20px] flex-col text-gray-600">
                            {
                                profileData.education.map((edu) => (
                                    <>
                                        <div>College: {edu.college}</div>
                                        <div>Degree: {edu.degree}</div>
                                        <div>Field Of Study: {edu.fieldOfStudy}</div>
                                    </>
                                ))
                            }
                            {
                                profileData._id == userData._id && 
                                <button className="min-w-[150px] h-[40px] rounded-full border-2 border-[#4C8ECE] text-[#4C8ECE] cursor-pointer flex items-center justify-center gap-[10px]" onClick={() => setEdit(true)}>
                                    Add Education
                                </button>
                            }
                            
                        </div>
                    </div>
                }

                {
                    profileData.experience.length > 0 && 
                    <div className="w-full min-h-[100px] flex justify-center p-[30px] bg-white shadow-lg rounded-lg font-semibold flex-col gap-[10px]">
                        <div className=" text-[22px] text-gray-600">
                            Experience
                        </div>
                        <div className="flex items-start justify-start gap-[20px] flex-col text-gray-600">
                            {
                                profileData.experience.map((exp) => (
                                    <>
                                        <div>Title: {exp.title}</div>
                                        <div>Comapany: {exp.company}</div>
                                        <div>Description: {exp.description}</div>
                                    </>
                                ))
                            }
                            {
                                profileData._id == userData._id && 
                                <button className="min-w-[150px] h-[40px] rounded-full border-2 border-[#4C8ECE] text-[#4C8ECE] cursor-pointer flex items-center justify-center gap-[10px]" onClick={() => setEdit(true)}>
                                    Add Experience
                                </button>
                            }
                            
                        </div>
                    </div>
                }
            </div>
        </div>
        </>
    );
}

export default Profile;
