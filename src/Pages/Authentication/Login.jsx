import Lottie from "lottie-react";
import React from "react";

import lottie from "../../assets/lottiLogin.json"
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Login = () => {
    const { register, handleSubmit } = useForm()

    const onSubmit = data => {
        console.log(data)
    }

    return (
        <div className="flex flex-col lg:flex-row gap-5 justify-center items-center my-10">
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
                            <input
                                type="password"
                                {...register("password")}
                                className="input"
                                placeholder="Password"
                            />
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
