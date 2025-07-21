import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";

const AddProperty = () => {
    const { user } = useAuth(); // From your context provider
    const axiosSecure = useAxiosSecure();
    const [propertyImage, setPropertyImage] = useState("")
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()
    
    const onSubmit = async (data) => {
        try {

            // Prepare property object
            const property = {
                title: data.title,
                location: data.location,
                image: propertyImage,
                priceMin: parseFloat(data.priceMin),
                priceMax: parseFloat(data.priceMax),
                agentName: user.displayName,
                agentEmail: user.email,
                agentImage: user?.photoURL,
                status: "pending", // default until admin verifies
                createdAt: new Date(),
            };

            // Submit to backend
            if (!propertyImage) {
                Swal.fire("Please wait", "Image is still uploading. Try again in a moment.", "info");
                return;
            }
            const res = await axiosSecure.post("/agents/properties", property);
            if (res.data.insertedId) {
                Swal.fire("Success!", "Property added successfully!", "success");
                navigate("/dashboard")
                reset();
            }
        } catch (error) {
            Swal.fire("Error", "Failed to add property", error);
        }
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0]
        // Image upload in Cloudinary
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "my_unsigned_preset");
        const res = await axios.post("https://api.cloudinary.com/v1_1/dxkmkskvy/image/upload", formData)
        const resData = res.data
        setPropertyImage(resData.secure_url)
    }

    return (
        <div className="max-w-3xl mx-auto bg-[#4c2c8c] text-white dark:bg-base-200 p-6 rounded shadow">
            <Helmet>
                <title>Add Property</title>
            </Helmet>
            <h2 className="text-2xl font-bold mb-4">Add New Property</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block font-medium mb-1">Property Title</label>
                    <input
                        type="text"
                        {...register("title", { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
                </div>

                {/* Location */}
                <div>
                    <label className="block font-medium mb-1">Property Location</label>
                    <input
                        type="text"
                        {...register("location", { required: true })}
                        className="input input-bordered w-full"
                    />
                    {errors.location && <p className="text-red-500 text-sm">Location is required</p>}
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block font-medium mb-1">Property Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        // {...register("image", { required: true })}
                        onChange={handleImageUpload}
                        className="file-input file-input-bordered w-full"
                    />
                    {/* {errors.image && <p className="text-red-500 text-sm">Image is required</p>} */}
                </div>

                {/* Price Range */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Min Price</label>
                        <input
                            type="number"
                            step="any"
                            {...register("priceMin", { required: true })}
                            className="input input-bordered w-full"
                        />
                        {errors.priceMin && <p className="text-red-500 text-sm">Min price is required</p>}
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Max Price</label>
                        <input
                            type="number"
                            step="any"
                            {...register("priceMax", { required: true })}
                            className="input input-bordered w-full"
                        />
                        {errors.priceMax && <p className="text-red-500 text-sm">Max price is required</p>}
                    </div>
                </div>

                {/* Agent Info (readonly) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">Agent Name</label>
                        <input
                            type="text"
                            value={user.displayName}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Agent Email</label>
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>

                {/* Submit */}
                <div>
                    <button type="submit" className="btn btn-primary w-full mt-4">
                        Add Property
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProperty;
