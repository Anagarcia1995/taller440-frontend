// import React, { useState } from 'react'
// import {useNavigate} from 'react-router-dom'


// const AdminLoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();


//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:3000/admin/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         alert(data.error || "Login failed");
//         return;
//       }

//       localStorage.setItem("adminToken", data.token);
//       navigate("/");
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("An error occurred. Please try again.");
//     }
//   };


//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <input 
//         type="email"
//         placeholder='Email'
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         />        
        
//         <input 
//         type="password"
//         placeholder='Password'
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//         />
//         <button type='submit'>LOGIN</button>
//       </form>
//     </div>
//   )
// }

// export default AdminLoginPage
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid credentials');
        return;
      }

      localStorage.setItem('adminToken', data.token);
      navigate('/admin/panel');
    } catch (err) {
      console.error('Login error:', err);
      setError('Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'LOGIN'}
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
