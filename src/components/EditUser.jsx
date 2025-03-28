import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUser } from "../services/api";

const EditUser = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ ...state });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.id, user);
      navigate("/users", { state: { refresh: true } }); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" className="form-control" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })} required />
        <input type="text" className="form-control mt-2" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })} required />
        <input type="email" className="form-control mt-2" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
        <button type="submit" className="btn btn-primary mt-3">Update</button>
      </form>
    </div>
  );
};

export default EditUser;

