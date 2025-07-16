import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import lottie2 from "../../assets/lottieRegister.json";
import Lottie from 'lottie-react';
import { Link, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imageUrl, setImageUrl] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const { registerUser, updateUserProfile } = useAuth()
    const axiosInstance = useAxios()
    const navigate = useNavigate()

    const handleImageUpload = async (e) => {
        const image = e.target.files[0]
        // Image upload in Cloudinary
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "my_unsigned_preset");
        const res = await axios.post("https://api.cloudinary.com/v1_1/dxkmkskvy/image/upload", formData)
        const resData = res.data
        setImageUrl(resData.secure_url)
    }

    const onSubmit = async (data) => {
        const { email, name, password } = data
        if (!imageUrl) {
            Swal.fire("Please wait", "Image is still uploading. Try again in a moment.", "info");
            return;
        }

        // Create Account
        registerUser(email, password)
            .then(async (res) => {
                // update userinfo in the database
                const userInfo = {
                    email: data.email,
                    name: data.name,
                    role: 'user', // default role
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                }
                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data);

                if (res?.user) {
                    updateUserProfile(name, imageUrl)
                        .then(() => {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Account Create Successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate("/")
                        })
                }
            })
            .catch(e => {
                console.log(e)
            })
    };

    console.log(imageUrl)

    return (
        <div className="flex flex-col lg:flex-row-reverse justify-center items-center gap-10 px-4 lg:px-16 my-10">
            <Helmet>
                <title>Register</title>
            </Helmet>
            {/* Lottie Animation */}
            <div className="w-full lg:w-1/2 flex justify-center">
                <Lottie
                    animationData={lottie2}
                    loop
                    style={{ maxWidth: '400px', width: '100%' }}
                />
            </div>

            {/* Form Card */}
            <div className="card w-full max-w-md bg-white shadow-2xl border border-gray-200">
                <div className="card-body">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Create an Account</h1>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Image Upload */}
                        <div>
                            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer inline-flex items-center px-4 py-2 border border-indigo-500 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                            >
                                <input
                                    onChange={handleImageUpload}
                                    type="file"
                                    className="input input-bordered w-full"
                                />
                            </label>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="label">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: true })}
                                placeholder="Your Name"
                                className="input input-bordered w-full"
                            />
                            {errors.name && <p className="text-sm text-red-500 mt-1">Name is required</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                placeholder="Your Email"
                                className="input input-bordered w-full"
                            />
                            {errors.email && <p className="text-sm text-red-500 mt-1">Email is required</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="label">Password</label>
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
                                    placeholder="Password"
                                    className="input input-bordered w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer right-1 top-1.5">
                                    {
                                        showPassword ? <FaEye size={24} /> : <FaEyeSlash size={24} />
                                    }
                                </button>
                            </div>
                        </div>
                        {
                            errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                        }
                        <div className="text-right">
                            <a href="#" className="text-sm text-indigo-500 hover:underline">Forgot password?</a>
                        </div>

                        <button type="submit" className="btn btn-neutral w-full">Register</button>

                        <p className="text-center text-sm mt-4">
                            Already have an account?{" "}
                            <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
