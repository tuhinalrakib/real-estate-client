import React from 'react';
import { useForm } from 'react-hook-form';
import lottie2 from "../../assets/lottieRegister.json";
import Lottie from 'lottie-react';
import { Link } from 'react-router';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div className="flex flex-col lg:flex-row-reverse justify-between items-center gap-10 px-4 lg:px-16 my-10">
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
                        {/* File Upload */}
                        <div>
                            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer inline-flex items-center px-4 py-2 border border-indigo-500 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                            >
                                Upload File
                                <input id="file-upload" type="file" className="sr-only" />
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
                            <input
                                type="password"
                                {...register("password", { required: true })}
                                placeholder="Password"
                                className="input input-bordered w-full"
                            />
                        </div>

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
