import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AddBankAccount = () => {
  const [formData, setFormData] = useState({
    bankName: '',
    branchName: '',
    ifscCode: '',
    accountNumber: '',
    accountHolderName: '',
  });
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://bank-management-4tyl.onrender.com/api/banks/AddAck', formData, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      alert('Bank account added successfully!');
      navigate('/bank-accounts');
    } catch (error) {
      alert('Error adding bank account');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded-3">
        <h2 className="text-center text-primary mb-4">Add Bank Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="form-label fs-5">Bank Name</label>
            <input
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label fs-5">Branch Name</label>
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label fs-5">IFSC Code</label>
            <input
              type="text"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label fs-5">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label fs-5">Account Holder Name</label>
            <input
              type="text"
              name="accountHolderName"
              value={formData.accountHolderName}
              onChange={handleChange}
              className="form-control form-control-lg"
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-lg py-3 fs-4">
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBankAccount;
