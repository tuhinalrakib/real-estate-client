import Lottie from "lottie-react";
import React, { useState } from "react";

import lottie from "../../assets/Login.json"
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import GoogleLogin from "./GoogleLogin";
import { IoMdEyeOff } from "react-icons/io";
// import { toast } from "react-toastify";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [showPassword, setShowPassword] = useState(false)
    const { loginUser } = useAuth()
    const navigate = useNavigate()


    const onSubmit = async (data) => {
        const { email, password } = data;
        loginUser(email, password)
            .then(res => {
                if (res.user) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Login Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/");
                }
            })
            .catch(e => {

                let errorMessage = e.message;

                // if (e.code === 'auth/invalid') {
                //     errorMessage = "Email/Password doesn't Match"
                // }

                // toast(errorMessage)

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessage,
                });
            });
    };


    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center px-10 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10">
                <div className="flex flex-col lg:flex-row items-center gap-10 max-w-6xl w-full">

                    {/* Lottie Animation */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <Lottie
                            className="w-64 md:w-80 lg:w-[28rem]"
                            animationData={lottie}
                            loop
                        />
                    </div>

                    {/* Glassmorphism Login Card */}
                    <div className="w-full lg:w-1/2 bg-white/40 backdrop-blur-lg shadow-xl rounded-3xl p-8 border border-white/20">
                        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
                            Welcome Back 👋
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is Required"
                                    })}
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400 transition-all"
                                />
                            </div>
                            {
                                errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                            }
                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password",
                                            {
                                                required: "Password is Required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters"
                                                },
                                                validate: {
                                                    hasUpperCase: (value) =>
                                                        /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                                                    hasSpecialChar: (value) =>
                                                        /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character"
                                                }
                                            })}
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full focus:ring-2 focus:ring-indigo-400 transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute cursor-pointer right-1.5 top-5 -translate-y-1/2 text-gray-600 hover:text-indigo-500"
                                    >
                                        {showPassword ? <FaEye size={22} /> : <IoMdEyeOff size={22} />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot password */}
                            <div className="text-right">
                                <a href="#" className="text-sm text-indigo-500 hover:underline">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-3 cursor-pointer text-white font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 shadow-lg transition-all"
                            >
                                Login
                            </button>

                            <div className="divider">OR</div>
                        </form>

                        {/* Google Login */}
                        <GoogleLogin />

                        {/* Sign Up Redirect */}
                        <p className="mt-6 text-sm text-center text-gray-700">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-indigo-500 hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>

        //                     <label className="label">Password</label>
        //                     <div className="relative">
        //                         <input

        //                             placeholder="Password"
        //                             className="input input-bordered w-full"
        //                         />
        //                         <button 
        //                         type="button"
        //                         onClick={() => setShowPassword(!showPassword)} className="">
        //                             {
        //                                 showPassword ? <FaEye size={24} /> : <FaEyeSlash size={24} />
        //                             }
        //                         </button>
        //                     </div>
        //                     {
        //                         errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        //                     }
        //                     <div><a className="link link-hover">Forgot password?</a></div>
        //                     <button className="btn btn-neutral mt-4">Login</button>
        //                 </fieldset>
        //                 <p><small>Don't have an account?</small><Link className='-ml-3 btn btn-accent btn-link' to="/register">Register</Link></p>
        //             </form>
        //             <GoogleLogin></GoogleLogin>
        //         </div>
        //     </div>
        //     <div className="w-full lg:w-1/2 flex justify-center">
        //         <Lottie
        //             className="w-64 md:w-80 lg:w-[28rem]"
        //             loop={true}
        //             animationData={lottie}
        //         />
        //     </div>
        // </div>
    );
};

export default Login;
