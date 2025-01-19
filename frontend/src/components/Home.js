import React from 'react';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">Welcome to the Bank Information Management System</h1>
      <p className="lead text-center">
        This system allows users to manage their bank account details and admins to oversee the
        information effectively.
      </p>
      <hr />
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <h3 className="text-success">Features:</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Secure user registration and login with password encryption</li>
            <li className="list-group-item">Ability to add, view, edit, and delete multiple bank accounts</li>
            <li className="list-group-item">Admin panel to view and manage all users' bank details</li>
            <li className="list-group-item">Search and filter functionality for admins</li>
          </ul>
        </div>

        <div className="col-md-6 mb-4">
          <h3 className="text-success">How to Use:</h3>
          <ol className="list-group list-group-flush">
            <li className="list-group-item">Register or log in to access your account.</li>
            <li className="list-group-item">Use the "Bank Accounts" section to manage your accounts.</li>
            <li className="list-group-item">Admins can use the "Admin Panel" to oversee user data.</li>
          </ol>
        </div>
      </div>

      <p className="mt-4 text-center">
        Navigate through the app using the navbar. If you encounter issues, feel free to contact
        support.
      </p>
      <p className="mt-4 text-center">
        Email:harishgowdan120@gmail.com<br/>
        Phone:+91 9108712005

        
      </p>
      <br/>
      <h2 className="mt-4 text-center">This is sample Login Info  use it if not Registered</h2>
      <p className="mt-4 text-center">
        Email:A1@gmail.com <br/>
        Password:1234

        
      </p>
      
    </div>
  );
};

export default Home;
