import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminPanel = () => {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [userBankAccounts, setUserBankAccounts] = useState({});  // To store bank accounts of each user

  // Fetch users and bank accounts when the component mounts or auth.token changes
  useEffect(() => {
    if (auth?.token) {
      const fetchUsersAndBankAccounts = async () => {
        try {
          // Fetch users
          const { data } = await axios.get('https://bank-management-4tyl.onrender.com/api/users/users', {
            headers: { Authorization: `Bearer ${auth?.token}` },
          });
          setUsers(data);

          // Fetch bank accounts for each user after users are fetched
          const bankAccountsResponse = await axios.get('https://bank-management-4tyl.onrender.com/api/users/All', {
            headers: { Authorization: `Bearer ${auth?.token}` },
          });

          // Organize bank accounts by userId
          const bankAccountsByUser = {};

          bankAccountsResponse.data.forEach((account) => {
            if (!bankAccountsByUser[account.user]) {
              bankAccountsByUser[account.user] = [];
            }
            bankAccountsByUser[account.user].push(account);
          });

          // Update the state to associate bank accounts with users
          setUserBankAccounts(bankAccountsByUser);

        } catch (error) {
          alert('Error fetching users or bank accounts');
          console.error(error);
        }
      };

      fetchUsersAndBankAccounts();
    }
  }, [auth?.token]); // The effect will run whenever `auth?.token` changes

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-3">
        <h2 className="text-center text-primary mb-4">Admin Panel</h2>
        <div className="form-group mb-4">
          <input
            type="text"
            placeholder="Search by username or email"
            value={search}
            onChange={handleSearch}
            className="form-control form-control-lg"
          />
        </div>
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Bank Accounts</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    {/* Render bank accounts from the userBankAccounts state */}
                    {userBankAccounts[user._id] && userBankAccounts[user._id].length > 0 ? (
                      <ul>
                        {userBankAccounts[user._id].map((account) => (
                          <li key={account._id}>
                            {account.bankName} - {account.accountNumber}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">No bank accounts</p>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
