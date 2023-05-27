import React, { useEffect, useState } from "react";
import { RxPerson } from "react-icons/rx";
import { AiOutlineLock } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import Cookies from 'js-cookie';

interface credentials {
    username: string;
    password: string;
}

const Login = () => {
    const { login, setIsLoggedIn } = useAuth();
    const [formData, setFormData] = useState<credentials>({
        username: "",
        password: "",
    });
    const [error, setError] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setError("Please enter email and password");
            return;
        }
        try {
            const { data }: any = await login(formData);
            setIsLoggedIn(true);
            Cookies.set("accessToken", data.access_token);
            Cookies.set("refreshToken", data.refresh_token);
        } catch (error) {
            setError("Incorrect email or password");
        }
    }

    return (
        <div className="min-h-screen bg-bg1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
                <div className="bg-white py-8 px-4 shadow sm:px-6">
                    <h1 className="text-red-500">{error && error}</h1>
                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700  py-4"
                            >
                                <span className="text-red-600 pr-1">*</span>User Name
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="username"
                                    name="username"
                                    type="email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    required
                                    onChange={onChange}
                                    className="rounded-[2px] appearance-none block w-full border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-login focus:border-login sm:text-sm py-2 pl-8 pr-4"
                                />
                                <RxPerson
                                    className="absolute inset-y-0 left-0 pl-3 pt-2 text-gray-700"
                                    size={30}
                                    style={{ color: "black" }}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 pt-2 pb-4"
                            >
                                <span className="text-red-600 pr-1">*</span>Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    required
                                    onChange={onChange}
                                    className="rounded-[2px] appearance-none block w-full border border-gray-300 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-login focus:border-login sm:text-sm py-2 pl-8 pr-4"
                                />
                                <AiOutlineLock
                                    className="absolute inset-y-0 left-0 pl-3 pt-2 text-gray-700"
                                    size={30}
                                    style={{ color: "black" }}
                                />
                            </div>
                        </div>
                        <button className="px-4 py-2 text-md text-white rounded-sm bg-login hover:bg-login/70 ease-in 300">
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
