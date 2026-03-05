import { useState } from "react";
import { Link } from "react-router-dom";
import PageWrapper from "./PageWrapper";

function Signup() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(name,email,password);
  };

  return (
    <PageWrapper>
      <div className="auth-page">
        <div className="auth-box">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Start tracking your expenses</p>

        <form onSubmit={handleSignup}>

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn-primary">Sign Up</button>

        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
    </PageWrapper>
  );
}

export default Signup;