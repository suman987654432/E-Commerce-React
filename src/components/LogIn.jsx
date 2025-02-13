import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.get("https://json-server-deploy-dp5r.onrender.com/User");
      const users = response.data;
      const validUser = users.find(
        (u) => u.email === user.email && u.password === user.password
      );

      if (validUser) {
        alert("Login Successful!");
        navigate("/home"); // Redirect to dashboard or homepage
      } else {
        alert("Invalid email or password!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={user.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default Login;
