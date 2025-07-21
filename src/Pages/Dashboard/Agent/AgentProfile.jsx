import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useUserRole from '../../../Hooks/useUserRole';
import { Helmet } from 'react-helmet';

const AgentProfile = () => {
    const { user } = useAuth();
    const role = useUserRole();

    return (
        <div className="bg-[#5826bc] text-white max-w-xl mx-auto mt-5 dark:bg-base-200 shadow-md rounded-xl p-6">
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className="flex flex-col justify-center items-center text-center">
                <img
                    className="w-24 h-24 rounded-full border-2 border-primary"
                    src={user?.photoURL || "/default-avatar.png"}
                    alt="User Avatar"
                />
                <h2 className="text-xl font-bold mt-4">{user?.name}</h2>
                <p className="text-gray-500">{user?.email}</p>
                {role !== "user" && (
                    <span className="mt-1 badge badge-secondary">{role.toUpperCase()}</span>
                )}
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Profile Info</h3>
                <ul className="space-y-2 text-sm">
                    <li>
                        <span className="font-semibold">Name:</span> {user?.displayName}
                    </li>
                    <li>
                        <span className="font-semibold">Email:</span> {user?.email}
                    </li>
                    <li>
                        <span className="font-semibold">Role:</span>{" "}
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                    </li>
                    {/* Optional: Add more user metadata if needed */}
                </ul>
            </div>
        </div>
    );
};

export default AgentProfile;