import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // 👈 add this

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
  const response = await fetch("https://sareewebsite.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

      const data = await response.json();

      if (data.success) {
        // optional: save admin id
        localStorage.setItem("adminId", data.adminId);

        navigate("/admin-home");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
