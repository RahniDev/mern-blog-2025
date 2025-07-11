import { useState } from "react";
import { Navigate } from "react-router-dom";
import './adminLogin.css'
import { signin, authenticate, isAuthenticated } from "../Auth/index";

const AdminLogin = () => {
  const [values, setValues] = useState({
    email: "email@gmail.com",
    password: "password",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  // higher order function
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then(data => {
        if (error) {
          setValues({ ...values, error: error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              redirectToReferrer: true,
            });
          });
        }
      })
      .catch(error => {
        console.error(error);
        setValues({ ...values, error: error, loading: false });
      });
  };
  
  const loginForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>

      <button onClick={clickSubmit} className="btn btn-color btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Navigate to="/admin-dashboard" />;
      }

      if (isAuthenticated()) {
        return <Navigate to="/" />;
      }
    };

    return (
      <div>
        {showLoading()}
        {showError()}
        {loginForm()}
        {redirectUser()}
      </div>
    );
  };
}

export default AdminLogin