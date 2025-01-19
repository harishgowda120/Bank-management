import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BankAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        if (auth?.token) {
          const { data } = await axios.get('https://bank-management-4tyl.onrender.com/api/banks/', {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          });
          setAccounts(data); // Set fetched accounts
        }
      } catch (error) {
        alert('Error fetching bank accounts');
        console.error(error);
      }
    };

    if (auth?.token) {
      fetchAccounts();
    }
  }, [auth]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bank-management-4tyl.onrender.com/api/banks/${id}`, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      setAccounts(accounts.filter((account) => account._id !== id));
      alert('Account deleted successfully');
    } catch (error) {
      alert('Error deleting account');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">My Bank Accounts</h2>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/add-bank-account" className="btn btn-primary btn-lg">
          Add Bank Account
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Bank Name</th>
              <th>Branch Name</th>
              <th>IFSC Code</th>
              <th>Account Number</th>
              <th>Account Holder</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No bank accounts found.
                </td>
              </tr>
            ) : (
              accounts.map((account) => (
                <tr key={account._id}>
                  <td>{account.bankName}</td>
                  <td>{account.branchName}</td>
                  <td>{account.ifscCode}</td>
                  <td>{account.accountNumber}</td>
                  <td>{account.accountHolderName}</td>
                  <td className="d-flex">
                    <Link to={`/edit-bank-account/${account._id}`} className="btn btn-warning btn-sm me-2">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(account._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BankAccounts;
