import React, { useContext, useState, useRef } from 'react'
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
    let [skills, setSkills] = useState(userData.skills || []);
    let [newSkills, setNewSkills] = useState("");
    let [education, setEducation] = useState(userData.education || []);
    let [newEducation, setNewEducation] = useState({
        college: "",
        degree: "",
        fieldOfStudy: ""
    });
    let [experience, setExperience] = useState(userData.experience || []);
    let [newExperience, setNewExperience] = useState({
        title: "",
        company: "",
        description: ""
    });

    let [frontendProfileImage, setFrontendProfileImage] = useState(userData.profileImage || dp)
    let [backendProfileImage, setBackendProfileImage] = useState(null)

    let [frontendCoverImage, setFrontendCoverImage] = useState(userData.coverImage || null)
    let [backendCoverImage, setBackendCoverImage] = useState(null)


    const profileImage = useRef(); // return a object
    const coverImage = useRef(); // return a object

    function addSkill (e) {
        e.preventDefault();
        if (newSkills && !skills.includes(newSkills)) {
            setSkills([...skills, newSkills])
        }
        setNewSkills("")
    }

    function removeSkill(skill) {
        if (skills.includes(skill)) {
            setSkills(skills.filter((s) => s !== skill))
        }
    }

    function addEducation (e) {
        e.preventDefault();
        if (newEducation.college && newEducation.degree && newEducation.fieldOfStudy) {
            setEducation([...education, newEducation])
        }
        setNewEducation({
            college: "",
            degree: "",
            fieldOfStudy: ""
        })
    }

    function removeEducation(edu) {
        if (education.includes(edu)) {
            setEducation(education.filter((e) => e !== edu))
        }
    }

    function addExperience (e) {
        e.preventDefault();
        if (newExperience.title && newExperience.company && newExperience.description) {
            setExperience([...experience, newExperience])
        }
        setNewExperience({
            title: "",
            company: "",
            description: ""
        })
    }

    function removeExperience(exp) {
        if (experience.includes(exp)) {
            setExperience(experience.filter((e) => e !== exp))
        }
    }

    function handleProfileImage(e) {
        let file = e.target.files[0];
        setBackendProfileImage(file);
        setFrontendProfileImage(URL.createObjectURL(file))
    }

    function handleCoverImage(e) {
        let file = e.target.files[0];
        setBackendCoverImage(file);
        setFrontendCoverImage(URL.createObjectURL(file))
    }

    return (
        <div className='w-full h-[100vh] fixed top-0 z-100 flex items-center justify-center'>

            <input type="file" accept="image/*" hidden ref={profileImage} onChange={handleProfileImage} />
            <input type="file" accept="image/*" hidden ref={coverImage} onChange={handleCoverImage} />

            <div className='bg-black opacity-[0.6] w-full h-full absolute'></div>
            <div className='w-[90%] mt-15 max-w-[500px] h-[600px] bg-white relative z-200 shadow-lg rounded-lg p-[10px] overflow-auto'>
                <div className='absolute top-[10px] right-[20px] cursor-pointer' >
                    <RxCross2 onClick={() => setEdit(false)} className='w-[25px] h-[25px] text-gray-800 font-bold cursor-pointer' />
                </div>
                <div className='mt-[27px] w-full h-[200px] bg-gray-500 rounded-lg overflow-hidden' onClick={() => coverImage.current.click()} onChange={handleCoverImage} >
                    <img className='w-full' src={frontendCoverImage} alt="" />
                    <IoCameraOutline className='w-[25px] h-[25px] absolute top-[200px] right-[20px] text-white' />
                </div>
                <div className='w-[80px] h-[80px] rounded-full absolute top-[190px] left-[30px]' onClick={() => profileImage.current.click()}>
                    <img className='w-full h-full rounded-full' src={frontendProfileImage} alt="" />
                </div>
                <div className='w-[20px] h-[20px] absolute top-[240px] left-[90px] bg-[#0A66C2] flex items-center justify-center rounded-full'>
                    <IoMdAdd onClick={() => setEdit(true)} className='text-white' />
                </div>
                <div className='w-full flex flex-col items-center justify-center mt-[55px] gap-[20px]'>
                    <input type="text" placeholder='firstName' className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" placeholder='lastName' className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="text" placeholder='userName' className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <input type="text" placeholder='headline' className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={headline} onChange={(e) => setHeadLine(e.target.value)} />
                    <input type="text" placeholder='location' className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={location} onChange={(e) => setLocation(e.target.value)} />
                    <input type="text" placeholder='gender (male/female/other)' className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg' value={gender} onChange={(e) => setGender(e.target.value)} />
                    {/* sills */}
                    <div className='w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg'>
                        <h1 className='text-[19px] font-semibold'>Skills</h1>
                        { skills && <div className='flex flex-col gap-[10px]'>
                            { skills.map((skill, index) => (
                                <div key={index} className='w-full h-[40px] border-[1px] border-gray-600 bg-gray-200 px-[10px] py-[5px] rounded flex justify-between items-center'><span>{skill}</span><RxCross2 className='w-[20px] h-[20px] text-gray-800 font-bold cursor-pointer' onClick={() => removeSkill(skill)} /></div>
                            ))}
                        </div> }
                        <div className='flex flex-col gap-[10px] items-start'>
                            <input type="text" placeholder='add new skill' value={newSkills} onChange={(e) => setNewSkills(e.target.value)} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg' />
                            <button className='w-[30%] h-[40px] rounded-full mt-2 cursor-pointer border-2 border-[#04AA6D] text-[#04AA6D]' onClick={addSkill}>
                                Add
                            </button>
                        </div>
                    </div>

                    {/* education */}
                    <div className='w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg'>
                        <h1 className='text-[19px] font-semibold'>Education</h1>
                        { education && <div className='flex flex-col gap-[10px]'>
                            { education.map((edu, index) => (
                                <div key={index} className='w-full border-[1px] border-gray-600 bg-gray-200 px-[10px] py-[5px] rounded flex justify-between items-center'>
                                    <div>
                                        <div>College: {edu.college}</div>
                                        <div>Degree: {edu.degree}</div>
                                        <div>Field Of Study: {edu.fieldOfStudy}</div>
                                    </div>
                                    <RxCross2 className='w-[20px] h-[20px] text-gray-800 font-bold cursor-pointer' onClick={() => removeEducation(edu)} /></div>
                            ))}
                        </div> }
                        <div className='flex flex-col gap-[10px] items-start'>
                            <input type="text" placeholder='college' value={newEducation.college} onChange={(e) => setNewEducation({...newEducation, college: e.target.value})} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg' />

                            <input type="text" placeholder='degree' value={newEducation.degree} onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg' />

                            <input type="text" placeholder='field of study' value={newEducation.fieldOfStudy} onChange={(e) => setNewEducation({...newEducation, fieldOfStudy: e.target.value})} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg' />

                            <button className='w-[30%] h-[40px] rounded-full mt-2 cursor-pointer border-2 border-[#04AA6D] text-[#04AA6D]' onClick={addEducation}>
                                Add
                            </button>
                        </div>
                    </div>

                    {/* experience */}
                    <div className='w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg'>
                        <h1 className='text-[19px] font-semibold'>Experience</h1>
                        { experience && <div className='flex flex-col gap-[10px]'>
                            { experience.map((exp, index) => (
                                <div key={index} className='w-full border-[1px] border-gray-600 bg-gray-200 px-[10px] py-[5px] rounded flex justify-between items-center'>
                                    <div>
                                        <div>Title: {exp.title}</div>
                                        <div>Company: {exp.company}</div>
                                        <div>Description: {exp.description}</div>
                                    </div>
                                    <RxCross2 className='w-[20px] h-[20px] text-gray-800 font-bold cursor-pointer' onClick={() => removeExperience(exp)} /></div>
                            ))}
                        </div> }
                        <div className='flex flex-col gap-[10px] items-start'>
                            <input type="text" placeholder='title' value={newExperience.title} onChange={(e) => setNewExperience({...newExperience, title: e.target.value})} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg' />

                            <input type="text" placeholder='company' value={newExperience.company} onChange={(e) => setNewExperience({...newExperience, company: e.target.value})} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg' />

                            <input type="text" placeholder='description' value={newExperience.description} onChange={(e) => setNewExperience({...newExperience, description: e.target.value})} className='w-full h-[50px] outline-none border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg' />

                            <button className='w-[30%] h-[40px] rounded-full mt-2 cursor-pointer border-2 border-[#04AA6D] text-[#04AA6D]' onClick={addExperience}>
                                Add
                            </button>
                        </div>
                    </div>
                    <button className='w-[100%] h-[50px] rounded-full bg-[#0A66C2] mt-[20px] text-[white] font-semibold text-[18px]'>
                        Save Profile
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditProfile