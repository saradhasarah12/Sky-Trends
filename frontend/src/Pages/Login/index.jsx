import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { svedio } from '../../assets';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validation = () => {
        if (!email || !password) {
            toast.error("All Fields are required");
            return false;
        }

        const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailregex.test(email)) {
            toast.error("Invalid Email Format");
            return false;
        }

        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validation()) return;
        try {
            const response = await axios.post("http://localhost:5000/users/login", { emailOrPhone: email, password });
            if (response.data.status === "ok") {
                toast.success("Login Successful!");
                navigate('/dashboard'); // Redirect to dashboard or home after successful login
            } else {
                toast.error(response.data.error || "Login failed");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred during login.");
        }
    };

    return (
        <>
            <div className='flex flex-col md:flex-row items-center gap-10 justify-between w-full h-screen'>
                <ToastContainer />
                <div className='img w-full md:w-2/3 flex justify-center'>
                    <video src={svedio} autoPlay loop muted alt="BikeLogin" className='w-full md:w-3/4 object-contain' />
                </div>
                <div className="form-box w-full md:w-1/3 flex flex-col items-end gap-10 p-4">
                    <form className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg" onSubmit={handleSubmit}>
                        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email or Phone</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <button type="submit" className="w-full bg-green-400 text-white p-2 rounded-lg">
                            Login
                        </button>

                        <div className="mt-4 text-center">
                            <p>
                                Don't have an account?{' '}
                                <span className="text-blue-600 cursor-pointer" onClick={() => { navigate('/signup') }}>Sign Up</span>
                            </p>
                        </div>

                    </form>
                </div>
                
            </div>
        </>
    )
}
