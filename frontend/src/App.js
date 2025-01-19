import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import BankAccounts from './components/BankAccounts';
import AddBankAccount from './components/AddBankAccount';
import EditBankAccount from './components/EditBankAccount';
import AdminPanel from './components/AdminPanel';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bank-accounts" element={<BankAccounts />} />
        <Route path="/add-bank-account" element={<AddBankAccount />} />
        <Route path="/edit-bank-account/:id" element={<EditBankAccount />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
