import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserShield, FaUserTie, FaUserSlash, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Mutations
  const promoteMutation = useMutation({
    mutationFn: async ({ email, role }) =>
      axiosSecure.patch(`/users/make-${role}/${email}`),
    onSuccess: () => queryClient.invalidateQueries(["allUsers"]),
  });

  const fraudMutation = useMutation({
    mutationFn: async (email) => axiosSecure.patch(`/users/mark-fraud/${email}`),
    onSuccess: () => queryClient.invalidateQueries(["allUsers"]),
  });

  const deleteMutation = useMutation({
    mutationFn: async (email) => axiosSecure.delete(`/users/${email}`),
    onSuccess: () => queryClient.invalidateQueries(["allUsers"]),
  });

  // Handlers
  const handlePromote = (email, role) => promoteMutation.mutate({ email, role });

  const handleMarkFraud = (email) => {
    Swal.fire({
      title: "Mark as Fraud?",
      text: "This agent will not be able to add properties anymore.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as fraud!",
    }).then((result) => {
      if (result.isConfirmed) fraudMutation.mutate(email);
    });
  };

  const handleDelete = (email) => {
    Swal.fire({
      title: "Delete this user?",
      text: "This will remove the user from Firebase and DB.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(email);
    });
  };

  if (isLoading)
    return <div className="text-center mt-10 font-semibold">Loading users...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u) => (
          <div
            key={u._id}
            className="card bg-white/30 shadow-xl rounded-2xl border border-gray-100 hover:shadow-2xl transition duration-300"
          >
            <div className="card-body">
              <h3 className="card-title text-lg font-semibold text-black">
                {u.name || "Unnamed User"}
              </h3>
              <p className="text-sm text-black/70">{u.email}</p>

              <div className="mt-2">
                <span className="px-2 py-1 text-xs rounded-full font-medium bg-gray-100 text-gray-700 capitalize">
                  {u.role || "user"}
                </span>
                {u.status === "fraud" && (
                  <span className="ml-2 px-2 py-1 text-xs rounded-full font-medium bg-red-100 text-red-600">
                    Fraud
                  </span>
                )}
              </div>

              <div className="card-actions mt-4 flex flex-wrap gap-2">
                {u.role !== "admin" && u.status !== "fraud" && (
                  <>
                    <button
                      onClick={() => handlePromote(u.email, "admin")}
                      className="btn btn-sm btn-info flex items-center gap-1"
                      title="Make Admin"
                    >
                      <FaUserShield /> Admin
                    </button>
                    <button
                      onClick={() => handlePromote(u.email, "agent")}
                      className="btn btn-sm btn-success flex items-center gap-1"
                      title="Make Agent"
                    >
                      <FaUserTie /> Agent
                    </button>
                  </>
                )}
                {u.role === "agent" && u.status !== "fraud" && (
                  <button
                    onClick={() => handleMarkFraud(u.email)}
                    className="btn btn-sm btn-warning flex items-center gap-1"
                    title="Mark as Fraud"
                  >
                    <FaUserSlash /> Fraud
                  </button>
                )}
                <button
                  onClick={() => handleDelete(u.email)}
                  className="btn btn-sm btn-error flex items-center gap-1"
                  title="Delete User"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
