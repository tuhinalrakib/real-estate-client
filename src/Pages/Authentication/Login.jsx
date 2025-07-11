import Lottie from "lottie-react";
import React, { useState } from "react";

import lottie from "../../assets/lottiLogin.json"
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { Helmet } from "react-helmet";

const Login = () => {
    const { register, handleSubmit } = useForm()
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = data => {
        console.log(data)
    }

    return (
        <div className="flex flex-col lg:flex-row gap-5 justify-center items-center my-10">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-3xl text-center font-bold">Login now!</h1>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register("email")}
                                className="input"
                                placeholder="Email"
                            />
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
                                <button onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer right-1 top-1.5">
                                    {
                                        showPassword ? <FaEye size={24} /> : <FaEyeSlash size={24} />
                                    }
                                </button>
                            </div>
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                        <p><small>Don't have an account?</small><Link className='-ml-3 btn btn-accent btn-link' to="/register">Register</Link></p>
                    </form>
                </div>
            </div>
            <div>
                <Lottie
                    style={{ width: "300px" }}
                    loop={true}
                    animationData={lottie}
                />
            </div>
        </div>
    );
};

export default Login;
