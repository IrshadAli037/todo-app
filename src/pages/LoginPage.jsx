import React, { useState } from 'react';
import { useLogin } from "../hooks/authQueries";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { mutate: LoginMutate } = useLogin();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        LoginMutate(loginData, {
            onSuccess: (data) => {
                if (!data) {
                    alert("Invalid email or password");
                    return;
                }

                alert("Login successful!");
                dispatch(setUser(data));
                navigate('/');
            },
            onError: (err) => {
                alert(err.message);
            },
        });
    };

    return (
        <div className='bg-white w-[500px] mx-auto rounded-xl shadow-xl p-6 my-auto'>
            <h1 className='text-center font-bold text-3xl text-blue-600'>Login</h1>
            <hr className='border-t-2 border-blue-200 my-3' />

            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>

                <div>
                    <h1 className='font-semibold text-xl mb-2'>Email</h1>
                    <input
                        className='border-zinc-400 border-2 p-3 rounded-xl w-full'
                        type="email"
                        name="email"
                        value={loginData.email}
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
                        value={loginData.password}
                        onChange={handleChange}
                        placeholder="Example@1234"
                    />
                </div>

                <button
                    type="submit"
                    className="my-2 p-2 bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                    Login
                </button>

                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-600 hover:underline font-semibold">
                        Create Account
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
