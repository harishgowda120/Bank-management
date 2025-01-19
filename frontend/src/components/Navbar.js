import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext); // Use context to access auth data
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(null); // Clear the authentication state (logout)
    navigate('/'); // Redirect to home page

    // Clear localStorage on logout
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');

    alert('Logged out successfully!');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow-lg rounded-3 mb-4">
      <div className="container">
        <Link className="navbar-brand text-white fw-bold display-3" to="/">
          <span className="text-info">Bank</span> Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!auth ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fs-4 hover-bg-light px-4 py-3 rounded-lg" to="/register">
                    <strong>Register</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fs-4 hover-bg-light px-4 py-3 rounded-lg" to="/login">
                    <strong>Login</strong>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fs-4 hover-bg-success px-4 py-3 rounded-lg" to="/bank-accounts">
                    <strong>My Accounts</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fs-4 hover-bg-warning px-4 py-3 rounded-lg" to="/admin-panel">
                    <strong>Admin Panel</strong>
                  </Link>
                </li>
                <li className="nav-item">
                  <span className="navbar-text text-white fs-4 fw-light">
                    Welcome, <span className="text-info fw-bold" >{auth.username  }</span>
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-danger fs-4 fw-bold p-0"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
