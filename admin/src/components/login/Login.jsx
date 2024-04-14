import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const server = "http://localhost:4000/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${server}/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, password }),
        headers: { "content-type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const token = data.token;

      //Storing token
      localStorage.setItem("token", token);

      navigate("/dd");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="form-container">
        <form className="signin" onSubmit={handleSubmit} id="login-form">
          <div className="signinform">
            <h2>Login</h2>
          </div>
          <div className="signinform">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              id="email"
              onChange={emailChangeHandler}
              value={email}
            />
          </div>
          <div className="signinform">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              id="password"
              onChange={passwordChangeHandler}
              value={password}
            />
          </div>
          <button className="signinbutton" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
