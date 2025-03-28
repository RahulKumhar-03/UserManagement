import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(page);
        setUsers(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadUsers();
  }, [page]); 

  useEffect(() => {
    if (location.state?.updatedUser) {
      setUsers(users.map(user => user.id === location.state.updatedUser.id ? location.state.updatedUser : user));
    }
  }, [location.state]);

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="container mt-5">
      <h2>Users</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><img src={user.avatar} alt="Avatar" width="50" /></td>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-warning" onClick={() => navigate(`/edit/${user.id}`, { state: user })}>Edit</button>
                <button className="btn btn-danger ms-2" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-secondary" disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
      <button className="btn btn-secondary ms-2" onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
};

export default UsersList;

