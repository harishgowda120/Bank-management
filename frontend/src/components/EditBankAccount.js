import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const EditBankAccount = () => {
  const { id } = useParams();  // Get the bank account id from the URL
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);  // Get the auth context to access the user's token
  const [formData, setFormData] = useState({
    bankName: '',
    branchName: '',
    ifscCode: '',
    accountNumber: '',
    accountHolderName: '',
  });

  // Fetch the account details when the component mounts or when 'id' or 'auth' changes
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        // Corrected the URL to include a slash before the `id`
        const { data } = await axios.get(`http://localhost:5000/api/banks/${id}`, {
          headers: { Authorization: `Bearer ${auth?.token}` },  // Send the auth token in headers
        });
        setFormData(data);  // Populate the form with the account data
      } catch (error) {
        alert('Error fetching account details');
      }
    };

    if (auth?.token) {  // Only fetch if auth.token is available
      fetchAccountDetails();
    }
  }, [id, auth]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to update the account
      await axios.put(`http://localhost:5000/api/banks/${id}`, formData, {
        headers: { Authorization: `Bearer ${auth?.token}` },  // Send the auth token
      });
      alert('Account updated successfully!');
      navigate('/bank-accounts');  // Navigate back to the bank accounts page
    } catch (error) {
      alert('Error updating account');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Edit Bank Account</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label className="form-label">Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Branch Name</label>
          <input
            type="text"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">IFSC Code</label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label className="form-label">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group mb-4">
          <label className="form-label">Account Holder Name</label>
          <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-lg w-100">
          Update Account
        </button>
      </form>
    </div>
  );
};

export default EditBankAccount;
