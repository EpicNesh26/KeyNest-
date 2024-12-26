import React, { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Manager = () => {
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })

    const [passwordArray, setpasswordArray] = useState([])
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        let passwordArray;
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])


    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log(passwordArray)
            setform({ site: "", username: "", password: "" })
            toast('🦄 Password Saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('🦄 Details should be more than 3 Characters.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
    }

    const deletePassword = (id) => {
        console.log("Deleting Password with id", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {

            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('🦄 Password Deleted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const editPassword = (id) => {

        console.log("Editing password with id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const copyText = (text) => {
        toast('🦄 Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (

        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            {/* <div className="absolute inset-0 -z-10 h-full w-full  bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div> */}

            <div className="md:mycontainer h-full min-h-[89.5vh]">
                

                <h1 className='text-2xl md:text-4xl font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    Passworlds
                    <span className='text-green-700'>/ &gt;</span>
                </h1>
                <p className='text-green-900 text-base md:text-lg text-center'>Your own Password Manager.</p>
                <div className="flex flex-col items-center p-4 text-black gap-3">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder='Enter Website URL'
                        className='rounded-full border border-green-500 w-full md:w-3/4 p-4 py-1 text-sm md:text-base'
                        type="text"
                        name='site'
                        id=''
                    />
                    <div className="flex flex-col md:flex-row w-full md:w-3/4 gap-2 justify-between">
                        <input
                            value={form.username}
                            onChange={handleChange}
                            placeholder='Enter Username'
                            className='rounded-full border border-green-500 w-full p-4 py-1 text-sm md:text-base'
                            type="text"
                            name='username'
                            id=''
                        />
                        <div className="relative w-full">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter Password"
                                className="rounded-full border border-green-500 w-full p-4 py-1 text-sm md:text-base"
                                name="password"
                            />
                            <span
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                <lord-icon
                                    src="https://cdn.lordicon.com/dicvhxpz.json"
                                    trigger="hover"
                                ></lord-icon>
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={savePassword}
                        className='flex justify-center items-center bg-slate-200 hover:bg-white hover:border-black border rounded-full px-2 py-2 w-fit mt-4 text-sm md:text-base'>
                        <lord-icon
                            src="https://cdn.lordicon.com/rpviwvwn.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>
                </div>

                
                <div className="passwords px-4 md:px-8 lg:px-16">
                    <h2 className='font-bold text-2xl py-4 text-center'>Your Passwords</h2>

                    {passwordArray.length === 0 && (
                        <div className="text-center text-gray-500">No Passwords to show.</div>
                    )}

                    {passwordArray.length !== 0 && (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full rounded-lg shadow-md">
                                <thead className='bg-green-500 text-white text-sm md:text-base'>
                                    <tr>
                                        <th className='py-3 px-2 md:px-4'>Site</th>
                                        <th className='py-3 px-2 md:px-4'>Username</th>
                                        <th className='py-3 px-2 md:px-4'>Password</th>
                                        <th className='py-3 px-2 md:px-4'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-200 text-sm md:text-base'>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index} className="border-b border-green-400 last:border-none">
                                            <td className='py-3 px-2 md:px-4 text-center'>
                                                <div className='flex flex-col md:flex-row items-center justify-between gap-2'>
                                                    <a href={item.site} target='_blank' rel="noopener noreferrer" className="text-blue-500 underline">{item.site}</a>
                                                    <div className='cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                        <lord-icon
                                                            style={{ width: '20px', height: '20px' }}
                                                            src="https://cdn.lordicon.com/oqdmuxru.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className='py-3 px-2 md:px-4 text-center'>
                                                <div className='flex flex-col md:flex-row items-center justify-between gap-2'>
                                                    <span>{item.username}</span>
                                                    <div className='cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                        <lord-icon
                                                            style={{ width: '20px', height: '20px' }}
                                                            src="https://cdn.lordicon.com/oqdmuxru.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className='py-3 px-2 md:px-4 text-center'>
                                                <div className='flex flex-col md:flex-row items-center justify-between gap-2'>
                                                    <span>{item.password}</span>
                                                    <div className='cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                        <lord-icon
                                                            style={{ width: '20px', height: '20px' }}
                                                            src="https://cdn.lordicon.com/oqdmuxru.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className='py-3 px-2 md:px-4 text-center'>
                                                <div className="md:flex-row flex-col flex justify-center items-center gap-4">
                                                    <div className='cursor-pointer' onClick={() => { editPassword(item.id) }}>
                                                        <lord-icon
                                                            style={{ width: '20px', height: '20px' }}
                                                            src="https://cdn.lordicon.com/exymduqj.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>

                                                    <div className='cursor-pointer' onClick={() => { deletePassword(item.id) }}>
                                                        <lord-icon
                                                            style={{ width: '20px', height: '20px' }}
                                                            src="https://cdn.lordicon.com/hwjcdycb.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>


            </div>
        </div>
    )
}

export default Manager
