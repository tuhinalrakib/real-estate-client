import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUserShield, FaUserTie, FaUserSlash, FaTrash } from "react-icons/fa";

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
    mutationFn: async ({ email, role }) => {
      return axiosSecure.patch(`/users/make-${role}/${email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
    },
  });

  const fraudMutation = useMutation({
    mutationFn: async (email) => {
      return axiosSecure.patch(`/users/mark-fraud/${email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (email) => {
      return axiosSecure.delete(`/users/${email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
    },
  });

  const handlePromote = (email, role) => {
    promoteMutation.mutate({ email, role });
  };

  const handleMarkFraud = (email) => {
    Swal.fire({
      title: "Mark as Fraud?",
      text: "This agent will not be able to add properties anymore.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, mark as fraud!",
    }).then((result) => {
      if (result.isConfirmed) {
        fraudMutation.mutate(email);
      }
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
      if (result.isConfirmed) {
        deleteMutation.mutate(email);
      }
    });
  };

  if (isLoading) return <div className="text-center mt-10">Loading users...</div>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u._id}>
              <td>{i + 1}</td>
              <td>{u.name || "N/A"}</td>
              <td>{u.email}</td>
              <td className="capitalize">{u.role || "user"}</td>
              <td>{u.status === "fraud" ? <span className="text-red-600">Fraud</span> : "-"}</td>
              <td className="flex flex-wrap gap-2">
                {u.role !== "admin" && u.status !== "fraud" && (
                  <>
                    <button
                      onClick={() => handlePromote(u.email, "admin")}
                      className="btn btn-xs btn-info"
                      title="Make Admin"
                    >
                      <FaUserShield />
                    </button>
                    <button
                      onClick={() => handlePromote(u.email, "agent")}
                      className="btn btn-xs btn-success"
                      title="Make Agent"
                    >
                      <FaUserTie />
                    </button>
                  </>
                )}
                {u.role === "agent" && u.status !== "fraud" && (
                  <button
                    onClick={() => handleMarkFraud(u.email)}
                    className="btn btn-xs btn-warning"
                    title="Mark as Fraud"
                  >
                    <FaUserSlash />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(u.email)}
                  className="btn btn-xs btn-error"
                  title="Delete User"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
