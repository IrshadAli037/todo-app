import React, { useState } from 'react';
import { useRegister } from "../hooks/authQueries";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const { mutate: registerMutate } = useRegister();

    const [signupData, setSignupData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        registerMutate(signupData, {
            onSuccess: (data) => {
                alert("Registration successful!");
                dispatch(setUser(data));  // auto-login
                navigate('/')
            },
            onError: (err) => {
                alert(err.message);
            },
        });
    };

    return (
        <div className='bg-white w-[500px] mx-auto rounded-xl shadow-xl p-6 my-auto'>
            <h1 className='text-center font-bold text-3xl text-blue-600'>Sign Up</h1>
            <hr className='border-t-2 border-blue-200 my-3' />

            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                <div>
                    <h1 className='font-semibold text-xl mb-2'>UserName</h1>
                    <input
                        className='border-zinc-400 border-2 p-3 rounded-xl w-full'
                        type="text"
                        name="username"
                        value={signupData.username}
                        onChange={handleChange}
                        placeholder="John"
                    />
                </div>

                <div>
                    <h1 className='font-semibold text-xl mb-2'>Email</h1>
                    <input
                        className='border-zinc-400 border-2 p-3 rounded-xl w-full'
                        type="email"
                        name="email"
                        value={signupData.email}
                        onChange={handleChange}
                        placeholder="abc@example.com"
                    />
                </div>

                <div>
                    <h1 className='font-semibold text-xl mb-2'>Password</h1>
                    <input
                        className='border-zinc-400 border-2 p-3 rounded-xl w-full'
                        type="password"
                        name="password"
                        value={signupData.password}
                        onChange={handleChange}
                        placeholder="Example@1234"
                    />
                </div>

                <button
                    type="submit"
                    className="my-2 p-2 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                    Register
                </button>

                <p className="text-center text-sm text-gray-600">
                    Already have an account? 
                    <a href="/login" className="text-blue-600 hover:underline font-semibold">
                        Log In
                    </a>
                </p>
            </form>
        </div>
    );
};

export default SignupPage;
