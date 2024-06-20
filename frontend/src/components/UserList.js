import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import '../css/userList.css'; // Create this CSS file to style your user list

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/users?page=${currentPage}&limit=10`, {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('There was an error fetching the users!', error);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handleUserClick = (username) => {
    Navigate(`/chat/${username}`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="user-list">
      {users.map((user) => (
        <div
          key={user._id}
          className="user"
          onClick={() => handleUserClick(user.username)}
        >
          {user.username}
        </div>
      ))}

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
